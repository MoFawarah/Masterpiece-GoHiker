


function initPayPalButton() {
    paypal.Buttons({
        style: {
            shape: 'rect',
            color: 'gold',
            layout: 'vertical',
            label: 'paypal',
        },

        createOrder: function(data, actions) {
            return actions.order.create({
                purchase_units: [{
                    amount: {
                        currency_code: "USD",
                        // value: "0.99" // Use string format for value
                        value : localStorage.getItem("TotalPrice")
                    }
                }]
            });
        },

        onApprove: function(data, actions) {
            return actions.order.capture().then(function(orderData) {
                console.log('Capture result', orderData, JSON.stringify(orderData, null, 2));

                const transactionId = orderData.id;
                localStorage.setItem("transactionId", transactionId);

                
                // Show a success message
                const element = document.getElementById('paypal-button-container');
                element.innerHTML = '<h3>Thank you for your payment!</h3>';
                window.location.href = "index.html";
            });
        },

        onError: function(err) {
            console.error('PayPal Error:', err);
        }
    }).render('#paypal-button-container');
}

// Initialize PayPal button
window.onload = initPayPalButton;