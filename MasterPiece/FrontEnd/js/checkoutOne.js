
const userId = localStorage.getItem("userId");
const pathId = localStorage.getItem("pathId");

const userName = document.getElementById("name");
const pathName = document.getElementById("pathName");
const howManyHikers = document.getElementById("howManyHikers");
const phoneNumber = document.getElementById("phoneNumber");
const totalPrice = document.getElementById("totalPrice");



let originalTotalPrice; // To store the original total price before applying the coupon
let couponApplied = false; // To track if a coupon has been applied
let discountPercentage = 0; // To store the applied coupon's discount percentage

async function GetCurrentUser() {
    const url = `https://localhost:44360/api/Users/GetUserById/${userId}`;
    const response = await fetch(url);
    const data = await response.json();
    if (response.ok){
        userName.value = data.name;
        phoneNumber.value = data.phoneNumber;
    }
   
}

async function getPathDetails() {
    const url = `https://localhost:44360/api/Paths/GetPathById/${pathId}`;
    const response = await fetch(url);
    const data = await response.json();
    if (response.ok){
    localStorage.setItem("pricePerPerson", data.pricePerPerson);
    pathName.value = data.pathName;
    howManyHikers.value = 1; // Set initial number of hikers to 1

    updateTotalPrice(); // Initialize the total price based on default hikers count

    }
}

function updateTotalPrice() {
    let hikers = Math.max(1, parseInt(howManyHikers.value) || 1); // Ensure at least one hiker
    let pricePerPerson = parseFloat(localStorage.getItem("pricePerPerson"));
    let calculatedTotalPrice1 = pricePerPerson * hikers;
    let calculatedTotalPrice = pricePerPerson * hikers;
    localStorage.setItem("originalPrice",calculatedTotalPrice1.toFixed(2));

    if (couponApplied && discountPercentage > 0) {
        // Apply the discount if the coupon is applied
        calculatedTotalPrice = calculatedTotalPrice - (calculatedTotalPrice * discountPercentage / 100);
    }
   
    totalPrice.value = calculatedTotalPrice.toFixed(2); // Update the displayed total price
    originalTotalPrice = parseFloat(localStorage.getItem("originalPrice")); // Store the total price, whether discounted or not
    
    localStorage.setItem("TotalPrice", calculatedTotalPrice.toFixed(2)); // Store the total price
}

async function CheckCoupon() {
    let couponCode = localStorage.getItem("couponCode");

    if (!couponCode || couponCode.trim() === "") {
        alert("Please enter a coupon code before applying.");
        return;
    }

    if (couponApplied) {
        alert("Coupon already applied.");
        return;
    }

    const url = `https://localhost:44360/api/Coupons/GetCouponByCode/${couponCode}`;
    const response = await fetch(url);
    const data = await response.json();
    
    if (!response.ok || !data) {
        alert("Invalid coupon code");
        return;
    }

    let coupondID = document.getElementById("couponID")
    coupondID.value = data.couponId;
    localStorage.setItem("couponID", coupondID.value )
    discountPercentage = data.discountPercentage; // Save the discount percentage
    couponApplied = true; // Mark that the coupon has been applied

    updateTotalPrice(); // Recalculate total price with the applied discount
}

function StoreCouponCode() {
    let couponCode = document.getElementById("couponCode").value;

    if (!couponCode.trim() || couponCode === '' || couponCode === null || couponCode === "" || couponCode === " " || couponCode === ' '  ) {
        // If the input is cleared, reset to original total price and clear localStorage
        localStorage.getItem("originalPrice")
        totalPrice.value = parseFloat(localStorage.getItem("originalPrice"));
        localStorage.setItem("TotalPrice", originalTotalPrice);
        localStorage.removeItem("couponCode"); // Remove coupon code from localStorage
        localStorage.removeItem("couponID")
        
        couponApplied = false; // Reset the coupon application state
        discountPercentage = 0; // Reset discount percentage
    } else {
        localStorage.setItem("couponCode", couponCode); // Store the new coupon code
    }
}

// Ensure all functions are properly chained to execute in the correct sequence
async function initializePage() {
    await GetCurrentUser();
    await getPathDetails();
}

initializePage();

howManyHikers.oninput = function() {
    if (!howManyHikers.value || isNaN(howManyHikers.value)) {
        howManyHikers.value = 1; // Reset to 1 if the user clears or enters an invalid value
    }
    updateTotalPrice(); // Update the total price with the current number of hikers
};

// Add event listener to the apply coupon button
document.getElementById("applyCouponBtn").addEventListener('click', async function() {
    StoreCouponCode(); // Save coupon code to local storage
    await CheckCoupon(); // Apply the coupon and adjust the price
});


let form = document.getElementById("createBookingForm")

form.addEventListener('submit', async function (e) {
  
    e.preventDefault();

    let formData = new FormData();

    formData.append("userId", userId);
    formData.append("pathId", pathId);
    formData.append("numberOfHikers", howManyHikers.value);
    formData.append("totalPrice", localStorage.getItem("TotalPrice"));

    const couponID = localStorage.getItem("couponID")
    
    if (couponID) {
        formData.append("couponId", couponID);
    }

    formData.append("bookingDate", new Date().toISOString());

    const response = await fetch('https://localhost:44360/api/PathBooking/CreateNewBooking', {
        method: 'POST',
        body: formData
    });


    if (response.ok) {
        const data = await response.json(); // Parse the JSON response to get the booking data
        const bookingId = data.bookingId; // Assuming `BookingId` is part of the returned object

        // Store BookingId in localStorage
        localStorage.setItem("bookingId", bookingId);

        // Redirect to the next page
        window.location.href = "../../FrontEnd/checkoutPageTwo.html";
    } else {
        alert('Failed to create booking.');
    }
});
