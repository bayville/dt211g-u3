// Initialize and add the map
let map;

/* -------- TODO ----------
Säkerställa att https fungerar med parcel
Läsa in en ny karta med navigator funktion
Lägga till sökruta som man kan söka med
Knapp/enter triggar en sökning
Leta efter vilket api som gäller för att kunna söka efter platser
Kolla om det finns/autocomplete/Sugesstions
*/

async function initMap() {
  // The location of Uluru
  const position = { lat: -25.344, lng: 131.031 };
  // Request needed libraries.
  //@ts-ignore
  const { Map } = await google.maps.importLibrary("maps");
  const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");

  // The map, centered at Uluru
  map = new Map(document.getElementById("map"), {
    zoom: 4,
    center: position,
    mapId: "DEMO_MAP_ID",
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
    console.log('hej');
    navigator.geolocation.getCurrentPosition(e =>{
        let latitude = e.coords.latitude;
        let longitude = e.coords.longitude;
        console.log("Latitude: " + latitude + ", Longitude: " + longitude);
      });
    
}

initMap();