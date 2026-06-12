// Mobile detection
const isMobile = window.innerWidth < 768;

function animateBlobs() {
    const blobs = document.querySelectorAll(".blob");
    
    // Disable blob animations on mobile for performance
    if (isMobile) {
        blobs.forEach(blob => {
            gsap.set(blob, { x: 0, y: 0, scale: 1 });
        });
        return;
    }
    
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
    const randomDuration = 3 + Math.random() * 3;

    gsap.to(blob, {
        x: `${randomX}vw`,
        y: `${randomY}vh`,
        duration: randomDuration,
        ease: "sine.inOut",
        onComplete: () => moveBlob(blob)
    });
}

// Initialize Movement (disabled on mobile)
animateBlobs();

// Initialize Lenis for Ultra Smooth Scrolling (disabled on mobile)
let lenis = null;
if (!isMobile) {
    lenis = new Lenis({
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
} else {
    // Use default scroll on mobile
    window.scrollBehavior = 'auto';
}

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

// 3D Tilt Effect for Cards (.cert-card, .contact-card)
const tiltCards = document.querySelectorAll(".cert-card, .contact-card");
if (tiltCards.length > 0 && window.innerWidth > 768) {
    tiltCards.forEach(card => {
        card.addEventListener("mousemove", (e) => {
            const rect = card.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width - 0.5;
            const y = (e.clientY - rect.top) / rect.height - 0.5;

            gsap.to(card, {
                rotationY: x * 15,
                rotationX: -y * 15,
                transformPerspective: 800,
                duration: 0.5,
                ease: "power2.out"
            });
        });

        card.addEventListener("mouseleave", () => {
            gsap.to(card, {
                rotationY: 0,
                rotationX: 0,
                duration: 0.8,
                ease: "power4.out"
            });
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

    // Smooth scroll navigation
    link.addEventListener("click", (e) => {
        const targetId = link.getAttribute("href");
        if (targetId.startsWith("#")) {
            e.preventDefault();
            if (lenis) {
                lenis.scrollTo(targetId, {
                    offset: 0,
                    duration: 1.2
                });
            } else {
                // Fallback for mobile
                document.querySelector(targetId)?.scrollIntoView({ behavior: 'smooth' });
            }
        }
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

let currentActiveSection = "home";

function updateActiveNav(activeId) {
    currentActiveSection = activeId;
    navLinks.forEach(link => {
        const href = link.getAttribute("href");
        if (href === `#${activeId}`) {
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

nav.addEventListener("mouseleave", () => {
    gsap.to(hoverPill, {
        opacity: 0,
        duration: 0.3
    });
    // Return pill to active link if it exists
    updateActiveNav(currentActiveSection);
});

function initScrollNavigation() {
    const sections = document.querySelectorAll("section[id]");
    sections.forEach(section => {
        ScrollTrigger.create({
            trigger: section,
            start: "top 40%",
            end: "bottom 40%",
            onToggle: self => {
                if (self.isActive) {
                    const id = section.getAttribute("id");
                    updateActiveNav(id);
                }
            }
        });
    });
}

function handleResize() {
    updateActiveNav(currentActiveSection);
}

// Initialize Scroll Nav and resize listener
setTimeout(() => {
    initScrollNavigation();
    updateActiveNav("home");
}, 100);

window.addEventListener("resize", handleResize);

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
    // Optimize reveal animations on mobile
    const duration = isMobile ? 0.6 : 1;
    gsap.from(el, {
        scrollTrigger: {
            trigger: el,
            start: "top 90%",
            toggleActions: "play none none none"
        },
        y: 40,
        opacity: 0,
        duration: duration,
        ease: "power3.out"
    });
});

// Parallax effect for blobs (desktop only for performance)
if (!isMobile && window.innerWidth > 768) {
    let ticking = false;
    let lastX = 0;
    let lastY = 0;

    window.addEventListener("mousemove", (e) => {
        lastX = e.clientX;
        lastY = e.clientY;

        if (!ticking) {
            requestAnimationFrame(() => {
                const { clientX, clientY } = { clientX: lastX, clientY: lastY };
                const x = (clientX - window.innerWidth / 2) * 0.02;
                const y = (clientY - window.innerHeight / 2) * 0.02;

                gsap.to(".bg-blobs", { x: x, y: y, duration: 2, ease: "power2.out" });
                
                // 3D Tilt for CV Container (Disabled on mobile for performance)
                const cvContainer = document.querySelector(".cv-container");
                if (cvContainer) {
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

                ticking = false;
            });
            ticking = true;
        }
    });
}

// Typewriter Effect
const typewriterElement = document.getElementById("typewriter");
if (typewriterElement) {
    const roles = ["UI/UX Designer", "Web Developer", "Python Expert", "Problem Solver"];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = isMobile ? 60 : 100;

    function type() {
        const currentRole = roles[roleIndex];
        
        if (isDeleting) {
            typewriterElement.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
            typeSpeed = isMobile ? 25 : 40;
        } else {
            typewriterElement.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
            typeSpeed = isMobile ? 40 : 70;
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

    // Local Caching Optimization
    const CACHE_KEY = `gh_contribs_${username}`;
    const CACHE_TIME_KEY = `gh_contribs_time_${username}`;
    const CACHE_DURATION = 15 * 60 * 1000; // 15 minutes

    const cachedData = localStorage.getItem(CACHE_KEY);
    const cachedTime = localStorage.getItem(CACHE_TIME_KEY);

    if (cachedData && cachedTime && (Date.now() - cachedTime < CACHE_DURATION)) {
        try {
            renderContributions(JSON.parse(cachedData));
            return;
        } catch (e) {
            localStorage.removeItem(CACHE_KEY);
            localStorage.removeItem(CACHE_TIME_KEY);
        }
    }

    try {
        // Refresh stats images with timestamp to avoid caching
        const statsImages = document.querySelectorAll('.stats-card img');
        statsImages.forEach(img => {
            const src = img.getAttribute('src');
            if (src && !src.includes('t=')) {
                const separator = src.includes('?') ? '&' : '?';
                img.src = `${src}${separator}t=${Date.now()}`;
            }
        });

        // Added cache: 'no-store' and timestamp to avoid stale data
        const [contribRes, eventsRes] = await Promise.all([
            fetch(`https://github-contributions-api.deno.dev/${username}.json?t=${Date.now()}`, { cache: 'no-store' }),
            fetch(`https://api.github.com/users/${username}/events/public?t=${Date.now()}`, { cache: 'no-store' })
        ]);

        if (!contribRes.ok) throw new Error('Failed to fetch contributions');
        
        const data = await contribRes.json();
        let events = [];
        if (eventsRes.ok) {
            events = await eventsRes.json();
        }

        // Create a map of contributions from recent public events
        const eventCounts = {};
        events.forEach(event => {
            const date = event.created_at.split('T')[0];
            if (!eventCounts[date]) eventCounts[date] = 0;
            
            if (event.type === 'PushEvent') {
                eventCounts[date] += event.payload.size || 1;
            } else if (['PullRequestEvent', 'IssuesEvent', 'CreateEvent'].includes(event.type)) {
                if (event.type === 'CreateEvent' && event.payload.ref_type !== 'repository') return;
                eventCounts[date] += 1;
            }
        });

        // Sync data: Update counts for all dates found in events
        data.contributions.forEach(week => {
            week.forEach(day => {
                const countFromEvents = eventCounts[day.date] || 0;
                if (countFromEvents > day.contributionCount) {
                    day.contributionCount = countFromEvents;
                    
                    // Update level based on count (standard GitHub tiers)
                    if (countFromEvents >= 10) day.contributionLevel = 'FOURTH_QUARTILE';
                    else if (countFromEvents >= 6) day.contributionLevel = 'THIRD_QUARTILE';
                    else if (countFromEvents >= 3) day.contributionLevel = 'SECOND_QUARTILE';
                    else if (countFromEvents > 0) day.contributionLevel = 'FIRST_QUARTILE';
                }
            });
        });

        // Cache the processed data
        localStorage.setItem(`gh_contribs_${username}`, JSON.stringify(data));
        localStorage.setItem(`gh_contribs_time_${username}`, Date.now());

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

    // Calculate total contributions
    let totalCount = 0;
    data.contributions.forEach(week => {
        week.forEach(day => {
            totalCount += day.contributionCount;
        });
    });

    const totalEl = document.getElementById('gh-total-contributions');
    if (totalEl) {
        totalEl.textContent = `${totalCount} contributions in the last year`;
    }


    // Create Tooltip
    const tooltip = document.createElement('div');
    tooltip.className = 'gh-tooltip';
    document.body.appendChild(tooltip);

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
            // Shifted grid-row by 1 to accommodate month labels in row 1
            dayEl.style.gridColumn = weekIndex + 1;
            dayEl.style.gridRow = dayIndex + 2;

            // Month Label Logic
            const date = new Date(day.date);
            const isMobile = window.innerWidth < 480;
            const monthName = isMobile ? months[date.getMonth()][0] : months[date.getMonth()];
            
            // Only add label if it's the start of a month and we haven't displayed it yet
            if (!displayedMonths.has(monthName) && dayIndex === 0) {
                const monthSpan = document.createElement('span');
                monthSpan.textContent = monthName;
                monthSpan.className = 'gh-month-label';
                monthSpan.style.gridColumn = weekIndex + 1;
                monthSpan.style.gridRow = 1;
                grid.appendChild(monthSpan);
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

    container.appendChild(grid);

    // Initial positioning check for tooltip
    window.addEventListener('scroll', () => tooltip.classList.remove('visible'));

    // Smoothly auto-scroll to the far right on load so the most recent contributions are highlighted first
    setTimeout(() => {
        container.scrollTo({
            left: container.scrollWidth,
            behavior: 'smooth'
        });
    }, 300);
}

// Initialize GitHub Graph
fetchGitHubContributions('alfa546');
