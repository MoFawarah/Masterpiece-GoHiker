//getting all paths and shwoing them in the select


const reviewPathId = localStorage.getItem("reviewPathId")

fetch(`https://localhost:44360/api/Paths/GetPathById/${reviewPathId}`)
   .then(response => response.json())
   .then(data => {
        const pathToReview = document.getElementById('pathToReview');
        pathToReview.innerText = data.pathName;

        const pathItSelf = document.getElementById("pathItSelf")
        // pathItSelf.value =  path.pathId;
       
    })


   









    document.getElementById('pathReviewForm').addEventListener('submit', async function(e) {
        e.preventDefault();
        debugger
    
        const userId = localStorage.getItem('userId'); // Ensure this is actually fetching the userID correctly
        const pathId = reviewPathId;
        const rating = document.getElementById('rating').value;
        const comment = document.getElementById('comment').value;
    
        let formData = new FormData();
        if (userId) {
            formData.append("userId", userId);
        }
        formData.append("pathId", pathId);
        formData.append("rating", rating);
        formData.append("comment", comment);
    
        try {
            const response = await fetch('https://localhost:44360/api/PathReview/CreatePathReview', {
                method: "POST",
                body: formData,
            });
    
            if (response.ok) {
                Swal.fire('Success', 'Review submitted successfully!', 'success');
                document.getElementById('pathReviewForm').reset(); 
            } else {
               
                Swal.fire('Error', `Failed to submit the review`, 'error');
            }
        } catch (error) {
            Swal.fire('Error', 'An unexpected error occurred', 'error');
        }
    });
    