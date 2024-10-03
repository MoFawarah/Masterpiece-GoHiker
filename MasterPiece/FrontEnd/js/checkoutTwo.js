////////////// for order creation ///////////////

const userId = localStorage.getItem("userId");
const bookingId = localStorage.getItem("bookingId");
const totalPrice = localStorage.getItem("TotalPrice");
const alternativePhone = document.getElementById("lternativePhone");


let paymentMethod = localStorage.getItem("PaymentMethod")

////////////// end of for order creation ///////////////

////////// for auto fill data /////////////////

const userName = document.getElementById("name");

const email = document.getElementById("email");

const phoneNumber = document.getElementById("phone");

/////////// end of for auto fill data //////////////////

if (userId) {
    GetCurrentUser();
}
async function GetCurrentUser() {
  const url = `https://localhost:44360/api/Users/GetUserById/${userId}`;
  const response = await fetch(url);
  const data = await response.json();

  if (data) {
    userName.value = data.name;
    email.value = data.email;
    phoneNumber.value = data.phoneNumber;

    const serviceType = document.getElementById("serviceType");
    serviceType.value = "Path Order";

    const amount = document.getElementById("amount");
    if(totalPrice !== null) 
    {
      amount.value = totalPrice;
    }
    
  }
}






document.getElementById("createOrderForm").addEventListener("submit", async function (event) {
  
  console.log("Form submit event triggered");

  event.preventDefault()



  // Get the latest paymentMethod from localStorage
  let paymentMethod = localStorage.getItem("PaymentMethod");

  if (!paymentMethod) {
    Swal.fire({
      icon: 'warning',
      title: 'Payment Method Required',
      text: 'Please select a payment method before proceeding.',
      confirmButtonColor: '#13357b',
    });
    return;
  }

  let formData = new FormData();
  formData.append("userId", userId);
  formData.append("bookingId", bookingId);
  formData.append("totalAmount", totalPrice);
  formData.append("paymentDate", new Date().toISOString());
  formData.append("altPhone", alternativePhone.value);

  let fileInput = document.getElementById("receiptUpload");
  if (fileInput.files.length > 0) {
    formData.append("InvoceImg", fileInput.files[0]);
  }

  // Handle payment method logic based on the latest value of paymentMethod
  if (paymentMethod === "cliqEWallet") {
    formData.append("paymentMethod", "cliqEWallet");
    formData.append("paymentStatus", "Pending");
  } else if (paymentMethod === "payPal") {
    formData.append("paymentMethod", "PayPal");
    formData.append("paymentStatus", "Completed");
  } else if (paymentMethod === "creditCard") {
    formData.append("paymentMethod", "creditCard");
    formData.append("paymentStatus", "Completed");
  }

  const response = await fetch(
    "https://localhost:44360/api/PathOrder/CreateNewPathOrder",
    {
      method: "POST",
      body: formData,
    }
  );

  if (response.ok) {
    const responseData = await response.json();
    
    if (paymentMethod)
    {

   
    // Redirect or handle payment method specific actions
    if (paymentMethod === "payPal") {
      localStorage.setItem("orderId", responseData.orderId);
      alert('You will be redirected to PayPal to complete the payment!');
      window.location.href = "../../FrontEnd/Paypal.html";
    } else if (paymentMethod === "cliqEWallet") {
      localStorage.removeItem("PaymentMethod")
      Swal.fire({
        icon: 'success',
        title: 'Order Created Successfully',
        text: 'You will be redirected to the homepage.',
        confirmButtonColor: '#13357b',
      }).then(() => {
        window.location.replace("FrontEnd/allPaths.html");
      });

    } else if (paymentMethod === "creditCard") {
      localStorage.setItem("orderId", responseData.orderId);

      var stripe = Stripe("pk_test_51Q3FzBRqxwpgnuaXO3FvwmrXdMIzL7hn70SO4lHu8W7QBGqWYWIWGzCYGMHtPw3j16Vfv1nRtyhsgK2LazOZGphL00A7laiJOh");
      
      // Create a Stripe checkout session
      const sessionResponse = await fetch("https://localhost:44360/api/Payment/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: (parseFloat(totalPrice) * 100).toString(), // Amount in cents, as a string
          productName: "Path",
          successUrl: window.location.origin + "/FrontEnd/success.html?session_id={CHECKOUT_SESSION_ID}", // Include session_id in success URL
          cancelUrl: window.location.origin + "/FrontEnd/404.html",
        }),
      });

      const session = await sessionResponse.json();
      
      if (session.sessionId) {
        // Redirect to Stripe checkout
        stripe.redirectToCheckout({ sessionId: session.sessionId });
      } else {
        throw new Error("No session ID received");
      }
    }}
  } else {
    alert('Order Failed');
  }
  return false;
});


   