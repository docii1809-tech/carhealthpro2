// PASTE YOUR RAW GITHUB URL BETWEEN THE QUOTES BELOW
const DATA_URL = "https://raw.githubusercontent.com/username/repo/main/vehicles.json";

let vehicleData = {};

// DOM Elements
const yearSelect = document.getElementById("yearSelect");
const makeSelect = document.getElementById("makeSelect");
const modelSelect = document.getElementById("modelSelect");
const results = document.getElementById("results");
const carImage = document.getElementById("carImage");
const fuseInfo = document.getElementById("fuseInfo");
const fuseGrid = document.getElementById("fuseGrid");

// 1. Load Data from GitHub
async function loadVehicleData() {
  try {
    const response = await fetch(DATA_URL);
    if (!response.ok) throw new Error("Network response was not ok");
    vehicleData = await response.json();
    populateYears();
  } catch (error) {
    console.error("Error loading JSON:", error);
    alert("Check the console - there's an issue with the GitHub URL.");
  }
}

// 2. Populate Dropdowns
function populateYears() {
  Object.keys(vehicleData).sort((a,b) => b-a).forEach(year => {
    yearSelect.add(new Option(year, year));
  });
}

yearSelect.addEventListener("change", () => {
  makeSelect.innerHTML = '<option value="">Select Make</option>';
  modelSelect.innerHTML = '<option value="">Select Model</option>';
  modelSelect.disabled = true;
  results.style.display = "none";

  if (yearSelect.value) {
    Object.keys(vehicleData[yearSelect.value]).forEach(make => {
      makeSelect.add(new Option(make, make));
    });
    makeSelect.disabled = false;
  }
});

makeSelect.addEventListener("change", () => {
  modelSelect.innerHTML = '<option value="">Select Model</option>';
  if (makeSelect.value) {
    Object.keys(vehicleData[yearSelect.value][makeSelect.value]).forEach(model => {
      modelSelect.add(new Option(model, model));
    });
    modelSelect.disabled = false;
  }
});

modelSelect.addEventListener("change", () => {
  const data = vehicleData[yearSelect.value][makeSelect.value][modelSelect.value];
  if (data) {
    carImage.src = data.image;
    fuseInfo.textContent = data.info;
    fuseGrid.innerHTML = data.grid.map(f => `<div>${f}</div>`).join('');
    results.style.display = "block";
  }
});

// 3. PDF Export
document.getElementById("pdfBtn").addEventListener("click", () => {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();
  doc.text(`Fuse Layout: ${yearSelect.value} ${makeSelect.value} ${modelSelect.value}`, 10, 10);
  doc.text(fuseInfo.textContent, 10, 20);
  doc.save("fuse-layout.pdf");
});

// Start the app
loadVehicleData();
