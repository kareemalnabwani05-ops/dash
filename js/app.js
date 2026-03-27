const routes = {
  home: document.getElementById('home'),
  gallery: document.getElementById('gallery'),
  contact: document.getElementById('contact')
};

const navLinks = document.querySelectorAll('.nav-link');

function setActiveNav(section) {
  navLinks.forEach(link => {
    const hash = link.getAttribute('href').replace('#', '');
    if (hash === section) {
      link.classList.add('text-primary', 'font-bold');
      link.classList.remove('text-foreground');
    } else {
      link.classList.remove('text-primary', 'font-bold');
      link.classList.add('text-foreground');
    }
  });
}

function showSection(sectionName) {
  if (!routes[sectionName]) sectionName = 'home';

  Object.values(routes).forEach(section => {
    section.classList.add('hidden');
  });

  routes[sectionName].classList.remove('hidden');
  setActiveNav(sectionName);
  document.title = `DashNShine — ${sectionName[0].toUpperCase() + sectionName.slice(1)}`;
}

function routeFromLocation() {
  const hash = window.location.hash.replace('#', '');
  if (hash && routes[hash]) {
    showSection(hash);
  } else {
    showSection('home');
  }
}

window.addEventListener('popstate', routeFromLocation);
window.addEventListener('hashchange', routeFromLocation);

navLinks.forEach(link => {
  link.addEventListener('click', ev => {
    ev.preventDefault();
    const target = link.getAttribute('href').replace('#', '');
    if (window.history && window.history.pushState) {
      history.pushState(null, '', `#${target}`);
    } else {
      window.location.hash = target;
    }
    showSection(target);
  });
});

const contactForm = document.getElementById('contact-form');
const contactFeedback = document.getElementById('contact-feedback');

if (contactForm) {
  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();
    contactFeedback.textContent = 'Thanks! Your message has been submitted (demo mode).';
    contactFeedback.classList.add('text-gold');
    contactForm.reset();
  });
}

routeFromLocation();
