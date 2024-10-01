


// Function to populate the dropdown with available paths
async function populatePathDropdown() {
    try {
        let response = await fetch('https://localhost:44360/api/Paths/GetAllPathsNoPagination');
        if (response.ok) {
            let paths = await response.json();
            let pathDropdown = document.getElementById("pathId");
            
            paths.forEach(path => {
                let option = document.createElement("option");
                option.value = path.pathId; // Use the actual path ID
                option.text = path.pathName; // Display the path name
                pathDropdown.appendChild(option);
            });
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: 'Failed to load available paths.',
            });
        }
    } catch (error) {
        Swal.fire({
            icon: 'error',
            title: 'Error!',
            text: 'An unexpected error occurred while fetching paths.',
            footer: error.message
        });
    }
}

// Call the function to populate the dropdown when the page loads
populatePathDropdown();










let form = document.getElementById("editPathForm");

form.addEventListener('submit', async function (e) {
    e.preventDefault(); 

    let formData = new FormData(); // Create a new FormData object
    formData.append("gatheringPlace", document.getElementById("gatherPlace").value);
    formData.append("departureTime", document.getElementById("departure").value);
    formData.append("duration", document.getElementById("duration").value);
    formData.append("distance", document.getElementById("distance").value);
    formData.append("pathId", document.getElementById("pathId").value); // Append selected pathId

    // Append the image only if a new one is selected
    let fileInput = document.getElementById("roadMapImage");
    if (fileInput.files.length > 0) {
        formData.append("roadmapImage", fileInput.files[0]);
    }

    try {
        let response = await fetch(`https://localhost:44360/api/PathInfo/CreateNewPathInfo`, {
            method: 'POST',
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
