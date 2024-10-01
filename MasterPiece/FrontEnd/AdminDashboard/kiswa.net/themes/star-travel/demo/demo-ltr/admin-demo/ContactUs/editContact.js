

let contactId = localStorage.getItem("contactId");


    let form = document.getElementById("editContactForm");

    form.addEventListener('submit', async function (e) {
        e.preventDefault(); 

 
        const today = new Date();
        let responseDate = document.getElementById("adminResponseDate");
        responseDate.value = today.toISOString().split('T')[0];
        
        let formData = new FormData(); // Create a new FormData object
        formData.append("status", document.getElementById("status").value);
        formData.append("adminResponse", document.getElementById("adminResponse").value);
        formData.append("adminResponseDate", responseDate.value); // Directly use the formatted date
        


    try {
        let response = await fetch(`https://localhost:44360/api/ContactUs/EditContactById/${contactId}`, {
            method: 'PUT',
            body: formData
        });
        if (response.ok) {
   
            Swal.fire({
                title: 'Success!',
                html: '<i class="fas fa-address-book" style="font-size: 2em; color: green;"></i><br>Contact Updated!',
                icon: 'success', 
                
            });
        } else {
            // If there was an error
            let errorText = await response.text(); 
            Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: 'There was an issue updating the path. Please try again.',
                footer: errorText 
            });
        }
    } catch (error) {
        
        Swal.fire({
            icon: 'error',
            title: 'Error!',
            text: 'An unexpected error occurred. Please try again later.',
            footer: error.message 
        });
    }
});



document.getElementById('cancelButton').addEventListener('click', function () {
    
    window.location.href = "./contactUs.html"; 
});
