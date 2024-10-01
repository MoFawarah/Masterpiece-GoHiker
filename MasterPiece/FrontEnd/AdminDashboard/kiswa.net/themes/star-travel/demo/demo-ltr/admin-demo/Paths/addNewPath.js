document.getElementById('pathStartDate').setAttribute('min', new Date().toISOString().split('T')[0]);
document.getElementById('pathEndDate').setAttribute('min', new Date().toISOString().split('T')[0]);

let form = document.getElementById("newPathForm");

form.addEventListener('submit', async function (e) {
    // Prevent the form from submitting
    e.preventDefault();

    const startDate = new Date(document.getElementById("pathStartDate").value);
    const endDate = new Date(document.getElementById("pathEndDate").value);

    // Check for valid date range
    if (startDate >= endDate) {
        Swal.fire({
            icon: 'error',
            title: 'Invalid Date Range!',
            text: 'The end date must be greater than the start date.',
        }).then((result) => {
            if (result.isConfirmed) {
                document.getElementById("pathStartDate").focus();
            }
        });
        return;
    }

    // Collect form data
    let formData = new FormData();
    formData.append("pathName", document.getElementById("pathName").value);
    formData.append("city", document.getElementById("pathCity").value);
    formData.append("startDate", document.getElementById("pathStartDate").value);
    formData.append("endDate", document.getElementById("pathEndDate").value);
    formData.append("difficulty", document.getElementById("pathDifficulty").value);
    formData.append("pricePerPerson", document.getElementById("pathPricePerson").value);
    formData.append("capacity", document.getElementById("pathCapacity").value);
    formData.append("description", document.getElementById("pathDescription").value);
    formData.append("status", document.getElementById("pathStatus").value);

    // Append the image if selected
    let fileInput = document.getElementById("pathImage");
    if (fileInput.files.length > 0) {
        formData.append("pathImage", fileInput.files[0]);
    }

    try {
        let response = await fetch("https://localhost:44360/api/Paths/CreateNewPath", {
            method: 'POST',
            body: formData
        });

        if (response.ok) {
            // Show success SweetAlert and wait for user confirmation
            Swal.fire({
                title: 'Success!',
                html: '<i class="fas fa-hiking" style="font-size: 2em; color: green;"></i><br>Path Created Successfully!',
                icon: 'success',
                confirmButtonText: 'OK'
            }).then((result) => {
                if (result.isConfirmed) {
                    // Redirect to paths page after confirmation
                    window.location.href = "./paths.html";
                }
            });
        } else {
            // Handle server-side error
            let errorText = await response.text();
            Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: 'There was an issue creating the path. Please try again.',
                footer: errorText
            });
        }
    } catch (error) {
        // Handle unexpected errors
        Swal.fire({
            icon: 'error',
            title: 'Error!',
            text: 'An unexpected error occurred. Please try again later.',
            footer: error.message
        });
    }
});

// Cancel button to redirect without submission
document.getElementById('cancelButton').addEventListener('click', function () {
    window.location.href = "./paths.html"; 
});
