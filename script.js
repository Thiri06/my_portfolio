// Initialize AOS (Animate On Scroll)
AOS.init({
    duration: 1000,
    once: true,
    mirror: false
});

// Navbar scroll effect
window.addEventListener('scroll', function () {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Active navigation link based on scroll position
window.addEventListener('scroll', function () {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;

        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Back to top button
const backToTopButton = document.querySelector('.back-to-top');

window.addEventListener('scroll', function () {
    if (window.pageYOffset > 300) {
        backToTopButton.classList.add('active');
    } else {
        backToTopButton.classList.remove('active');
    }
});

backToTopButton.addEventListener('click', function (e) {
    e.preventDefault();
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const navbarHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = targetElement.offsetTop - navbarHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });

            // Close mobile menu if open
            const navbarCollapse = document.querySelector('.navbar-collapse');
            if (navbarCollapse.classList.contains('show')) {
                navbarCollapse.classList.remove('show');
            }
        }
    });
});

// Create LED lights around images
function createLEDLights() {
    const heroContainer = document.querySelector('.hero-image-container');
    const aboutContainer = document.querySelector('.about-image-container');

    if (heroContainer) {
        createLEDs(heroContainer, 6, 'hero'); // 6 LED lights for hero
    }

    if (aboutContainer) {
        createLEDs(aboutContainer, 4, 'about'); // 4 LED lights for about
    }
}

function createLEDs(container, count, type) {
    const colors = ['var(--primary-color)', 'var(--secondary-color)', 'var(--accent-color)'];
    const radius = type === 'hero' ? 160 : 140;

    for (let i = 0; i < count; i++) {
        const led = document.createElement('div');
        led.className = 'led-light';
        led.style.color = colors[i % colors.length];
        led.style.background = colors[i % colors.length];
        led.style.animationDuration = `${3 + i * 0.5}s`;
        led.style.animationDelay = `${-i * 0.5}s`;
        led.style.transform = `rotate(${(360 / count) * i}deg) translateX(${radius}px) rotate(-${(360 / count) * i}deg)`;

        container.appendChild(led);
    }
}

// Call the function when the page loads
document.addEventListener('DOMContentLoaded', function () {
    createLEDLights();
});

// Age Counter Function (Updated for inline display)
function updateInlineAgeCounter() {
    // Your birthday: March 6, 2005
    const birthDate = new Date('2005-03-06T00:00:00');
    const now = new Date();

    // Calculate the difference in milliseconds
    const diffInMs = now - birthDate;

    // Convert to years with decimal precision
    const years = (diffInMs / (1000 * 60 * 60 * 24 * 365.25)).toFixed(8);

    // Update the DOM element
    const inlineAgeYears = document.getElementById('inline-age-years');
    if (inlineAgeYears) {
        inlineAgeYears.textContent = Math.floor(years);
    }
}


// Start the age counter when the page loads
document.addEventListener('DOMContentLoaded', function () {
    // Update inline age counter immediately
    updateInlineAgeCounter();

    // Update every minute (since we're only showing years, no need for every second)
    setInterval(updateInlineAgeCounter, 60000);

    // Call existing LED function if it exists
    if (typeof createLEDLights === 'function') {
        createLEDLights();
    }
});


// Form submission
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;
        const formStatus = document.getElementById('form-status');

        // Show sending message
        formStatus.innerHTML = '<p class="text-info">Sending message...</p>';

        // Get form data
        const formData = new FormData(contactForm);

        // Send form data to Formspree
        fetch(contactForm.action, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        })
            .then(response => {
                if (response.ok) {
                    // Success message
                    formStatus.innerHTML = '<p class="text-success">Thanks for your message! I\'ll get back to you soon.</p>';
                    contactForm.reset();
                } else {
                    // Error handling
                    response.json().then(data => {
                        if (Object.hasOwnProperty.call(data, 'errors')) {
                            formStatus.innerHTML = '<p class="text-danger">Sorry, there was an error sending your message. Please try again later.</p>';
                        } else {
                            formStatus.innerHTML = '<p class="text-danger">Oops! There was a problem submitting your form.</p>';
                        }
                    });
                }
            })
            .catch(error => {
                // Network error
                formStatus.innerHTML = '<p class="text-danger">There was a network error. Please try again later.</p>';
                console.error('Error:', error);
            });
    });
}

// Project filter functionality (if you want to add filtering to projects)
document.addEventListener('DOMContentLoaded', function () {
    // You can add project filtering functionality here if needed
    // For example, filtering projects by technology or category
});

// Skills progress animation
function animateSkills() {
    const skillsSection = document.getElementById('skills');
    if (!skillsSection) return;

    const progressBars = document.querySelectorAll('.progress-bar');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                progressBars.forEach(bar => {
                    const width = bar.getAttribute('aria-valuenow') + '%';
                    bar.style.width = width;
                });
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    observer.observe(skillsSection);
}

// Call the function when the page loads
window.addEventListener('load', animateSkills);

// Typing effect for hero section (optional enhancement)
document.addEventListener('DOMContentLoaded', function () {
    const heroTitle = document.querySelector('.hero-section h1');
    if (!heroTitle) return;

    // You can implement a typing effect here if desired
    // This would require a library like Typed.js or a custom implementation
});

// Project hover effect enhancement
const projectCards = document.querySelectorAll('.project-card');
projectCards.forEach(card => {
    card.addEventListener('mouseenter', function () {
        this.querySelector('.project-img img').style.transform = 'scale(1.1)';
    });

    card.addEventListener('mouseleave', function () {
        this.querySelector('.project-img img').style.transform = 'scale(1)';
    });
});

// Preloader (optional)
window.addEventListener('load', function () {
    // If you want to add a preloader, you can hide it here when the page loads
    // const preloader = document.querySelector('.preloader');
    // if (preloader) {
    //     preloader.style.display = 'none';
    // }
});
