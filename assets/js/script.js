/**
 * Modern SaaS Interactions & Animations
 * Inspired by Stripe, Vercel, Linear
 */

document.addEventListener('DOMContentLoaded', () => {
    initNavbar();
    initTheme();
    initScrollAnimations();
    initCounterAnimations();
    initMagneticButtons();
    initWorkshopScroll();
});

/**
 * Navbar scroll behavior & glassmorphism
 */
function initNavbar() {
    const navbar = document.querySelector('.navbar');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile menu logic
    const mobileToggle = document.querySelector('.navbar-toggle');
    const navLinks = document.querySelector('.nav-links');
    const body = document.body;

    if (mobileToggle) {
        mobileToggle.addEventListener('click', () => {
            mobileToggle.classList.toggle('active');
            navLinks.classList.toggle('active');
            body.classList.toggle('menu-open');
        });

        // Close menu when clicking links
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileToggle.classList.remove('active');
                navLinks.classList.remove('active');
                body.classList.remove('menu-open');
            });
        });
    }
}

/**
 * Theme Switcher with Persistence
 */
function initTheme() {
    const themeBtn = document.getElementById('themeToggle');
    const html = document.documentElement;

    // Check saved preference or system preference
    const savedTheme = localStorage.getItem('theme') ||
        (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');

    html.setAttribute('data-theme', savedTheme);
    updateToggleIcon(savedTheme);

    themeBtn.addEventListener('click', () => {
        const currentTheme = html.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

        html.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateToggleIcon(newTheme);
    });

    function updateToggleIcon(theme) {
        const icon = themeBtn.querySelector('.theme-icon');
        if (icon) {
            icon.textContent = theme === 'dark' ? '🌙' : '☀️';
        }
    }
}

/**
 * Reveal elements on scroll using Intersection Observer
 */
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // Optional: Unobserve if we only want animation once
                // observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach(el => observer.observe(el));
}

/**
 * Animated Counter for Stats
 */
function initCounterAnimations() {
    const observerOptions = {
        threshold: 0.5
    };

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const countTargets = entry.target.querySelectorAll('.stat-number');
                countTargets.forEach(target => animateCount(target));
                counterObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const statsGrid = document.querySelector('.stats-grid');
    if (statsGrid) counterObserver.observe(statsGrid);
}

function animateCount(el) {
    const target = parseInt(el.getAttribute('data-target'));
    const duration = 2000; // 2 seconds
    const frameDuration = 1000 / 60; // 60fps
    const totalFrames = Math.round(duration / frameDuration);
    const easeOutQuad = t => t * (2 - t);

    let frame = 0;

    const count = () => {
        frame++;
        const progress = easeOutQuad(frame / totalFrames);
        const currentCount = Math.round(target * progress);

        // Handle suffix (like + or %)
        const suffix = el.getAttribute('data-suffix') || '';
        el.textContent = currentCount + suffix;

        if (frame < totalFrames) {
            requestAnimationFrame(count);
        } else {
            el.textContent = target + suffix;
        }
    };

    count();
}

/**
 * Subtle Magnetic Effect for primary buttons
 */
function initMagneticButtons() {
    const buttons = document.querySelectorAll('.btn-primary');

    buttons.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
        });

        btn.addEventListener('mouseleave', () => {
            btn.style.transform = 'translate(0, 0)';
        });
    });
}

/**
 * Smooth internal anchor scrolling
 */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const navHeight = document.querySelector('.navbar').offsetHeight;
            window.scrollTo({
                top: targetElement.offsetTop - navHeight,
                behavior: 'smooth'
            });
        }
    });
});

/**
 * Workshops System (Dynamic Data & Sorting)
 */
