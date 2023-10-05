// 設定地圖經緯度和縮放
const map = L.map('map', { drawControl: true }).setView([37.8117907, -122.4756963], 13)
// 加圖層
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map)
// 加上 marker
const marker = L.marker([37.8117907, -122.4756963]).addTo(map)
// 加上 circle
const circle = L.circle([37.8117907, -122.4756963], {
  color: 'orange',
  fillColor: '#f08',
  fillOpacity: 0.3,
  radius: 1000
}).addTo(map)
// 加上 polygon
const polygon = L.polygon([
  [37.799, -122.55],
  [37.801, -122.44],
  [37.810, -122.50]
]).addTo(map)
// 為 marker 加上彈出訊息
marker.bindPopup('<b>Hello!</b><br>This is Golden Gate Bridge').openPopup()
// 為 circle 加上彈出訊息
circle.bindPopup('<b>This is a circle! </b>')
// 為 polygon 加上彈出訊息
polygon.bindPopup('<b> This is a polygon! </b>')
// 為特定座標加上資訊欄位
const popup = L.popup()
  .setLatLng([37.82, -122.53])
  .setContent('I am a standalone popup.')
  .openOn(map)

map.on('click', onMapClick)
map.locate({ setView: true, maxZoom: 18 })
map.on('locationfound', onLocationFound)
map.on('locationerror', onLocationError)
// 設定點擊時顯示經緯度
function onMapClick (event) {
  popup
    .setLatLng(event.latlng)
    .setContent('You clicked the map at ' + event.latlng.toString())
    .openOn(map)
}
// 定位功能
function onLocationFound (e) {
  const radius = e.accuracy
  // 地圖上加上 marker 並打開彈跳視窗訊息
  L.marker(e.latlng).addTo(map)
    .bindPopup('You are within ' + radius + ' meters from this point').openPopup()
  // 以 radius 為半徑的圓顯示在地圖上
  L.circle(e.latlng, radius).addTo(map)
}
// 定位功能的錯誤處理
function onLocationError (e) {
  alert(e.message)
}
