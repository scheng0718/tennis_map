// Set latitude and longitude of the map
const map = L.map('map', { drawControl: true }).setView([37.8117907, -122.4756963], 13)
// Add layer to the map
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 10,
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map)
// add marker
const marker = L.marker([37.8117907, -122.4756963]).addTo(map)
// add circle
const circle = L.circle([37.8117907, -122.4756963], {
  color: 'orange',
  fillColor: '#f08',
  fillOpacity: 0.3,
  radius: 1000
}).addTo(map)
// add polygon
const polygon = L.polygon([
  [37.799, -122.55],
  [37.801, -122.44],
  [37.810, -122.50]
]).addTo(map)
// add pop-up message on the marker
marker.bindPopup('<b>Hello!</b><br>This is Golden Gate Bridge').openPopup()
// add pop-up message on the circle
circle.bindPopup('<b>This is a circle! </b>')
// add pop-up message on the polygon
polygon.bindPopup('<b> This is a polygon! </b>')
// add a stand-alone pop-up message
const popup = L.popup()
  .setLatLng([37.82, -122.53])
  .setContent('I am a standalone popup.')
  .openOn(map)

map.on('click', onMapClick)
map.locate({ setView: true, maxZoom: 18 })
map.on('locationfound', onLocationFound)
map.on('locationerror', onLocationError)
// display the lat/long of the clicked point
function onMapClick (event) {
  popup
    .setLatLng(event.latlng)
    .setContent('You clicked the map at ' + event.latlng.toString())
    .openOn(map)
}
// locate the user's current position
function onLocationFound (e) {
  const radius = e.accuracy
  // add marker to the map based on location
  L.marker(e.latlng).addTo(map)
    .bindPopup('You are within ' + radius + ' meters from this point').openPopup()
  // add circle to the map based on radius
  L.circle(e.latlng, radius).addTo(map)
}
// error message when location is not found
function onLocationError (e) {
  alert(e.message)
}