const WORKSHOPS = [
    {
        title: "Cybersecurity",
        description: "From cybersecurity basics to real-world attacks. Learn ethical hacking, web and API security, and hands-on skills to start your cybersecurity career.",
        location: "Vijayawada",
        venue: "Codegnan, Vijayawada",
        date: "2026-02-22",
        icon: "🔐",
        type: "upcoming",
        link: "workshop-cyber.html",
        isPaid: true
    },
    {
        title: "Interview Mastery",
        description: "How to Face an Interview – From preparation to performance. Learn to answer confidently and make a strong impression.",
        location: "VIJAYAWADA",
        venue: "Codegnan Java Campus",
        date: "2026-03-1",
        icon: "🤝",
        type: "upcoming",
        link: "contact.html"
    },
    // Previous Workshops (15 Entries)
    {
        title: "GenAI-Powered Storytelling",
        description: "From prompts to powerful stories. Learn to use GenAI for emotion detection, image understanding, and speech generation.",
        location: "VIJAYAWADA",
        venue: "Codegnan Java Campus",
        date: "2026-01-20",
        icon: "🐍",
        type: "previous"
    },
    {
        title: "GitHub & Collabration ",
        description: "From repositories to real projects. Learn version control, collaboration, and project sharing using GitHub.",
        location: "VIJAYAWADA",
        venue: "Codegnan Java Campus",
        date: "2026-01-05",
        icon: "☕",
        type: "previous"
    },
    {
        title: "Build a Portfolio that Gets You Noticed!",
        description: "From simple projects to a standout portfolio. Learn to showcase your work to attract recruiters.",
        location: "VIJAYAWADA",
        venue: "Codegnan Java Campus",
        date: "2025-12-15",
        icon: "💻",
        type: "previous"
    },
    {
        title: "From Selfie to Sci-Fi! Build AR Filters That Move With You",
        description: "From camera input to interactive effects. Learn to create AR filters that track and move in real time.",
        location: "VIJAYAWADA",
        venue: "Codegnan Java Campus",
        date: "2025-11-28",
        icon: "📊",
        type: "previous"
    },
    {
        title: "Build Your Own Pose Controller Game",
        description: "From body movement to gameplay. Learn to control games using pose detection and computer vision.",
        location: "VIJAYAWADA",
        venue: "Codegnan Java Campus",
        date: "2025-11-10",
        icon: "☁️",
        type: "previous"
    },
    {
        title: "Build Your Own Telegram Chatbot",
        description: "From messaging to automation. Learn to create chatbots that respond, assist, and automate tasks.",
        location: "VIJAYAWADA",
        venue: "Codegnan Java Campus",
        date: "2025-10-22",
        icon: "🤖",
        type: "previous"
    },
    {
        title: "Voice-to-Voice Applications",
        description: "From speech input to speech output. Learn to build voice-enabled applications using AI.",
        location: "VIJAYAWADA",
        venue: "Codegnan Java Campus",
        date: "2025-10-05",
        icon: "🎨",
        type: "previous"
    },
    {
        title: "Prompt Engineering & Vibe Coding",
        description: "From ideas to working code. Learn to use prompts effectively and build projects faster with AI.",
        location: "VIJAYAWADA",
        venue: "Codegnan Java Campus",
        date: "2025-09-18",
        icon: "🟢",
        type: "previous"
    },
    {
        title: "Become Your Own Automation Assistant",
        description: "From daily tasks to smart automation. Learn to build an AI assistant to manage productivity and career tasks.",
        location: "VIJAYAWADA",
        venue: "Codegnan Java Campus",
        date: "2025-09-02",
        icon: "🗄️",
        type: "previous"
    },
    {
        title: "GenAI-Powered Data Analytics",
        description: "From raw data to smart insights. Learn to analyze and visualize data using Generative AI tools.",
        location: "VIJAYAWADA",
        venue: "Codegnan Java Campus",
        date: "2025-08-15",
        icon: "🧪",
        type: "previous"
    },
    {
        title: "GenAI in Healthcare",
        description: "From medical data to intelligent support. Learn how GenAI is transforming diagnosis, analysis, and patient care.",
        location: "VIJAYAWADA",
        venue: "Codegnan Java Campus",
        date: "2025-07-30",
        icon: "🚀",
        type: "previous"
    },
    {
        title: "Python in Action",
        description: "From basics to real applications. Learn to build scripts, automate tasks, and develop practical Python projects.",
        location: "VIJAYAWADA",
        venue: "Codegnan Java Campus",
        date: "2025-07-12",
        icon: "📱",
        type: "previous"
    },
    {
        title: "Flutter",
        description: "From UI design to mobile apps. Learn to build fast, beautiful cross-platform applications with Flutter.",
        location: "VIJAYAWADA",
        venue: "Codegnan Java Campus",
        date: "2025-06-25",
        icon: "🐙",
        type: "previous"
    },
    {
        title: "Quantum Computing",
        description: "From classical concepts to quantum principles. Learn the basics of qubits, quantum logic, and real-world applications.",
        location: "VIJAYAWADA",
        venue: "Codegnan Java Campus",
        date: "2025-06-08",
        icon: "⚙️",
        type: "previous"
    },
    {
        title: "Responsive Website",
        description: "From static pages to adaptive layouts. Learn to build websites that work seamlessly on mobile, tablet, and desktop.",
        location: "VIJAYAWADA",
        venue: "Codegnan Java Campus",
        date: "2025-05-20",
        icon: "⚛️",
        type: "previous"
    }
];

