// main.js

// ============================================
// NAVBAR SCROLL & ACTIVE SECTION HIGHLIGHTING
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav a');
    const sections = document.querySelectorAll('section');

    // Function to update active nav link based on scroll position
    function updateActiveNavLink() {
        let current = '';
        const scrollPosition = window.pageYOffset;
        
        // Check if we're at the top of the page (home section)
        if (scrollPosition < 100) {
            current = 'home';
        } else {
            // Find which section we're currently in
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                
                if (scrollPosition >= sectionTop - 150) {
                    current = section.getAttribute('id');
                }
            });
        }
        
        // Remove active styling from all links
        navLinks.forEach(link => {
            link.style.color = '';
            link.style.fontWeight = '';
        });
        
        // Add active styling to current section
        navLinks.forEach(link => {
            const href = link.getAttribute('href');
            
            if (href === `#${current}`) {
                link.style.color = 'var(--primary-color)';
                link.style.fontWeight = '600';
            }
        });
    }

    // Add click event to nav links for smooth scrolling
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Only handle internal links (starting with #)
            if (href && href.startsWith('#')) {
                e.preventDefault();
                
                const targetSection = document.querySelector(href);
                if (targetSection) {
                    // Smooth scroll to section
                    window.scrollTo({
                        top: targetSection.offsetTop - 70,
                        behavior: 'smooth'
                    });
                    
                    // Update active state immediately after click
                    setTimeout(updateActiveNavLink, 100);
                }
            }
        });
    });

    // Listen to scroll event
    window.addEventListener('scroll', updateActiveNavLink);

    // Initial highlight on page load
    updateActiveNavLink();
});

// ============================================
// NEURAL NETWORK ANIMATION
// ============================================
const canvas = document.getElementById('neuralCanvas');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = document.querySelector('.header').offsetHeight;
}

resizeCanvas();

const particles = [];
const particleCount = 80;
const connectionDistance = 150;

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.radius = Math.random() * 2 + 1;
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = '#12D640';
        ctx.fill();
    }
}

for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach(particle => {
        particle.update();
        particle.draw();
    });

    // Draw connections (neural network effect)
    for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < connectionDistance) {
                ctx.beginPath();
                ctx.strokeStyle = `rgba(18, 214, 64, ${0.3 * (1 - distance / connectionDistance)})`;
                ctx.lineWidth = 0.5;
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(particles[j].x, particles[j].y);
                ctx.stroke();
            }
        }
    }

    requestAnimationFrame(animate);
}

animate();

window.addEventListener('resize', resizeCanvas);

// ============================================
// PROJECT FILTER
// ============================================
const filterButtons = document.querySelectorAll('.projects-filter button');
const projectCards = document.querySelectorAll('.project-card');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        
        // Add active class to clicked button
        button.classList.add('active');
        
        const filterValue = button.getAttribute('data-filter');
        
        projectCards.forEach(card => {
            const category = card.getAttribute('data-category');
            
            if (filterValue === 'all' || filterValue === category) {
                card.style.display = 'block';
                // Add animation
                card.style.animation = 'fadeIn 0.5s ease';
            } else {
                card.style.display = 'none';
            }
        });
    });
});

// Add fadeIn animation
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);

// ============================================
// TYPING EFFECT
// ============================================
const texts = ['Data Scientist', 'Machine Learning Engineer', 'Software Engineer', 'AI Researcher', 'Kaggle Grandmaster'];
let count = 0;
let index = 0;
let currentText = '';
let letter = '';

(function type() {
    if (count === texts.length) {
        count = 0;
    }
    currentText = texts[count];
    letter = currentText.slice(0, ++index);

    document.getElementById('typed-text').textContent = letter;
    if (letter.length === currentText.length) {
        count++;
        index = 0;
        setTimeout(type, 2000);
    } else {
        setTimeout(type, 100);
    }
}());