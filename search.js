const queryParams_raw = window.location.search;
const queryParams = new URLSearchParams(queryParams_raw);
const postId = queryParams.get("id");
const commentButton = document.getElementById("comment-button");

if (queryParams_raw == null || queryParams_raw == "") {
    window.location.replace("index.html");
}

const post = fetch("/api/fartbook/" + postId + "/search", { method: "GET", headers: { "Content-type": "application/json; charset=UTF-8"}})  .then((response) => response.json())
.then((data) => {
    document.getElementById("postText").value = data.post.postText;
    document.getElementById("username").value = data.post.username;
    data.post.comments.foreach((comment) => {
        const commentElement = document.createElement("div");
        commentElement.classList.add("comment");
        commentElement.innerHTML = "<h4>${comment.username}</h4><p>${comment.text}</p>";
        document.getElementById("comments").appendChild(commentElement);
    });
});