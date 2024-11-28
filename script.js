// Variables
let currentLocation = { lat: null, lng: null };
let map;
let marker;

// Initialize Longdo Map
function initMap() {
  map = new longdo.Map({
    placeholder: document.getElementById('map'),
  });
  map.location({ lat: 13.736717, lon: 100.523186 }); // Default center: Bangkok
  map.zoom(12); // Default zoom level
}

// Get Location Button
document.getElementById("getLocation").addEventListener("click", () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        currentLocation.lat = position.coords.latitude;
        currentLocation.lng = position.coords.longitude;

        // Update location display
        document.getElementById("locationDisplay").textContent = 
          `Latitude: ${currentLocation.lat}, Longitude: ${currentLocation.lng}`;

        // Update map location
        map.location({ lat: currentLocation.lat, lon: currentLocation.lng });
        
        // Add or update marker
        if (!marker) {
          marker = new longdo.Marker(
            { lat: currentLocation.lat, lon: currentLocation.lng },
            { title: "Your Location" }
          );
          map.Overlays.add(marker);
        } else {
          marker.location({ lat: currentLocation.lat, lon: currentLocation.lng });
        }
      },
      (error) => {
        alert("Unable to retrieve location: " + error.message);
      }
    );
  } else {
    alert("Geolocation is not supported by your browser.");
  }
});

// Post Button
document.getElementById("postButton").addEventListener("click", () => {
  const postContent = document.getElementById("postContent").value;
  if (!postContent || !currentLocation.lat || !currentLocation.lng) {
    alert("Please provide content and location.");
    return;
  }

  const postsBoard = document.getElementById("postsBoard");

  // Create Post
  const post = document.createElement("div");
  post.className = "bg-white shadow rounded p-4";

  const postText = document.createElement("p");
  postText.className = "text-gray-800";
  postText.textContent = postContent;

  const postLocation = document.createElement("p");
  postLocation.className = "text-sm text-gray-500";
  postLocation.textContent = `Location: Latitude ${currentLocation.lat}, Longitude ${currentLocation.lng}`;

  // Append elements to post
  post.appendChild(postText);
  post.appendChild(postLocation);

  // Append post to board
  postsBoard.appendChild(post);

  // Clear post content
  document.getElementById("postContent").value = "";
});

// Initialize map when the page loads
window.onload = initMap;
