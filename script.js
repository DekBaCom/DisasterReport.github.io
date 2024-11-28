// Variables
let currentLocation = { lat: null, lng: null };
let map;
let marker;

// Function to initialize Google Map
function initMap() {
  // Default map center
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 13.736717, lng: 100.523186 }, // Default to Bangkok
    zoom: 12,
  });
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

        // Show the marker on Google Map
        const newLatLng = new google.maps.LatLng(currentLocation.lat, currentLocation.lng);
        
        // Center map on current location
        map.setCenter(newLatLng);

        // Place or move the marker
        if (!marker) {
          marker = new google.maps.Marker({
            position: newLatLng,
            map: map,
            title: "Your Location",
          });
        } else {
          marker.setPosition(newLatLng);
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
