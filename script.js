/* ==========================================================================
   CYBER-BRUTALIST PORTFOLIO — JAVASCRIPT v3.0
   Author: Nouman Sajid
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

    // ── 1. Initialize Lucide Icons ──────────────────────────────────────
    if (window.lucide) {
        window.lucide.createIcons();
    }

    // ── 2. Neo-Brutalist Vector Background (Highly Optimized) ───────────
    const canvas = document.getElementById('canvas-background');
    const ctx = canvas.getContext('2d');
    let bgElements = [];
    let bgElementCount = 35;

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        bgElementCount = window.innerWidth < 768 ? 15 : 35;
    }
    resizeCanvas();

    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            resizeCanvas();
            initBgElements();
        }, 200);
    });

    class BrutalistBgElement {
        constructor() {
            this.reset();
            this.y = Math.random() * canvas.height;
            this.x = Math.random() * canvas.width;
        }

        reset() {
            this.x = Math.random() * canvas.width;
            this.y = -30;
            this.size = Math.random() * 10 + 5;
            this.speed = Math.random() * 0.4 + 0.15;
            this.type = Math.random() > 0.5 ? 'cross' : 'square';
            this.color = Math.random() > 0.5 ? 'rgba(204, 255, 0, 0.12)' : 'rgba(0, 240, 255, 0.1)';
            this.rotation = Math.random() * Math.PI;
            this.rotSpeed = (Math.random() - 0.5) * 0.01;
        }

        update() {
            this.y += this.speed;
            this.rotation += this.rotSpeed;
            if (this.y > canvas.height + 30) {
                this.reset();
            }
        }

        draw() {
            const isLight = document.body.classList.contains('light-mode');
            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.rotate(this.rotation);
            ctx.strokeStyle = isLight 
                ? this.color.replace('0.12', '0.2').replace('0.1', '0.18') 
                : this.color;
            ctx.lineWidth = 2;

            if (this.type === 'square') {
                ctx.strokeRect(-this.size / 2, -this.size / 2, this.size, this.size);
            } else {
                ctx.beginPath();
                ctx.moveTo(-this.size / 2, 0);
                ctx.lineTo(this.size / 2, 0);
                ctx.moveTo(0, -this.size / 2);
                ctx.lineTo(0, this.size / 2);
                ctx.stroke();
            }
            ctx.restore();
        }
    }

    function initBgElements() {
        bgElements = [];
        for (let i = 0; i < bgElementCount; i++) {
            bgElements.push(new BrutalistBgElement());
        }
    }
    initBgElements();

    let isTabActive = true;
    document.addEventListener('visibilitychange', () => {
        isTabActive = !document.hidden;
    });

    function animateBg() {
        if (!isTabActive) {
            requestAnimationFrame(animateBg);
            return;
        }
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (const el of bgElements) {
            el.update();
            el.draw();
        }
        requestAnimationFrame(animateBg);
    }
    animateBg();

    // ── 3. Three.js Interactive 3D Hero Animation ──────────────────────
    const container3d = document.getElementById('hero-3d-container');
    if (container3d && window.THREE) {
        const scene = new THREE.Scene();
        
        // Camera setup
        const camera = new THREE.PerspectiveCamera(
            45, 
            container3d.clientWidth / container3d.clientHeight, 
            0.1, 
            100
        );
        camera.position.z = 7;

        // Renderer
        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        renderer.setSize(container3d.clientWidth, container3d.clientHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        container3d.appendChild(renderer.domElement);

        // Geometries
        const outerGeom = new THREE.IcosahedronGeometry(2, 1);
        const outerMat = new THREE.MeshBasicMaterial({
            color: 0xccff00, // Volt Green
            wireframe: true,
            transparent: true,
            opacity: 0.8
        });
        const outerMesh = new THREE.Mesh(outerGeom, outerMat);

        const innerGeom = new THREE.TorusKnotGeometry(0.8, 0.25, 100, 16);
        const innerMat = new THREE.MeshBasicMaterial({
            color: 0x00f0ff, // Cyber Cyan
            wireframe: true,
            transparent: true,
            opacity: 0.6
        });
        const innerMesh = new THREE.Mesh(innerGeom, innerMat);

        const meshGroup = new THREE.Group();
        meshGroup.add(outerMesh);
        meshGroup.add(innerMesh);
        scene.add(meshGroup);

        // Interaction state
        let targetX = 0;
        let targetY = 0;
        let mouseX = 0;
        let mouseY = 0;

        window.addEventListener('mousemove', (e) => {
            // Normalized mouse position (-1 to 1)
            targetX = (e.clientX - window.innerWidth / 2) * 0.001;
            targetY = (e.clientY - window.innerHeight / 2) * 0.001;
        });

        // 3D Animation Loop
        const clock = new THREE.Clock();
        function animate3d() {
            requestAnimationFrame(animate3d);
            
            const elapsedTime = clock.getElapsedTime();

            // Smooth interpolation (lerp)
            mouseX += (targetX - mouseX) * 0.05;
            mouseY += (targetY - mouseY) * 0.05;

            // Rotation
            meshGroup.rotation.y = elapsedTime * 0.15 + mouseX * 0.8;
            meshGroup.rotation.x = elapsedTime * 0.1 + mouseY * 0.8;

            // Subtle floating motion
            meshGroup.position.y = Math.sin(elapsedTime) * 0.15;

            renderer.render(scene, camera);
        }
        animate3d();

        // Responsive resize handling
        window.addEventListener('resize', () => {
            const width = container3d.clientWidth;
            const height = container3d.clientHeight;
            
            camera.aspect = width / height;
            camera.updateProjectionMatrix();
            
            renderer.setSize(width, height);
        });

        // Update colors based on light mode
        const observer = new MutationObserver(() => {
            const isLight = document.body.classList.contains('light-mode');
            if (isLight) {
                outerMat.color.setHex(0xff0055); // Pink in light mode
                innerMat.color.setHex(0x000000); // Black torus in light mode
            } else {
                outerMat.color.setHex(0xccff00); // Volt Green in dark mode
                innerMat.color.setHex(0x00f0ff); // Cyber Cyan in dark mode
            }
        });
        observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });
    }

    // ── 4. Typing Animation ─────────────────────────────────────────────
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

    // ── 5. Header Scroll & Back-to-Top ──────────────────────────────────
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
                        backToTop.classList.add('active');
                    } else {
                        backToTop.classList.remove('active');
                    }
                }

                ticking = false;
            });
            ticking = true;
        }
    }, { passive: true });

    // ── 6. Mobile Navigation ────────────────────────────────────────────
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

    // ── 7. Dark / Light Mode Toggle ─────────────────────────────────────
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

    // ── 8. Lightbox Modal & Data ────────────────────────────────────────
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

    // ── 9. Contact Form ─────────────────────────────────────────────────
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
                        particleCount: 80,
                        spread: 60,
                        origin: { y: 0.8 },
                        colors: ['#ccff00', '#00f0ff', '#ff0055']
                    });
                }
            }, 1200);
        });
    }

    // ── 10. GSAP Scroll Animations ──────────────────────────────────────
    if (window.gsap && window.ScrollTrigger) {
        gsap.registerPlugin(ScrollTrigger);

        // Hero intro sequence
        const introTl = gsap.timeline();

        introTl.from('header', {
            y: -100,
            duration: 0.6,
            ease: 'power3.out'
        })
        .from('.hero-badge', {
            scale: 0,
            rotation: -15,
            duration: 0.5,
            ease: 'back.out(2)'
        }, '-=0.2')
        .from('.hero-title', {
            y: 50,
            opacity: 0,
            duration: 0.6,
            ease: 'power3.out'
        }, '-=0.2')
        .from('.hero-taglines', {
            opacity: 0,
            scale: 0.95,
            duration: 0.4,
            ease: 'power2.out'
        }, '-=0.2')
        .from('.hero-buttons .btn', {
            y: 30,
            opacity: 0,
            stagger: 0.1,
            duration: 0.5,
            ease: 'back.out(1.5)'
        }, '-=0.2')
        .from('.scroll-indicator', {
            opacity: 0,
            y: -10,
            duration: 0.4
        }, '-=0.1');

        // Section Titles Brutalist Intro
        gsap.utils.toArray('.section-title').forEach(title => {
            gsap.from(title, {
                scrollTrigger: {
                    trigger: title,
                    start: 'top 90%',
                    toggleActions: 'play none none none'
                },
                scale: 0.85,
                rotation: 5,
                opacity: 0,
                duration: 0.5,
                ease: 'back.out(1.8)'
            });
        });

        // About Grid Intro
        gsap.from('.about-image-wrapper', {
            scrollTrigger: { trigger: '.about-grid', start: 'top 85%' },
            opacity: 0,
            x: -40,
            duration: 0.7,
            ease: 'power3.out'
        });

        gsap.from('.about-details > *', {
            scrollTrigger: { trigger: '.about-grid', start: 'top 80%' },
            opacity: 0,
            x: 40,
            stagger: 0.1,
            duration: 0.6,
            ease: 'power2.out'
        });

        // Skills Grid Cards
        gsap.from('.skills-category', {
            scrollTrigger: { trigger: '.skills-grid', start: 'top 85%' },
            opacity: 0,
            y: 50,
            stagger: 0.12,
            duration: 0.6,
            ease: 'power3.out'
        });

        // Projects Cards
        gsap.from('.project-card', {
            scrollTrigger: { trigger: '.projects-grid', start: 'top 85%' },
            opacity: 0,
            y: 60,
            stagger: 0.15,
            duration: 0.7,
            ease: 'power3.out'
        });

        // Certificates Cards
        gsap.from('.cert-card', {
            scrollTrigger: { trigger: '.certificates-grid', start: 'top 85%' },
            opacity: 0,
            y: 50,
            stagger: 0.12,
            duration: 0.6,
            ease: 'power3.out'
        });

        // Education / Experience Timeline Items
        gsap.utils.toArray('.timeline-item').forEach((item) => {
            const card = item.querySelector('.timeline-card');
            const dot = item.querySelector('.timeline-dot');

            gsap.from(card, {
                scrollTrigger: { trigger: item, start: 'top 90%' },
                opacity: 0,
                x: -30,
                duration: 0.6,
                ease: 'power2.out'
            });

            gsap.from(dot, {
                scrollTrigger: { trigger: item, start: 'top 90%' },
                scale: 0,
                duration: 0.4,
                ease: 'back.out(2)'
            });
        });

        // Contact Section wrapper
        gsap.from('.contact-info > *', {
            scrollTrigger: { trigger: '.contact-wrapper', start: 'top 85%' },
            opacity: 0,
            x: -30,
            stagger: 0.1,
            duration: 0.6,
            ease: 'power2.out'
        });

        gsap.from('.contact-form', {
            scrollTrigger: { trigger: '.contact-wrapper', start: 'top 80%' },
            opacity: 0,
            y: 40,
            duration: 0.6,
            ease: 'power3.out'
        });
    }
});
