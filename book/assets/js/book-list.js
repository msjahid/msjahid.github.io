// ============================================
// BOOK LIST - INTERACTIVE FEATURES
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    
    // ============================================
    // FILTER FUNCTIONALITY
    // ============================================
    const filterButtons = document.querySelectorAll('.filter-btn');
    const bookCards = document.querySelectorAll('.book-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // Update active state
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter books with animation
            bookCards.forEach((card, index) => {
                const status = card.getAttribute('data-status');
                
                if (filter === 'all' || status === filter) {
                    // Show card with staggered animation
                    setTimeout(() => {
                        card.classList.remove('hidden');
                        card.style.animation = 'none';
                        setTimeout(() => {
                            card.style.animation = `fadeInUp 0.6s ease forwards`;
                        }, 10);
                    }, index * 50);
                } else {
                    // Hide card
                    card.classList.add('hidden');
                }
            });
        });
    });

    // ============================================
    // NEWSLETTER FORM SUBMISSION
    // ============================================
    const newsletterForm = document.querySelector('.newsletter-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = this.querySelector('.newsletter-input');
            const submitBtn = this.querySelector('.newsletter-btn');
            const email = emailInput.value;
            
            if (email) {
                // Disable button and show loading state
                submitBtn.disabled = true;
                const originalHTML = submitBtn.innerHTML;
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> <span>Subscribing...</span>';
                
                // Simulate API call
                setTimeout(() => {
                    // Show success message
                    submitBtn.innerHTML = '<i class="fas fa-check"></i> <span>Subscribed!</span>';
                    submitBtn.style.background = '#4caf50';
                    
                    // Reset form
                    emailInput.value = '';
                    
                    // Show success alert
                    showNotification('Successfully subscribed! You\'ll receive updates when new books are published.', 'success');
                    
                    // Reset button after 3 seconds
                    setTimeout(() => {
                        submitBtn.disabled = false;
                        submitBtn.innerHTML = originalHTML;
                        submitBtn.style.background = '';
                    }, 3000);
                }, 1500);
            }
        });
    }

    // ============================================
    // NOTIFY ME BUTTONS
    // ============================================
    const notifyButtons = document.querySelectorAll('.btn-secondary');
    
    notifyButtons.forEach(button => {
        if (button.textContent.includes('Notify Me')) {
            button.addEventListener('click', function() {
                const bookCard = this.closest('.book-card');
                const bookTitle = bookCard.querySelector('.book-title').textContent;
                
                // Disable button and show feedback
                const originalHTML = this.innerHTML;
                this.innerHTML = '<i class="fas fa-check"></i> Notification Set';
                this.style.background = '#4caf50';
                this.style.color = 'white';
                this.style.borderColor = '#4caf50';
                this.disabled = true;
                
                // Show notification
                showNotification(`You'll be notified when "${bookTitle}" is published!`, 'success');
                
                // Reset after 3 seconds
                setTimeout(() => {
                    this.innerHTML = originalHTML;
                    this.style.background = '';
                    this.style.color = '';
                    this.style.borderColor = '';
                    this.disabled = false;
                }, 3000);
            });
        }
    });

    // ============================================
    // SMOOTH SCROLL FOR ANCHOR LINKS
    // ============================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // ============================================
    // PARALLAX EFFECT ON SCROLL
    // ============================================
    const bgDecoration = document.querySelector('.bg-decoration');
    
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        if (bgDecoration) {
            bgDecoration.style.transform = `translateY(${scrolled * 0.3}px)`;
        }
    });

    // ============================================
    // BOOK CARD HOVER EFFECT
    // ============================================
    bookCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const bookNumber = this.querySelector('.book-number');
            if (bookNumber) {
                bookNumber.style.transform = 'scale(1.1) rotate(-5deg)';
                bookNumber.style.opacity = '0.7';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            const bookNumber = this.querySelector('.book-number');
            if (bookNumber) {
                bookNumber.style.transform = 'scale(1) rotate(0)';
                bookNumber.style.opacity = '0.5';
            }
        });
    });

    // ============================================
    // NOTIFICATION SYSTEM
    // ============================================
    function showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        `;
        
        // Add styles
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? '#4caf50' : '#2196f3'};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
            display: flex;
            align-items: center;
            gap: 0.75rem;
            font-family: var(--font-body);
            font-size: 0.95rem;
            z-index: 10000;
            animation: slideInRight 0.4s ease, slideOutRight 0.4s ease 2.6s forwards;
            max-width: 400px;
        `;
        
        // Add to body
        document.body.appendChild(notification);
        
        // Remove after animation
        setTimeout(() => {
            notification.remove();
        }, 3000);
    }

    // Add notification animations to page
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInRight {
            from {
                transform: translateX(400px);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes slideOutRight {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(400px);
                opacity: 0;
            }
        }
        
        .book-number {
            transition: all 0.3s ease;
        }
    `;
    document.head.appendChild(style);

    // ============================================
    // INTERSECTION OBSERVER FOR ANIMATIONS
    // ============================================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe newsletter section
    const newsletterSection = document.querySelector('.newsletter-section');
    if (newsletterSection) {
        newsletterSection.style.opacity = '0';
        newsletterSection.style.transform = 'translateY(30px)';
        newsletterSection.style.transition = 'all 0.6s ease';
        observer.observe(newsletterSection);
    }

    // ============================================
    // DYNAMIC COUNT UPDATES
    // ============================================
    function updateFilterCounts() {
        const allBooks = bookCards.length;
        const publishedBooks = document.querySelectorAll('[data-status="published"]').length;
        const upcomingBooks = document.querySelectorAll('[data-status="upcoming"]').length;
        
        filterButtons.forEach(btn => {
            const filter = btn.getAttribute('data-filter');
            const countElement = btn.querySelector('.count');
            
            if (countElement) {
                switch(filter) {
                    case 'all':
                        countElement.textContent = allBooks;
                        break;
                    case 'published':
                        countElement.textContent = publishedBooks;
                        break;
                    case 'upcoming':
                        countElement.textContent = upcomingBooks;
                        break;
                }
            }
        });
    }

    // Initial count update
    updateFilterCounts();

    // ============================================
    // KEYBOARD SHORTCUTS
    // ============================================
    document.addEventListener('keydown', function(e) {
        // Press 1, 2, 3 to activate filters
        if (e.key === '1') {
            filterButtons[0]?.click();
        } else if (e.key === '2') {
            filterButtons[1]?.click();
        } else if (e.key === '3') {
            filterButtons[2]?.click();
        }
    });

    // ============================================
    // LOADING ANIMATION COMPLETE
    // ============================================
    console.log('📚 Book list initialized successfully!');
    
    // Add a subtle entrance animation to the header
    const header = document.querySelector('.page-header');
    if (header) {
        header.style.opacity = '0';
        header.style.transform = 'translateY(-20px)';
        setTimeout(() => {
            header.style.transition = 'all 0.6s ease';
            header.style.opacity = '1';
            header.style.transform = 'translateY(0)';
        }, 100);
    }
});

// ============================================
// UTILITY FUNCTIONS
// ============================================

// Debounce function for performance
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Add resize observer for responsive adjustments
window.addEventListener('resize', debounce(function() {
    console.log('Window resized - adjusting layout');
}, 250));