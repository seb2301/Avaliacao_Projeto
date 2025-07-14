const lista = document.getElementById('parceiros-list');
const pesquisa = document.getElementById('pesquisa');
const btnPesquisar = document.getElementById('btn-pesquisar');

let parceiros = [];
let parceirosFiltrados = [];

function getAvatar(tipo) {
  if (tipo === 'ECO') {
    return '<span class="card-avatar eco" title="Ecoponto" style="font-size:2.3rem;">♻️</span>';
  } else if (tipo === 'COO') {
    return '<span class="card-avatar coo" title="Cooperativa" style="font-size:2.3rem;">🏭</span>';
  } else {
    return '<span class="card-avatar pev" title="PEV" style="font-size:2.3rem;">🗑️</span>';
  }
}

function formataData(dataISO) {
  if (!dataISO) return "";
  const data = new Date(dataISO);
  return data.toLocaleDateString('pt-BR');
}

function renderizaCards(array) {
  lista.innerHTML = '';
  if (!array || !array.length) {
    lista.innerHTML = "<p style='grid-column:1/-1;text-align:center;'>Nenhum parceiro encontrado.</p>";
    return;
  }
  array.forEach(parceiro => {
    const card = document.createElement('div');
    card.className = 'card-parceiro';
    card.innerHTML = `
      ${getAvatar(parceiro.tipoParceiro)}
      <h3>${parceiro.nomeParceiro}</h3>
      <div class="bairro"><strong>Bairro:</strong> ${parceiro.bairro}</div>
      <div class="data-inclusao"><strong>Incluído em:</strong> ${formataData(parceiro.createdAt)}</div>
    `;
    card.addEventListener('click', () => {
      localStorage.setItem('parceiroSelecionado', parceiro.id);
      window.location.href = 'detalhe-parceiro.html'; 
    });
    lista.appendChild(card);
  });
}

async function carregarParceiros() {
  lista.innerHTML = '<p style="grid-column:1/-1;text-align:center;">Carregando...</p>';
  try {
    const res = await fetch('https://6860899b8e74864084437167.mockapi.io/jmt-futurodev/api/parceiros');
    parceiros = await res.json();
    parceirosFiltrados = parceiros;
    renderizaCards(parceiros);
  } catch {
    lista.innerHTML = '<p style="grid-column:1/-1;text-align:center;color:red;">Erro ao buscar parceiros.</p>';
  }
}

function filtrar() {
  const valor = pesquisa.value.trim().toLowerCase();
  if (!valor) {
    parceirosFiltrados = parceiros;
  } else {
    parceirosFiltrados = parceiros.filter(p =>
      p.nomeParceiro.toLowerCase().includes(valor) ||
      p.bairro.toLowerCase().includes(valor)
    );
  }
  renderizaCards(parceirosFiltrados);
}

btnPesquisar.addEventListener('click', filtrar);
pesquisa.addEventListener('keypress', e => {
  if (e.key === 'Enter') {
    e.preventDefault();
    filtrar();
  }
});

carregarParceiros();
