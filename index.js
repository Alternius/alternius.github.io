const panellum = document.getElementById('panellum');
const mapEl = document.getElementById('map');

const minX = 100;
const minY = 258;
const maxX = 32250;
const maxY = 23000;
const offsetY = 1200.636222910216;

function initPanorama(images) {
  pannellum.viewer('panorama', {
      "type": "cubemap",
      "cubeMap": [
          "./images/capital_chill/panorama_0.png",
          "./images/capital_chill/panorama_1.png",
          "./images/capital_chill/panorama_2.png",
          "./images/capital_chill/panorama_3.png",
          "./images/capital_chill/panorama_4.png",
          "./images/capital_chill/panorama_5.png"
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

  L.easyButton('<img src="images/expand.png">', function(btn, map) {
    mapEl.setAttribute("style","width:30vw");
    mapEl.setAttribute("style","height:50vh");
    setTimeout(function(){ map.invalidateSize()}, 400);
    $(window).trigger('resize');
  }).addTo(map);

  map.on('click', function(e) {
    marker = new L.marker(e.latlng).addTo(map);
    let x = e.latlng.lng;
    let y = maxY - e.latlng.lat - offsetY;
    alert(x + " | " + y);
  });
  map.on('drag', function() {
      map.panInsideBounds(bounds, { animate: true });
  });
  var bounds = [[minY, minX], [maxY, maxX]];
  var image = L.imageOverlay('images/i3JVqbS.png', bounds).addTo(map);
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

var location, coordinates;
function getRandomLocation() {
  let locations = ["capital_chill", "ba_sing_se", "fnc"]
  let randLocation = locations[Math.floor(Math.random() * locations.length)];
  console.log(randLocation);
  return []
}

initMap();
initPanorama();
console.log(getImages("capital_chill"));
