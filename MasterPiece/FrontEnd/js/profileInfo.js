let userId = localStorage.getItem("userId");

async function getUser() {
    let url = `https://localhost:44360/api/Users/GetUserById/${userId}`;
    let response = await fetch(url);
    
    if (!response.ok) {
        console.error('Error fetching user data:', response.statusText);
        return;
    }

    let data = await response.json();

    // Create profile layout
    const profileContainer = document.getElementById("profile-container");

    profileContainer.innerHTML = `
        <div class="row justify-content-center w-100">
            <div class="col-lg-4">
                <div class="details card mb-4">
                    <div class="card-body text-center">
                        <img src="${data.imageFileName ? `../../FrontEnd/Uploads/${data.imageFileName}` : 'https://via.placeholder.com/150'}" alt="avatar" class="rounded-circle img-fluid" style="width: 150px;">
                        <h5 class="my-3 name">${data.name}</h5>
                        <p class="text-muted mb-1 email">${data.email}</p>
                        <p class="text-muted mb-4 city">${data.city}</p>
                        <div class="d-flex justify-content-center mb-2">
                            <button type="button" class="btn btn-primary" onclick="window.location.href='edit-profile.html'">Edit Profile</button>
                            <button type="button" class="btn btn-outline-primary ms-1" data-bs-toggle="modal" data-bs-target="#changePasswordModal">Change Password</button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-lg-8">
                <div class="card mb-4">
                    <div class="card-body">
                        <div class="row">
                            <div class="col-sm-3">
                                <p class="mb-0">Full Name</p>
                            </div>
                            <div class="col-sm-9">
                                <p class="text-muted mb-0 name">${data.name}</p>
                            </div>
                        </div>
                        <hr>
                        <div class="row">
                            <div class="col-sm-3">
                                <p class="mb-0">Email</p>
                            </div>
                            <div class="col-sm-9">
                                <p class="text-muted mb-0 email">${data.email}</p>
                            </div>
                        </div>
                        <hr>
                        <div class="row">
                            <div class="col-sm-3">
                                <p class="mb-0">Phone</p>
                            </div>
                            <div class="col-sm-9">
                                <p id="phone" class="text-muted mb-0">${data.phoneNumber}</p>
                            </div>
                        </div>
                        <hr>
                        <div class="row">
                            <div class="col-sm-3">
                                <p class="mb-0">City</p>
                            </div>
                            <div class="col-sm-9">
                                <p class="text-muted mb-0 city">${data.city}</p>
                            </div>
                        </div>
                        <hr>
                        <div class="d-flex justify-content-center">
                            <button type="button" class="btn btn-primary" onclick="window.location.href='/FrontEnd/orderHistory.html'">Order History</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

getUser();


// Handle change password form submission
document.getElementById('changePasswordForm').addEventListener('submit', async function (e) {
    debugger
    e.preventDefault();
    const oldPassword = document.getElementById('oldPassword').value;
    const newPassword = document.getElementById('newPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const errorMessage = document.getElementById('error-message');

   

    if (!oldPassword)
    {
        errorMessage.innerText = 'Old password is required.';
        errorMessage.style.display = 'block';
        return;
    }

    // Validate passwords
    if (newPassword !== confirmPassword) {
        errorMessage.innerText = 'Passwords do not match.';
        errorMessage.style.display = 'block';
        return;
    }

    if (newPassword.length < 6 || oldPassword.length < 6) { 
        errorMessage.innerText = 'Password must be at least 6 characters long.';
        errorMessage.style.display = 'block';
        return;
    }

    // Clear any previous error messages
    errorMessage.style.display = 'none';

    // Prepare the form data for API
    const formData = new FormData();
    formData.append('NewPassword', newPassword);
    formData.append('OldPassword', oldPassword);

    try {
        const response = await fetch(`https://localhost:44360/api/Users/EditPasswordByUserId/${userId}`, {
            method: 'PUT',
            body: formData
        });
   

        if (response.ok) {

            Swal.fire({
                icon: 'success',
                title: 'Password Updated',
                text: 'We updated your password.',
                confirmButtonColor: '#13357b',

            })
           
          
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Something Wrong',
                text: 'Old password is not correct',
                confirmButtonColor: '#13357b',

            })
        }
    } catch (error) {
        wal.fire({
            icon: 'error',
            title: 'Something Wrong',
            text: 'Plz Try Again Later',
            confirmButtonColor: '#13357b',

        })
    }
});
