document.addEventListener("DOMContentLoaded", async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const postId = urlParams.get("id");

  if (!postId) {
    alert("잘못된 접근입니다.");
    window.location.href = "index.html";
    return;
  }

  const response = await fetch(`http://localhost:3000/posts/${postId}`);
  if (!response.ok) {
    alert("게시글을 불러오는 데 실패했습니다.");
    window.location.href = "index.html";
    return;
  }

  const post = await response.json();
  document.getElementById("post-title").textContent = post.title;
  document.getElementById("post-author").textContent = `작성자: ${post.author}`;
  document.getElementById("post-date").textContent = `작성일: ${post.date}`;
  document.getElementById("post-body").textContent = post.content;
});
