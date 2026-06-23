/* ==========================================================================
   PREMIUM PORTFOLIO — JAVASCRIPT v2.0
   Author: Nouman Sajid
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

    // ── 1. Initialize Lucide Icons ──────────────────────────────────────
    if (window.lucide) {
        window.lucide.createIcons();
    }

    // ── 2. Canvas Starfield Background ──────────────────────────────────
    const canvas = document.getElementById('canvas-background');
    const ctx = canvas.getContext('2d');

    let stars = [];
    let shootingStars = [];
    let starCount = 100;
    let maxShootingStars = 4;
    let framesSinceLastSpawn = 0;
    let nextSpawnDelay = Math.random() * 120 + 90;

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        if (window.innerWidth < 768) {
            starCount = 40;
            maxShootingStars = 2;
        } else if (window.innerWidth < 1024) {
            starCount = 70;
            maxShootingStars = 3;
        } else {
            starCount = 100;
            maxShootingStars = 4;
        }
    }
    resizeCanvas();

    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            resizeCanvas();
            initStars();
        }, 200);
    });

    class Star {
        constructor() {
            this.reset();
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
        }

        reset() {
            this.x = Math.random() * canvas.width;
            this.y = 0;
            this.radius = Math.random() * 1.2 + 0.4;
            this.baseOpacity = Math.random() * 0.4 + 0.2;
            this.opacity = this.baseOpacity;
            this.twinkleSpeed = Math.random() * 0.02 + 0.008;
            this.twinklePhase = Math.random() * Math.PI * 2;
            this.vx = -(Math.random() * 0.03 + 0.01);
            this.vy = Math.random() * 0.03 + 0.01;
            this.colorType = Math.floor(Math.random() * 3);
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;
            this.twinklePhase += this.twinkleSpeed;
            this.opacity = this.baseOpacity + Math.sin(this.twinklePhase) * 0.2;
            this.opacity = Math.max(0.05, Math.min(0.9, this.opacity));

            if (this.x < 0) this.x = canvas.width;
            if (this.y > canvas.height) {
                this.y = 0;
                this.x = Math.random() * canvas.width;
            }
        }

        draw() {
            const isLight = document.body.classList.contains('light-mode');
            let color;

            if (isLight) {
                if (this.colorType === 0) color = `rgba(79, 70, 229, ${this.opacity * 0.6})`;
                else if (this.colorType === 1) color = `rgba(14, 165, 233, ${this.opacity * 0.6})`;
                else color = `rgba(139, 92, 246, ${this.opacity * 0.6})`;
            } else {
                if (this.colorType === 0) color = `rgba(255, 255, 255, ${this.opacity})`;
                else if (this.colorType === 1) color = `rgba(165, 243, 252, ${this.opacity * 0.85})`;
                else color = `rgba(196, 181, 253, ${this.opacity * 0.85})`;
            }

            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = color;
            ctx.fill();
        }
    }

    class ShootingStar {
        constructor() {
            this.reset();
        }

        reset() {
            if (Math.random() < 0.6) {
                this.x = Math.random() * (canvas.width + 200) - 100;
                this.y = -40;
            } else {
                this.x = canvas.width + 40;
                this.y = Math.random() * (canvas.height * 0.7);
            }

            const speed = Math.random() * 6 + 8;
            const angle = (Math.PI / 6) + Math.random() * (Math.PI / 6);

            this.vx = -Math.cos(angle) * speed;
            this.vy = Math.sin(angle) * speed;
            this.trailFactor = Math.random() * 6 + 6;
            this.width = Math.random() * 1.2 + 0.8;
            this.opacity = 1.0;
            this.fadeSpeed = Math.random() * 0.006 + 0.004;
            this.active = true;
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;
            this.opacity -= this.fadeSpeed;

            if (this.opacity <= 0 || this.x < -200 || this.y > canvas.height + 200) {
                this.active = false;
            }
        }

        draw() {
            if (!this.active) return;

            const isLight = document.body.classList.contains('light-mode');
            const tailX = this.x - this.vx * this.trailFactor;
            const tailY = this.y - this.vy * this.trailFactor;

            const grad = ctx.createLinearGradient(this.x, this.y, tailX, tailY);

            if (isLight) {
                grad.addColorStop(0, `rgba(79, 70, 229, ${this.opacity})`);
                grad.addColorStop(0.3, `rgba(14, 165, 233, ${this.opacity * 0.5})`);
                grad.addColorStop(1, `rgba(139, 92, 246, 0)`);
            } else {
                grad.addColorStop(0, `rgba(255, 255, 255, ${this.opacity})`);
                grad.addColorStop(0.3, `rgba(6, 182, 212, ${this.opacity * 0.7})`);
                grad.addColorStop(1, `rgba(99, 102, 241, 0)`);
            }

            ctx.strokeStyle = grad;
            ctx.lineWidth = this.width;
            ctx.lineCap = 'round';
            ctx.beginPath();
            ctx.moveTo(this.x, this.y);
            ctx.lineTo(tailX, tailY);
            ctx.stroke();

            if (!isLight) {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.width, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
                ctx.fill();
            }
        }
    }

    function initStars() {
        stars = [];
        for (let i = 0; i < starCount; i++) {
            stars.push(new Star());
        }
        shootingStars = [];
        framesSinceLastSpawn = 0;
    }
    initStars();

    let isTabActive = true;
    document.addEventListener('visibilitychange', () => {
        isTabActive = !document.hidden;
    });

    function animateStars() {
        if (!isTabActive) {
            requestAnimationFrame(animateStars);
            return;
        }

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        for (const star of stars) {
            star.update();
            star.draw();
        }

        for (let i = shootingStars.length - 1; i >= 0; i--) {
            const ss = shootingStars[i];
            ss.update();
            if (!ss.active) {
                shootingStars.splice(i, 1);
            } else {
                ss.draw();
            }
        }

        framesSinceLastSpawn++;
        if (shootingStars.length < maxShootingStars && framesSinceLastSpawn >= nextSpawnDelay) {
            shootingStars.push(new ShootingStar());
            framesSinceLastSpawn = 0;
            nextSpawnDelay = Math.random() * 120 + 90;
        }

        requestAnimationFrame(animateStars);
    }
    animateStars();

    // ── 3. Typing Animation ─────────────────────────────────────────────
    const taglineSpan = document.getElementById('rotating-text');
    const taglines = [
        "AI & ML Specialist",
        "Full-Stack Developer",
        "Python & Algorithms Expert",
        "Creative UI/UX Enthusiast"
    ];
    let tagIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function typeEffect() {
        const currentTag = taglines[tagIndex];

        if (isDeleting) {
            taglineSpan.textContent = currentTag.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 40;
        } else {
            taglineSpan.textContent = currentTag.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 90;
        }

        if (!isDeleting && charIndex === currentTag.length) {
            isDeleting = true;
            typingSpeed = 2500;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            tagIndex = (tagIndex + 1) % taglines.length;
            typingSpeed = 400;
        }

        setTimeout(typeEffect, typingSpeed);
    }
    setTimeout(typeEffect, 800);

    // ── 4. Header Scroll & Back-to-Top ──────────────────────────────────
    const header = document.querySelector('header');
    const backToTop = document.querySelector('.back-to-top');

    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                const scrollY = window.scrollY;

                if (scrollY > 50) {
                    header.classList.add('scrolled');
                } else {
                    header.classList.remove('scrolled');
                }

                if (backToTop) {
                    if (scrollY > 400) {
                        backToTop.classList.add('visible');
                    } else {
                        backToTop.classList.remove('visible');
                    }
                }

                ticking = false;
            });
            ticking = true;
        }
    }, { passive: true });

    // ── 5. Mobile Navigation ────────────────────────────────────────────
    const mobileToggle = document.getElementById('mobile-toggle');
    const navLinks = document.getElementById('nav-links');

    function openMobileNav() {
        navLinks.classList.add('active');
        mobileToggle.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeMobileNav() {
        navLinks.classList.remove('active');
        mobileToggle.classList.remove('active');
        document.body.style.overflow = '';
    }

    mobileToggle.addEventListener('click', () => {
        if (navLinks.classList.contains('active')) {
            closeMobileNav();
        } else {
            openMobileNav();
        }
    });

    // Close on link click
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', closeMobileNav);
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navLinks.classList.contains('active')) {
            closeMobileNav();
        }
    });

    // Active nav link highlighting with IntersectionObserver
    const sections = document.querySelectorAll('section[id]');
    const navItems = document.querySelectorAll('.nav-link');

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navItems.forEach(item => {
                    item.classList.remove('active');
                    if (item.getAttribute('href') === `#${id}`) {
                        item.classList.add('active');
                    }
                });
            }
        });
    }, {
        root: null,
        rootMargin: '-25% 0px -55% 0px',
        threshold: 0
    });

    sections.forEach(section => sectionObserver.observe(section));

    // ── 6. Dark / Light Mode Toggle ─────────────────────────────────────
    const themeBtn = document.getElementById('theme-toggle');
    const savedTheme = localStorage.getItem('theme');
    const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;

    if (savedTheme === 'light' || (!savedTheme && prefersLight)) {
        document.body.classList.add('light-mode');
    }

    themeBtn.addEventListener('click', () => {
        document.body.classList.toggle('light-mode');
        localStorage.setItem('theme',
            document.body.classList.contains('light-mode') ? 'light' : 'dark'
        );
    });

    // ── 7. Lightbox Modal ───────────────────────────────────────────────
    const modal = document.getElementById('lightbox-modal');
    const modalClose = document.querySelector('.lightbox-close');
    const modalImg = document.getElementById('lightbox-img');
    const modalSubtitle = document.getElementById('lightbox-subtitle');
    const modalTitle = document.getElementById('lightbox-title');
    const modalDesc = document.getElementById('lightbox-desc');
    const modalTech = document.getElementById('lightbox-tech');
    const modalLink = document.getElementById('lightbox-link');
    const modalGithub = document.getElementById('lightbox-github');

    const projectsData = {
        "limo-agent": {
            title: "LIMO AGENT | AI Assistant",
            subtitle: "Artificial Intelligence Project (2026)",
            image: "./Projects/Limo agent.png",
            desc: "Limo Agent is a state-of-the-art AI Assistant integrated with Google's advanced Veo 3.1 Lite video generation model. The application features a highly responsive chatbot interface built with Python, allowing users to write natural language prompts and retrieve high-fidelity video outcomes. Key accomplishments include developing highly optimized polling and webhook retrieval structures to asynchronously retrieve video files, caching active prompt logs, and providing a clean conversational layout for smooth interactions.",
            tech: ["Python", "Google Veo 3.1 Lite API", "Webhooks", "JSON Parser", "Threading"],
            link: "#",
            github: "https://github.com/alfa546/LIMO_AGENT"
        },
        "pak-job-portal": {
            title: "Pak Job Portal",
            subtitle: "Web Application Project (2025)",
            image: "./Projects/Pak job portal.png",
            desc: "A modern, highly secure recruitment and application platform tailored for Pakistani job seekers. Built using React and Next.js, it facilitates real-time jobs listing matching, user resumes uploading, and admin application tracking. The database connectivity handles secure authentication, user roles, real-time filters for city locations, and job category groupings. It features sleek tailwind stylings and absolute mobile responsiveness.",
            tech: ["Next.js", "React.js", "Tailwind CSS", "Firebase Auth", "Firestore DB"],
            link: "#",
            github: "https://github.com/alfa546/Pak-job-portal"
        },
        "diabetes-prediction": {
            title: "Diabetes Prediction Web",
            subtitle: "Machine Learning Application (2026)",
            image: "./Projects/diabetes_prediction.png",
            desc: "An intelligent, bilingual healthcare application designed for early diabetes risk assessment. The backend is powered by a Flask server hosting a Scikit-learn Random Forest model trained on clinical parameters. Key innovations include integrating the Claude API to generate personalized health advice and actionable nutrition tips based on model risk indices. Full support for English and Urdu makes medical predictions accessible to a broader audience in Pakistan.",
            tech: ["Flask", "Scikit-learn", "Python", "Claude API", "Bilingual Localization", "Pandas"],
            link: "#",
            github: "https://github.com/alfa546/Diabetes-Prediction-Web"
        },
        "maze-solver": {
            title: "AI Maze Solver & Location Finder",
            subtitle: "Artificial Intelligence & Mapping (2026)",
            image: "./Projects/AI maze solver - Location finder.png",
            desc: "A desktop and web visualizer demonstrating advanced route-finding algorithms. It features a custom Tkinter grid system animating Breadth-First Search (BFS) and Depth-First Search (DFS) algorithms in real-time, solving randomized mazes step-by-step. Additionally, it integrates OpenStreetMap coordinates using NumPy and Folium to plot optimal paths between Pakistani cities, rendering interactive geographical maps in HTML windows.",
            tech: ["Python", "Tkinter GUI", "OpenStreetMap", "Folium", "NumPy", "Geopy"],
            link: "#",
            github: "https://github.com/alfa546/AI_Maze_Solver-Location-Finder"
        },
        "vet-management": {
            title: "Vet Management System",
            subtitle: "Database & Practice Management",
            image: "./Projects/Vet management system.png",
            desc: "A custom medical management portal built for veterinary clinics. This system facilitates patient scheduling, animal health history tracking, vaccine scheduling, and billing. Built with a responsive interface, it bridges diagnostic tools and records. Demonstrates strong database design with secure record retrieval, and visual dashboard statistics showing animal demographic breakdowns.",
            tech: ["HTML5/CSS3", "JavaScript", "SQLite", "Python Flask", "Chart.js"],
            link: "#",
            github: "https://github.com/alfa546/Vet-management-system-desktop-application"
        }
    };

    const certificatesData = {
        "ux-ui": {
            title: "Interaction Design and UX/UI Principles",
            issuer: "Xbox (via Coursera)",
            image: "./certificates/xbox certificate.png",
            date: "Issued: 2025",
            desc: "Comprehensive coursework exploring user interaction paradigms, gamified UI frameworks, information architecture, wireframing, and interactive prototype testing under Xbox's design standards."
        },
        "web-dev": {
            title: "Introduction to Web Development (HTML, CSS, JS)",
            issuer: "IBM (via Coursera)",
            image: "./certificates/Web development.png",
            date: "Issued: 2025",
            desc: "Mastery of essential modern frontend technologies. Includes layout structures, styling schemes, responsive grids, and standard DOM manipulation practices."
        },
        "kali-linux": {
            title: "Ethical Hacking with Kali Linux",
            issuer: "IBM (via Coursera)",
            image: "./certificates/Ethical hacking with kali linux.png",
            date: "Issued: 2025",
            desc: "Practical training in penetration testing methodology, scanning targets, vulnerability analysis, and executing security scripts using the Kali Linux suite."
        },
        "hacking-intro": {
            title: "Introduction to Ethical Hacking Principles",
            issuer: "IBM (via Coursera)",
            image: "./certificates/Ethical hacking introduction.png",
            date: "Issued: 2025",
            desc: "Overview of cybersecurity foundations, understanding threat surfaces, cryptography fundamentals, social engineering prevention, and standard compliance frameworks."
        },
        "uet": {
            title: "Algorithm Design to Working Prototype",
            issuer: "University of Engineering & Technology (UET)",
            image: "./certificates/UET certificate.png",
            date: "Issued: 2025",
            desc: "Intensive bootcamp specializing in designing optimization algorithms, complex data structures (trees, graphs), and implementing functional physical software prototypes."
        },
        "critical-thinking": {
            title: "Critical Thinking in the AI Era",
            issuer: "HP LIFE",
            image: "./certificates/HP life.png",
            date: "Issued: 2025",
            desc: "Focused module analyzing AI-generated resources, biases, logical structures, verifying data integrity, and leveraging AI tools efficiently in business settings."
        }
    };

    // Open project lightbox
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('click', (e) => {
            if (e.target.closest('.project-icon-link')) return;

            const projId = card.getAttribute('data-project');
            const data = projectsData[projId];
            if (!data) return;

            modalImg.src = data.image;
            modalSubtitle.textContent = data.subtitle;
            modalTitle.textContent = data.title;
            modalDesc.textContent = data.desc;

            modalTech.innerHTML = '';
            data.tech.forEach(t => {
                const tag = document.createElement('span');
                tag.className = 'tech-tag';
                tag.textContent = t;
                modalTech.appendChild(tag);
            });

            modalLink.style.display = data.link === '#' ? 'none' : 'inline-flex';
            modalLink.href = data.link;
            modalGithub.href = data.github;
            modalGithub.style.display = 'inline-flex';

            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    // Open certificate lightbox
    document.querySelectorAll('.cert-card').forEach(card => {
        card.addEventListener('click', () => {
            const certId = card.getAttribute('data-cert');
            const data = certificatesData[certId];
            if (!data) return;

            modalImg.src = data.image;
            modalSubtitle.textContent = data.issuer;
            modalTitle.textContent = data.title;
            modalDesc.textContent = data.desc;

            modalTech.innerHTML = '';
            const dateTag = document.createElement('span');
            dateTag.className = 'tech-tag';
            dateTag.textContent = data.date;
            modalTech.appendChild(dateTag);

            modalLink.style.display = 'none';
            modalGithub.style.display = 'none';

            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    // Close modal
    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
        setTimeout(() => {
            modalGithub.style.display = 'inline-flex';
        }, 300);
    }

    modalClose.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) closeModal();
    });

    // ── 8. Contact Form ─────────────────────────────────────────────────
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = document.getElementById('form-name').value.trim();
            const email = document.getElementById('form-email').value.trim();
            const message = document.getElementById('form-msg').value.trim();

            if (!name || !email || !message) {
                formStatus.className = 'form-status error';
                formStatus.textContent = 'Please fill out all fields before submitting.';
                return;
            }

            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                formStatus.className = 'form-status error';
                formStatus.textContent = 'Please enter a valid email address.';
                return;
            }

            formStatus.className = 'form-status success';
            formStatus.textContent = 'Sending message...';

            setTimeout(() => {
                formStatus.textContent = 'Thank you! Your message has been sent successfully.';
                contactForm.reset();

                if (window.confetti) {
                    window.confetti({
                        particleCount: 60,
                        spread: 55,
                        origin: { y: 0.8 },
                        colors: ['#6366f1', '#06b6d4', '#8b5cf6']
                    });
                }
            }, 1200);
        });
    }

    // ── 9. GSAP Scroll Animations ───────────────────────────────────────
    if (window.gsap && window.ScrollTrigger) {
        gsap.registerPlugin(ScrollTrigger);

        // Hero intro sequence
        const introTl = gsap.timeline();

        introTl.from('header', {
            y: -80,
            opacity: 0,
            duration: 0.8,
            ease: 'power4.out'
        })
        .from('.hero-badge', {
            y: 20,
            opacity: 0,
            duration: 0.6,
            ease: 'power3.out'
        }, '-=0.4')
        .from('.hero-title', {
            y: 40,
            opacity: 0,
            duration: 0.7,
            ease: 'power3.out'
        }, '-=0.4')
        .from('.hero-taglines', {
            opacity: 0,
            duration: 0.5
        }, '-=0.3')
        .from('.hero-buttons .btn', {
            y: 20,
            opacity: 0,
            stagger: 0.15,
            duration: 0.5,
            ease: 'power2.out'
        }, '-=0.3')
        .from('.scroll-indicator', {
            opacity: 0,
            y: -10,
            duration: 0.4
        }, '-=0.1');

        // Section headers
        gsap.utils.toArray('.section-header').forEach(h => {
            gsap.from(h, {
                scrollTrigger: { trigger: h, start: 'top 88%', toggleActions: 'play none none none' },
                opacity: 0,
                y: 25,
                duration: 0.7,
                ease: 'power2.out'
            });
        });

        // About
        gsap.from('.about-image-wrapper', {
            scrollTrigger: { trigger: '.about-grid', start: 'top 82%' },
            opacity: 0,
            scale: 0.92,
            duration: 0.9,
            ease: 'power3.out'
        });

        gsap.from('.about-details > *', {
            scrollTrigger: { trigger: '.about-grid', start: 'top 78%' },
            opacity: 0,
            x: 40,
            stagger: 0.15,
            duration: 0.7,
            ease: 'power2.out'
        });
        // Skills Category & Chips Animation
        const skillsTimeline = gsap.timeline({
            scrollTrigger: {
                trigger: '.skills-grid',
                start: 'top 85%',
                toggleActions: 'play none none none'
            }
        });

        skillsTimeline.from('.skills-category', {
            opacity: 0,
            y: 35,
            stagger: 0.15,
            duration: 0.6,
            ease: 'power2.out'
        })
        .from('.skill-chip', {
            opacity: 0,
            scale: 0.8,
            stagger: 0.02,
            duration: 0.35,
            ease: 'back.out(1.5)'
        }, '-=0.3');

        // Projects
        gsap.from('.project-card', {
            scrollTrigger: { trigger: '.projects-grid', start: 'top 82%' },
            opacity: 0,
            y: 40,
            stagger: 0.15,
            duration: 0.7,
            ease: 'power3.out'
        });

        // Certificates
        gsap.from('.cert-card', {
            scrollTrigger: { trigger: '.certificates-grid', start: 'top 82%' },
            opacity: 0,
            y: 30,
            stagger: 0.1,
            duration: 0.6,
            ease: 'power3.out'
        });

        // Timeline
        gsap.utils.toArray('.timeline-item').forEach((item, idx) => {
            const card = item.querySelector('.timeline-card');
            const dot = item.querySelector('.timeline-dot');
            const xDir = idx % 2 === 0 ? -50 : 50;

            gsap.from(card, {
                scrollTrigger: { trigger: item, start: 'top 88%' },
                opacity: 0,
                x: window.innerWidth < 768 ? 30 : xDir,
                duration: 0.7,
                ease: 'power2.out'
            });

            gsap.from(dot, {
                scrollTrigger: { trigger: item, start: 'top 88%' },
                scale: 0,
                opacity: 0,
                duration: 0.5,
                ease: 'back.out(2)'
            });
        });

        // Contact
        gsap.from('.contact-info > *', {
            scrollTrigger: { trigger: '.contact-wrapper', start: 'top 82%' },
            opacity: 0,
            x: -25,
            stagger: 0.12,
            duration: 0.7,
            ease: 'power2.out'
        });

        gsap.from('.contact-form', {
            scrollTrigger: { trigger: '.contact-wrapper', start: 'top 82%' },
            opacity: 0,
            x: 25,
            duration: 0.7,
            ease: 'power2.out'
        });

    } else {
        // Fallback: CSS reveal animations using IntersectionObserver
        const revealElements = document.querySelectorAll(
            '.section-header, .about-image-wrapper, .about-details, ' +
            '.skills-category, .project-card, .cert-card, .timeline-card, ' +
            '.contact-info, .contact-form'
        );

        revealElements.forEach(el => el.classList.add('reveal'));

        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    revealObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

        revealElements.forEach(el => revealObserver.observe(el));
    }
});
