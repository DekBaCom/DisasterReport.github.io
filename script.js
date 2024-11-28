let map;
let currentMarker;
let currentLocation = { lat: null, lng: null };

function initializeMap() {
  map = new longdo.Map({
    placeholder: document.getElementById("map"),
  });

  // ตั้งค่าการแสดงแผนที่เบื้องต้น
  map.location({ lon: 100.5014, lat: 13.7563 }, true); // Bangkok
  map.zoom(12);
}

document.addEventListener("DOMContentLoaded", () => {
  initializeMap();

  document.getElementById("getLocation").addEventListener("click", () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        currentLocation.lat = position.coords.latitude;
        currentLocation.lng = position.coords.longitude;

        // แสดงตำแหน่งบนแผนที่
        map.location({ lon: currentLocation.lng, lat: currentLocation.lat }, true);
        if (currentMarker) {
          map.Overlays.remove(currentMarker);
        }
        currentMarker = new longdo.Marker({ lon: currentLocation.lng, lat: currentLocation.lat });
        map.Overlays.add(currentMarker);

        // แสดงข้อความพิกัดในหน้าเว็บ
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

  document.getElementById("postButton").addEventListener("click", () => {
    const postContent = document.getElementById("postContent").value;

    if (!postContent || !currentLocation.lat || !currentLocation.lng) {
      alert("Please provide content and location.");
      return;
    }

    const postsBoard = document.getElementById("postsBoard");

    // สร้างโพสต์ใหม่
    const post = document.createElement("div");
    post.className = "bg-white shadow rounded p-4";

    const postText = document.createElement("p");
    postText.className = "text-gray-800";
    postText.textContent = postContent;

    // ลิงก์ Longdo Map
    const postLocationLink = document.createElement("a");
    postLocationLink.className = "text-blue-500 underline";
    postLocationLink.href = `https://map.longdo.com/?lat=${currentLocation.lat}&lon=${currentLocation.lng}`;
    postLocationLink.target = "_blank"; // เปิดในแท็บใหม่
    postLocationLink.textContent = "เปิดตำแหน่งในแผนที่";

    const postLocation = document.createElement("p");
    postLocation.className = "text-sm text-gray-500";
    postLocation.textContent = `Location: Latitude ${currentLocation.lat}, Longitude ${currentLocation.lng}`;
    postLocation.appendChild(postLocationLink); // เพิ่มลิงก์ไปยังข้อความพิกัด

    // เพิ่มข้อความและลิงก์ในโพสต์
    post.appendChild(postText);
    post.appendChild(postLocation);

    // เพิ่มโพสต์ในบอร์ด
    postsBoard.appendChild(post);

    // ล้างเนื้อหาข้อความหลังโพสต์
    document.getElementById("postContent").value = "";
  });
});
