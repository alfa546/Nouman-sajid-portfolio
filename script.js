function animateBlobs() {
    const blobs = document.querySelectorAll(".blob");
    blobs.forEach((blob) => {
        // Set initial random position instantly
        gsap.set(blob, {
            x: `${Math.random() * 100 - 50}vw`,
            y: `${Math.random() * 100 - 50}vh`,
            scale: 0.8 + Math.random() * 0.4
        });
        
        // Start moving immediately
        moveBlob(blob);
    });
}

function moveBlob(blob) {
    const randomX = Math.random() * 80 - 40;
    const randomY = Math.random() * 80 - 40;
    const randomDuration = 3 + Math.random() * 3; // Sped up from 5-10s

    gsap.to(blob, {
        x: `${randomX}vw`,
        y: `${randomY}vh`,
        duration: randomDuration,
        ease: "sine.inOut",
        onComplete: () => moveBlob(blob)
    });
}

// Initialize Movement Immediately
animateBlobs();

// Initialize Lenis for Ultra Smooth Scrolling
const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    wheelMultiplier: 1,
})

function raf(time) {
    lenis.raf(time)
    requestAnimationFrame(raf)
}

requestAnimationFrame(raf)

// GSAP Animations
gsap.registerPlugin(ScrollTrigger);

// 3D Tilt Effect for Hero Image
const heroImage = document.querySelector(".image-frame");
if (heroImage && window.innerWidth > 768) {
    heroImage.addEventListener("mousemove", (e) => {
        const { left, top, width, height } = heroImage.getBoundingClientRect();
        const x = (e.clientX - left) / width - 0.5;
        const y = (e.clientY - top) / height - 0.5;

        gsap.to(heroImage, {
            rotationY: x * 20,
            rotationX: -y * 20,
            transformPerspective: 1000,
            duration: 0.6,
            ease: "power2.out"
        });
    });

    heroImage.addEventListener("mouseleave", () => {
        gsap.to(heroImage, {
            rotationY: 0,
            rotationX: 0,
            duration: 0.8,
            ease: "power4.out"
        });
    });
}

// Navigation Hover Pill Logic
const nav = document.querySelector("nav");
const navLinks = document.querySelectorAll(".nav-links a");
const hoverPill = document.querySelector(".nav-hover-pill");

navLinks.forEach(link => {
    link.addEventListener("mouseenter", (e) => {
        const { left, top, width, height } = link.getBoundingClientRect();
        const navRect = nav.getBoundingClientRect();
        
        const relativeLeft = left - navRect.left;
        const relativeTop = top - navRect.top;

        gsap.to(hoverPill, {
            left: relativeLeft,
            top: relativeTop,
            width: width,
            height: height,
            opacity: 1,
            duration: 0.4,
            ease: "power3.out"
        });
    });

    // Magnetic effect for individual links
    link.addEventListener("mousemove", (e) => {
        const { left, top, width, height } = link.getBoundingClientRect();
        const x = (e.clientX - (left + width / 2)) * 0.35;
        const y = (e.clientY - (top + height / 2)) * 0.35;

        gsap.to(link, {
            x: x,
            y: y,
            duration: 0.4,
            ease: "power2.out"
        });
    });

    link.addEventListener("mouseleave", () => {
        gsap.to(link, {
            x: 0,
            y: 0,
            duration: 0.6,
            ease: "elastic.out(1, 0.3)"
        });
    });
});

// Magnetic effect for other elements
document.querySelectorAll(".magnetic-item:not(.nav-links a)").forEach(item => {
    item.addEventListener("mousemove", (e) => {
        const { left, top, width, height } = item.getBoundingClientRect();
        const x = (e.clientX - (left + width / 2)) * 0.3;
        const y = (e.clientY - (top + height / 2)) * 0.3;

        gsap.to(item, {
            x: x,
            y: y,
            duration: 0.4,
            ease: "power2.out"
        });
    });

    item.addEventListener("mouseleave", () => {
        gsap.to(item, {
            x: 0,
            y: 0,
            duration: 0.6,
            ease: "elastic.out(1, 0.3)"
        });
    });
});

nav.addEventListener("mouseleave", () => {
    gsap.to(hoverPill, {
        opacity: 0,
        duration: 0.3
    });
    // Return pill to active link if it exists
    highlightNav();
});

