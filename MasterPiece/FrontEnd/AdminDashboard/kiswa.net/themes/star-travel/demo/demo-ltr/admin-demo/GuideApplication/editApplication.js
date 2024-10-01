
const guideAppId = localStorage.getItem("guideAppId")









async function FillDataDynamically() {
    let url =  `https://localhost:44360/api/Guide/GetApplicationById/${guideAppId}`;
    let response = await fetch(url);
    let data = await response.json();

    
    if (data.adminNote == null)
        {
            data.adminNote = "No note provided";
        }
    
    document.getElementById("adminNote").value = data.adminNote;


     document.querySelector(`#status option[value="${data.status}"]`).selected = true;
    
   //get image value from data
    


      
}

FillDataDynamically();




let form = document.getElementById("editForm");

form.addEventListener('submit', async function (e) {
    e.preventDefault(); 


    let formData = new FormData(); // Create a new FormData object
    formData.append("status", document.getElementById("status").value);
    formData.append("adminNote", document.getElementById("adminNote").value);
   

    try {
        let response = await fetch(`https://localhost:44360/api/Guide/UpdateGuideApplication/${guideAppId}`, {
            method: 'PUT',
            body: formData
        });
        if (response.ok) {
            // Show a success message
            Swal.fire({
                title: 'Success!',
                html: '<i class="fas fa-hiking" style="font-size: 2em; color: green;"></i><br>Application Updated!',
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
    
    window.location.href = "./guideApplication.html"; 
});