function initWorkshopScroll() {
    const scrollSections = [
        {
            wrapper: document.querySelector('#upcoming-workshops-grid'),
            prev: document.getElementById('prevBtn'),
            next: document.getElementById('nextBtn')
        },
        {
            wrapper: document.querySelector('#previous-workshops-grid'),
            prev: document.getElementById('prevPrevBtn'),
            next: document.getElementById('nextPrevBtn')
        }
    ];

    renderWorkshops();

    scrollSections.forEach(section => {
        const { wrapper, prev, next } = section;
        if (!wrapper) return;

        // Scroll Controls
        if (next) next.addEventListener('click', () => wrapper.scrollBy({ left: 448, behavior: 'smooth' }));
        if (prev) prev.addEventListener('click', () => wrapper.scrollBy({ left: -448, behavior: 'smooth' }));

        // Focus Detection
        const observerOptions = {
            root: wrapper,
            threshold: 0.1,
            rootMargin: '0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('focused');
                } else {
                    entry.target.classList.remove('focused');
                }
            });
        }, observerOptions);

        // Initial observe and click-to-focus
        const setupCards = () => {
            wrapper.querySelectorAll('.card').forEach(card => {
                observer.observe(card);
                card.addEventListener('click', () => {
                    card.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
                });
            });
        };

        setupCards();

        // Strict Center Focus Logic
        wrapper.addEventListener('scroll', () => {
            const centerX = wrapper.scrollLeft + (wrapper.offsetWidth / 2);
            let closestCard = null;
            let minDistance = Infinity;

            wrapper.querySelectorAll('.card').forEach(card => {
                const cardCenter = card.offsetLeft + (card.offsetWidth / 2);
                const distance = Math.abs(centerX - cardCenter);
                if (distance < minDistance) {
                    minDistance = distance;
                    closestCard = card;
                }
            });

            wrapper.querySelectorAll('.card').forEach(c => c.classList.remove('focused'));
            if (closestCard) {
                closestCard.classList.add('focused');
            }
        });

        // Initialize: Focus on the 1st card (index 0) without jumping the page vertically
        setTimeout(() => {
            const cards = wrapper.querySelectorAll('.card');
            if (cards.length >= 1) {
                const targetCard = cards[0];
                const scrollPos = targetCard.offsetLeft - (wrapper.offsetWidth / 2) + (targetCard.offsetWidth / 2);
                wrapper.scrollTo({ left: scrollPos, behavior: 'auto' });
            }
            wrapper.dispatchEvent(new Event('scroll'));
        }, 300);
    });
}

function renderWorkshops() {
    const upcomingGrid = document.getElementById('upcoming-workshops-grid');
    const previousGrid = document.getElementById('previous-workshops-grid');
    const today = new Date('2026-02-11');

    if (upcomingGrid) {
        const upcoming = WORKSHOPS.filter(w => new Date(w.date) > today)
            .sort((a, b) => new Date(a.date) - new Date(b.date));

        upcomingGrid.innerHTML = upcoming.map(w => createWorkshopCard(w)).join('');
    }

    if (previousGrid) {
        const previous = WORKSHOPS.filter(w => new Date(w.date) <= today)
            .sort((a, b) => new Date(b.date) - new Date(a.date));

        previousGrid.innerHTML = previous.map(w => createWorkshopCard(w, true)).join('');
    }

    // Reinitalize animations for new elements
    initScrollAnimations();
}

