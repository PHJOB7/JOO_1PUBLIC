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

  // Q&A feature on the home page
  const askBtn = document.getElementById('qaAsk');
  const questionInput = document.getElementById('qaQuestion');
  const answerElem = document.getElementById('qaAnswer');
  if (askBtn && questionInput && answerElem) {
    askBtn.addEventListener('click', () => {
      const question = questionInput.value.trim();
      if (!question) {
        answerElem.textContent = 'Please type a question.';
        return;
      }
      const answer = answerQuestion(question);
      answerElem.textContent = answer;
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

// Simple keyword‑based answer generator for ToE questions
function answerQuestion(question) {
  const q = question.toLowerCase();
  const answers = {
    'entropy': 'ToE treats entropy as a fundamental, dynamic field rather than a measure of disorder【525666122072993†L37-L42】.',
    'gravity': 'In ToE, gravity emerges from entropy gradients instead of being a fundamental force or spacetime curvature【776252195579583†L112-L125】.',
    'motion': 'Motion arises because the entropic field rearranges itself to maximise flow【776252195579583†L8-L15】.',
    'time': 'Time is an emergent consequence of entropy flow—the past and future are directions of maximal and minimal entropy redistribution【525666122072993†L102-L113】.',
    'speed of light': 'According to ToE, the constancy of the speed of light is an entropic inevitability rather than an independent postulate【423561634356931†L67-L71】.',
    'loa': 'The Local Obidi Action integrates Fisher–Rao, Fubini–Study and Amari–Čencov information‑geometric metrics to describe local entropic dynamics【61771916848198†L42-L59】.',
    'local obidi action': 'The Local Obidi Action integrates Fisher–Rao, Fubini–Study and Amari–Čencov information‑geometric metrics to describe local entropic dynamics【61771916848198†L42-L59】.',
    'soa': 'The Spectral Obidi Action introduces global spectral and modular constraints, unifying bosonic and fermionic actions into a single entropic‑spectral principle【922363920161669†L54-L60】.',
    'spectral obidi action': 'The Spectral Obidi Action introduces global spectral and modular constraints, unifying bosonic and fermionic actions into a single entropic‑spectral principle【922363920161669†L54-L60】.',
    'master entropic equation': 'The Master Entropic Equation governs how entropy gradients evolve and couple to geometry, matter and information【525666122072993†L115-L124】.',
    'entropic geodesics': 'Entropic geodesics describe natural paths in the entropic manifold and replace classical trajectories in ToE【525666122072993†L115-L124】.',
    'obidi': 'Obidi Actions are variational principles—the Local and Spectral Obidi Actions—that define the dynamics of the entropic field【61771916848198†L34-L41】.',
    'entropy field': 'The entropic field is the fundamental substrate of reality in ToE—it generates space, time and matter【525666122072993†L37-L42】.'
  };
  for (const key in answers) {
    if (q.includes(key)) {
      return answers[key];
    }
  }
  return 'I\'m sorry, I don\'t have information on that. Please see the Resources page for more details.';
}