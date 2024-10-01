userId = localStorage.getItem("userId")

let name = document.getElementById("name");
let email = document.getElementById("email");

let subject = document.getElementById("subject");

let message = document.getElementById("message");

let phoneNumber = document.getElementById("phoneNumber");


phoneNumber.value = localStorage.getItem("phoneNumber")

console.log(phoneNumber.value)

let form = document.getElementById("contactForm")

form.addEventListener("submit", async function(e){
e.preventDefault();

let url = "https://localhost:44360/api/ContactUs/CreateNewContact";

let formData = new FormData();

formData.append("name", name.value);

formData.append("email", email.value);

formData.append("subject", subject.value);

formData.append("message", message.value);

if (userId !== null && localStorage.getItem("phoneNumber") !== null)
{
    formData.append("phoneNumber", phoneNumber.value);

}
else {
    formData.append("phoneNumber", "N/A");
}


try {
    const response = await fetch(url, {
        method: "POST",
        body: formData,
    });

    if (response.ok) {
        Swal.fire('Success', 'Your Form submitted successfully!', 'success');
        form.reset(); 
    } else {
        Swal.fire('Error', 'Failed to submit the form. Please try again.', 'error');
    }
} catch (error) {
    Swal.fire('Error', 'An unexpected error occurred. Please try again later.', 'error');
}
});


