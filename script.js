document.addEventListener('DOMContentLoaded', () => {
  const menuButton = document.querySelector('.menu-toggle');
  const navigation = document.querySelector('.site-nav');

  if (menuButton && navigation) {
    menuButton.addEventListener('click', () => {
      const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
      menuButton.setAttribute('aria-expanded', String(!isOpen));
      menuButton.setAttribute('aria-label', isOpen ? 'Abrir menu' : 'Fechar menu');
      navigation.classList.toggle('is-open', !isOpen);
    });

    navigation.addEventListener('click', (event) => {
      if (event.target.closest('a')) {
        menuButton.setAttribute('aria-expanded', 'false');
        menuButton.setAttribute('aria-label', 'Abrir menu');
        navigation.classList.remove('is-open');
      }
    });
  }

  document.querySelectorAll('[data-current-year]').forEach((element) => {
    element.textContent = new Date().getFullYear();
  });

  const quoteForm = document.querySelector('#quote-form');
  if (!quoteForm) return;

  quoteForm.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!quoteForm.reportValidity()) return;

    const data = new FormData(quoteForm);
    const details = [
      '*Solicitação de orçamento — GXS*',
      '',
      `*Nome:* ${data.get('nome')}`,
      data.get('empresa') ? `*Empresa:* ${data.get('empresa')}` : null,
      `*Cidade/Estado:* ${data.get('cidade')}`,
      `*Tipo de projeto:* ${data.get('tipo')}`,
      data.get('metragem') ? `*Metragem estimada:* ${data.get('metragem')} m²` : null,
      data.get('prazo') ? `*Prazo pretendido:* ${data.get('prazo')}` : null,
      data.get('detalhes') ? `*Detalhes:* ${data.get('detalhes')}` : null,
    ].filter(Boolean).join('\n');

    const whatsappUrl = `https://wa.me/5535988645788?text=${encodeURIComponent(details)}`;
    const newWindow = window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    const status = document.querySelector('#form-status');
    if (status) {
      status.textContent = newWindow
        ? 'O WhatsApp foi aberto com sua mensagem. Revise e envie para concluir.'
        : 'O navegador bloqueou a nova janela. Use um dos telefones de WhatsApp listados nesta página.';
    }
  });
});
