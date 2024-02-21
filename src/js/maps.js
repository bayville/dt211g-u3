
let map; // Initialize and add the map
const locationEl = document.getElementById('location'); //Get location element
const searchButton = document.getElementById('searchButton'); //Get searchbutton
const locationButton = document.getElementById('locationButton'); //Get location button
const searchInput = document.getElementById('searchInput'); //Get search input

// If elements exist create eventlisteners and check if navigaotr exists
if (locationEl && searchButton && locationButton && searchInput){
    locationButton.addEventListener('click', getCurrentLocation); //Listen for click on location button
    searchButton.addEventListener('click', searchLocation); //Listen fror click on search button
    searchInput.addEventListener('keypress', event => { //Listen for enterpressed when in search input
      // Check if the pressed key is Enter
      if (event.key === 'Enter') {
          // Call the search function
          searchLocation();
    }});

    //If navigator exists or permission is granted
    if (navigator.geolocation){
      console.log("Navigator.geolocations exists");
      getCurrentLocation(); //Calls function to get location with navigator
      
    } else {
      console.log("Navigator.geolocation does not exists");
      getLocationIP(); //Calls function to get location with ip-adress.
    }
  }

// Get ip-adress and location based on ip-adress
async function getLocationIP() {
  try {
      const IPResponse = await fetch('https://api.ipify.org?format=json'); // Fetch the user's IP address
      const IPData = await IPResponse.json();
      const IPAddress = IPData.ip;

      // Use the IP-adress to fetch location
      const locationResponse = await fetch(`https://ipapi.co/${IPAddress}/json/`);
      const locationData = await locationResponse.json();
      const location = locationData.city;
      const lat = locationData.latitude;
      const long = locationData.longitude;
      console.log(`"Success: Location loaded from IP-adress Latitude: ${lat} Longitude: ${long}`);

      // Call the map function
      locationEl.innerHTML = `Plats: ${location}, Lattitude: ${lat}, Longitude: ${long}`;
      initLocationMap(lat, long, location);
  } catch (error) {
      console.error('Error fetching IP address or location:', error);
      initLocationMap(62.3925531, 17.2848048, 'Mittuniversitet Sundsvall'); //Call the function with fixed coordinates, fallback if ip-adress or location is not found
  }
}

//Initalizes the map
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

//Get location using navigator.geolocation in the browser
function getCurrentLocation() {
  navigator.geolocation.getCurrentPosition(
      // Successful location
      e => {
          let latitude = e.coords.latitude; //Get latitude
          let longitude = e.coords.longitude; //Get longititude
          console.log(`Succes: Location loaded from navigator: Lattitude: ${latitude} Longitude: ${longitude}`);
          locationEl.innerHTML = `Lattitude: ${latitude} Longitude: ${longitude}`;
          initLocationMap(latitude, longitude); //Call function using lat and long
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
      console.log(`Succes: Location found from search: ${results[0].formatted_address}`);
      const adress = results[0].formatted_address;
      const lat = results[0].geometry.location.lat();
      const long = results[0].geometry.location.lng();

      //Calls function to initial map
      initLocationMap(lat, long, adress);

      locationEl.innerHTML = `Plats: ${adress}, Lattitude: ${lat}, Longitude: ${long}`;
    } else {
      alert('Could not find location ' + status);
    }
  });
}
