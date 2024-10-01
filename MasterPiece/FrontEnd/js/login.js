// Regular expressions for validations
var regPhoneNumber = /^(?:\+962|00962|962|0)?(7[5-9][0-9]{7}|6[0-9]{7})$/;

// Attach the event listener to the form
let form = document.getElementById("LoginForm");
form.addEventListener('submit', validateAndLogin);

// Function to validate phone number
function validatePhoneNumber() {
    var phoneNumber = document.getElementById('phoneNumber').value.trim();
    if (!regPhoneNumber.test(phoneNumber)) {
        document.getElementById('phoneErrorMsg').innerText = "Please enter a valid phone number.";
        return false;
    } else {
        document.getElementById('phoneErrorMsg').innerText = "";
        return true;
    }
}

// Function to validate password
function validatePassword() {
    var password = document.getElementById('password').value.trim();
    if (password.length < 6) {
        document.getElementById('passwordErrorMsg').innerText = "Password must be at least 6 characters.";
        return false;
    } else {
        document.getElementById('passwordErrorMsg').innerText = "";
        return true;
    }
}

// Function to validate the login form and handle login submission
async function validateAndLogin(e) {
    e.preventDefault(); // Prevent the form from submitting automatically

    // Validate both fields
    let isPhoneValid = validatePhoneNumber();
    let isPasswordValid = validatePassword();

    // If form validation fails, stop the process
    if (!isPhoneValid || !isPasswordValid) return;

    // If the form is valid, proceed with the login request
    let formData = new FormData();
    formData.append("phoneNumber", document.getElementById('phoneNumber').value.trim());
    formData.append("password", document.getElementById('password').value.trim());

    localStorage.setItem("phoneNumber", document.getElementById('phoneNumber').value.trim() )

    try {
        let response = await fetch("https://localhost:44360/api/Users/Login", {
            method: 'POST',
            body: formData
        });

        // Check if the response status is 401 (Unauthorized)
        if (response.status === 401) {
            Swal.fire({
                icon: 'error',
                title: 'Try Again!',
                text: 'The phone number or password is incorrect. Please try again.',
                timer: 2000
            });
            return;
        }

        // Handle other potential errors (e.g., server error)
        if (!response.ok) {
            Swal.fire({
                icon: 'error',
                title: 'Login failed!',
                text: 'Something went wrong. Please try again later.',
                timer: 2000
            });
            return;
        }

        // If the response is OK, proceed with login
        let result = await response.json();
        localStorage.setItem("token", result.token);
        localStorage.setItem("userId", result.userId) // Store the token if login is successful
        Swal.fire({
            title: 'Success!',
                html: '<i class="fas fa-hiking" style="font-size: 2em; color: green;"></i><br>Registration successful!',
                icon: 'success', // The 'icon' parameter can still be used for the built-in SweetAlert icons, but we are using 'html' to include the FontAwesome icon.
                confirmButtonText: 'OK',
                timer: 1500
        });

        // Optional: Redirect to another page after a short delay
        setTimeout(() => {
            window.location.href = "../../FrontEnd/index.html";
        }, 1500);

    } catch (error) {
        console.error("Error during login:", error);
        Swal.fire({
            icon: 'error',
            title: 'Something went wrong!',
            text: 'Please try again later.',
            timer: 2000
        });
    }
}
