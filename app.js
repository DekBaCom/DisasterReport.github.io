function loadReports() {
  const postsRef = ref(database, "posts");
  onValue(postsRef, (snapshot) => {
    const postsDiv = document.getElementById("posts");
    postsDiv.innerHTML = "";

    snapshot.forEach((childSnapshot) => {
      const post = childSnapshot.val();
      const postDiv = document.createElement("div");
      postDiv.className = "bg-gray-50 border border-gray-200 p-4 rounded shadow";

      postDiv.innerHTML = `
        <h3 class="text-lg font-bold text-blue-600">${post.title}</h3>
        <p class="text-gray-600 mb-2">${post.description}</p>
        <button 
          onclick="addComment('${childSnapshot.key}')"
          class="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
        >
          Comment
        </button>
        <div class="mt-2 text-sm text-gray-500 space-y-1">
          ${Object.values(post.comments || {}).map((c) => `<p>${c.text}</p>`).join("")}
        </div>
      `;
      postsDiv.appendChild(postDiv);
    });
  });
}
