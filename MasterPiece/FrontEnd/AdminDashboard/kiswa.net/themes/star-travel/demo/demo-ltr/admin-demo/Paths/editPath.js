

let pathId = localStorage.getItem("pathId");




async function FillDataDynamically() {
    let url =  `https://localhost:44360/api/Paths/GetPathById/${pathId}`;
    let response = await fetch(url);
    let data = await response.json();
    
    document.getElementById("pathName").value = data.pathName;
    document.getElementById("pathCity").value = data.city;
    document.getElementById("pathStartDate").value =  data.startDate.split('T')[0];
    document.getElementById("pathEndDate").value = data.endDate.split('T')[0];
    document.getElementById("pathDifficulty").value = data.difficulty;;
    document.getElementById("pathPricePerson").value = data.pricePerPerson;
    document.getElementById("pathCapacity").value = data.capacity;
    document.getElementById("pathDescription").value = data.description;
    document.getElementById("pathStatus").value = data.status;

     document.querySelector(`#pathStatus option[value="${data.status}"]`).selected = true;
     document.querySelector(`#pathDifficulty option[value="${data.difficulty}"]`).selected = true;
    
   //get image value from data
    


      
}

FillDataDynamically();



document.getElementById('pathStartDate').setAttribute('min', new Date().toISOString().split('T')[0]);
document.getElementById('pathEndDate').setAttribute('min', new Date().toISOString().split('T')[0]);




let form = document.getElementById("editPathForm");

form.addEventListener('submit', async function (e) {
    e.preventDefault(); 

    const startDate = new Date(document.getElementById("pathStartDate").value);
    const endDate = new Date(document.getElementById("pathEndDate").value);
    const today = new Date();

    if (startDate >= endDate) {
        Swal.fire({
            icon: 'error',
            title: 'Invalid Date Range!',
            text: 'The start date must be before the end date.',
        });
        return;
    }








    let formData = new FormData(); // Create a new FormData object
    formData.append("pathName", document.getElementById("pathName").value);
    formData.append("city", document.getElementById("pathCity").value);
    formData.append("startDate", document.getElementById("pathStartDate").value);
    formData.append("endDate", document.getElementById("pathEndDate").value);
    formData.append("difficulty", document.getElementById("pathDifficulty").value);
    formData.append("pricePerPerson", document.getElementById("pathPricePerson").value);
    formData.append("capacity", document.getElementById("pathCapacity").value);
    formData.append("description", document.getElementById("pathDescription").value);
    formData.append("status", document.getElementById("pathStatus").value); // Append the file

    // Append the image only if a new one is selected
    let fileInput = document.getElementById("pathImage");
    if (fileInput.files.length > 0) {
        formData.append("pathImage", fileInput.files[0]);
    }

    try {
        let response = await fetch(`https://localhost:44360/api/Paths/UpdatePath/${pathId}`, {
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
    
    window.location.href = "./paths.html"; 
});
