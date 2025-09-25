let form = document.querySelector(".form-data");
let username = document.querySelector("#username");
let article = document.querySelector("#result");

form.addEventListener("submit", (e) => {
    e.preventDefault();
    let userValue = username.value;
    fetchData(userValue);
});

async function fetchData(user) {
    try {
        let data = await window.fetch(`https://api.github.com/users/${user}`);
        let { name, login, avatar_url, html_url, location, company, id } = await data.json();
        article.style.display = "block";
        article.innerHTML = `
            <img src="${avatar_url}" alt="${name}" />
            <h2>Name : ${name}</h2>
            <h2>Username : ${login}</h2>
            <p>Location : ${location || "N/A"}</p>
            <p>Company : ${company || "N/A"}</p>
            <p>ID : ${id || "N/A"}</p>
            <a href="${html_url}" target="_blank">Profile</a>
        `; 
    } catch (error) {
        article.innerHTML = `<p>User not found</p>`;
    }
}