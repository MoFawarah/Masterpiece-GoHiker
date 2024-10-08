


let orderId = localStorage.getItem("orderId")


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
        
                let url = `https://localhost:44360/api/PathOrder/UpdateOrder/${orderId}`
        
                // From body update API method
                fetch(url, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        transactionId: transactionId
                    })
                })
                .then(response => {
                    if (response.ok) {
                    
                        localStorage.removeItem('orderId');
                        localStorage.removeItem('TotalPrice');
                        localStorage.removeItem('PaymentMethod');
                        localStorage.removeItem('bookingId');
                        localStorage.removeItem('originalPrice');
                        localStorage.removeItem('pathId');
                        localStorage.removeItem('phoneNumber');
                        localStorage.removeItem('pricePerPerson');
        
                    
                        Swal.fire({
                            icon: 'success',
                            title: 'Order Confirmed',
                            text: 'Get ready for a memorable hiking adventure!',
                            confirmButtonColor: '#13357b',
                        }).then(() => {
                            window.location.replace("/FrontEnd/index.html");
                        });
        
                    } else {
                        alert('Failed to update order');
                    }
                })
                .catch(err => console.error('Failed to update order:', err));
        
                // Show a success message in the DOM as a fallback
                const element = document.getElementById('paypal-button-container');
                element.innerHTML = '<h3>Thank you for your payment!</h3>';
            });
        },
        

        onError: function(err) {
            console.error('PayPal Error:', err);
        }
    }).render('#paypal-button-container');
}

// Initialize PayPal button
window.onload = initPayPalButton;