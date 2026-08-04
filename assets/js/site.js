document.addEventListener('click', async (event) => {
  const button = event.target.closest('[data-copy="bibtex"]');
  if (!button) return;
  const source = document.getElementById('bibtex');
  if (!source) return;
  try {
    await navigator.clipboard.writeText(source.textContent);
    button.textContent = 'Copied';
    setTimeout(() => { button.textContent = 'Copy BibTeX'; }, 1600);
  } catch {
    button.textContent = 'Select text manually';
  }
});
