
/* -------- TODO ----------
Säkerställa att https fungerar med parcel
Läsa in en ny karta med navigator funktion //
Lägga till sökruta som man kan söka med //
Knapp/enter triggar en sökning // 
Leta efter vilket api som gäller för att kunna söka efter platser//
Kolla om det finns/autocomplete/Sugesstions //
*/

let map; // Initialize and add the map
const locationEl = document.getElementById('location');
const searchButton = document.getElementById('searchButton');
const locationButton = document.getElementById('locationButton');
const searchInput = document.getElementById('searchInput');

  
if (locationEl && searchButton && locationButton && searchInput){
    locationButton.addEventListener('click', getCurrentLocation);
    searchButton.addEventListener('click', searchLocation);
    searchInput.addEventListener('keypress', event => {
      // Check if the pressed key is Enter (key code 13)
      if (event.key === 'Enter') {
          // Call the search function
          searchLocation();
    }});

    if (navigator.geolocation){
      console.log("Navigator.geolocations exists");
      getCurrentLocation();
      
    } else {
      console.log("Navigator.geolocation does not exists");
      getLocationIP();
    }
  }

// Get ip-adress and location based on ip-adress
async function getLocationIP() {
  try {
      // Fetch the user's IP address
      const IPResponse = await fetch('https://api.ipify.org?format=json');
      const IPData = await IPResponse.json();
      const IPAddress = IPData.ip;

      // Use an IP geolocation service to get the user's location
      const locationResponse = await fetch(`https://ipapi.co/${IPAddress}/json/`);
      const locationData = await locationResponse.json();
      const location = locationData.city;
      const lat = locationData.latitude;
      const long = locationData.longitude;
      console.log(`"Success: Location loaded from IP-adress Latitude: ${lat} Longitude: ${long}`);

      // Call your function with the approximate location
      initLocationMap(lat, long, location);
  } catch (error) {
      console.error('Error fetching IP address or location:', error);
      initMap(62.3925531, 17.2848048);
  }
}

//Fallback if map cannot be generated with navigator.geolocation or ip-adress
async function initMap(lat, long) {
  // The location of position
  const position = { lat: lat, lng: long };
  // Request needed libraries.
  //@ts-ignore
  const { Map } = await google.maps.importLibrary("maps");
  const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");

  // The map, centered at position
  map = new Map(document.getElementById("map"), {
    zoom: 16,
    center: position,
    mapId: "579b8a660b45d6b8",
  });

  // The marker, positioned at Uluru
  const marker = new AdvancedMarkerElement({
    map: map,
    position: position,
    title: "Mittuniversitetet Sundsvall",
  });
}



async function initLocationMap(lat, long, location) {
  // The location of position
  const position = { lat: lat, lng: long };
  // Request needed libraries.
  //@ts-ignore
  const { Map } = await google.maps.importLibrary("maps");
  const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");

  // The map, centered at position
  map = new Map(document.getElementById("map"), {
    zoom: 12,
    center: position,
    mapId: "579b8a660b45d6b8",
  });

  // The marker, positioned at current position
  const marker = new AdvancedMarkerElement({
    map: map,
    position: position,
    title: location,
  });
}


function getCurrentLocation() {
  navigator.geolocation.getCurrentPosition(
      // Successful location
      e => {
          let latitude = e.coords.latitude;
          let longitude = e.coords.longitude;
          console.log(`Succes: Location loaded from navigator: Lattitude: ${latitude} Longitude: ${longitude}`);
          locationEl.innerHTML = `Lattitude: ${latitude} Longitude: ${longitude}`;
          initLocationMap(latitude, longitude);
      },
      // Error
      error => {
          console.error('Error:', error);
          getLocationIP();
      });
}


// Function to search for the location
async function searchLocation() {
  const searchInputVal = searchInput.value;
  // Use the Geocoding API to convert the search input into coordinates
  const geocoder = new google.maps.Geocoder();
  geocoder.geocode({ address: searchInputVal }, (results, status) => {
    if (status === 'OK') {
      console.log(results[0].formatted_address);
      const adress = results[0].formatted_address;
      const lat = results[0].geometry.location.lat();
      const long = results[0].geometry.location.lng();

      //Calls function to initial map
      initLocationMap(lat, long, adress);

      locationEl.innerHTML = `Plats: ${adress}, Lattitude: ${lat}, Longitude: ${long}`;
    } else {
      alert('Plats kunde inte hämtas tack vare: ' + status);
    }
  });
}
