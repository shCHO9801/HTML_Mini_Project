document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    const response = await fetch("http://localhost:3000/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    if (response.ok) {
      alert("회원가입 성공");
      window.location.href = "login.html"; // 로그인 페이지로 리디렉션
    } else {
      const result = await response.json();
      alert("회원가입 실패: " + result.error);
    }
  });
});
