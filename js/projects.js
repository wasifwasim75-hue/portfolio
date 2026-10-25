/**
 * Projects Script - Modal Quick-View
 */

const PROJECTS_DATA = {
  'apextask': {
    title: 'ApexDesk Cloud Workspace',
    category: 'Full Stack',
    subtitle: 'Collaborative Agile Project & Task Management Platform',
    description: 'A comprehensive full-stack productivity web application featuring real-time task board synchronization, user authentication, role-based project workspaces, and customizable status pipelines.',
    features: [
      'JWT-authenticated REST API with secure cookie sessions',
      'Drag-and-drop Kanban boards with optimistic UI updates',
      'MongoDB aggregation pipelines for team velocity metrics',
      'Responsive mocha & amber aesthetic with dark mode optimization'
    ],
    tech: ['Node.js', 'Express', 'MongoDB', 'JavaScript (ES6+)', 'REST API', 'CSS Grid'],
    liveDemoUrl: 'https://example.com/demo/apextask',
    githubUrl: 'https://github.com/username/apexdesk-cloud'
  },
  'auraluxe': {
    title: 'AuraLuxe Studio Store',
    category: 'Frontend',
    subtitle: 'Editorial High-Performance E-Commerce Experience',
    description: 'An editorial-grade digital storefront inspired by luxury architecture and design. Features smooth multi-step product customization, responsive persistent cart management, and instant search filtering.',
    features: [
      'Zero-dependency modular JavaScript architecture for rapid paint times',
      'Client-side state persistence with LocalStorage & session management',
      'Accessible keyboard navigation with ARIA live regions for cart updates',
      'Custom champagne-gold product carousel and responsive image grids'
    ],
    tech: ['HTML5', 'Modern CSS', 'JavaScript', 'Web Storage API', 'Responsive UI'],
    liveDemoUrl: 'https://example.com/demo/auraluxe',
    githubUrl: 'https://github.com/username/auraluxe-store'
  },
  'pulsemetrics': {
    title: 'PulseMetrics Telemetry',
    category: 'Full Stack',
    subtitle: 'Developer System Telemetry & Performance Dashboard',
    description: 'A lightweight developer monitoring console that tracks server latency, memory allocation, HTTP status distributions, and active database connection pools in real-time.',
    features: [
      'Python backend providing lightweight streaming REST endpoints',
      'Dynamic SVG charts rendered with pure JavaScript canvas calculations',
      'Configurable alert thresholds for latency spikes and error logs',
      'Customizable metric time-windows (1h, 24h, 7d)'
    ],
    tech: ['Python', 'Node.js', 'JavaScript', 'REST API', 'SVG Charts', 'CSS Flexbox'],
    liveDemoUrl: 'https://example.com/demo/pulsemetrics',
    githubUrl: 'https://github.com/username/pulsemetrics-telemetry'
  },
  'algocraft': {
    title: 'AlgoCraft Interactive',
    category: 'Systems & Tools',
    subtitle: 'Algorithm & Data Structure Step-Through Visualizer',
    description: 'An educational visualizer designed to demystify complex computer science concepts, including Graph Traversals (Dijkstra, BFS/DFS), Sorting algorithms, and Tree balancing operations with step-by-step playback.',
    features: [
      'Interactive speed control, step-by-step scrubber, and pause functionality',
      'Custom visual representation of memory pointers and call stacks',
      'Comparative time and space complexity breakdown for each algorithm',
      'C/C++ and Java reference code tabs alongside visual execution'
    ],
    tech: ['JavaScript', 'HTML5 Canvas', 'CSS3', 'Algorithms', 'Data Structures'],
    liveDemoUrl: 'https://example.com/demo/algocraft',
    githubUrl: 'https://github.com/username/algocraft-visualizer'
  }
};

document.addEventListener('DOMContentLoaded', () => {
  initProjectModal();
});

/**
 * Project Details Modal
 */
function initProjectModal() {
  const modal = document.getElementById('projectModal');
  const viewBtns = document.querySelectorAll('.js-view-project');
  if (!modal || !viewBtns.length) return;

  const closeBtns = modal.querySelectorAll('.modal-close-btn, .js-modal-close');
  const modalTitle = document.getElementById('modalProjectTitle');
  const modalSubtitle = document.getElementById('modalProjectSubtitle');
  const modalDesc = document.getElementById('modalProjectDesc');
  const modalFeatures = document.getElementById('modalProjectFeatures');
  const modalTech = document.getElementById('modalProjectTech');
  const modalLiveBtn = document.getElementById('modalLiveBtn');
  const modalRepoBtn = document.getElementById('modalRepoBtn');

  const openModal = (projectId) => {
    const data = PROJECTS_DATA[projectId];
    if (!data) return;

    if (modalTitle) modalTitle.textContent = data.title;
    if (modalSubtitle) modalSubtitle.textContent = data.subtitle;
    if (modalDesc) modalDesc.textContent = data.description;

    if (modalFeatures) {
      modalFeatures.innerHTML = data.features
        .map(feat => `
          <li class="service-feature-item" style="margin-bottom: 8px;">
            <svg viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
            </svg>
            <span>${feat}</span>
          </li>
        `).join('');
    }

    if (modalTech) {
      modalTech.innerHTML = data.tech
        .map(t => `<span class="tag tag-amber">${t}</span>`)
        .join('');
    }

    if (modalLiveBtn) {
      modalLiveBtn.href = data.liveDemoUrl;
      modalLiveBtn.onclick = (e) => {
        e.preventDefault();
        window.showToast(`Launching preview for ${data.title}...`, 'info');
      };
    }

    if (modalRepoBtn) {
      modalRepoBtn.href = data.githubUrl;
      modalRepoBtn.onclick = (e) => {
        e.preventDefault();
        window.showToast(`Opening repository for ${data.title}...`, 'info');
      };
    }

    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  viewBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const projectId = btn.getAttribute('data-project-id');
      openModal(projectId);
    });
  });

  closeBtns.forEach(btn => btn.addEventListener('click', closeModal));

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('open')) {
      closeModal();
    }
  });
}
