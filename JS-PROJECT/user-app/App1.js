document.addEventListener("DOMContentLoaded", () => {
    const loggedInUser = localStorage.getItem("loggedInUser");

    const userGreeting = document.querySelector(".user-greeting");
    const usernameDisplay = document.getElementById("username-display");
    const loginButton = document.getElementById("login-button");
    const logoutButton = document.getElementById("logout-button");

    if (loggedInUser) {
        // Show greeting and logout
        userGreeting.style.display = "block";
        usernameDisplay.innerText = loggedInUser;
        loginButton.style.display = "none";
        logoutButton.style.display = "flex";
        showToast("Welcome back, " + loggedInUser + "!", "#4CAF50");
    } else {
        // Show login, hide greeting and logout
        userGreeting.style.display = "none";
        loginButton.style.display = "flex";
        logoutButton.style.display = "none";
        showToast("Please log in to continue.", "#2196F3");
    }

    // Logout functionality
    logoutButton.addEventListener("click", () => {
        localStorage.removeItem("loggedInUser");
        showToast("You have been logged out!", "#f44336");
        window.location.reload();
    });
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
