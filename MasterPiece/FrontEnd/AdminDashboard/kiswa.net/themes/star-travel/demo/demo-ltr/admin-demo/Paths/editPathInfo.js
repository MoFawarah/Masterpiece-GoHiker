

let pathInfoId = localStorage.getItem("pathInfoId");




async function FillDataDynamically() {
    let url =  `https://localhost:44360/api/PathInfo/GetPathInfoById/${pathInfoId}`;
    let response = await fetch(url);
    let data = await response.json();
    
    document.getElementById("gatherPlace").value = data.gatheringPlace;
    document.getElementById("departure").value = data.departureTime;
    document.getElementById("duration").value = data.duration;
    document.getElementById("distance").value = data.distance;

    


      
}

FillDataDynamically();






let form = document.getElementById("editPathForm");

form.addEventListener('submit', async function (e) {
    e.preventDefault(); 

  







    let formData = new FormData(); // Create a new FormData object
    formData.append("gatheringPlace", document.getElementById("gatherPlace").value);
    formData.append("departureTime", document.getElementById("departure").value);
    formData.append("duration", document.getElementById("duration").value);
    formData.append("distance", document.getElementById("distance").value);
   

    // Append the image only if a new one is selected
    let fileInput = document.getElementById("roadMapImage");
    if (fileInput.files.length > 0) {
        formData.append("roadmapImage", fileInput.files[0]);
    }

    try {
        let response = await fetch(`https://localhost:44360/api/PathInfo/UpdatePathInfoById/${pathInfoId}`, {
            method: 'PUT',
            body: formData
        });
        if (response.ok) {
            // Show a success message
            Swal.fire({
                title: 'Success!',
                html: '<i class="fas fa-hiking" style="font-size: 2em; color: green;"></i><br>Path Info Updated!',
                icon: 'success', 
                
            });
        } else {
            // If there was an error
            let errorText = await response.text(); 
            Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: 'There was an issue updating the path info. Please try again.',
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
    
    window.location.href = "./pathInfo.html"; 
});
