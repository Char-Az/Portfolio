// Mobile navigation toggle
const navToggle = document.querySelector('.nav-toggle');
const siteNav = document.querySelector('.site-nav');
const navLinks = document.querySelectorAll('.site-nav a');

if (navToggle && siteNav) {
  navToggle.addEventListener('click', () => {
    const expanded = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', String(!expanded));
    siteNav.classList.toggle('is-open');
  });

  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      siteNav.classList.remove('is-open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

// Scroll reveal
const revealItems = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.15,
  }
);

revealItems.forEach((item) => revealObserver.observe(item));

// Active navigation highlighting
const sections = document.querySelectorAll('main section[id]');
const navObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        navLinks.forEach((link) => {
          const href = link.getAttribute('href');
          link.classList.toggle('active', href === `#${entry.target.id}`);
        });
      }
    });
  },
  {
    threshold: 0.35,
  }
);

sections.forEach((section) => navObserver.observe(section));

// Footer year
const footerYear = document.getElementById('year');
if (footerYear) {
  footerYear.textContent = new Date().getFullYear();
}

// Project modal content
const projectDetails = {
  tuner: {
    title: 'ESP32-S3 Smart Instrument Tuner',
    overview:
      'A real-time tuner for bowed string instruments that blends embedded firmware, analog and digital audio handling, and carefully tuned DSP routines.',
    goals: [
      'Provide a responsive pitch-reading experience for students and performers.',
      'Explore deterministic DSP testing using generated signals and task-based firmware architecture.',
      'Lay groundwork for future display and Bluetooth enhancements.'
    ],
    progress: [
      'Initial firmware structure and audio input path are in place.',
      'The software includes deterministic DSP testing with generated audio signals.',
      'A real-time task-based architecture is being refined for responsiveness.'
    ],
    challenges: [
      'Balancing low-latency signal processing with clear display updates.',
      'Designing a simple hardware path for both analog and digital audio inputs.',
      'Keeping the measurement logic understandable for future debugging.'
    ],
    nextSteps: [
      'Add a more polished display interface and tuning feedback states.',
      'Improve calibration and note detection reliability.',
      'Plan future Bluetooth and instrument-specific enhancements.'
    ]
  },
  robotics: {
    title: 'Robotics Programming',
    overview:
      'Programming and testing systems for a high school robotics team while helping newer members learn the codebase.',
    goals: [
      'Support reliable robot behavior through thoughtful code and testing.',
      'Help newer team members understand sensors, actuation, and debugging.',
      'Contribute to teamwork and dependable software habits.'
    ],
    progress: [
      'The team continues to refine software for sensing and actuation.',
      'Mentoring newer members has become a regular part of the workflow.'
    ],
    challenges: [
      'Keeping code clear while debugging hardware-related issues.',
      'Learning to balance speed and reliability during competitive development.',
      'Teaching newer members without losing momentum.'
    ],
    nextSteps: [
      'Expand documentation for the codebase and common debugging steps.',
      'Improve testing routines and simplify recurring tasks.',
      'Continue mentoring and strengthening team collaboration.'
    ]
  },
  makerspace: {
    title: 'Library Makerspace and 3D Printing',
    overview:
      'Helping library visitors explore fabrication tools and supporting makerspace appointments with patience and clear communication.',
    goals: [
      'Make fabrication tools more approachable for beginners.',
      'Support safe and successful printing experiences.',
      'Offer practical help with troubleshooting and setup.'
    ],
    progress: [
      'Regular appointments and public support are ongoing.',
      'Basic troubleshooting support is becoming a consistent part of the role.'
    ],
    challenges: [
      'Helping visitors with varied experience levels in a public setting.',
      'Balancing efficiency with clear guidance.',
      'Explaining technical steps without making the experience feel overwhelming.'
    ],
    nextSteps: [
      'Develop more structured guidance for common printing issues.',
      'Expand support for beginner-friendly projects.',
      'Continue building confidence in public-facing technical communication.'
    ]
  },
  strings: {
    title: 'Strings for Change',
    overview:
      'A student chamber-music service project that brings performance and community outreach together.',
    goals: [
      'Support community organizations and charitable causes through performance.',
      'Build teamwork and coordination in a service-focused music project.',
      'Create a meaningful way to connect music with service.'
    ],
    progress: [
      'The project continues to grow through rehearsals and performance planning.',
      'Community-oriented events remain a central focus.'
    ],
    challenges: [
      'Coordinating performances while balancing school and personal commitments.',
      'Finding ways to make the project sustainable and organized.',
      'Keeping the musical experience meaningful for both performers and audiences.'
    ],
    nextSteps: [
      'Expand outreach and plan new performances.',
      'Refine coordination and event planning processes.',
      'Continue developing the project into a lasting community initiative.'
    ]
  }
};

const modal = document.getElementById('project-modal');
const modalContent = document.getElementById('modal-content');
const openButtons = document.querySelectorAll('[data-open-project]');
const closeButtons = document.querySelectorAll('[data-close-modal]');
const modalPanel = modal.querySelector('.modal-panel');
let lastFocusedElement = null;

function openProjectModal(projectKey) {
  const data = projectDetails[projectKey];
  if (!data) return;

  lastFocusedElement = document.activeElement;
  modalContent.innerHTML = `
    <div class="modal-content">
      <h3>${data.title}</h3>
      <p>${data.overview}</p>
      <h4>Project goals</h4>
      <ul>${data.goals.map((item) => `<li>${item}</li>`).join('')}</ul>
      <h4>Current progress</h4>
      <ul>${data.progress.map((item) => `<li>${item}</li>`).join('')}</ul>
      <h4>Challenges</h4>
      <ul>${data.challenges.map((item) => `<li>${item}</li>`).join('')}</ul>
      <h4>Next steps</h4>
      <ul>${data.nextSteps.map((item) => `<li>${item}</li>`).join('')}</ul>
    </div>
  `;

  modal.classList.add('is-open');
  modal.setAttribute('aria-hidden', 'false');
  modalPanel.focus();
  document.body.style.overflow = 'hidden';
}

function closeProjectModal() {
  modal.classList.remove('is-open');
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
  if (lastFocusedElement) {
    lastFocusedElement.focus();
  }
}

openButtons.forEach((button) => {
  button.addEventListener('click', () => {
    openProjectModal(button.dataset.openProject);
  });
});

closeButtons.forEach((button) => {
  button.addEventListener('click', closeProjectModal);
});

modal.addEventListener('click', (event) => {
  if (event.target === modal) {
    closeProjectModal();
  }
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && modal.classList.contains('is-open')) {
    closeProjectModal();
  }

  if (event.key === 'Tab' && modal.classList.contains('is-open')) {
    const focusable = modalPanel.querySelectorAll('button, [href], input, textarea, select, [tabindex]:not([tabindex="-1"])');
    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }
});

// Contact form mailto action
const contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const data = new FormData(contactForm);
    const name = data.get('name')?.toString().trim() || 'Hello';
    const email = data.get('email')?.toString().trim() || 'YOUR_EMAIL_HERE';
    const message = data.get('message')?.toString().trim() || 'Thanks for reaching out.';
    const mailtoLink = `mailto:YOUR_EMAIL_HERE?subject=${encodeURIComponent(`Portfolio contact from ${name}`)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`)}`;
    window.location.href = mailtoLink;
  });
}
