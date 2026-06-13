/* ==========================================================================
   PREMIUM PORTFOLIO JAVASCRIPT LOGIC
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialise Lucide Icons
    if (window.lucide) {
        window.lucide.createIcons();
    }

    // 2. Custom Cursor
    const cursor = document.querySelector('.custom-cursor');
    const follower = document.querySelector('.custom-cursor-follower');
    
    let mouseX = 0, mouseY = 0;
    let followerX = 0, followerY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        // Immediate position for inner cursor dot
        cursor.style.left = mouseX + 'px';
        cursor.style.top = mouseY + 'px';
    });
    
    // Smooth interpolation (lerp) for cursor follower ring
    function updateFollower() {
        // lerp: current + (target - current) * factor
        followerX += (mouseX - followerX) * 0.15;
        followerY += (mouseY - followerY) * 0.15;
        
        follower.style.left = followerX + 'px';
        follower.style.top = followerY + 'px';
        
        requestAnimationFrame(updateFollower);
    }
    updateFollower();
    
    // Magnetic / Hover cursor scale up
    const hoverElements = document.querySelectorAll('a, button, .project-card, .cert-card, .social-btn, .theme-toggle-btn');
    hoverElements.forEach(elem => {
        elem.addEventListener('mouseenter', () => {
            document.body.classList.add('hovering');
        });
        elem.addEventListener('mouseleave', () => {
            document.body.classList.remove('hovering');
        });
    });

    // 3. Interactive Canvas Particle Background
    const canvas = document.getElementById('canvas-background');
    const ctx = canvas.getContext('2d');
    
    let particles = [];
    let particleCount = 70;
    let connectionDistance = 120;
    let mouseRadius = 150;
    
    // Set Canvas dimensions
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        
        // Adjust particle count for mobile
        if (window.innerWidth < 768) {
            particleCount = 30;
            connectionDistance = 80;
        } else {
            particleCount = 70;
            connectionDistance = 120;
        }
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Particle Class
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.vx = (Math.random() - 0.5) * 0.6;
            this.vy = (Math.random() - 0.5) * 0.6;
            this.radius = Math.random() * 2 + 1;
        }
        
        update() {
            this.x += this.vx;
            this.y += this.vy;
            
            // Bounce off boundaries
            if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
            if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
            
            // Mouse gravity pull
            let dx = mouseX - this.x;
            let dy = mouseY - this.y;
            let dist = Math.sqrt(dx * dx + dy * dy);
            
            if (dist < mouseRadius) {
                // Pull force depending on distance
                let force = (mouseRadius - dist) / mouseRadius;
                this.x -= (dx / dist) * force * 0.5;
                this.y -= (dy / dist) * force * 0.5;
            }
        }
        
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            // Dynamic color check
            const isLight = document.body.classList.contains('light-mode');
            ctx.fillStyle = isLight ? 'rgba(79, 70, 229, 0.15)' : 'rgba(6, 182, 212, 0.2)';
            ctx.fill();
        }
    }
    
    // Initialize Particles
    function initParticles() {
        particles = [];
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }
    }
    initParticles();
    
    // Draw connections and animate
    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(p => {
            p.update();
            p.draw();
        });
        
        // Draw lines between nearby particles
        const isLight = document.body.classList.contains('light-mode');
        const lineColor = isLight ? '79, 70, 229' : '99, 102, 241';
        
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                let dx = particles[i].x - particles[j].x;
                let dy = particles[i].y - particles[j].y;
                let dist = Math.sqrt(dx * dx + dy * dy);
                
                if (dist < connectionDistance) {
                    let alpha = (connectionDistance - dist) / connectionDistance * 0.15;
                    ctx.strokeStyle = `rgba(${lineColor}, ${alpha})`;
                    ctx.lineWidth = 0.5;
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }
        
        requestAnimationFrame(animateParticles);
    }
    animateParticles();
    
    // Re-initialize particles on resize to ensure full coverage
    window.addEventListener('resize', () => {
        initParticles();
    });

    // 4. Rotating Text / Typing Animation
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
            typingSpeed = 50; // Deletes faster
        } else {
            taglineSpan.textContent = currentTag.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100;
        }
        
        if (!isDeleting && charIndex === currentTag.length) {
            isDeleting = true;
            typingSpeed = 2000; // Pause at end of tag
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            tagIndex = (tagIndex + 1) % taglines.length;
            typingSpeed = 500; // Pause before typing next word
        }
        
        setTimeout(typeEffect, typingSpeed);
    }
    setTimeout(typeEffect, 1000);

    // 5. Scroll Header Shadow & Back-To-Top Button Visibility
    const header = document.querySelector('header');
    const backToTop = document.querySelector('.back-to-top');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        if (window.scrollY > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });

    // 6. Mobile Nav Bar Toggle
    const mobileToggle = document.querySelector('.mobile-nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    mobileToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        // Toggle mobile icon animation
        const spans = mobileToggle.querySelectorAll('span');
        if (navLinks.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translate(5px, 6px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(5px, -6px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });
    
    // Close mobile menu on click link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            const spans = mobileToggle.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        });
    });

    // Active link highlighting on scroll
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - 150)) {
                current = section.getAttribute('id');
            }
        });
        
        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${current}`) {
                item.classList.add('active');
            }
        });
    });

    // 7. Lightbox / Modal Popups for Projects & Certificates
    const modal = document.getElementById('lightbox-modal');
    const modalClose = document.querySelector('.lightbox-close');
    const modalImg = document.getElementById('lightbox-img');
    const modalSubtitle = document.getElementById('lightbox-subtitle');
    const modalTitle = document.getElementById('lightbox-title');
    const modalDesc = document.getElementById('lightbox-desc');
    const modalTech = document.getElementById('lightbox-tech');
    const modalLink = document.getElementById('lightbox-link');
    const modalGithub = document.getElementById('lightbox-github');
    
    // Data structures holding project descriptions and data
    const projectsData = {
        "limo-agent": {
            title: "LIMO AGENT | AI Assistant",
            subtitle: "Artificial Intelligence Project (2026)",
            image: "./Projects/Limo agent.png",
            desc: "Limo Agent is a state-of-the-art AI Assistant integrated with Google's advanced Veo 3.1 Lite video generation model. The application features a highly responsive chatbot interface built with Python, allowing users to write natural language prompts and retrieve high-fidelity video outcomes. Key accomplishments include developing highly optimized polling and webhook retrieval structures to asynchronously retrieve video files, caching active prompt logs, and providing a clean conversational layout for smooth interactions.",
            tech: ["Python", "Google Veo 3.1 Lite API", "Webhooks", "JSON Parser", "Threading"],
            link: "#",
            github: "https://github.com/alfa546"
        },
        "pak-job-portal": {
            title: "Pak Job Portal",
            subtitle: "Web Application Project (2025)",
            image: "./Projects/Pak job portal.png",
            desc: "A modern, highly secure recruitment and application platform tailored for Pakistani job seekers. Built using React and Next.js, it facilitates real-time jobs listing matching, user resumes uploading, and admin application tracking. The database connectivity handles secure authentication, user roles, real-time filters for city locations, and job category groupings. It features sleek tailwind stylings and absolute mobile responsiveness.",
            tech: ["Next.js", "React.js", "Tailwind CSS", "Firebase Auth", "Firestore DB"],
            link: "#",
            github: "https://github.com/alfa546"
        },
        "diabetes-prediction": {
            title: "Diabetes Prediction Web",
            subtitle: "Machine Learning Application (2026)",
            image: "./Projects/diabetes_prediction.png",
            desc: "An intelligent, bilingual healthcare application designed for early diabetes risk assessment. The backend is powered by a Flask server hosting a Scikit-learn Random Forest model trained on clinical parameters. Key innovations include integrating the Claude API to generate personalized health advice and actionable nutrition tips based on model risk indices. Full support for English and Urdu makes medical predictions accessible to a broader audience in Pakistan.",
            tech: ["Flask", "Scikit-learn", "Python", "Claude API", "Bilingual Localization", "Pandas"],
            link: "#",
            github: "https://github.com/alfa546"
        },
        "maze-solver": {
            title: "AI Maze Solver & Location Finder",
            subtitle: "Artificial Intelligence & Mapping (2026)",
            image: "./Projects/AI maze solver - Location finder.png",
            desc: "A desktop and web visualizer demonstrating advanced route-finding algorithms. It features a custom Tkinter grid system animating Breadth-First Search (BFS) and Depth-First Search (DFS) algorithms in real-time, solving randomized mazes step-by-step. Additionally, it integrates OpenStreetMap coordinates using NumPy and Folium to plot optimal paths between Pakistani cities, rendering interactive geographical maps in HTML windows.",
            tech: ["Python", "Tkinter GUI", "OpenStreetMap", "Folium", "NumPy", "Geopy"],
            link: "#",
            github: "https://github.com/alfa546"
        },
        "vet-management": {
            title: "Vet Management System",
            subtitle: "Database & Practice Management",
            image: "./Projects/Vet management system.png",
            desc: "A custom medical management portal built for veterinary clinics. This system facilitates patient scheduling, animal health history tracking, vaccine scheduling, and billing. Built with a responsive interface, it bridges diagnostic tools and records. Demonstrates strong database design with secure record retrieval, and visual dashboard statistics showing animal demographic breakdowns.",
            tech: ["HTML5/CSS3", "JavaScript", "SQLite", "Python Flask", "Chart.js"],
            link: "#",
            github: "https://github.com/alfa546"
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
            // If click was on external icons inside overlay, don't open modal
            if (e.target.closest('.project-icon-link')) return;
            
            const projId = card.getAttribute('data-project');
            const data = projectsData[projId];
            if (!data) return;
            
            modalImg.src = data.image;
            modalSubtitle.textContent = data.subtitle;
            modalTitle.textContent = data.title;
            modalDesc.textContent = data.desc;
            
            // Build tech tags
            modalTech.innerHTML = '';
            data.tech.forEach(t => {
                const tag = document.createElement('span');
                tag.className = 'tech-tag';
                tag.textContent = t;
                modalTech.appendChild(tag);
            });
            
            // Setup Links
            modalLink.style.display = data.link === '#' ? 'none' : 'inline-flex';
            modalLink.href = data.link;
            modalGithub.href = data.github;
            
            modal.classList.add('active');
            document.body.style.overflow = 'hidden'; // Stop background scroll
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
            
            // Clear tech tags and links (not applicable for certificates)
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
    
    // Close Modal
    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
        // Restore default layout structures
        setTimeout(() => {
            modalGithub.style.display = 'inline-flex';
        }, 300);
    }
    
    modalClose.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeModal();
    });

    // 8. Dark / Light Mode Toggle
    const themeBtn = document.querySelector('.theme-toggle-btn');
    
    // Check local storage or system preferences
    const savedTheme = localStorage.getItem('theme');
    const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
    
    if (savedTheme === 'light' || (!savedTheme && prefersLight)) {
        document.body.classList.add('light-mode');
    }
    
    themeBtn.addEventListener('click', () => {
        document.body.classList.toggle('light-mode');
        
        // Save choice
        if (document.body.classList.contains('light-mode')) {
            localStorage.setItem('theme', 'light');
        } else {
            localStorage.setItem('theme', 'dark');
        }
    });

    // 9. Contact Form Submissions & Validations
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
            
            // Success Mocking
            formStatus.className = 'form-status success';
            formStatus.textContent = 'Sending message...';
            
            setTimeout(() => {
                formStatus.textContent = 'Thank you, Nouman! Your message has been sent successfully.';
                contactForm.reset();
                
                // Trigger canvas-confetti if available
                if (window.confetti) {
                    window.confetti({
                        particleCount: 80,
                        spread: 60,
                        origin: { y: 0.8 },
                        colors: ['#6366f1', '#06b6d4', '#4f46e5']
                    });
                }
            }, 1500);
        });
    }

    // 10. GSAP Scroll Trigger & Entry Animations
    if (window.gsap && window.ScrollTrigger) {
        gsap.registerPlugin(ScrollTrigger);
        
        // Initial Entry Animations
        const introTl = gsap.timeline();
        
        introTl.from('header', {
            y: -100,
            opacity: 0,
            duration: 1,
            ease: 'power4.out'
        })
        .from('.hero-subtitle', {
            x: -50,
            opacity: 0,
            duration: 0.8,
            ease: 'power3.out'
        }, '-=0.5')
        .from('.hero-title', {
            y: 40,
            opacity: 0,
            duration: 0.8,
            ease: 'power3.out'
        }, '-=0.6')
        .from('.hero-taglines', {
            opacity: 0,
            duration: 0.6
        }, '-=0.4')
        .from('.hero-buttons .btn', {
            y: 20,
            opacity: 0,
            stagger: 0.2,
            duration: 0.6,
            ease: 'power2.out'
        }, '-=0.4')
        .from('.scroll-indicator', {
            opacity: 0,
            y: -10,
            duration: 0.5
        }, '-=0.2');
        
        // Scroll Trigger Animations for sections
        // General fade-up title triggers
        gsap.utils.toArray('.section-header').forEach(header => {
            gsap.from(header, {
                scrollTrigger: {
                    trigger: header,
                    start: 'top 85%',
                    toggleActions: 'play none none none'
                },
                opacity: 0,
                y: 30,
                duration: 0.8,
                ease: 'power2.out'
            });
        });
        
        // About Image reveal
        gsap.from('.about-image-wrapper', {
            scrollTrigger: {
                trigger: '.about-grid',
                start: 'top 80%'
            },
            opacity: 0,
            scale: 0.9,
            duration: 1,
            ease: 'power3.out'
        });
        
        // About details fade-in
        gsap.from('.about-details > *', {
            scrollTrigger: {
                trigger: '.about-grid',
                start: 'top 75%'
            },
            opacity: 0,
            x: 50,
            stagger: 0.2,
            duration: 0.8,
            ease: 'power2.out'
        });
        
        // Skill cards trigger with fill indicators
        gsap.from('.skills-category', {
            scrollTrigger: {
                trigger: '.skills-grid',
                start: 'top 80%'
            },
            opacity: 0,
            y: 40,
            stagger: 0.2,
            duration: 0.8,
            ease: 'power2.out',
            onComplete: () => {
                // Trigger skill bar animation once cards show up
                document.querySelectorAll('.skill-bar-fill').forEach(bar => {
                    const pct = bar.getAttribute('data-percent');
                    bar.style.width = pct;
                });
            }
        });
        
        // Project card list stagger
        gsap.from('.project-card', {
            scrollTrigger: {
                trigger: '.projects-grid',
                start: 'top 80%'
            },
            opacity: 0,
            y: 50,
            stagger: 0.2,
            duration: 0.8,
            ease: 'power3.out'
        });
        
        // Certificate card grid stagger
        gsap.from('.cert-card', {
            scrollTrigger: {
                trigger: '.certificates-grid',
                start: 'top 80%'
            },
            opacity: 0,
            y: 40,
            stagger: 0.15,
            duration: 0.8,
            ease: 'power3.out'
        });
        
        // Timeline animations
        gsap.utils.toArray('.timeline-item').forEach((item, index) => {
            const card = item.querySelector('.timeline-card');
            const dot = item.querySelector('.timeline-dot');
            const xVal = index % 2 === 0 ? -60 : 60;
            
            gsap.from(card, {
                scrollTrigger: {
                    trigger: item,
                    start: 'top 85%'
                },
                opacity: 0,
                x: xVal,
                duration: 0.8,
                ease: 'power2.out'
            });
            
            gsap.from(dot, {
                scrollTrigger: {
                    trigger: item,
                    start: 'top 85%'
                },
                scale: 0,
                opacity: 0,
                duration: 0.6,
                ease: 'back.out(2)'
            });
        });
        
        // Contact details and form triggers
        gsap.from('.contact-info > *', {
            scrollTrigger: {
                trigger: '.contact-wrapper',
                start: 'top 80%'
            },
            opacity: 0,
            x: -30,
            stagger: 0.2,
            duration: 0.8,
            ease: 'power2.out'
        });
        
        gsap.from('.contact-form', {
            scrollTrigger: {
                trigger: '.contact-wrapper',
                start: 'top 80%'
            },
            opacity: 0,
            x: 30,
            duration: 0.8,
            ease: 'power2.out'
        });
    } else {
        // Fallback animations trigger if GSAP CDN fails or blocks
        document.querySelectorAll('.skill-bar-fill').forEach(bar => {
            const pct = bar.getAttribute('data-percent');
            bar.style.width = pct;
        });
    }
});
