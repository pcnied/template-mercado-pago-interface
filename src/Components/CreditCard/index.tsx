import { useEffect } from 'react';
import { loadMercadoPago } from '@mercadopago/sdk-js';
import { postCredit } from '../../httpService/api.config';

declare global {
    interface Window {
        MercadoPago: any;
    }
}

const CreditCard = () => {
    useEffect(() => {
        const initializeCardForm = async () => {
            await loadMercadoPago();
            const mp = new window.MercadoPago('APP_USR-4b3fe954-c335-4250-9dd4-035afd17cf02');

            const cardForm = mp.cardForm({
                amount: '1.5',
                iframe: true,
                form: {
                    id: 'form-checkout',
                    cardNumber: {
                        id: 'form-checkout__cardNumber',
                        placeholder: 'Número do cartão',
                    },
                    expirationDate: {
                        id: 'form-checkout__expirationDate',
                        placeholder: 'MM/YY',
                    },
                    securityCode: {
                        id: 'form-checkout__securityCode',
                        placeholder: 'Código de segurança',
                    },
                    cardholderName: {
                        id: 'form-checkout__cardholderName',
                        placeholder: 'Titular do cartão',
                    },
                    issuer: {
                        id: 'form-checkout__issuer',
                        placeholder: 'Banco emissor',
                    },
                    installments: {
                        id: 'form-checkout__installments',
                        placeholder: 'Parcelas',
                    },
                    identificationType: {
                        id: 'form-checkout__identificationType',
                        placeholder: 'Tipo de documento',
                    },
                    identificationNumber: {
                        id: 'form-checkout__identificationNumber',
                        placeholder: 'Número do documento',
                    },
                    cardholderEmail: {
                        id: 'form-checkout__cardholderEmail',
                        placeholder: 'E-mail',
                    },
                },
                callbacks: {
                    onFormMounted: (error: any) => {
                        if (error) return console.warn('Form Mounted handling error: ', error);
                        console.log('Form mounted');
                    },
                    onSubmit: (event: any) => {
                        event.preventDefault();

                        const {
                            paymentMethodId: payment_method_id,
                            issuerId: issuer_id,
                            cardholderEmail: email,
                            amount,
                            token,
                            installments,
                            identificationNumber,
                            identificationType,
                        } = cardForm.getCardFormData();

                        postCredit(
                            token,
                            issuer_id,
                            payment_method_id,
                            Number(amount),
                            Number(installments),
                            email,
                            identificationType,
                            identificationNumber

                        ).then(
                            response => {
                                console.log("response")
                                console.log(response)

                            }
                        ).catch(error => {
                            console.log("error", error)
                        })

                         
                    },
                    onFetching: (resource: any) => {
                        console.log('Fetching resource: ', resource);

                        // Animate progress bar
                        const progressBar = document.querySelector('.progress-bar');
                        progressBar?.removeAttribute('value');

                        return () => {
                            progressBar?.setAttribute('value', '0');
                        };
                    },
                },
            });
        };

        initializeCardForm();
    }, []);

    return (
        <>
            <style>{`
        #form-checkout {
          display: flex;
          flex-direction: column;
          max-width: 600px;
        }
        .container {
          height: 18px;
          display: inline-block;
          border: 1px solid rgb(118, 118, 118);
          border-radius: 2px;
          padding: 1px 2px;
        }
      `}</style>
            <form id="form-checkout">
                <span>
                    5031 4332 1540 6351
                </span>
                <div id="form-checkout__cardNumber" className="container"></div>
                <span>
                    11/25
                </span>
                <div id="form-checkout__expirationDate" className="container"></div>
                <span>
                    123
                </span>
                <div id="form-checkout__securityCode" className="container"></div>
                <input type="text" id="form-checkout__cardholderName" placeholder="Titular do cartão" />
                <select id="form-checkout__issuer"></select>
                <select id="form-checkout__installments"></select>
                <select id="form-checkout__identificationType"></select>
                <span>
                    12345678909
                </span>
                <input type="text" id="form-checkout__identificationNumber" placeholder="Número do documento" />
                <input type="email" id="form-checkout__cardholderEmail" placeholder="E-mail" />
                <button type="submit" id="form-checkout__submit">Pagar</button>
                <progress value="0" className="progress-bar">Carregando...</progress>
            </form>
        </>
    );
};

export default CreditCard;