let myMap = L.map("map", {
    center: [40.7128, -74.0059],
    zoom: 4
});

// Adding the tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);

// Use this link to get the GeoJSON data.
let link = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

// Getting our GeoJSON data
d3.json(link).then(function (data) {
    console.log(data)

    function rad(magi) {
        if (magi == 0) {
            return 1;
        }
    }

    function changeFillColor(radius) {
        if (radius <= 0) {
            return "red";
        } else if (radius <= 10) {
            return "yellow";
        } else {
            return "green"; //
        }
    }

    // Creating a GeoJSON layer with the retrieved data
    L.geoJson(data, {
        pointToLayer: function (feature, coord) {
            return L.circleMarker(coord);
        },
        style: function (feature) {
            return {
                fillColor: changeFillColor(feature.geometry.coordinates[2]),
                color: "black",
                radius: rad(feature.properties.mag),
                opacity: 1,
                weight: 0.7
            }
        }
    }).addTo(myMap);


    //legend   
    let legend = L.control({ position: "bottomright" });
    legend.onAdd = function () {
        let div = L.DomUtil.create("div", "info legend");
        let limits = link.options.limits;
        let colors = glink.options.colors;
        let labels = [];


    
        div.innerHTML = legendInfo;

        limits.forEach(function (limit, index) {
            labels.push("<li style=\"background-color: " + colors[index] + "\"></li>");
        });

        div.innerHTML += "<ul>" + labels.join("") + "</ul>";
        return div;
    };

    // Adding the legend to the map
    legend.addTo(myMap);

});









