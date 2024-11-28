// Variables
let currentLocation = { lat: null, lng: null };

// Get Location Button
document.getElementById("getLocation").addEventListener("click", () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        currentLocation.lat = position.coords.latitude;
        currentLocation.lng = position.coords.longitude;
        document.getElementById("locationDisplay").textContent = 
          `Latitude: ${currentLocation.lat}, Longitude: ${currentLocation.lng}`;
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

  // Comment Section
  const commentSection = document.createElement("div");
  commentSection.className = "mt-4";

  const commentInput = document.createElement("input");
  commentInput.className = "border p-2 w-full rounded mb-2";
  commentInput.placeholder = "แสดงความคิดเห็น...";

  const commentButton = document.createElement("button");
  commentButton.className = "bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600";
  commentButton.textContent = "ส่ง";

  commentButton.addEventListener("click", () => {
    const commentText = commentInput.value;
    if (!commentText) {
      alert("กรุณาใส่ข้อความก่อนส่ง!");
      return;
    }

    const comment = document.createElement("p");
    comment.className = "text-sm text-gray-700 mt-2";
    comment.textContent = commentText;
    commentSection.appendChild(comment);
    commentInput.value = "";
  });

  commentSection.appendChild(commentInput);
  commentSection.appendChild(commentButton);

  // Append elements to post
  post.appendChild(postText);
  post.appendChild(postLocation);
  post.appendChild(commentSection);

  // Append post to board
  postsBoard.appendChild(post);

  // Clear post content
  document.getElementById("postContent").value = "";
});
