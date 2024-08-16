import axios from "axios";

const BASE_PATH = "http://localhost:3000";

// Atualize o endpoint para refletir o endpoint correto no backend
export async function postCriarPix(
  transaction_amount: number,
  description: string,
  email: string,
  identification_type: string,
  identification_number: string
) {
  try {
    const body = {
      transaction_amount,
      description,
      payment_method_id: "pix", // O ID do método de pagamento para Pix
      email,
      identification_type,
      number: identification_number,
    };

    const response = await axios.post(`${BASE_PATH}/payment-pix`, body);
    return response.data;
  } catch (error) {
    console.error("Error creating PIX payment", error);
    throw error;
  }
}

// Atualize o endpoint para refletir o endpoint correto no backend
export async function postCredit(
  token: string,
  issuer_id: string,
  payment_method_id: string,
  transaction_amount: number,
  installments: number,
  email: string,
  identificationType: string,
  identificationNumber: string
) {
  try {
    const body = {
      transaction_amount,
      token,
      description: "Capa para notebook",
      installments,
      payment_method_id,
      issuer_id,
      payer: {
        email,
        identification: {
          type: identificationType,
          number: identificationNumber,
        },
      },
    };

    const response = await axios.post(`${BASE_PATH}/payment-card`, body);
    return response.data;
  } catch (error) {
    console.error("Error creating credit payment", error);
    throw error;
  }
}
