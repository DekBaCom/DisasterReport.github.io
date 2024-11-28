// Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyC39q6CW6etk1TzE1AyFEsJTqRd0Eh_p48",
  authDomain: "disasterreport-c5898.firebaseapp.com",
  projectId: "disasterreport-c5898",
  storageBucket: "disasterreport-c5898.firebasestorage.app",
  messagingSenderId: "98550078682",
  appId: "1:98550078682:web:1e5fee774b6ce52e32d9e3",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Initialize Longdo Map
let map;
let currentMarker;
let currentLocation = { lat: null, lng: null };

function initializeMap() {
  map = new longdo.Map({
    placeholder: document.getElementById("map"),
  });
  map.location({ lon: 100.5014, lat: 13.7563 }, true); // Default: Bangkok
  map.zoom(12);
}

document.addEventListener("DOMContentLoaded", () => {
  initializeMap();

  // Handle Get Location Button
  document.getElementById("getLocation").addEventListener("click", () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        currentLocation.lat = position.coords.latitude;
        currentLocation.lng = position.coords.longitude;

        // Show location on map
        map.location({ lon: currentLocation.lng, lat: currentLocation.lat }, true);
        if (currentMarker) {
          map.Overlays.remove(currentMarker);
        }
        currentMarker = new longdo.Marker({ lon: currentLocation.lng, lat: currentLocation.lat });
        map.Overlays.add(currentMarker);

        document.getElementById(
          "locationDisplay"
        ).textContent = `พิกัดปัจจุบัน: Latitude ${currentLocation.lat}, Longitude ${currentLocation.lng}`;
      },
      (error) => {
        alert("Unable to retrieve location. Please try again.");
        console.error(error);
      }
    );
  });

  // Handle Post Button
  document.getElementById("postButton").addEventListener("click", async () => {
    const postContent = document.getElementById("postContent").value;

    if (!postContent || !currentLocation.lat || !currentLocation.lng) {
      alert("กรุณาใส่ข้อความและเลือกพิกัด");
      return;
    }

    // Save data to Firebase Firestore
    try {
      await db.collection("posts").add({
        content: postContent,
        location: {
          lat: currentLocation.lat,
          lng: currentLocation.lng,
        },
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      });

      alert("โพสต์ของคุณถูกบันทึกเรียบร้อยแล้ว!");
      displayPosts(); // Update the post board
    } catch (error) {
      console.error("Error saving post: ", error);
      alert("ไม่สามารถบันทึกโพสต์ได้");
    }

    document.getElementById("postContent").value = ""; // Clear input
  });

  // Function to display posts
  async function displayPosts() {
    const postsBoard = document.getElementById("postsBoard");
    postsBoard.innerHTML = ""; // Clear existing posts

    try {
      const querySnapshot = await db.collection("posts").orderBy("timestamp", "desc").get();
      querySnapshot.forEach((doc) => {
        const post = doc.data();

        const postDiv = document.createElement("div");
        postDiv.className = "bg-white shadow rounded p-4";

        const postText = document.createElement("p");
        postText.className = "text-gray-800";
        postText.textContent = post.content;

        const postLocation = document.createElement("p");
        postLocation.className = "text-sm text-gray-500";
        postLocation.innerHTML = `Location: Latitude ${post.location.lat}, Longitude ${post.location.lng}
          <a href="https://map.longdo.com/?lat=${post.location.lat}&lon=${post.location.lng}" 
          target="_blank" class="text-blue-500 underline">เปิดในแผนที่</a>`;

        postDiv.appendChild(postText);
        postDiv.appendChild(postLocation);
        postsBoard.appendChild(postDiv);
      });
    } catch (error) {
      console.error("Error fetching posts: ", error);
    }
  }

  // Load posts on page load
  displayPosts();
});
