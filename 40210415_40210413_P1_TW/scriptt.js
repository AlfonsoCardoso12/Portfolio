const API_KEY = '4866bca8c0594c00b762d4a38960ae33';

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        console.log("navegador não suporta geolocalização.");
    }
}
function showPosition(position) {
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    map = L.map('map').setView([lat, lon], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18
    }).addTo(map);
    let marker = L.marker([lat, lon]).addTo(map);
    document.getElementById("location").innerHTML = "Latitude: " + lat + "<br>Longitude: " + lon;
    L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Tiles style by <a href="https://www.hotosm.org/" target="_blank">Humanitarian OpenStreetMap Team</a> hosted by <a href="https://openstreetmap.fr/" target="_blank">OpenStreetMap Portugal</a>'
    }).addTo(map);
    L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
        attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
    }).addTo(map);
}
function goBack() {
    history.back();
}



async function searchLocation() {
    let address = document.getElementById('address').value;
    try {
        const response = await fetch(`https://api.opencagedata.com/geocode/v1/json?q=${address}&key=${API_KEY}`);
        const data = await response.json();
        let lat = data.results[0].geometry.lat;
        let lng = data.results[0].geometry.lng;
        document.getElementById('searchResult').innerHTML = `Latitude: ${lat}<br>Longitude: ${lng}`;
        let marker = L.marker([lat, lng]).addTo(map);
        map.setView([lat, lng], 13);
    } catch (error) {
        console.log('Request failed. Returned status of ' + error);
    }
}
