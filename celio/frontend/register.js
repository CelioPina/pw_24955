logout();
window.addEventListener('DOMContentLoaded', () => {
  const token = localStorage.getItem('token-iusabndkjanbksd');
  if (token) {
    window.location.href = 'indexx.html';
  }
  
});

function register() {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const name = document.getElementById('name').value;

  const role = 0;

  const url = 'http://localhost:4242/api/user/register';

  const requestBody = { email, password, name, role };

  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(requestBody),
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Registration failed');
      }
    })
    .then((data) => {

      
      window.location.href = "./login.html";
      // Registration successful
      const signupResult = document.getElementById('signupResult');
      signupResult.textContent = 'Registo bem-sucedido';
      signupResult.classList.remove('error-message');
      signupResult.classList.add('success-message');
      
      
      
    })
    .catch((error) => {
      console.error('Error:', error);
      alert("O registo falhou");
      const signupResult = document.getElementById('signupResult');
      signupResult.textContent =
        'O registo falhou. Por favor, tente novamente.';
      signupResult.classList.remove('success-message');
      signupResult.classList.add('error-message');
    });
}


