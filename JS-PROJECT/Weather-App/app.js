const form = document.querySelector("form");
const cityInput = document.querySelector("input[type='text']");
const temperature = document.getElementById("temperature");
const cityName = document.getElementById("city-name");
const humidity = document.querySelector(".humidity");
const windSpeed = document.querySelector(".wind-speed");
const mainImage = document.getElementById("main-image");

form.addEventListener("submit", async (e) => {
	e.preventDefault();
	const city = cityInput.value;
	if (!city) {
		showToast("⚠️ Please enter a city name", "orange");
		return;
	}

	const apiKey = "690416a9d842d438a800ccac6717d0f0";
	const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

	try {
		const response = await fetch(url);
		if (!response.ok) throw new Error("❌ City not found");
		const data = await response.json();

		// Update UI with weather data
		temperature.textContent = `Temperature: ${data.main.temp}°C`;
		cityName.textContent = data.name;
		humidity.textContent = `${data.main.humidity}%`;
		windSpeed.textContent = `${data.wind.speed} km/h`;
		mainImage.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`;

		showToast("✅ Weather updated successfully!", "green");
	} catch (error) {
		showToast(error.message, "red");
	}
});


function showToast(message, color) {
	Toastify({
		text: message,
		duration: 3000,
		close: true,
		gravity: "top", 
		position: "center", 
		backgroundColor: color,
		stopOnFocus: true,
	}).showToast();
}





form.addEventListener("submit", (e) => {
	e.preventDefault();
	let formData = new FormData(form);
	let city = formData.get("city");
	if (!city) {
		alert("⚠️ Please enter a city name");
		return;
	}
});