const panellum = document.getElementById('panellum');
const mapEl = document.getElementById('map');

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
      minZoom: 2.2,
      maxBounds: bounds,
      maxBoundsViscosity: 1.0,
      crs: L.CRS.Simple
  });
  map.on('click', function(e){
    marker = new L.marker(e.latlng).addTo(map);
  });
  map.on('drag', function() {
      map.panInsideBounds(bounds, { animate: true });
  });
  var bounds = [[0,0], [100,100]];
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

initMap();
initPanorama();
console.log(getImages("capital_chill"));
