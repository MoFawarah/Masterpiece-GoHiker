////////////// for order creation ///////////////

const userId = localStorage.getItem("userId");
const bookingId = localStorage.getItem("bookingId");
const totalPrice = localStorage.getItem("TotalPrice");
const paymentMethod = localStorage.getItem("PaymentMethod");
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
    amount.value = totalPrice;
  }
}






let form = document.getElementById("createOrderForm");

form.addEventListener("submit", async function (e) {
  e.preventDefault();

  let formData = new FormData();

  if (paymentMethod == "payPal")
  {
    formData.append("userId", userId);
    formData.append("bookingId", bookingId);
    formData.append("totalAmount", totalPrice);
    formData.append("paymentMethod", paymentMethod);
    formData.append("paymentStatus", "Completed");
    formData.append("paymentDate", new Date().toISOString());
    formData.append("altPhone", alternativePhone.value);

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
    alert('You will be redirected to paypal to complete the payment!');
    window.location.href = "../../FrontEnd/Paypal.html";
  }

else 
{
    alert('Order Falied');
}

});
