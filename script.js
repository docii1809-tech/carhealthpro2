// Replace this with YOUR actual Raw URL from GitHub
const DATA_URL = "https://raw.githubusercontent.com/username/repo/main/vehicles.json";

let vehicleData = {};

async function loadVehicleData() {
  try {
    const response = await fetch(DATA_URL);
    if (!response.ok) throw new Error("Failed to load data");
    
    vehicleData = await response.json();
    populateYears();
    console.log("Data loaded from GitHub!");
  } catch (error) {
    console.error("Error:", error);
    alert("Could not load car data. Please try again later.");
  }
}

function populateYears() {
  const yearSelect = document.getElementById("yearSelect");
  // Clear existing options except the first one
  yearSelect.innerHTML = '<option value="">Select Year</option>';
  
  Object.keys(vehicleData).sort((a,b) => b-a).forEach(year => {
    yearSelect.add(new Option(year, year));
  });
}

// ... (Rest of your dropdown logic goes here)

// Initialize the app
loadVehicleData();
