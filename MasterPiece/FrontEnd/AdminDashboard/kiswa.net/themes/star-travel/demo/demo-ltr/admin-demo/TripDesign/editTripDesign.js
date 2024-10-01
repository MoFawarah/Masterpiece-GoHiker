


let tripDesingId = localStorage.getItem("tripDesingId");














let form = document.getElementById("editTripDesignForm");

form.addEventListener('submit', async function (e) {
    e.preventDefault(); 


    let formData = new FormData(); // Create a new FormData object
    formData.append("status", document.getElementById("status").value);
    formData.append("adminNote", document.getElementById("adminNote").value);
    formData.append("amountPaid", document.getElementById("amountPaid").value);
    


    try {
        let response = await fetch(`https://localhost:44360/api/TripDesign/UpdateTripDesign/${tripDesingId}`, {
            method: 'PUT',
            body: formData
        });
        if (response.ok) {
            // Show a success message
            Swal.fire({
                title: 'Success!',
                html: '<i class="fas fa-hiking" style="font-size: 2em; color: green;"></i><br>Path Updated!',
                icon: 'success', 
                
            });
        } else {
            // If there was an error
          
            Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: 'There was an issue updating the path. Please try again.',
            });
        }
    } catch (error) {
        
        Swal.fire({
            icon: 'error',
            title: 'Error!',
            text: 'An unexpected error occurred. Please try again later.',
        });
    }
});



document.getElementById('cancelButton').addEventListener('click', function () {
    
    window.location.href = "./tripDesign.html"; 
});
