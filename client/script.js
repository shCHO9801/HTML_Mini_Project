document.addEventListener("DOMContentLoaded", () => {
  loadPostsFromServer();

  const form = document.querySelector("form");
  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const title = document.getElementById("post-title").value;
    const content = document.getElementById("post-content").value;
    const token = localStorage.getItem("token");

    if (title.trim() === "" || content.trim() === "") {
      alert("모든 필드를 채워주세요.");
      return;
    }

    const response = await fetch("http://localhost:3000/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ title, content, date: formatDate(new Date()) }),
    });

    if (response.ok) {
      const post = await response.json();
      addPostToTable(post.title, post.content, post.author, post.id, post.date);
    } else {
      const result = await response.json();
      alert("게시글 작성 실패: " + result.error);
    }

    form.reset();
  });
});

async function loadPostsFromServer() {
  const response = await fetch("http://localhost:3000/posts");
  const posts = await response.json();
  posts.forEach((post) => {
    addPostToTable(post.title, post.content, post.author, post.id, post.date);
  });
}

function addPostToTable(title, content, author, id, date) {
  const tableBody = document.querySelector("#board_list tbody");
  const newRow = document.createElement("tr");

  const numberCell = document.createElement("td");
  numberCell.textContent = id;
  newRow.appendChild(numberCell);

  const titleCell = document.createElement("td");
  const titleLink = document.createElement("a");
  titleLink.href = `post.html?id=${id}`;
  titleLink.textContent = title;
  titleCell.appendChild(titleLink);
  newRow.appendChild(titleCell);

  const authorCell = document.createElement("td");
  authorCell.textContent = author;
  newRow.appendChild(authorCell);

  const dateCell = document.createElement("td");
  dateCell.textContent = date;
  newRow.appendChild(dateCell);

  const deleteCell = document.createElement("td");
  const deleteButton = document.createElement("button");
  deleteButton.textContent = "삭제";
  deleteButton.addEventListener("click", async () => {
    const token = localStorage.getItem("token");
    const response = await fetch(`http://localhost:3000/posts/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.ok) {
      tableBody.removeChild(newRow);
    } else {
      const result = await response.json();
      alert("게시글 삭제 실패: " + result.error);
    }
  });
  deleteCell.appendChild(deleteButton);
  newRow.appendChild(deleteCell);

  tableBody.appendChild(newRow);
}

function formatDate(date) {
  let d = new Date(date),
    month = "" + (d.getMonth() + 1),
    day = "" + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [year, month, day].join("-");
}
