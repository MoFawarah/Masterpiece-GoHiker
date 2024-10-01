
document.getElementById('tourGuideCertification').addEventListener('change', function () {
    const file = this.files[0];
    const maxSize = 10 * 1024 * 1024; // 10MB

    if (file && file.size > maxSize) {
        Swal.fire({
            icon: 'error',
            title: 'File Too Large',
            text: 'File size must be less than 10MB.',
            confirmButtonText: 'OK',
            confirmButtonColor: '#13357b'
        });
        this.value = ''; // Clear the input
    }
});

document.getElementById('personalPhoto').addEventListener('change', function () {
    const file = this.files[0];
    const maxSize = 5 * 1024 * 1024; // 5MB

    if (file) {
        // Check if file is not an image
        if (!file.type.startsWith('image/')) {
            Swal.fire({
                icon: 'error',
                title: 'Invalid File Type',
                text: 'Please upload only image files (PNG, JPEG, etc.).',
                confirmButtonText: 'OK',
                confirmButtonColor: '#13357b'
            });
            this.value = ''; // Clear the input
            return;
        }

        // Check if file size is too large
        if (file.size > maxSize) {
            Swal.fire({
                icon: 'error',
                title: 'Image Too Large',
                text: 'Image size must be less than 5MB.',
                confirmButtonText: 'OK',
                confirmButtonColor: '#13357b'
            });
            this.value = ''; // Clear the input
            return;
        }
    }
});





// Listen for form submission
let applicationForm = document.getElementById("applicationForm");

applicationForm.addEventListener('submit', async function(e) {
    e.preventDefault();

    const formData = new FormData();
    
    const name = document.getElementById("name");
    const age = document.getElementById("age");
    const email = document.getElementById("email");
    const phoneNumber = document.getElementById("phone");
    const city = document.getElementById("city");
    const description = document.getElementById("experience");
    const rate = document.getElementById("rate");
    const personalPhoto = document.getElementById("personalPhoto");
    const tourGuideCertification = document.getElementById("tourGuideCertification");

    // Append form data
    formData.append("name", name.value);
    formData.append("age", age.value);
    formData.append("phoneNumber", phoneNumber.value);
    formData.append("email", email.value);
    formData.append("city", city.value);
    formData.append("description", description.value);
    formData.append("ratePerHour", rate.value);
    formData.append("age", age.value);

    if (tourGuideCertification.files.length > 0) {
        formData.append("guideImage", personalPhoto.files[0]);
    }

    if (personalPhoto.files.length > 0) {
        formData.append("licenseProof", tourGuideCertification.files[0]);
    }

    try {
        let response = await fetch(`https://localhost:44360/api/Guide/CreateGuideApplication`, {
            method: 'POST',
            body: formData
        });

        if (response.ok) {
            Swal.fire({
                icon: 'success',
                title: 'Application Submitted!',
                text: 'Your application has been submitted successfully.',
                confirm: true,
                confirmButtonColor: '#13357b',
            
            });
            
            applicationForm.reset(); 
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Submission Failed',
                text: 'There was a problem submitting your application. Please try again.',
                confirmButtonColor: '#d33',
            });
        }
    } catch (error) {
        Swal.fire({
            icon: 'error',
            title: 'Unexpected Error',
            text: 'An unexpected error occurred. Please try again later.',
            confirmButtonColor: '#d33',
        });
    }
});


    
    

   
    

