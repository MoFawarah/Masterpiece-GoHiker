// var stripe = Stripe(
//     "pk_test_51Q3FzBRqxwpgnuaXO3FvwmrXdMIzL7hn70SO4lHu8W7QBGqWYWIWGzCYGMHtPw3j16Vfv1nRtyhsgK2LazOZGphL00A7laiJOh"
//   );
  
// //   window.location.origin +
// //   `/User/ThankYou.html?amount=${totalAmount}&programId=${ProgramId}&userId=${UserId}`,


//   function processStripePayment() {
//     var totalAmount =
//     Number(document.getElementById("TotalPrice").innerText) || 0;
//     // var ProgramId = localStorage.getItem("pathId");
//     // var programName = document.getElementById("programName").innerText;
//     // var UserId = localStorage.getItem("UserId");
  
//     fetch("https://localhost:44360/api/Payment/create-checkout-session", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         amount: totalAmount * 100,
//         productName: "PAth",
//         successUrl:
//           window.location.origin +
//           `../../FrontEnd/allPaths.html`,
//         cancelUrl: window.location.origin + "../../FrontEnd/404.html",
//       }),
//     })
//       .then((response) => {
//         if (!response.ok) {
//           throw new Error("Network response was not ok");
//         }
//         return response.json();
//       })
//       .then((session) => {
//         if (session.sessionId) {
//           stripe
//             .redirectToCheckout({ sessionId: session.sessionId })
//             .then((result) => {
//               if (result.ok) {
//                 alert("payment sucssefuly");
//               }
//               if (result.error) {
//                 Swal.fire("Error", result.error.message, "error");
//               }
//             });
//         } else {
//           throw new Error("Session ID not found in the response");
//         }
//       })
//       .catch((error) => {
//         console.error("Error initiating Stripe payment:", error);
//         Swal.fire("Error", "Failed to initiate payment.", "error");
//       });
//   }