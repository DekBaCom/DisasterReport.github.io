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

  // Generate Longdo Map link
  const postLocationLink = document.createElement("a");
  postLocationLink.className = "text-blue-500 underline";
  postLocationLink.href = `https://map.longdo.com/?lat=${currentLocation.lat}&lon=${currentLocation.lng}`;
  postLocationLink.target = "_blank"; // Open in new tab
  postLocationLink.textContent = "เปิดตำแหน่งในแผนที่";

  const postLocation = document.createElement("p");
  postLocation.className = "text-sm text-gray-500";
  postLocation.textContent = `Location: Latitude ${currentLocation.lat}, Longitude ${currentLocation.lng}`;
  postLocation.appendChild(postLocationLink); // Add link to location text

  // Append elements to post
  post.appendChild(postText);
  post.appendChild(postLocation);

  // Append post to board
  postsBoard.appendChild(post);

  // Clear post content
  document.getElementById("postContent").value = "";
});
