// src/components/ContactForm.jsx
// Formulário de contato com validação no front-end (Atividade 4)

import { useState } from "react";

// Regex para validação básica de e-mail
const REGEX_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MIN_CHARS = 10;

function ContactForm() {
  // Estado dos campos do formulário
  const [campos, setCampos] = useState({ nome: "", email: "", mensagem: "" });

  // Estado dos erros individuais por campo
  const [erros, setErros] = useState({ nome: "", email: "", mensagem: "" });

  // Controla a exibição da mensagem de sucesso
  const [sucesso, setSucesso] = useState(false);

  // ── Atualiza o valor do campo e limpa o erro ao digitar ──
  function handleChange(e) {
    const { name, value } = e.target;
    setCampos((prev) => ({ ...prev, [name]: value }));
    // Limpa o erro do campo assim que o usuário começa a corrigir
    setErros((prev) => ({ ...prev, [name]: "" }));
  }

  // ── Validação individual de cada campo (chamada no blur e no submit) ──
  function validarCampo(nome, valor) {
    if (nome === "nome") {
      if (!valor.trim()) return "O nome é obrigatório.";
    }
    if (nome === "email") {
      if (!valor.trim()) return "O e-mail é obrigatório.";
      if (!REGEX_EMAIL.test(valor)) return "Informe um e-mail válido (ex: nome@email.com).";
    }
    if (nome === "mensagem") {
      if (!valor.trim()) return "A mensagem é obrigatória.";
      if (valor.trim().length < MIN_CHARS)
        return `A mensagem deve ter pelo menos ${MIN_CHARS} caracteres. (atual: ${valor.trim().length})`;
    }
    return ""; // sem erro
  }

  // ── Valida ao sair do campo (feedback imediato) ──
  function handleBlur(e) {
    const { name, value } = e.target;
    const erro = validarCampo(name, value);
    setErros((prev) => ({ ...prev, [name]: erro }));
  }

  // ── Submissão do formulário ──
  function handleSubmit(e) {
    e.preventDefault(); // impede recarregar a página

    // Valida todos os campos de uma vez
    const novosErros = {
      nome:      validarCampo("nome",      campos.nome),
      email:     validarCampo("email",     campos.email),
      mensagem:  validarCampo("mensagem",  campos.mensagem),
    };

    setErros(novosErros);

    // Se houver qualquer erro, bloqueia o envio
    const temErro = Object.values(novosErros).some((e) => e !== "");
    if (temErro) return;

    // Formulário válido: exibe sucesso e limpa os campos
    setSucesso(true);
    setCampos({ nome: "", email: "", mensagem: "" });

    // Oculta a mensagem de sucesso após 5 segundos
    setTimeout(() => setSucesso(false), 5000);
  }

  return (
    <section className="form-section">
      <h2>📬 Formulário de Contato</h2>
      <p className="form-subtitle">Dúvidas, sugestões ou elogios? Fale com a gente!</p>

      <form onSubmit={handleSubmit} noValidate>

        {/* Campo Nome */}
        <div className="form-group">
          <label htmlFor="nome">
            Nome completo <span className="obrigatorio">*</span>
          </label>
          <input
            type="text"
            id="nome"
            name="nome"
            value={campos.nome}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Ex: João da Silva"
            className={erros.nome ? "invalido" : campos.nome ? "valido" : ""}
          />
          {/* Exibe o erro abaixo do campo quando houver */}
          {erros.nome && <span className="erro">⚠ {erros.nome}</span>}
        </div>

        {/* Campo E-mail */}
        <div className="form-group">
          <label htmlFor="email">
            E-mail <span className="obrigatorio">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={campos.email}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Ex: joao@email.com"
            className={erros.email ? "invalido" : campos.email ? "valido" : ""}
          />
          {erros.email && <span className="erro">⚠ {erros.email}</span>}
        </div>

        {/* Campo Mensagem */}
        <div className="form-group">
          <label htmlFor="mensagem">
            Mensagem <span className="obrigatorio">*</span>
            {/* Contador de caracteres em tempo real */}
            <small
              className="contador"
              style={{ color: campos.mensagem.trim().length >= MIN_CHARS ? "#27ae60" : "#aaa" }}
            >
              {campos.mensagem.trim().length} / mín. {MIN_CHARS} caracteres
            </small>
          </label>
          <textarea
            id="mensagem"
            name="mensagem"
            rows={5}
            value={campos.mensagem}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Escreva sua mensagem aqui..."
            className={erros.mensagem ? "invalido" : campos.mensagem ? "valido" : ""}
          />
          {erros.mensagem && <span className="erro">⚠ {erros.mensagem}</span>}
        </div>

        <button type="submit" className="btn-enviar">
          Enviar Mensagem 📨
        </button>

        {/* Mensagem de sucesso exibida após envio válido */}
        {sucesso && (
          <div className="sucesso">
            ✅ Mensagem enviada com sucesso! Entraremos em contato em breve.
          </div>
        )}
      </form>
    </section>
  );
}

export default ContactForm;
