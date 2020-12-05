const panellum = document.getElementById('panellum');
const mapEl = document.getElementById('map');
const guessButton = document.getElementsByClassName('guess');

var mapX, mapY, guessX, guessY;

function initPanorama(location) {
  pannellum.viewer('panorama', {
      "type": "cubemap",
      "cubeMap": [
          "./images/" + location + "/panorama_0.png",
          "./images/" + location + "/panorama_1.png",
          "./images/" + location + "/panorama_2.png",
          "./images/" + location + "/panorama_3.png",
          "./images/" + location + "/panorama_4.png",
          "./images/" + location + "/panorama_5.png"
      ]
  });
}

var map, marker, bounds;
function initMap() {
  map = L.map('map', {
      minZoom: -50,
      maxBounds: bounds,
      maxBoundsViscosity: 1.0,
      crs: L.CRS.Simple
  });

  L.easyButton('<strong>&lt;</strong>', function(btn, map) {
    mapEl.setAttribute("style","width:30vw");
    mapEl.setAttribute("style","height:50vh");
    setTimeout(function(){ map.invalidateSize()}, 400);
    $(window).trigger('resize');
  }).addTo(map);

  map.on('click', function(e) {
    if(marker != null)
      map.removeLayer(marker);
    marker = new L.marker(e.latlng).addTo(map);
    guessX = e.latlng.lng * 2500;
    guessY = (8 - e.latlng.lat) * 2500;
    //alert(x + " | " + y);
  });
  map.on('drag', function() {
      map.panInsideBounds(bounds, { animate: true });
  });
  var bounds = [[0, 0], [8, 11]];
  var image = L.imageOverlay('images/map_new.png', bounds).addTo(map);
  map.fitBounds(bounds);
}

// takes in node name and returns array of sub-images
function getImages(name) {
  let path = "images/" + name;
  let images = [];
  for(i=0;i<6;i++) {
    images.push(path + "/panorama_" + i + ".png")
  }
  return images;
}

function guess() {
  let distance = Math.sqrt(Math.pow((mapX - guessX),2) + Math.pow((mapY - guessY), 2));
  let finalMarker = new L.marker([mapX, mapY]).addTo(map);
  var pathCoords = [
    [mapX, mapY],
    [guessX, guessY]
  ];
  let polyline = L.polyline(pathCoords, {color: "red"}).addTo(map);
  alert("Your guess was " + Math.floor(distance) + "m from the actual location!");
}

var location, coordinates;
function getRandomLocation() {
  let locations = ["10820_15010", "15860_3670", "19227_14370", "19305_14550", "19780_5730", "21216_6209"];
  let randLocation = locations[Math.floor(Math.random() * locations.length)];
  mapX = randLocation.split("_")[0];
  mapY = randLocation.split("_")[1];
  return randLocation;
}

initMap();
initPanorama(getRandomLocation());
console.log(mapX + " | " + mapY);
guessButton.onclick = function() {
  guess();
}
