  // Regular expressions for validations
var regName = /^[a-zA-Z]+ [a-zA-Z]+$/;
var regEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
var regPhoneNumber = /^(?:\+962|00962|962|0)?(7[5-9][0-9]{7}|6[0-9]{7})$/;

// Validate Full Name
function validateName() {
    var name = document.getElementById('name').value.trim();
    if (!regName.test(name)) {
        document.getElementById('nameErrorMsg').innerText = "Please enter a valid full name.";
    } else {
        document.getElementById('nameErrorMsg').innerText = "";
    }
}

// Validate Email
function validateEmail() {
    var email = document.getElementById('email').value.trim();
    if (!regEmail.test(email)) {
        document.getElementById('emailErrorMsg').innerText = "Please enter a valid email address.";
    } else {
        document.getElementById('emailErrorMsg').innerText = "";
    }
}

// Validate Phone Number
function validatePhoneNumber() {
    var phoneNumber = document.getElementById('phoneNumber').value.trim();
    if (!regPhoneNumber.test(phoneNumber)) {
        document.getElementById('phoneErrorMsg').innerText = "Please enter a valid phone number.";
    } else {
        document.getElementById('phoneErrorMsg').innerText = "";
    }
}

// Validate Password
function validatePassword() {
    var password = document.getElementById('password').value.trim();
    if (password.length < 6) {
        document.getElementById('passwordErrorMsg').innerText = "Password must be at least 6 characters.";
    } else {
        document.getElementById('passwordErrorMsg').innerText = "";
    }
}

// Validate Repeat Password
function validateRepeatPassword() {
    var password = document.getElementById('password').value.trim();
    var repeatPassword = document.getElementById('repeatPassword').value.trim();
    if (password !== repeatPassword) {
        document.getElementById('repeatPasswordErrorMsg').innerText = "Passwords do not match.";
    } else {
        document.getElementById('repeatPasswordErrorMsg').innerText = "";
    }
}

// Validate and Submit the form
async function validateAndSubmit() {
    var valid = true;

    validateName();
    validateEmail();
    validatePhoneNumber();
    validatePassword();
    validateRepeatPassword();

    // Check if there are any validation errors
    if (document.getElementById('nameErrorMsg').innerText !== "" ||
        document.getElementById('emailErrorMsg').innerText !== "" ||
        document.getElementById('phoneErrorMsg').innerText !== "" ||
        document.getElementById('passwordErrorMsg').innerText !== "" ||
        document.getElementById('repeatPasswordErrorMsg').innerText !== "") {
        valid = false;
    }

    // If the form is valid, check for duplicate email/phone and submit
    if (valid) {
        const isUnique = await CheckEmailAndPhone();
        const form = document.getElementById("registerForm")
        if (isUnique) {
            Swal.fire({
                title: 'Success!',
                html: '<i class="fas fa-hiking" style="font-size: 2em; color: green;"></i><br>Registration successful!',
                icon: 'success', 
                confirmButtonText: 'OK'
            });
            form.reset(); 
            

        }
    } else {
        Swal.fire({
            title: 'Error!',
            text: 'Please correct the errors and try again.',
            icon: 'error',
            confirmButtonText: 'OK'
        });
    }
}

// Check for duplicate email and phone number using forEach
async function CheckEmailAndPhone() {
    const email = document.getElementById("email").value.trim();
    const phoneNumber = document.getElementById("phoneNumber").value.trim();
    
    const response = await fetch("https://localhost:44360/api/Users/GetAllUsers");
    const data = await response.json();

    let isDuplicate = false;

    data.forEach(element => {
        if (element.email === email || element.phoneNumber === phoneNumber) {
            Swal.fire({
                title: 'Error!',
                text: 'Email or Phone number already exists.',
                icon: 'error',
                confirmButtonText: 'OK'
            });
            isDuplicate = true;
        }
    });

    if (isDuplicate) {
        return false;
    } else {
        await NewRegisteration(); // Proceed with registration if unique
        return true;
    }
}

// Submit registration
async function NewRegisteration() {
    let formData = new FormData();
    let name = document.getElementById("name").value.trim();
    let email = document.getElementById("email").value.trim();
    let password = document.getElementById("password").value.trim();
    let phoneNumber = document.getElementById("phoneNumber").value.trim();

    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("phoneNumber", phoneNumber);

    let response = await fetch("https://localhost:44360/api/Users/Register", {
        method: "POST",
        body: formData
    });
}