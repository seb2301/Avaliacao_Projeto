const email = document.getElementById('email');
const senha = document.getElementById('senha');
const btnEntrar = document.getElementById('btn-entrar');
const form = document.getElementById('form-login');

function checarCampos() {
  btnEntrar.disabled = !(email.value.trim() && senha.value.trim());
}

email.addEventListener('input', checarCampos);
senha.addEventListener('input', checarCampos);

form.addEventListener('submit', function(e) {
  e.preventDefault();
  localStorage.setItem('emailAdmin', email.value.trim());
  window.location.href = 'listagem-parceiros.html'; 
});
