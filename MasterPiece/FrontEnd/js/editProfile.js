let userId = localStorage.getItem("userId");

async function getUserData() {
    let url = `https://localhost:44360/api/Users/GetUserById/${userId}`;
    let response = await fetch(url);
    
    if (!response.ok) {
        console.error('Error fetching user data:', response.statusText);
        return;
    }

    let data = await response.json();

    // Populate the form with existing user data
    document.getElementById("name").value = data.name;
    document.getElementById("email").value = data.email;
    document.getElementById("phone").value = data.phoneNumber;
    document.getElementById("city").value = data.city;
}

async function updateUserData(event) {
    event.preventDefault();

    let formData = new FormData();
    formData.append("Name", document.getElementById("name").value);
    formData.append("Email", document.getElementById("email").value);
    formData.append("PhoneNumber", document.getElementById("phone").value);
    formData.append("City", document.getElementById("city").value);
    
    let imageFile = document.getElementById("imageFile").files[0];
    if (imageFile) {
        formData.append("ImageFileName", imageFile);
    }

    let url = `https://localhost:44360/api/Users/EditUser/${userId}`;
    let response = await fetch(url, {
        method: 'PUT',
        body: formData,
    });

    if (response.ok) {
        
        window.location.href = "userProfile.html"; // Redirect back to the main profile page
    } else {
        console.error('Error updating user data:', response.statusText);
        alert("Failed to update profile. Please try again.");
    }
}

// Set up event listeners
document.getElementById("edit-profile-form").addEventListener("submit", updateUserData);
window.onload = getUserData;