function highlightNav() {
    const currentPath = window.location.pathname.split("/").pop() || "index.html";
    navLinks.forEach(link => {
        const linkPath = link.getAttribute("href");
        if (linkPath === currentPath) {
            link.classList.add("active");
            
            const { left, top, width, height } = link.getBoundingClientRect();
            const navRect = nav.getBoundingClientRect();
            
            gsap.to(hoverPill, {
                left: left - navRect.left,
                top: top - navRect.top,
                width: width,
                height: height,
                opacity: 1,
                duration: 0.6,
                ease: "power3.out"
            });
        } else {
            link.classList.remove("active");
        }
    });
}

// Initialize Nav
setTimeout(highlightNav, 100);
window.addEventListener("resize", highlightNav);

// Hero Section Reveal
const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

// Cinematic Text Reveal for Name
const nameElement = document.querySelector(".hero h1");
if (nameElement) {
    const nameText = nameElement.innerText;
    nameElement.innerHTML = "";

    const words = nameText.split(" ");
    words.forEach((word, wordIndex) => {
        const wordSpan = document.createElement("span");
        wordSpan.style.display = "inline-block";
        wordSpan.style.overflow = "hidden";
        wordSpan.style.verticalAlign = "top";
        
        if (wordIndex === 1) {
            wordSpan.classList.add("halkaa-text");
        }

        word.split("").forEach(char => {
            const charSpan = document.createElement("span");
            charSpan.innerText = char;
            charSpan.style.display = "inline-block";
            charSpan.classList.add("char");
            wordSpan.appendChild(charSpan);
        });

        nameElement.appendChild(wordSpan);
        if (wordIndex === 0) {
            const space = document.createElement("span");
            space.innerHTML = "&nbsp;";
            nameElement.appendChild(space);
        }
    });

    tl.from(".hero-tag", {
        y: 20,
        opacity: 0,
        duration: 0.6,
        delay: 0.2
    })
    .from(".char", {
        y: 60,
        opacity: 0,
        rotateX: -45,
        duration: 0.8,
        stagger: 0.02,
        ease: "power3.out"
    }, "-=0.3")
    .from(".hero-sub", {
        y: 20,
        opacity: 0,
        duration: 0.7
    }, "-=0.5")
    .from(".image-frame", {
        scale: 0.9,
        opacity: 0,
        duration: 1,
        ease: "power4.out"
    }, "-=0.7");
}

// Scroll Reveal for sections
const revealElements = document.querySelectorAll(".reveal");
revealElements.forEach((el) => {
    gsap.from(el, {
        scrollTrigger: {
            trigger: el,
            start: "top 90%",
            toggleActions: "play none none none"
        },
        y: 40,
        opacity: 0,
        duration: 1,
        ease: "power3.out"
    });
});

// Parallax effect for blobs
window.addEventListener("mousemove", (e) => {
    const { clientX, clientY } = e;
    const x = (clientX - window.innerWidth / 2) * 0.02;
    const y = (clientY - window.innerHeight / 2) * 0.02;

    gsap.to(".bg-blobs", { x: x, y: y, duration: 2, ease: "power2.out" });
    
    // 3D Tilt for CV Container (Disabled on mobile for performance)
    const cvContainer = document.querySelector(".cv-container");
    if (cvContainer && window.innerWidth > 768) {
        const rect = cvContainer.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const rotateX = (clientY - centerY) * 0.01;
        const rotateY = (clientX - centerX) * -0.01;

        gsap.to(cvContainer, {
            rotationX: rotateX,
            rotationY: rotateY,
            duration: 0.5,
            ease: "power2.out"
        });
    }

    // Cinematic Sphere follow
    gsap.to(".sphere", {
        x: x * 2,
        y: y * 2,
        duration: 1.5,
        ease: "power1.out"
    });
});

// Typewriter Effect
const typewriterElement = document.getElementById("typewriter");
if (typewriterElement) {
    const roles = ["UI/UX Designer", "Web Developer", "Python Expert", "Problem Solver"];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 100;

    function type() {
        const currentRole = roles[roleIndex];
        
        if (isDeleting) {
            typewriterElement.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
            typeSpeed = 40;
        } else {
            typewriterElement.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
            typeSpeed = 70;
        }

        if (!isDeleting && charIndex === currentRole.length) {
            isDeleting = true;
            typeSpeed = 1500;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            typeSpeed = 300;
        }

        setTimeout(type, typeSpeed);
    }

    setTimeout(type, 100);
}

