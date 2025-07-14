document.addEventListener('DOMContentLoaded', () => {
  const links = document.querySelectorAll("nav a");
  window.addEventListener('scroll', () => {
    let current = "";
    document.querySelectorAll("section").forEach(section => {
      const sectionTop = section.offsetTop - 80;
      if (scrollY >= sectionTop) {
        current = section.getAttribute("id");
      }
    });
    links.forEach(link => {
      link.classList.remove("active");
      if (link.getAttribute("href") === "#" + current) {
        link.classList.add("active");
      }
    });
  });
  document.getElementById('form-parceiro').addEventListener('submit', async function(event) {
  event.preventDefault();

  const obj = {
    nomeParceiro: document.getElementById('nomeParceiro').value,
    tipoParceiro: document.getElementById('tipoParceiro').value,
    responsavelParceiro: document.getElementById('responsavelParceiro').value,
    telResponsavel: document.getElementById('telResponsavel').value,
    emailResponsavel: document.getElementById('emailResponsavel').value,
    rua: document.getElementById('rua').value,
    numero: Number(document.getElementById('numero').value),
    bairro: document.getElementById('bairro').value,
    papel: document.getElementById('papel').checked,
    plastico: document.getElementById('plastico').checked,
    vidro: document.getElementById('vidro').checked,
    metal: document.getElementById('metal').checked,
    oleoCozinha: document.getElementById('oleoCozinha').checked,
    pilhaBateria: document.getElementById('pilhaBateria').checked,
    eletronico: document.getElementById('eletronico').checked,
    roupa: document.getElementById('roupa').checked,
    outros: document.getElementById('outros').checked
  };
const impactos = [];
let pagImpacto = 0;
function renderImpacto() {
  const grid = document.getElementById('impacto-grid');
  grid.innerHTML = '';
  for (let i = 0; i < 2; i++) {
    const impacto = impactos[pagImpacto * 2 + i];
    if (impacto) {
      const div = document.createElement('div');
      div.className = "impacto-card";
      div.innerHTML = `<h3>${impacto.titulo}</h3><p>${impacto.texto}</p>`;
      grid.appendChild(div);
    }
  }
}
document.getElementById('prev-impacto').onclick = function() {
  pagImpacto = Math.max(0, pagImpacto - 1);
  renderImpacto();
}
document.getElementById('next-impacto').onclick = function() {
  pagImpacto = Math.min(Math.floor((impactos.length - 1) / 2), pagImpacto + 1);
  renderImpacto();
}
renderImpacto();

  try {
    const response = await fetch('https://6860899b8e74864084437167.mockapi.io/jmt-futurodev/api/parceiros', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(obj)
    });
    if (response.ok) {
      alert('Dados enviados com sucesso!');
      this.reset();
    } else {
      alert('Erro ao enviar os dados. Tente novamente.');
    }
  } catch (e) {
    alert('Erro ao enviar os dados. Verifique sua conexão.');
  }
});

});