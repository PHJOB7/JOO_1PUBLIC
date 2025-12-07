// JavaScript for handling contributions on the Extend page

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contribForm');
  const listContainer = document.getElementById('contribList');
  if (listContainer) {
    renderContributions(listContainer);
  }
  if (form) {
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const title = document.getElementById('title').value.trim();
      const content = document.getElementById('content').value.trim();
      const authorField = document.getElementById('author');
      const author = authorField.value.trim() || 'Anonymous';
      if (!title || !content) {
        alert('Please provide both a title and content.');
        return;
      }
      const contributions = JSON.parse(localStorage.getItem('toe_contributions') || '[]');
      contributions.push({ title, content, author });
      localStorage.setItem('toe_contributions', JSON.stringify(contributions));
      // Clear form fields
      document.getElementById('title').value = '';
      document.getElementById('content').value = '';
      authorField.value = '';
      renderContributions(listContainer);
    });
  }
});

function renderContributions(container) {
  const contributions = JSON.parse(localStorage.getItem('toe_contributions') || '[]');
  let html = '';
  if (contributions.length === 0) {
    html = '<p>No contributions yet. Be the first to share your thoughts!</p>';
  } else {
    html += '<h3>Community Contributions</h3><ul class="contributions">';
    // Newest first
    for (let i = contributions.length - 1; i >= 0; i--) {
      const item = contributions[i];
      html += `<li class="contribution-item"><h4>${escapeHtml(item.title)}</h4>` +
              `<p>${escapeHtml(item.content)}</p>` +
              `<p class="author">— ${escapeHtml(item.author)}</p></li>`;
    }
    html += '</ul>';
  }
  container.innerHTML = html;
}

function escapeHtml(str) {
  return str.replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#x27;');
}