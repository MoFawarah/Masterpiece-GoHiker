document.addEventListener('DOMContentLoaded', function() {
    const authLinks = document.getElementById('authLinks');
    const userId = localStorage.getItem('userId');

    if (userId) {
        // User is logged in, show "My Account" and "Logout"
        authLinks.innerHTML = `
            <div class="dropdown">
                <a href="#" class="dropdown-toggle text-light" data-bs-toggle="dropdown"><small><i class="fa fa-home me-2"></i>Account</small></a>
                <div class="dropdown-menu rounded">
                    <a href="userProfile.html" class="dropdown-item"><i class="fas fa-user-alt me-2"></i> My Profile</a>
                    <a href="#" class="dropdown-item" id="logoutBtn"><i class="fas fa-power-off me-2"></i> Log Out</a>
                </div>
            </div>
        `;

        // Add event listener for logout
        document.getElementById('logoutBtn').addEventListener('click', function() {
            // Clear user data from localStorage
           localStorage.clear();

            // Redirect to homepage or login page
            window.location.href = 'index.html';
        });
    } else {
        // User is not logged in, show "Login" and "Register"
        authLinks.innerHTML = `
            <a href="signupPage.html"><small class="me-3 text-light"><i class="fa fa-user me-2"></i>Register</small></a>
            <a href="loginPage.html"><small class="me-3 text-light"><i class="fa fa-sign-in-alt me-2"></i>Login</small></a>
        `;
    }
});