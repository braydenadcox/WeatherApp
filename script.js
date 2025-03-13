import CONFIG from './config.js';

let weatherTown = "";
let blank = "";

async function getData() {
  weatherTown = document.getElementById('inputField').value;

  try {
    const response = await fetch(`http://api.weatherapi.com/v1/current.json?key=${encodeURIComponent(CONFIG.API_KEY)}&q=${encodeURIComponent(weatherTown)}`, { mode: "cors" });

    if (!response.ok) {
      throw new Error("Invalid input. Please try again.");
    }

    const data = await response.json();
    console.log(data);

    document.querySelector('#area').textContent = `${data.location.name}, ${data.location.country}`;
    document.querySelector('#temp').textContent = `Temperature: ${data.current.temp_f}, feels like ${data.current.feelslike_f}`;
    document.querySelector('#weather').textContent = `Current weather: ${data.current.condition.text}`;
    
  } catch (error) {
    console.error(error.message);
    document.querySelector('#area').textContent = "Invalid input. Please try again.";
    document.querySelector('#temp').textContent = blank;
    document.querySelector('#weather').textContent = blank;
  }
}
