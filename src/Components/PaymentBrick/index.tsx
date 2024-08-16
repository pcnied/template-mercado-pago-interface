import { useEffect, useState } from "react";
import { postCredit, postCriarPix } from "../../httpService/api.config";
import axios from "axios";

declare global {
  interface Window {
    MercadoPago: any;
  }
}

const PaymentBrick: React.FC = () => {
  const [preferenceId, setPreferenceId] = useState<string | null>(null);
  let paymentBrickController: any; // Declare paymentBrickController aqui

  // Função para criar uma preferência e obter o preferenceId
  const createPreference = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/create_preference",
        {
          items: [
            {
              title: "Produto Exemplo",
              quantity: 1,
              unit_price: 100, // Substitua pelo valor real do item
            },
          ],
          payerEmail: "exemplo@dominio.com", // Substitua pelo e-mail real do pagador
        }
      );

      setPreferenceId(response.data.preferenceId);
    } catch (error) {
      console.error("Error creating preference:", error);
    }
  };

  useEffect(() => {
    const initializePaymentBrick = async () => {
      if (!preferenceId) {
        await createPreference(); // Cria a preferência se ainda não tiver
      }

      const mp = new (window as any).MercadoPago(
        "TEST-394b8f5c-d4a7-43de-90a4-f8f506550fce", // Adicione sua chave pública aqui
        {
          locale: "pt",
        }
      );

      const bricksBuilder = mp.bricks();

      const settings = {
        initialization: {
          amount: 100,
          preferenceId: preferenceId || "<DEFAULT_PREFERENCE_ID>", // Use o ID da preferência obtido
          payer: {
            firstName: "",
            lastName: "",
            email: "",
          },
        },
        customization: {
          visual: {
            style: {
              theme: "default",
            },
          },
          paymentMethods: {
            creditCard: "all",
            debitCard: "all",
            bankTransfer: "all",
            atm: "all",
            maxInstallments: 3,
          },
        },
        callbacks: {
          onReady: () => {
            console.log("Payment Brick is ready");
          },
          onSubmit: async ({ selectedPaymentMethod, formData }: any) => {
            try {
              let response;

              // Dependendo do método de pagamento, faça uma chamada diferente
              if (selectedPaymentMethod === "creditCard") {
                response = await postCredit(
                  formData.token,
                  formData.issuer_id,
                  formData.payment_method_id,
                  formData.transaction_amount,
                  formData.installments,
                  formData.payer.email,
                  formData.payer.identification.type,
                  formData.payer.identification.number
                );
              } else if (selectedPaymentMethod === "pix") {
                response = await postCriarPix(
                  formData.transaction_amount,
                  formData.description,
                  formData.payer.email,
                  formData.payer.identification.type,
                  formData.payer.identification.number
                );
              }

              console.log("Payment Successful:", response);
            } catch (error) {
              console.error("Payment Error:", error);
            }
          },
          onError: (error: any) => {
            console.error("Payment Brick error:", error);
          },
        },
      };

      // Cria o Brick e armazena o controlador
      paymentBrickController = await bricksBuilder.create(
        "payment",
        "paymentBrick_container",
        settings
      );
    };

    initializePaymentBrick();

    // Cleanup para desmontar o Brick ao desmontar o componente
    return () => {
      if (paymentBrickController) {
        paymentBrickController.unmount();
      }
    };
  }, [preferenceId]);

  return (
    <div
      id="paymentBrick_container"
      style={{
        width: "100%",
        maxWidth: "500px",
      }}
    ></div>
  );
};

export default PaymentBrick;
