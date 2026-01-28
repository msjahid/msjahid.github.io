// ============================================
// BLOG FUNCTIONALITY
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('searchInput');
    const categoryItems = document.querySelectorAll('.category-item');
    const postCards = document.querySelectorAll('.post-card');
    const tagsCloud = document.querySelectorAll('.tags-cloud .tag');

    let currentCategory = 'all';
    let currentSearchTerm = '';

    // ============================================
    // CATEGORY FILTERING
    // ============================================
    categoryItems.forEach(item => {
        item.addEventListener('click', function() {
            // Remove active class from all
            categoryItems.forEach(cat => cat.classList.remove('active'));
            
            // Add active to clicked
            this.classList.add('active');
            
            // Get category
            currentCategory = this.getAttribute('data-category');
            
            // Filter posts
            filterPosts();
        });
    });

    // ============================================
    // SEARCH FUNCTIONALITY
    // ============================================
    searchInput.addEventListener('input', function() {
        currentSearchTerm = this.value.toLowerCase();
        filterPosts();
    });

    // ============================================
    // TAG FILTERING
    // ============================================
    tagsCloud.forEach(tag => {
        tag.addEventListener('click', function() {
            const tagText = this.textContent.toLowerCase();
            searchInput.value = tagText;
            currentSearchTerm = tagText;
            filterPosts();
        });
    });

    // ============================================
    // POST FILTERING FUNCTION
    // ============================================
    function filterPosts() {
        let visibleCount = 0;

        postCards.forEach(card => {
            const cardCategory = card.getAttribute('data-category');
            const cardTitle = card.querySelector('.post-title a').textContent.toLowerCase();
            const cardExcerpt = card.querySelector('.post-excerpt').textContent.toLowerCase();
            const cardTags = Array.from(card.querySelectorAll('.post-tags .tag'))
                .map(tag => tag.textContent.toLowerCase())
                .join(' ');

            const matchesCategory = currentCategory === 'all' || cardCategory === currentCategory;
            const matchesSearch = currentSearchTerm === '' || 
                cardTitle.includes(currentSearchTerm) ||
                cardExcerpt.includes(currentSearchTerm) ||
                cardTags.includes(currentSearchTerm);

            if (matchesCategory && matchesSearch) {
                card.style.display = 'block';
                card.style.animation = 'fadeIn 0.5s ease-out';
                visibleCount++;
            } else {
                card.style.display = 'none';
            }
        });

        // Show "no results" message if needed
        if (visibleCount === 0) {
            showNoResults();
        } else {
            hideNoResults();
        }
    }

    // ============================================
    // NO RESULTS MESSAGE
    // ============================================
    function showNoResults() {
        let noResultsDiv = document.getElementById('noResults');
        
        if (!noResultsDiv) {
            noResultsDiv = document.createElement('div');
            noResultsDiv.id = 'noResults';
            noResultsDiv.style.cssText = `
                grid-column: 1 / -1;
                text-align: center;
                padding: 60px 20px;
                color: var(--text-gray);
            `;
            noResultsDiv.innerHTML = `
                <i class="fas fa-search" style="font-size: 4rem; margin-bottom: 20px; color: var(--accent1);"></i>
                <h3 style="font-size: 1.5rem; margin-bottom: 10px; color: var(--text-light);">No posts found</h3>
                <p>Try adjusting your search or filter to find what you're looking for.</p>
            `;
            document.getElementById('postsGrid').appendChild(noResultsDiv);
        }
        
        noResultsDiv.style.display = 'block';
    }

    function hideNoResults() {
        const noResultsDiv = document.getElementById('noResults');
        if (noResultsDiv) {
            noResultsDiv.style.display = 'none';
        }
    }

    // ============================================
    // SMOOTH SCROLL
    // ============================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
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
    // HIGHLIGHT RECENT ITEMS ON CLICK
    // ============================================
    document.querySelectorAll('.recent-item').forEach(item => {
        item.addEventListener('click', function() {
            // Remove highlight from all
            document.querySelectorAll('.recent-item').forEach(i => {
                i.style.background = 'var(--bg-dark)';
            });
            // Add highlight to clicked
            this.style.background = 'rgba(235, 111, 146, 0.1)';
        });
    });

    // ============================================
    // SET FIRST CATEGORY AS ACTIVE
    // ============================================
    if (categoryItems.length > 0) {
        categoryItems[0].classList.add('active');
    }
});

// ============================================
// ADDITIONAL UTILITY FUNCTIONS
// ============================================

// Format date
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
}

// Calculate reading time
function calculateReadingTime(text) {
    const wordsPerMinute = 200;
    const words = text.trim().split(/\s+/).length;
    const minutes = Math.ceil(words / wordsPerMinute);
    return `${minutes} min read`;
}

// Debounce function for search
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

// ============================================
// NEWSLETTER FORM - COMPREHENSIVE VALIDATION
// ============================================

let submitted = false;

document.addEventListener("DOMContentLoaded", () => {
  const emailInput = document.getElementById("newsletterEmail");
  const feedback = document.getElementById("emailFeedback");

  if (!emailInput || !feedback) return;

  emailInput.addEventListener("input", () => {
    const email = emailInput.value.trim();

    if (!email) {
      feedback.textContent = "";
      emailInput.classList.remove("valid", "invalid");
    } else if (!isValidEmail(email)) {
      feedback.textContent = "⚠ Please enter a valid email";
      feedback.className = "email-feedback error";
      emailInput.classList.add("invalid");
      emailInput.classList.remove("valid");
    } else {
      feedback.textContent = "✓ Email looks good";
      feedback.className = "email-feedback success";
      emailInput.classList.add("valid");
      emailInput.classList.remove("invalid");
    }
  });
});

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);
}

function submitNewsletter(form) {
  const emailInput = form.querySelector("#newsletterEmail");
  const feedback = document.getElementById("emailFeedback");
  const button = form.querySelector("button");

  if (!emailInput.value || !isValidEmail(emailInput.value)) {
    emailInput.classList.add("shake", "invalid");
    feedback.textContent = "⚠ Please enter a valid email address";
    feedback.className = "email-feedback error";

    setTimeout(() => emailInput.classList.remove("shake"), 500);
    return false;
  }

  // ✅ Allow iframe submission
  submitted = true;

  button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Subscribing...';
  button.disabled = true;
  emailInput.disabled = true;

  return true;
}

function showSuccessMessage() {
  if (!submitted) return;

  const form = document.querySelector(".newsletter-form");
  const feedback = document.getElementById("emailFeedback");
  const button = form.querySelector("button");
  const emailInput = document.getElementById("newsletterEmail");

  feedback.textContent = "✅ Successfully subscribed!";
  feedback.className = "email-feedback success";

  button.innerHTML = '<i class="fas fa-check"></i> Subscribed';
  button.disabled = false;
  emailInput.disabled = false;

  form.reset();
  emailInput.classList.remove("valid", "invalid");

  submitted = false;
}