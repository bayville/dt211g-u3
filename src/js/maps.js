// Initialize and add the map
let map;
const locationEl = document.getElementById('location');



/* -------- TODO ----------
Säkerställa att https fungerar med parcel
Läsa in en ny karta med navigator funktion
Lägga till sökruta som man kan söka med
Knapp/enter triggar en sökning
Leta efter vilket api som gäller för att kunna söka efter platser
Kolla om det finns/autocomplete/Sugesstions
*/

async function initMap(lat, long) {
  // The location of Uluru
  const position = { lat: lat, lng: long };
  // Request needed libraries.
  //@ts-ignore
  const { Map } = await google.maps.importLibrary("maps");
  const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");

  // The map, centered at Uluru
  map = new Map(document.getElementById("map"), {
    zoom: 12,
    center: position,
    mapId: "579b8a660b45d6b8",
  });

  // The marker, positioned at Uluru
  const marker = new AdvancedMarkerElement({
    map: map,
    position: position,
    title: "Uluru",
  });
}

const locationButton = document.getElementById('locationButton');
locationButton.addEventListener('click', getCurrentLocation);

function getCurrentLocation(){
    navigator.geolocation.getCurrentPosition(e =>{
        let latitude = e.coords.latitude;
        let longitude = e.coords.longitude;
        console.log("Latitude: " + latitude + ", Longitude: " + longitude);
        locationEl.innerHTML = `Lattitude: ${latitude} Longitude: ${longitude}`;
        initMap(latitude, longitude);
      });
    
}

initMap(59.33258, 18.0649);