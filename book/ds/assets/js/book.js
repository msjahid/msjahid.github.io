// ============================================
// SIMPLIFIED BOOK NAVIGATION SYSTEM
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    
    // ============================================
    // SIDEBAR NAVIGATION - ACCORDION
    // ============================================
    const sectionHeaders = document.querySelectorAll('.section-header');
    
    sectionHeaders.forEach(header => {
        header.addEventListener('click', function() {
            const section = this.parentElement;
            const isActive = section.classList.contains('active');
            
            // Close all sections
            document.querySelectorAll('.nav-section').forEach(s => {
                s.classList.remove('active');
            });
            
            // Open clicked section if it wasn't active
            if (!isActive) {
                section.classList.add('active');
            }
        });
    });

    // ============================================
    // CHAPTER NAVIGATION - CLICK HANDLING
    // ============================================
    const chapterItems = document.querySelectorAll('.section-items li');
    
    chapterItems.forEach(item => {
        item.addEventListener('click', function() {
            const chapterFile = this.getAttribute('data-chapter');
            if (!chapterFile) return;
            
            // Remove active from all chapters
            chapterItems.forEach(i => i.classList.remove('active'));
            
            // Add active to clicked chapter
            this.classList.add('active');
            
            // Update progress
            updateProgress();
            
            // Load chapter content
            loadChapter(chapterFile);
        });
    });

    // ============================================
    // LOAD CHAPTER CONTENT DYNAMICALLY
    // ============================================
    function loadChapter(chapterFile) {
        fetch(chapterFile)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Chapter not found');
                }
                return response.text();
            })
            .then(html => {
                const parser = new DOMParser();
                const doc = parser.parseFromString(html, 'text/html');
                const article = doc.querySelector('article.chapter-content');
                
                if (!article) {
                    console.error('Article content not found in chapter file');
                    return;
                }
                
                // Update main content area
                const bookContent = document.querySelector('.book-content');
                bookContent.innerHTML = article.outerHTML;
                
                // Update right sidebar TOC
                updateRightSidebar(article);
                
                // Scroll to top
                bookContent.scrollTop = 0;
                
                // Re-attach navigation button handlers
                attachNavigationButtons();
                
                // Re-attach TOC handlers
                attachTocClickHandlers();
                attachScrollListener();
                
            })
            .catch(error => {
                console.error('Error loading chapter:', error);
                const bookContent = document.querySelector('.book-content');
                bookContent.innerHTML = `
                    <div style="padding: 60px; text-align: center;">
                        <h2 style="color: var(--text-light);">Chapter Not Found</h2>
                        <p style="color: var(--text-gray);">The requested chapter file could not be loaded.</p>
                    </div>
                `;
            });
    }

    // ============================================
    // UPDATE RIGHT SIDEBAR
    // ============================================
    function updateRightSidebar(article) {
        // Update TOC
        const pageToc = document.querySelector('.page-toc');
        if (pageToc) {
            const headings = article.querySelectorAll('h2[id]');
            pageToc.innerHTML = '';
            headings.forEach(heading => {
                const li = document.createElement('li');
                const a = document.createElement('a');
                a.href = '#' + heading.id;
                a.textContent = heading.textContent;
                li.appendChild(a);
                pageToc.appendChild(li);
            });
        }
        
        // Update chapter info from the loaded article
        const chapterInfoPanel = document.querySelector('.book-right-panel .chapter-info');
        const articleInfo = article.querySelector('.chapter-meta');
        if (chapterInfoPanel && articleInfo) {
            const level = articleInfo.querySelector('span:nth-child(2)')?.textContent || 'Beginner';
            const readTime = articleInfo.querySelector('span:nth-child(1)')?.textContent || '5 min read';
            
            chapterInfoPanel.innerHTML = `
                <li><i class="fas fa-layer-group"></i> Level: ${level.replace(/.*:/,'').trim()}</li>
                <li><i class="fas fa-clock"></i> ${readTime}</li>
                <li><i class="fas fa-calendar"></i> Updated: Jan 2026</li>
            `;
        }
    }

    // ============================================
    // TABLE OF CONTENTS - SMOOTH SCROLL & ACTIVE TRACKING
    // ============================================
    function attachTocClickHandlers() {
        const tocLinks = document.querySelectorAll('.page-toc a');
        const bookContent = document.querySelector('.book-content');
        
        tocLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href').substring(1);
                const targetElement = document.querySelector(`#${targetId}`);
                
                if (targetElement && bookContent) {
                    const offsetTop = targetElement.offsetTop - 100;
                    bookContent.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    function attachScrollListener() {
        const bookContent = document.querySelector('.book-content');
        const tocLinks = document.querySelectorAll('.page-toc a');
        
        if (!bookContent) return;
        
        bookContent.addEventListener('scroll', function() {
            const contentSections = document.querySelectorAll('.content-section h2[id]');
            let current = '';
            
            contentSections.forEach(section => {
                const sectionTop = section.offsetTop - 150;
                if (bookContent.scrollTop >= sectionTop) {
                    current = section.getAttribute('id');
                }
            });
            
            tocLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === '#' + current) {
                    link.classList.add('active');
                }
            });
        });
    }

    // Initial setup for TOC
    attachTocClickHandlers();
    attachScrollListener();

    // ============================================
    // PROGRESS TRACKING
    // ============================================
    function updateProgress() {
        const totalChapters = chapterItems.length;
        const activeIndex = Array.from(chapterItems).findIndex(item => item.classList.contains('active'));
        const percentage = Math.round(((activeIndex + 1) / totalChapters) * 100);
        
        const progressFill = document.querySelector('.progress-fill');
        const progressPercentage = document.querySelector('.progress-percentage');
        
        if (progressFill && progressPercentage) {
            progressFill.style.width = percentage + '%';
            progressPercentage.textContent = percentage + '%';
        }
        
        // Save progress to localStorage
        saveProgress();
    }

    // Mark chapter as completed (right-click)
    chapterItems.forEach(item => {
        item.addEventListener('contextmenu', function(e) {
            e.preventDefault();
            this.classList.toggle('completed');
            updateProgress();
        });
    });

    // ============================================
    // CHAPTER NAVIGATION BUTTONS
    // ============================================
    function attachNavigationButtons() {
        const prevButton = document.querySelector('.nav-button.prev');
        const nextButton = document.querySelector('.nav-button.next');
        
        if (prevButton) {
            prevButton.onclick = function() {
                navigateChapter('prev');
            };
        }
        
        if (nextButton) {
            nextButton.onclick = function() {
                navigateChapter('next');
            };
        }
        
        updateNavigationButtons();
    }

    function navigateChapter(direction) {
        const activeChapter = document.querySelector('.section-items li.active');
        const allChapters = Array.from(chapterItems);
        const currentIndex = allChapters.indexOf(activeChapter);
        
        let newIndex;
        if (direction === 'next') {
            newIndex = Math.min(currentIndex + 1, allChapters.length - 1);
        } else {
            newIndex = Math.max(currentIndex - 1, 0);
        }
        
        if (newIndex !== currentIndex) {
            allChapters[newIndex].click();
        }
    }

    function updateNavigationButtons() {
        const activeChapter = document.querySelector('.section-items li.active');
        const allChapters = Array.from(chapterItems);
        const currentIndex = allChapters.indexOf(activeChapter);
        
        const prevButton = document.querySelector('.nav-button.prev');
        const nextButton = document.querySelector('.nav-button.next');
        
        if (prevButton) {
            prevButton.disabled = currentIndex === 0;
        }
        if (nextButton) {
            nextButton.disabled = currentIndex === allChapters.length - 1;
        }
    }

    // Initial button state
    attachNavigationButtons();

    // ============================================
    // KEYBOARD SHORTCUTS
    // ============================================
    document.addEventListener('keydown', function(e) {
        const prevButton = document.querySelector('.nav-button.prev');
        const nextButton = document.querySelector('.nav-button.next');
        
        // Alt + Arrow Left = Previous chapter
        if (e.altKey && e.key === 'ArrowLeft') {
            e.preventDefault();
            if (prevButton && !prevButton.disabled) {
                prevButton.click();
            }
        }
        
        // Alt + Arrow Right = Next chapter
        if (e.altKey && e.key === 'ArrowRight') {
            e.preventDefault();
            if (nextButton && !nextButton.disabled) {
                nextButton.click();
            }
        }
    });

    // ============================================
    // LOCAL STORAGE - SAVE/LOAD PROGRESS
    // ============================================
    function saveProgress() {
        const completedChapters = Array.from(document.querySelectorAll('.section-items li.completed'))
            .map(item => item.getAttribute('data-chapter'));
        
        const activeChapter = document.querySelector('.section-items li.active')
            ?.getAttribute('data-chapter');
        
        localStorage.setItem('bookProgress', JSON.stringify({
            completed: completedChapters,
            current: activeChapter
        }));
    }

    function loadProgress() {
        const saved = localStorage.getItem('bookProgress');
        if (saved) {
            try {
                const progress = JSON.parse(saved);
                
                // Mark completed chapters
                progress.completed.forEach(chapterFile => {
                    const chapter = document.querySelector(`[data-chapter="${chapterFile}"]`);
                    if (chapter) {
                        chapter.classList.add('completed');
                    }
                });
                
                // Load last active chapter if available
                if (progress.current) {
                    const lastChapter = document.querySelector(`[data-chapter="${progress.current}"]`);
                    if (lastChapter) {
                        // Remove active from current
                        chapterItems.forEach(i => i.classList.remove('active'));
                        // Set last viewed as active
                        lastChapter.classList.add('active');
                        // Load its content
                        loadChapter(progress.current);
                    }
                }
                
                updateProgress();
            } catch (e) {
                console.error('Error loading progress:', e);
            }
        }
    }

    // Load saved progress on page load
    loadProgress();

    console.log('📘 Book navigation system initialized!');
});