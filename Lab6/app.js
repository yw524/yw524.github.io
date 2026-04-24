const API_BASE = "https://api.sunrisesunset.io/json";

// Preset cities with a mix of hemispheres, time zones, and latitudes to show a variety of results. 
const LOCATIONS = [
  { label: "Beijing, China", lat: 39.9042, lng: 116.4074 },
  { label: "Chicago, USA", lat: 41.8781, lng: -87.6298 },
  { label: "New York City, USA", lat: 40.7128, lng: -74.006 },
  { label: "Los Angeles, USA", lat: 34.0522, lng: -118.2437 },
  { label: "London, UK", lat: 51.5072, lng: -0.1276 },
  { label: "Paris, France", lat: 48.8566, lng: 2.3522 },
  { label: "Tokyo, Japan", lat: 35.6762, lng: 139.6503 },
  { label: "Sydney, Australia", lat: -33.8688, lng: 151.2093 },
  { label: "Nairobi, Kenya", lat: -1.2921, lng: 36.8219 },
  { label: "Rio de Janeiro, Brazil", lat: -22.9068, lng: -43.1729 },
  { label: "Dubai, UAE", lat: 25.2048, lng: 55.2708 }
];

const METRIC_DEFS = [
  { key: "sunrise", label: "Sunrise", icon: "SR" },
  { key: "sunset", label: "Sunset", icon: "SS" },
  { key: "dawn", label: "Dawn", icon: "DA" },
  { key: "dusk", label: "Dusk", icon: "DU" },
  { key: "day_length", label: "Day Length", icon: "DL" },
  { key: "solar_noon", label: "Solar Noon", icon: "SN" },
  { key: "timezone", label: "Time Zone", icon: "TZ" }
];

// Cache UI elements once so rendering stays simple and efficient.
const locationSelect = document.getElementById("location-select");
const searchBtn = document.getElementById("search-btn");
const geoBtn = document.getElementById("geo-btn");
const statusMessage = document.getElementById("status-message");

const todayDate = document.getElementById("today-date");
const tomorrowDate = document.getElementById("tomorrow-date");
const todayLocation = document.getElementById("today-location");
const tomorrowLocation = document.getElementById("tomorrow-location");
const todayMetrics = document.getElementById("today-metrics");
const tomorrowMetrics = document.getElementById("tomorrow-metrics");

// Initialize dropdown and reserved dashboard rows before any search happens.
populateLocationOptions();
renderPlaceholders(todayMetrics);
renderPlaceholders(tomorrowMetrics);

searchBtn.addEventListener("click", () => {
  const selected = locationSelect.value;
  if (!selected) {
    showStatus("Please choose a city from the list first.", "error");
    return;
  }

  const location = LOCATIONS.find((item) => item.label === selected);
  if (!location) {
    showStatus("Unable to find that location. Please choose again.", "error");
    return;
  }

  fetchAndRenderReports(location.lat, location.lng, location.label);
});

geoBtn.addEventListener("click", () => {
  if (!navigator.geolocation) {
    showStatus("Geolocation is not supported by this browser.", "error");
    return;
  }

  setLoadingState(true);
  showStatus("Getting your current location...", "");

  // On success, use rounded coordinates to keep the label readable.
  navigator.geolocation.getCurrentPosition(
    (position) => {
      const lat = Number(position.coords.latitude.toFixed(4));
      const lng = Number(position.coords.longitude.toFixed(4));
      const label = `Current Location (${lat}, ${lng})`;
      fetchAndRenderReports(lat, lng, label);
    },
    (error) => {
      setLoadingState(false);
      showStatus(getGeolocationErrorMessage(error), "error");
    },
    { timeout: 10000, enableHighAccuracy: true }
  );
});

async function fetchAndRenderReports(lat, lng, label) {
  setLoadingState(true);
  showStatus(`Loading sunrise and sunset data for ${label}...`, "");

  try {
    // Fetch both days at once so the UI updates in a single pass.
    const [todayResponse, tomorrowResponse] = await Promise.all([
      fetchReport(lat, lng, "today"),
      fetchReport(lat, lng, "tomorrow")
    ]);

    renderReport(todayResponse.results, todayDate, todayLocation, todayMetrics, label);
    renderReport(tomorrowResponse.results, tomorrowDate, tomorrowLocation, tomorrowMetrics, label);
    showStatus(`Showing updated results for ${label}.`, "success");
  } catch (error) {
    showStatus(error.message, "error");
  } finally {
    setLoadingState(false);
  }
}

async function fetchReport(lat, lng, dateValue) {
  const url = `${API_BASE}?lat=${encodeURIComponent(lat)}&lng=${encodeURIComponent(lng)}&date=${dateValue}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Request failed (${response.status}). Please try again.`);
  }

  const data = await response.json();
  // Guard against API-side errors or incomplete payloads.
  if (data.status !== "OK" || !data.results) {
    const fallbackMessage = "The API returned an error for this location.";
    throw new Error(data.message || fallbackMessage);
  }

  return data;
}

function renderReport(results, dateNode, locationNode, metricsNode, label) {
  dateNode.textContent = `Date: ${readValue(results.date)}`;
  locationNode.textContent = `Location: ${label}`;
  metricsNode.innerHTML = "";

  // Build all metric rows from one shared definition list.
  METRIC_DEFS.forEach((metric) => {
    metricsNode.appendChild(
      createMetricItem(metric.label, readValue(results[metric.key]), metric.icon)
    );
  });
}

function createMetricItem(label, value, icon) {
  const row = document.createElement("div");
  row.className = "metric";

  const term = document.createElement("dt");
  const iconBadge = document.createElement("span");
  iconBadge.className = "metric__icon";
  iconBadge.textContent = icon;
  term.appendChild(iconBadge);
  term.append(label);
  row.appendChild(term);

  const desc = document.createElement("dd");
  desc.textContent = value;
  row.appendChild(desc);

  return row;
}

function renderPlaceholders(targetNode) {
  targetNode.innerHTML = "";
  // Keep card layout stable by showing placeholder rows before data exists.
  METRIC_DEFS.forEach((metric) => {
    const row = createMetricItem(metric.label, "--", metric.icon);
    row.classList.add("metric--placeholder");
    targetNode.appendChild(row);
  });
}

function readValue(value) {
  // Polar and edge-case locations may return null for some solar events.
  return value === null || value === undefined || value === "" ? "N/A" : value;
}

function populateLocationOptions() {
  LOCATIONS.forEach((location) => {
    const option = document.createElement("option");
    option.value = location.label;
    option.textContent = location.label;
    locationSelect.appendChild(option);
  });
}

function showStatus(message, type) {
  statusMessage.textContent = message;
  statusMessage.classList.remove("status-message--error", "status-message--success");

  if (type === "error") {
    statusMessage.classList.add("status-message--error");
  }

  if (type === "success") {
    statusMessage.classList.add("status-message--success");
  }
}

function setLoadingState(isLoading) {
  searchBtn.disabled = isLoading;
  geoBtn.disabled = isLoading;
}

function getGeolocationErrorMessage(error) {
  // Map browser geolocation error codes to user-friendly text.
  switch (error.code) {
    case error.PERMISSION_DENIED:
      return "Location access was denied. Please allow location access or pick a city.";
    case error.POSITION_UNAVAILABLE:
      return "Current position is unavailable right now. Please try again shortly.";
    case error.TIMEOUT:
      return "Location request timed out. Try again or choose a city from the list.";
    default:
      return "Unable to fetch your location. Please try again or choose a city.";
  }
}
