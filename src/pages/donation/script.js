// Inicialize o SDK do Mercado Pago com sua Public Key
const mp = new MercadoPago('APP_USR-b14c633d-9eff-4133-96bb-890811271963', {
    locale: 'pt-BR'
});

document.getElementById('donationForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const amount = document.getElementById('amount').value;

    // Exemplo de chamada à API do Mercado Pago
    fetch('https://api.mercadopago.com/v1/payments', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer APP_USR-5947512086216150-082415-fe7c10dc7e093b7368b3a955fc512d05-759460600'
        },
        body: JSON.stringify({
            transaction_amount: amount,
            description: `Doação de ${name}`,
            payment_method_id: 'pix',
            payer: {
                email: email
            }
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.point_of_interaction.transaction_data.qr_code_base64) {
            alert(`Obrigado, ${name}! Use o QR Code abaixo para completar sua doação.`);
            // Exibir o QR Code para o usuário
            const qrCodeImg = document.createElement('img');
            qrCodeImg.src = `data:image/png;base64,${data.point_of_interaction.transaction_data.qr_code_base64}`;
            document.body.appendChild(qrCodeImg);
        } else {
            alert('Houve um problema ao processar sua doação. Tente novamente.');
        }
    })
    .catch(error => {
        console.error('Erro:', error);
        alert('Houve um problema ao processar sua doação. Tente novamente.');
    });
});
