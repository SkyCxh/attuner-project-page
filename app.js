const resultTabs = [...document.querySelectorAll('.results-tabs [role="tab"]')];
function selectResultTab(activeTab) {
  resultTabs.forEach(tab => {
    const selected = tab === activeTab;
    tab.setAttribute('aria-selected', String(selected));
    tab.tabIndex = selected ? 0 : -1;
    document.getElementById(tab.getAttribute('aria-controls')).hidden = !selected;
  });
}
resultTabs.forEach((tab, index) => {
  tab.addEventListener('click', () => selectResultTab(tab));
  tab.addEventListener('keydown', event => {
    let nextIndex;
    if (event.key === 'ArrowRight') nextIndex = (index + 1) % resultTabs.length;
    else if (event.key === 'ArrowLeft') nextIndex = (index - 1 + resultTabs.length) % resultTabs.length;
    else if (event.key === 'Home') nextIndex = 0;
    else if (event.key === 'End') nextIndex = resultTabs.length - 1;
    else return;
    event.preventDefault();
    selectResultTab(resultTabs[nextIndex]);
    resultTabs[nextIndex].focus();
  });
});

const copyButton = document.querySelector('#copy-citation');
copyButton.addEventListener('click', async () => {
  const citation = document.querySelector('#bibtex').textContent;
  try {
    await navigator.clipboard.writeText(citation);
    copyButton.textContent = 'Copied ✓';
    document.querySelector('#copy-status').textContent = 'Citation copied to clipboard.';
  } catch {
    const selection = window.getSelection();
    const range = document.createRange();
    range.selectNodeContents(document.querySelector('#bibtex'));
    selection.removeAllRanges(); selection.addRange(range);
    copyButton.textContent = 'Select & copy';
    document.querySelector('#copy-status').textContent = 'Citation selected. Use your copy shortcut.';
  }
});
