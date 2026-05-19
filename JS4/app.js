// =============================================
// Regex de validação de e-mail
// =============================================

// Expressão regular para validar formato básico de e-mail.
// Verifica: texto @ texto . texto (ex: joao@email.com)
const REGEX_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Mínimo de caracteres exigido na mensagem
const MIN_CHARS_MENSAGEM = 10;

// =============================================
// Funções de Validação
// =============================================

/**
 * Valida o campo Nome.
 * Regra: não pode estar vazio.
 * @returns {boolean} true se válido, false se inválido
 */
function validarNome() {
  const campo = document.getElementById("nome");
  const erro  = document.getElementById("erro-nome");
  const valor = campo.value.trim(); // remove espaços extras

  if (valor === "") {
    exibirErro(campo, erro, "O nome é obrigatório.");
    return false;
  }

  limparErro(campo, erro);
  return true;
}

/**
 * Valida o campo E-mail.
 * Regras: não pode estar vazio; deve ter formato válido (regex).
 * @returns {boolean} true se válido, false se inválido
 */
function validarEmail() {
  const campo = document.getElementById("email");
  const erro  = document.getElementById("erro-email");
  const valor = campo.value.trim();

  if (valor === "") {
    exibirErro(campo, erro, "O e-mail é obrigatório.");
    return false;
  }

  // Testa o valor contra a expressão regular
  if (!REGEX_EMAIL.test(valor)) {
    exibirErro(campo, erro, "Informe um e-mail válido (ex: nome@email.com).");
    return false;
  }

  limparErro(campo, erro);
  return true;
}

/**
 * Valida o campo Mensagem.
 * Regras: não pode estar vazio; deve ter ao menos MIN_CHARS_MENSAGEM caracteres.
 * @returns {boolean} true se válido, false se inválido
 */
function validarMensagem() {
  const campo = document.getElementById("mensagem");
  const erro  = document.getElementById("erro-mensagem");
  const valor = campo.value.trim();

  if (valor === "") {
    exibirErro(campo, erro, "A mensagem é obrigatória.");
    return false;
  }

  if (valor.length < MIN_CHARS_MENSAGEM) {
    exibirErro(
      campo,
      erro,
      `A mensagem deve ter pelo menos ${MIN_CHARS_MENSAGEM} caracteres. (atual: ${valor.length})`
    );
    return false;
  }

  limparErro(campo, erro);
  return true;
}

// =============================================
// Funções Auxiliares de UI
// =============================================

/**
 * Marca um campo como inválido e exibe a mensagem de erro abaixo dele.
 * @param {HTMLElement} campo - O input ou textarea
 * @param {HTMLElement} erroEl - O <span> de erro correspondente
 * @param {string} mensagem - Texto do erro a exibir
 */
function exibirErro(campo, erroEl, mensagem) {
  campo.classList.add("invalido");
  campo.classList.remove("valido");
  erroEl.textContent = mensagem;
}

/**
 * Marca um campo como válido e limpa a mensagem de erro.
 * @param {HTMLElement} campo - O input ou textarea
 * @param {HTMLElement} erroEl - O <span> de erro correspondente
 */
function limparErro(campo, erroEl) {
  campo.classList.remove("invalido");
  campo.classList.add("valido");
  erroEl.textContent = "";
}

// =============================================
// Contador de Caracteres (Mensagem)
// =============================================

/**
 * Atualiza o contador de caracteres em tempo real enquanto o usuário digita.
 * Também valida o campo para dar feedback visual imediato.
 */
function atualizarContador() {
  const campo    = document.getElementById("mensagem");
  const contador = document.getElementById("contadorMsg");
  const qtd      = campo.value.trim().length;

  // Atualiza o texto do contador
  contador.textContent = `${qtd} / mín. ${MIN_CHARS_MENSAGEM} caracteres`;

  // Muda a cor do contador conforme atinge o mínimo
  contador.style.color = qtd >= MIN_CHARS_MENSAGEM ? "#27ae60" : "#aaa";
}

// =============================================
// Validação em tempo real (ao sair do campo)
// =============================================

// Cada campo valida a si mesmo quando perde o foco (evento "blur"),
// proporcionando feedback imediato sem esperar o envio do formulário
document.getElementById("nome").addEventListener("blur", validarNome);
document.getElementById("email").addEventListener("blur", validarEmail);
document.getElementById("mensagem").addEventListener("blur", validarMensagem);

// =============================================
// Envio do Formulário
// =============================================

/**
 * Intercepta o submit do formulário, valida todos os campos
 * e impede o envio se houver erros.
 * @param {Event} event - Evento de submit
 */
function enviarFormulario(event) {
  // Impede o comportamento padrão do formulário (recarregar a página)
  event.preventDefault();

  // Valida todos os campos e armazena os resultados
  const nomeValido     = validarNome();
  const emailValido    = validarEmail();
  const mensagemValida = validarMensagem();

  // Só prossegue se TODOS os campos forem válidos
  if (!nomeValido || !emailValido || !mensagemValida) {
    // Foca no primeiro campo inválido para melhorar a UX
    if (!nomeValido)          document.getElementById("nome").focus();
    else if (!emailValido)    document.getElementById("email").focus();
    else                      document.getElementById("mensagem").focus();
    return;
  }

  // ── Formulário válido ──
  // Exibe a mensagem de sucesso
  const msgSucesso = document.getElementById("msgSucesso");
  msgSucesso.classList.remove("hidden");

  // Limpa o formulário após envio bem-sucedido
  document.getElementById("contatoForm").reset();

  // Remove classes de validação visual dos campos
  ["nome", "email", "mensagem"].forEach(id => {
    document.getElementById(id).classList.remove("valido", "invalido");
  });

  // Reseta o contador de caracteres
  document.getElementById("contadorMsg").textContent =
    `0 / mín. ${MIN_CHARS_MENSAGEM} caracteres`;
  document.getElementById("contadorMsg").style.color = "#aaa";

  // Oculta a mensagem de sucesso automaticamente após 5 segundos
  setTimeout(() => msgSucesso.classList.add("hidden"), 5000);
}
