document.addEventListener('DOMContentLoaded', () => {
    const loginPopup = document.getElementById('login-popup');
    const closePopupBtn = document.getElementById('close-popup-btn');
    const popupLoginForm = document.getElementById('popup-login-form');

    const updateNavBar = () => {
        const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
        const loginNavItem = document.querySelector('.nav-item a[href="login_page.html"]').parentElement;

        if (isLoggedIn) {
            // Hide login link
            loginNavItem.style.display = 'none';

            // Optionally, add a "Logout" link
            if (!document.querySelector('.nav-item.logout')) {
                const logoutNavItem = document.createElement('li');
                logoutNavItem.classList.add('nav-item', 'logout');
                logoutNavItem.innerHTML = `<a class="nav-link" href="#">Logout</a>`;
                document.querySelector('.navbar-nav').appendChild(logoutNavItem);

                // Add logout functionality
                logoutNavItem.addEventListener('click', () => {
                    localStorage.removeItem('isLoggedIn');
                    alert('You have been logged out.');
                    location.reload(); // Reload the page to reset navbar
                });
            }
        } else {
            // Ensure login link is visible
            loginNavItem.style.display = 'block';

            // Remove logout link if present
            const logoutNavItem = document.querySelector('.nav-item.logout');
            if (logoutNavItem) logoutNavItem.remove();
        }
    };

    // Show the login pop-up
    const showPopup = () => {
        loginPopup.classList.remove('hidden');
        loginPopup.classList.add('visible');
    };

    // Hide the login pop-up
    const hidePopup = () => {
        loginPopup.classList.remove('visible');
        loginPopup.classList.add('hidden');
    };

    // Handle login form submission
    popupLoginForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const email = document.getElementById('popup-email').value.trim();
        const password = document.getElementById('popup-password').value.trim();

        const accounts = JSON.parse(localStorage.getItem('accounts')) || [];
        const account = accounts.find((acc) => acc.email === email && acc.password === password);

        if (account) {
            alert('Login successful!');
            localStorage.setItem('isLoggedIn', 'true'); // Save login state
            hidePopup();
            updateNavBar(); // Update navbar to reflect login state
        } else {
            alert('No account found. Redirecting to sign-up...');
            window.location.href = 'signup_page.html';
        }
    });

    // Close pop-up on button click
    closePopupBtn.addEventListener('click', hidePopup);

    // Trigger pop-up (simulate login click for demo)
    document.querySelector('.nav-item a[href="login_page.html"]').addEventListener('click', (event) => {
        event.preventDefault(); // Prevent default link action
        showPopup();
    });

    // Initialize navbar based on login state
    updateNavBar();
});
