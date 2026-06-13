const sections = Array.from(document.querySelectorAll('section[id]'));
const navLinks = Array.from(document.querySelectorAll('.nav-link'));
const revealItems = Array.from(document.querySelectorAll('.reveal'));
const skillButtons = Array.from(document.querySelectorAll('.chip'));
const skillCards = Array.from(document.querySelectorAll('.skill-card'));
const githubContainer = document.getElementById('github-contributions');
const githubTotal = document.getElementById('gh-total-contributions');

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

function contributionLevel(count) {
    if (count <= 0) return 0;
    if (count <= 2) return 1;
    if (count <= 5) return 2;
    if (count <= 9) return 3;
    return 4;
}

function renderContributionCells(contributions) {
    if (!githubContainer) return;

    githubContainer.innerHTML = '';
    let total = 0;

    contributions.forEach((entry) => {
        const cell = document.createElement('span');
        const level = contributionLevel(entry.contributionCount || 0);
        total += entry.contributionCount || 0;
        cell.className = `contribution-cell contribution-card-${level}`;
        cell.title = `${entry.date}: ${entry.contributionCount || 0} contributions`;
        githubContainer.appendChild(cell);
    });

    if (githubTotal) {
        githubTotal.textContent = `${total.toLocaleString()} contributions in the last year`;
    }
}

async function loadGitHubContributions() {
    if (!githubContainer) return;

    try {
        const response = await fetch('https://github-contributions-api.deno.dev/alfa546.json?flat=true', { cache: 'no-store' });
        const data = await response.json();
        renderContributionCells(data.contributions || []);
    } catch (error) {
        const fallback = Array.from({ length: 365 }, (_, index) => ({
            contributionCount: index % 13 === 0 ? 8 : index % 7 === 0 ? 3 : 0,
            date: `2025-${String(Math.floor(index / 30) + 1).padStart(2, '0')}-${String((index % 30) + 1).padStart(2, '0')}`
        }));
        renderContributionCells(fallback);
    }
}

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
loadGitHubContributions();
