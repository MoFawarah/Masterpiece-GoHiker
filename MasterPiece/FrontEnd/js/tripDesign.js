const userId = localStorage.getItem("userId");

const userName = document.getElementById("name");
const email = document.getElementById("email");
const phoneNumber = document.getElementById("phone");
const city = document.getElementById("city");
const numberOfHikers = document.getElementById("numberOfHikers");
const budget = document.getElementById("budget");
const message = document.getElementById("message");

var regName = /^[a-zA-Z]+(?: [a-zA-Z]+)?$/;
const regEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const regPhoneNumber = /^(?:\+962|00962|962|0)?(7[5-9][0-9]{7}|6[0-9]{7})$/;

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
        if (data.city !== "Not specified yet") {
            city.value = data.city;
        }
    }
}

const url = "https://localhost:44360/api/TripDesign/CreateTripDesign";
let form = document.getElementById("TripDesignForm");

form.addEventListener("submit", async function (e) {
    e.preventDefault();

    // Validate fields
    if (!regName.test(userName.value)) {
        return showAlert("Invalid Name! Name can't have numbers");
    }
    if (!regEmail.test(email.value)) {
        return showAlert("Invalid Email! Please enter a valid email.");
    }
    if (!regPhoneNumber.test(phoneNumber.value)) {
        return showAlert("Invalid Phone Number! Please enter a valid phone number.");
    }
    if (city.value === "") {
        return showAlert("City is required!");
    }
    if (numberOfHikers.value < 5 ) {
        return showAlert("Number of hikers must be at least 5.");
    }
    if (budget.value < 100) {
        return showAlert("Estimated Budget must be at least 100.");
    }

    let formData = new FormData();
    if (userId) {
        formData.append("userId", userId);
    }

    formData.append("name", userName.value);
    formData.append("email", email.value);
    formData.append("phone", phoneNumber.value);
    formData.append("city", city.value);
    formData.append("numberOfHikers", numberOfHikers.value);
    formData.append("budget", budget.value);
    formData.append("message", message.value);

    try {
        const response = await fetch(url, {
            method: "POST",
            body: formData,
        });

        if (response.ok) {
            Swal.fire('Success', 'Trip Design submitted successfully!', 'success');
            form.reset(); 
        } else {
            Swal.fire('Error', 'Failed to submit the Trip Design. Please try again.', 'error');
        }
    } catch (error) {
        Swal.fire('Error', 'An unexpected error occurred. Please try again later.', 'error');
    }
});

function showAlert(message) {
    Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: message,
    });
}
