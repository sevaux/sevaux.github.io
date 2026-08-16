document.addEventListener("DOMContentLoaded", function () {
  var mapElement = document.getElementById("location-map");

  if (!mapElement || typeof window.L === "undefined") {
    return;
  }

  var location = [47.747667, -3.395169];
  var map = window.L.map(mapElement, {
    scrollWheelZoom: false
  }).setView(location, 15);

  window.L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);

  window.L.marker(location)
    .addTo(map)
    .bindPopup("Lab-STICC - Universite Bretagne Sud")
    .openPopup();
});
