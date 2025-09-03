// Login
const loginForm = document.getElementById('loginForm');
const loginMsg = document.getElementById('loginMsg');

loginForm.addEventListener('submit', e => {
  e.preventDefault();
  const usuario = document.getElementById('usuario').value;
  const senha = document.getElementById('senha').value;
  if(usuario === "admin" && senha === "1234"){
    loginMsg.textContent = "Login realizado com sucesso!";
    loginMsg.style.color = "lime";
  } else {
    loginMsg.textContent = "Usuário ou senha inválidos!";
    loginMsg.style.color = "red";
  }
});

// Agendamento e PIX
const agendarForm = document.getElementById('agendarForm');
const pixArea = document.getElementById('pixArea');
const pixQRCode = document.getElementById('pixQRCode');
const pixKeyDisplay = document.getElementById('pixKeyDisplay');
const agendamentoMsg = document.getElementById('agendamentoMsg');
const agendamentosList = document.getElementById('agendamentosList');

function carregarAgendamentos(){
  const agendamentos = JSON.parse(localStorage.getItem('agendamentos')) || [];
  agendamentosList.innerHTML = "";
  agendamentos.forEach((a, i) => {
    const li = document.createElement('li');
    li.textContent = `${i+1}. Serviço: ${a.servico}, Barbeiro: ${a.barbeiro}, Data: ${a.data}, Hora: ${a.hora}, Avaliação: ${a.avaliacao}`;
    agendamentosList.appendChild(li);
  });
}

agendarForm.addEventListener('submit', e => {
  e.preventDefault();
  const servico = document.getElementById('servicoSelect').value;
  const barbeiro = document.getElementById('barbeiroSelect').value;
  const data = document.getElementById('data').value;
  const hora = document.getElementById('hora').value;
  const avaliacao = document.getElementById('avaliacao').value;
  const pixKey = document.getElementById('pixKey').value;

  if(avaliacao < 1 || avaliacao > 5){
    agendamentoMsg.textContent = "Avaliação deve ser de 1 a 5!";
    agendamentoMsg.style.color = "red";
    return;
  }

  const agendamentos = JSON.parse(localStorage.getItem('agendamentos')) || [];
  agendamentos.push({servico, barbeiro, data, hora, avaliacao});
  localStorage.setItem('agendamentos', JSON.stringify(agendamentos));

  carregarAgendamentos();
  agendamentoMsg.textContent = "Agendamento realizado e PIX gerado!";
  agendamentoMsg.style.color = "lime";

  pixArea.style.display = "block";
  pixKeyDisplay.textContent = `Chave PIX: ${pixKey}`;
  QRCode.toCanvas(pixQRCode, pixKey, function (error) {
    if(error) console.error(error);
  });
});

carregarAgendamentos();
