document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    const response = await fetch("http://localhost:3000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    if (response.ok) {
      const result = await response.json();
      localStorage.setItem("token", result.token);
      alert("로그인 성공");
      window.location.href = "index.html"; // 게시판 페이지로 리디렉션
    } else {
      const result = await response.json();
      alert("로그인 실패: " + result.error);
    }
  });
});
