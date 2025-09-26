// Fetch and Display Data

let tableBody = document.getElementById("table-body");

function fetchData() {
    fetch("http://localhost:3000/users")
        .then((response) => response.json())
        .then((data) => {
            tableBody.innerHTML = "";
            data.forEach((user) => {
                let row = document.createElement("tr");
                row.innerHTML = `
                    <td>${user.id}</td>
                    <td>${user.name}</td>
                    <td>${user.email}</td>
                    <td>${user.phone}</td>
                    <td>
                        <button class="view-btn" data-id="${user.id}">View</button>
                        <button class="edit-btn" data-id="${user.id}">Edit</button>
                        <button class="delete-btn" data-id="${user.id}">Delete</button>
                    </td>
                `;
                tableBody.appendChild(row);
            });
        })
        .catch((error) => console.error("Error fetching data:", error));
}
fetchData();

// Add User Functionality

let addUserBtn = document.getElementById("add-user");

addUserBtn.addEventListener("click", () => {
    document.querySelector(".add-data-container").style.display = "flex";
});

let addUserForm = document.getElementById("add-user-form");
let cancelBtn = document.getElementById("cancel-btn");

cancelBtn.addEventListener("click", () => {
    document.querySelector(".add-data-container").style.display = "none";
});

addUserForm.addEventListener("submit", (e) => {
    e.preventDefault();

    let formData = new FormData(addUserForm);
    let user = {
        name: formData.get("name"),
        email: formData.get("email"),
        phone: formData.get("phone"),
    };

    fetch("http://localhost:3000/users", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
    })
        .then((response) => response.json())
        .then((data) => {
            console.log("User added:", data);
            document.querySelector(".add-data-container").style.display = "none";
            addUserForm.reset();
        })
        .catch((error) => console.error("Error adding user:", error));
});


// Update user functionality

tableBody.addEventListener("click", (e) => {
    if (e.target.classList.contains("edit-btn")) {
        let userId = e.target.getAttribute("data-id");
        fetch(`http://localhost:3000/users/${userId}`)
            .then((response) => response.json())
            .then((user) => {
                document.getElementById("update-id").value = user.id;
                document.getElementById("update-name").value = user.name;
                document.getElementById("update-email").value = user.email;
                document.getElementById("update-phone").value = user.phone;
                document.querySelector(".update-data-container").style.display = "flex";
            })
            .catch((error) => console.error("Error fetching user details:", error));
    }
});

let updateUserForm = document.getElementById("update-user-form");
let updateCancelBtn = document.getElementById("update-cancel-btn"); 
updateCancelBtn.addEventListener("click", () => {
    document.querySelector(".update-data-container").style.display = "none";
});

updateUserForm.addEventListener("submit", (e) => {
    e.preventDefault();

    let formData = new FormData(updateUserForm);
    let user = {
        id: formData.get("id"),
        name: formData.get("name"),
        email: formData.get("email"),
        phone: formData.get("phone"),
    };

    fetch(`http://localhost:3000/users/${user.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
    })
        .then((response) => response.json())
        .then((data) => {
            console.log("User updated:", data);
            document.querySelector(".update-data-container").style.display = "none";
            updateUserForm.reset();
        })
        .catch((error) => console.error("Error updating user:", error));
});
// Delete user functionality
tableBody.addEventListener("click", (e) => {
    if (e.target.classList.contains("delete-btn")) {
        let userId = e.target.getAttribute("data-id");
        fetch(`http://localhost:3000/users/${userId}`, {
            method: "DELETE",
        })
            .then((response) => response.json())
            .then((data) => {
                console.log("User deleted:", data);
                fetchData(); // Refresh the user list
            })
            .catch((error) => console.error("Error deleting user:", error));
    }
});