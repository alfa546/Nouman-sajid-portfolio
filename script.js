const sections = Array.from(document.querySelectorAll('section[id]'));
const navLinks = Array.from(document.querySelectorAll('.nav-link'));
const revealItems = Array.from(document.querySelectorAll('.reveal'));
const skillButtons = Array.from(document.querySelectorAll('.chip'));
const skillCards = Array.from(document.querySelectorAll('.skill-card'));

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.18 });

revealItems.forEach((item) => observer.observe(item));

function setActiveNav(id) {
    navLinks.forEach((link) => {
        link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
    });
}

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            setActiveNav(entry.target.id);
        }
    });
}, { threshold: 0.45 });

sections.forEach((section) => sectionObserver.observe(section));

navLinks.forEach((link) => {
    link.addEventListener('click', (event) => {
        const target = document.querySelector(link.getAttribute('href'));
        if (!target) return;
        event.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
});

skillButtons.forEach((button) => {
    button.addEventListener('click', () => {
        const filter = button.dataset.filter;
        skillButtons.forEach((item) => item.classList.toggle('active', item === button));

        skillCards.forEach((card) => {
            const categories = card.dataset.category || '';
            const visible = filter === 'all' || categories.includes(filter);
            card.classList.toggle('hidden', !visible);
        });
    });
});

const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const button = contactForm.querySelector('.submit-btn');
        const original = button.innerHTML;

        button.innerHTML = 'Sending... <i class="bx bx-loader-alt bx-spin"></i>';
        button.disabled = true;

        setTimeout(() => {
            button.innerHTML = 'Message Sent! <i class="bx bx-check"></i>';
            contactForm.reset();

            setTimeout(() => {
                button.innerHTML = original;
                button.disabled = false;
            }, 1800);
        }, 1100);
    });
}

setActiveNav('home');