// Contact Form Handling
const contactForm = document.getElementById("contact-form");
if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const submitBtn = contactForm.querySelector(".submit-btn");
        const originalContent = submitBtn.innerHTML;

        // Visual feedback
        submitBtn.innerHTML = "<span>Sending...</span><i class='bx bx-loader-alt bx-spin'></i>";
        submitBtn.style.pointerEvents = "none";
        submitBtn.style.opacity = "0.7";

        setTimeout(() => {
            submitBtn.innerHTML = "<span>Message Sent!</span><i class='bx bx-check'></i>";
            submitBtn.style.background = "#22c55e"; // Green success color
            submitBtn.style.boxShadow = "0 10px 20px rgba(34, 197, 94, 0.3)";
            
            contactForm.reset();

            setTimeout(() => {
                submitBtn.innerHTML = originalContent;
                submitBtn.style.pointerEvents = "auto";
                submitBtn.style.opacity = "1";
                submitBtn.style.background = "var(--accent)";
                submitBtn.style.boxShadow = "0 10px 20px rgba(124, 77, 255, 0.2)";
            }, 3000);
        }, 1500);
    });
}

// GitHub Contributions Logic
async function fetchGitHubContributions(username) {
    const container = document.getElementById('github-contributions');
    if (!container) return;

    try {
        const response = await fetch(`https://github-contributions-api.deno.dev/${username}.json`);
        if (!response.ok) throw new Error('Failed to fetch contributions');
        const data = await response.json();
        renderContributions(data);
    } catch (error) {
        console.error('Error fetching GitHub contributions:', error);
        container.innerHTML = `<div class="gh-error">Failed to load contributions. Please try again later.</div>`;
    }
}

function renderContributions(data) {
    const container = document.getElementById('github-contributions');
    if (!container) return;

    container.innerHTML = ''; // Clear loading state

    // Create Tooltip
    const tooltip = document.createElement('div');
    tooltip.className = 'gh-tooltip';
    document.body.appendChild(tooltip);

    const monthLabels = document.createElement('div');
    monthLabels.className = 'gh-month-labels';
    
    const grid = document.createElement('div');
    grid.className = 'gh-grid';

    // Extract months for labels
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const displayedMonths = new Set();

    // The API returns contributions as an array of weeks (each week is an array of days)
    data.contributions.forEach((week, weekIndex) => {
        week.forEach((day, dayIndex) => {
            const dayEl = document.createElement('div');
            dayEl.className = 'gh-day';
            dayEl.setAttribute('data-level', day.contributionLevel);
            dayEl.setAttribute('data-count', day.contributionCount);
            dayEl.setAttribute('data-date', day.date);

            // Positioning in CSS grid (weeks are columns, days are rows)
            // grid-column is 1-indexed, so weekIndex + 1
            // grid-row is 1-indexed, so dayIndex + 1
            dayEl.style.gridColumn = weekIndex + 1;
            dayEl.style.gridRow = dayIndex + 1;

            // Month Label Logic
            const date = new Date(day.date);
            const monthName = months[date.getMonth()];
            if (!displayedMonths.has(monthName) && dayIndex === 0) {
                const monthSpan = document.createElement('span');
                monthSpan.textContent = monthName;
                monthLabels.appendChild(monthSpan);
                displayedMonths.add(monthName);
            }

            // Tooltip Events
            dayEl.addEventListener('mouseenter', (e) => {
                const count = day.contributionCount;
                const dateStr = new Date(day.date).toLocaleDateString('en-US', { 
                    month: 'short', 
                    day: 'numeric', 
                    year: 'numeric' 
                });
                tooltip.textContent = `${count} contribution${count !== 1 ? 's' : ''} on ${dateStr}`;
                tooltip.classList.add('visible');
            });

            dayEl.addEventListener('mousemove', (e) => {
                const x = e.clientX + 15;
                const y = e.clientY - 40;
                tooltip.style.left = `${x}px`;
                tooltip.style.top = `${y}px`;
            });

            dayEl.addEventListener('mouseleave', () => {
                tooltip.classList.remove('visible');
            });

            grid.appendChild(dayEl);
        });
    });

    container.appendChild(monthLabels);
    container.appendChild(grid);

    // Initial positioning check for tooltip
    window.addEventListener('scroll', () => tooltip.classList.remove('visible'));
}

// Initialize GitHub Graph
fetchGitHubContributions('alfa546');
