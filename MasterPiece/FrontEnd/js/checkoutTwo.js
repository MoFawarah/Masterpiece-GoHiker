////////////// for order creation ///////////////

const userId = localStorage.getItem("userId");
const bookingId = localStorage.getItem("bookingId");
const totalPrice = localStorage.getItem("TotalPrice");
const alternativePhone = document.getElementById("lternativePhone");

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






let form = document.getElementById("createOrderForm");

form.addEventListener("submit", async function (e) {
  e.preventDefault();

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

  let paymentMethod = localStorage.getItem("PaymentMethod")

  if (paymentMethod == "cliqEWallet")
  {
    formData.append("paymentMethod", "cliqEWallet");

    formData.append("paymentStatus", "Pending");
  }
  else if (paymentMethod == "payPal") {
    formData.append("paymentMethod", "PayPal");
    formData.append("paymentStatus", "Completed");
  }

  else {
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
  
  if (response.ok)
  {
    const responseData = await response.json();
   

    if (paymentMethod == "payPal")
    {
      localStorage.setItem("orderId", responseData.orderId)
      alert('You will be redirected to paypal to complete the payment!');
      window.location.href = "../../FrontEnd/Paypal.html";
    }
    else {
      alert('Order Created Successfully');


      window.red.href = "../../FrontEnd/allPaths.html";

    }

   
  }

else 
{
    alert('Order Falied');
}

});
