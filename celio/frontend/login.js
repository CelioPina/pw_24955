window.addEventListener("DOMContentLoaded", () => {
  const token = localStorage.getItem("token-iusabndkjanbksd");
  if (token) {
    window.location.href = "indexx.html";
  }
});

function login() {
  const email = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  // Replace with your login endpoint URL
  const url = "http://localhost:4242/api/user/login";

  const requestBody = { email, password };

  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestBody),
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Invalid credentials');
      }
    }).then((data) => {
      const { user, token } = data;
      localStorage.setItem("user", JSON.stringify(user)); 
      localStorage.setItem("token-iusabndkjanbksd", token);
      window.location.href = "indexx.html";
    })
    .catch((error) => {
      const errorMessage = document.getElementById('loginError');
      errorMessage.textContent =
        'Credenciais inválidas. Por favor, tente novamente.';
      console.error('Error:', error);
    });

}
