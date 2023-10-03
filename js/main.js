//Sleep function (may be temporary)
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Function to create a post element
function createPostElement(post) {
  const postElement = document.createElement('div');
  postElement.classList.add('post');

  // Create the user profile section
  const userProfile = document.createElement('div');
  userProfile.classList.add('user-profile');
  userProfile.innerHTML = `
      <img src="/img/profile.webp" alt="User Profile Picture">
      <h3>${post.username}</h3>
    `;

  // Create the post text
  const postText = document.createElement('p');
  postText.textContent = post.postText;

  // Create the post actions section
  const postActions = document.createElement('div');
  postActions.classList.add('post-actions');

// Create comment-and-share <div>  using JS
const commentAndShare = document.createElement('div');
commentAndShare.classList.add('comment-and-share');
postActions.appendChild(commentAndShare);

// Create comment <a>  using JS
const commentButton = document.createElement('a');
commentButton.addEventListener("click", function() {
  document.getElementById("comment-modal").showModal();
});
commentButton.innerText = "Comment";

// Create share <a>  using JS
const shareButton = document.createElement('a');
shareButton.innerText = "Share";
shareButton.addEventListener("click", function() {
  document.getElementById("share-dialog").show();
});

// Append share <a> and comment <a> to commentAndShare <div>
commentAndShare.appendChild(commentButton);
commentAndShare.appendChild(shareButton);

//Append commentAndShare to post actions
postActions.appendChild(commentAndShare);


  // Create the comments section
  const comments = document.createElement('div');
  comments.classList.add('comments');

  post.comments.forEach((comment) => {
    const commentElement = document.createElement('div');
    commentElement.classList.add('comment');
    commentElement.innerHTML = `
        <h4>${comment.username}</h4>
        <p>${comment.text}</p>
      `;
    comments.appendChild(commentElement);
  });

  // Append elements to the post element
  postElement.appendChild(userProfile);
  postElement.appendChild(postText);
  postElement.appendChild(postActions);
  postElement.appendChild(comments);

  return postElement;
}

// Function to fetch and display Fartbook posts
function fetchAndDisplayPosts() {
  fetch('/api/fartbook')
    .then((response) => response.json())
    .then((data) => {
      const fartbookPosts = document.getElementById('fartbook-posts');

      // Clear existing posts
      fartbookPosts.innerHTML = '';

      // Iterate through the fetched data and create post elements
      data.forEach((post) => {
        const postElement = createPostElement(post);
        fartbookPosts.appendChild(postElement);
      });
    })
    .catch((error) => console.error(error));
}
//Fetch and display posts
fetchAndDisplayPosts();

document.getElementById("post-button").addEventListener("click", function() {
  createPost(document.getElementById("username").value, document.getElementById("postText").value)
})

document.getElementById("comment-send").addEventListener("click", function() {
  createComment(document.getElementById("comment-username").value, document.getElementById("comment-text"));
  document.getElementById("comment-modal").close();
});

// Function for creating posts
function createPost(userName, postText) { 
  fetch('/api/fartbook', { method: 'POST', body: JSON.stringify({ username: userName, postText: postText, }), headers: { 'Content-type': 'application/json; charset=UTF-8', } });
  sleep(500);
  fetchAndDisplayPosts();
}

function createComment(username, commentText) {
  fetch('api/fartbook/:id/comment', { method: 'POST', body: JSON.stringify({username: username, commentText: commentText, }), headers: {'Content-type': 'application/json charset=UTF-8'}});
  sleep(500);
  fetchAndDisplayPosts();
}
