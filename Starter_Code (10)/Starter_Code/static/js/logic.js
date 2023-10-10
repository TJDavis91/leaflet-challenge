// Create the map
var myMap = L.map("map", {
    center: [37.09, -95.71],
    zoom: 5
});

// Adding the tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);

let link = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"


// get the earthquake data from the "response" API
d3.json(link).then(function(data) {
    // Creating a GeoJSON layer with the retrieved data
    L.geoJson(data).addTo(myMap);
  });
  


// Function to determine marker size
function markerSize(magnitude) {
    return magnitude * 5000;
  };

  
function createFeatures(earthquakeData) {

    function onEachFeature(feature, layer){
        layer.bindPopup(`<h3>Location: ${feature.properties.place} </h3><hr><p>Date: ${features.properties
        .time}</p><p>Magnitude: ${features.properties.mag}</p><p>Depth: ${features.geometry.coordinates[2]}</p>`)
    };

function createCircleMarker(feature,latlng){
    let options = {
        radius:feature.properties.mag*5,
        fillColor: chooseColor(feature.properties.mag),
        color: chooseColor(feature.properties.mag),
        weight: 1,
        opacity: .8,
        fillOpacity: 0.35
    }
    return L.circleMarker(latlng, options);
} 

let earthquakes = L.geoJSON(earthquakeData, {
    onEachFeature: onEachFeature,
    pointToLayer: createCircleMarker
  });
  
  // Send earthquakes layer to the createMap function
  createMap(earthquakes);
}


 // Create a GeoJSON layer containing the features array on the earthquakeData object
 
function chooseColor(depth) {
    if (depth < 10) {
      return "#ffffcc";
    } else if (depth < 30) {
      return "#a1dab4";
    } else if (depth < 50) {
      return "#41b6c4";
    } else if (depth < 70) {
      return "#2c7fb8";
    } else if (depth < 90) {
      return "#253494";
    } else {
      return "#081d58";
    }
  }
