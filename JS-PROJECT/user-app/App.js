const registerForm = document.querySelector(".register-form");
const loginForm = document.querySelector(".login-form");

// Initial state: show login form, hide register form
loginForm.style.display = "flex";
registerForm.style.display = "none";

// Toggle functionality
const toggleToLogin = document.querySelector(".toggle-to-login");
const toggleToRegister = document.querySelector(".toggle-to-register");

toggleToLogin.addEventListener("click", () => {
    registerForm.style.display = "none";
    loginForm.style.display = "flex";
});

toggleToRegister.addEventListener("click", () => {
    loginForm.style.display = "none";
    registerForm.style.display = "flex";
});

// Function to check if a user exists
async function checkUserExistence(username) {
    try {
        let response = await fetch(`http://localhost:3000/users?username=${username}`);
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        let users = await response.json();
        return users.length ? users[0] : false;
    } catch (error) {
        console.error("Error fetching user data:", error);
        showToast("Could not verify user due to a server error.", "red");
        return null;
    }
}

// Form submission handler for register
registerForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    let formData = new FormData(e.target);
    let data = Object.fromEntries(formData.entries());

    if (!data.username || !data.password) {
        showToast("Username and password are required.", "red");
        return;
    }

    if (data.password !== data.repassword) {
        showToast("Passwords do not match.", "red");
        return;
    }

    let user = await checkUserExistence(data.username);
    if (user === false) {
        try {
            const response = await fetch("http://localhost:3000/users", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                showToast("Registration failed. Please try again.", "red");
                return;
            }

            showToast("Registration successful! Please log in.", "green");
            registerForm.reset();
            registerForm.style.display = "none";
            loginForm.style.display = "flex";
        } catch (error) {
            showToast("An error occurred during registration.", "red");
            console.error(error);
        }
    } else if (user) {
        showToast("Username already exists. Please choose another.", "red");
    }
});

// Form submission handler for login
loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    let formData = new FormData(e.target);
    let data = Object.fromEntries(formData.entries());

    if (!data.username || !data.password) {
        showToast("Username and password are required.", "red");
        return;
    }

    let user = await checkUserExistence(data.username);
    if (user && user.password === data.password) {
        loginForm.reset();
        window.location.href = "index.html";
        localStorage.setItem("loggedInUser", data.username);
    } else {
        showToast("Invalid username or password.", "red");
    }
});

// Toast function
function showToast(message, color) {
    Toastify({
        text: message,
        duration: 3000,
        close: true,
        gravity: "top",
        position: "center",
        style: {
            background: color,
            color: "white",
            fontSize: "16px",
            borderRadius: "8px",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        },
        stopOnFocus: true,
    }).showToast();
}