function createWorkshopCard(w, isPast = false) {
    const dateObj = new Date(w.date);
    const dateStr = dateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

    if (isPast) {
        return `
            <div class="card reveal active" style="padding: 2rem; border: 1px solid var(--border-color); transition: all 0.4s var(--ease-out);">
                <div class="card-icon" style="background: rgba(99, 102, 241, 0.1); color: var(--brand-primary); width: 48px; height: 48px; font-size: 1.5rem; margin-bottom: 1.5rem; display: flex; align-items: center; justify-content: center; border-radius: 12px;">${w.icon}</div>
                <h3 class="card-title" style="font-size: 1.3rem; margin-bottom: 0.75rem;">${w.title}</h3>
                <p class="card-text" style="font-size: 0.95rem; margin-bottom: 1.5rem; color: var(--text-muted);">${w.description}</p>
                <div style="margin-top: auto; border-top: 1px solid var(--border-color); padding-top: 1.25rem;">
                    <div style="display: flex; gap: 0.75rem; margin-bottom: 1.25rem;">
                        <a href="https://github.com/CodegnanITSolutionsPvtLtd/Codegnan_Hub" class="btn btn-secondary" style="flex: 1; padding: 0.6rem; font-size: 0.85rem; justify-content: center;" target="_blank">GitHub</a>
                        <a href="#" class="btn btn-secondary" style="flex: 1; padding: 0.6rem; font-size: 0.85rem; justify-content: center;">Blog</a>
                    </div>
                    <p style="font-size: 0.85rem; color: var(--text-muted); opacity: 0.8;"><span style="font-weight: 600; color: var(--brand-primary);">Held at:</span> ${w.venue}</p>
                </div>
            </div>
        `;
    }

    return `
        <div class="card reveal active" ${w.isPaid ? 'style="border: 1px solid var(--brand-primary); padding: 2rem;"' : 'style="padding: 2rem;"'}>
            ${w.isPaid ? `<div style="position: absolute; top: 1.25rem; right: 1.25rem;">
                <span style="background: var(--brand-primary); color: white; padding: 0.3rem 0.6rem; border-radius: 6px; font-size: 0.7rem; font-weight: 700;">PRO</span>
            </div>` : ''}
            <div class="card-icon" style="${w.isPaid ? 'background: var(--brand-primary); color: white;' : ''} width: 48px; height: 48px; font-size: 1.5rem; margin-bottom: 1.5rem;">${w.icon}</div>
            <div style="display: flex; gap: 0.5rem; margin-bottom: 1rem;">
                <span style="padding: 0.3rem 0.6rem; background: rgba(99, 102, 241, 0.1); color: var(--brand-primary); border-radius: 100px; font-size: 0.7rem; font-weight: 700; border: 1px solid rgba(99,102,241,0.2);">${w.location}</span>
            </div>
            <h3 class="card-title" style="font-size: 1.3rem; margin-bottom: 0.75rem;">${w.title}</h3>
            <p class="card-text" style="font-size: 0.95rem; margin-bottom: 1.5rem;">${w.description}</p>
            <div style="margin-top: auto; border-top: 1px solid var(--border-color); padding-top: 1.25rem;">
                <p style="font-size: 0.85rem; color: var(--text-muted); margin-bottom: 1.25rem;"><span style="color: var(--text-main); font-weight: 600;">Venue:</span> ${w.venue}</p>
                <div style="display: flex; flex-direction: column; gap: 0.75rem;">
                    <a href="${w.link}" class="btn btn-primary" style="width: 100%; justify-content: center; padding: 0.75rem; font-size: 0.9rem;">View Details</a>
                </div>
            </div>
        </div>
    `;
}

