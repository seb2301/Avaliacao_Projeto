const card = document.getElementById('detalhe-parceiro-card');
const id = localStorage.getItem('parceiroSelecionado');

function getAvatar(tipo) {
  if (tipo === 'ECO') return '<span class="avatar-grande" title="Ecoponto">♻️</span>';
  if (tipo === 'COO') return '<span class="avatar-grande" title="Cooperativa">🏭</span>';
  return '<span class="avatar-grande" title="PEV">🗑️</span>';
}
function tipoTexto(tipo) {
  if (tipo === 'ECO') return 'Ecoponto';
  if (tipo === 'COO') return 'Cooperativa';
  return 'Ponto de Entrega Voluntária (PEV)';
}
function formataData(dataISO) {
  if (!dataISO) return "";
  const data = new Date(dataISO);
  return data.toLocaleDateString('pt-BR');
}

async function renderDetalhe() {
  card.innerHTML = '<p style="text-align:center;">Carregando...</p>';
  try {
    const res = await fetch(`https://6860899b8e74864084437167.mockapi.io/jmt-futurodev/api/parceiros/${id}`);
    if (!res.ok) throw new Error('Não encontrado');
    const p = await res.json();

    const residuosAceitos = [
      { campo: 'papel', label: 'Papel' },
      { campo: 'plastico', label: 'Plástico' },
      { campo: 'vidro', label: 'Vidro' },
      { campo: 'metal', label: 'Metal' },
      { campo: 'oleoCozinha', label: 'Óleo de cozinha' },
      { campo: 'pilhaBateria', label: 'Pilhas e baterias' },
      { campo: 'eletronico', label: 'Eletrônicos' },
      { campo: 'roupa', label: 'Roupas' },
      { campo: 'outros', label: 'Outros' }
    ].filter(item => p[item.campo]);

    card.innerHTML = `
      ${getAvatar(p.tipoParceiro)}
      <div class="data-inclusao"><strong>Data de cadastro:</strong> ${formataData(p.createdAt)}</div>
      <div class="titulo">${p.nomeParceiro}</div>
      <div class="info-bloco"><strong>Tipo:</strong> ${tipoTexto(p.tipoParceiro)}</div>
      <div class="info-contato">
        <span><strong>Responsável:</strong> ${p.responsavelParceiro}</span>
        <span><strong>Telefone:</strong> ${p.telResponsavel}</span>
        <span><strong>E-mail:</strong> ${p.emailResponsavel}</span>
      </div>
      <div class="endereco">
        <strong>Endereço:</strong> Rua ${p.rua}, Nº ${p.numero} - Bairro ${p.bairro}
      </div>
      <div class="info-bloco"><strong>Tipos de resíduos aceitos:</strong>
        <div class="residuos-list">
          ${residuosAceitos.length ? residuosAceitos.map(r => `<span class="residuo">${r.label}</span>`).join('') : '<em>Nenhum informado</em>'}
        </div>
      </div>
    `;
  } catch {
    card.innerHTML = '<p style="color:red;text-align:center;">Erro ao carregar detalhes do parceiro.</p>';
  }
}
renderDetalhe();
