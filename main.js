/**
 * Mana Oori Ruchulu - Traditional Indian Restaurant Website
 * Main JavaScript file
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize components
    initNavigation();
    initMenuTabs();
    initContactForm();
    initMap();
    initScrollToTop();
    
    // Add active class to nav links based on scroll position
    window.addEventListener('scroll', function() {
        updateNavOnScroll();
        showScrollToTopButton();
    });
});

/**
 * Mobile Navigation Functionality
 */
function initNavigation() {
    const navToggle = document.querySelector('.mobile-nav-toggle');
    const primaryNav = document.getElementById('primary-navigation');
    const navLinks = document.querySelectorAll('.nav-link');
    
    if (navToggle) {
        navToggle.addEventListener('click', () => {
            const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
            navToggle.setAttribute('aria-expanded', !isExpanded);
            primaryNav.classList.toggle('active');
            
            // Change icon
            const icon = navToggle.querySelector('i');
            if (icon.classList.contains('fa-bars')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-xmark');
            } else {
                icon.classList.remove('fa-xmark');
                icon.classList.add('fa-bars');
            }
        });
    }
    
    // Close mobile menu when a link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (primaryNav.classList.contains('active')) {
                primaryNav.classList.remove('active');
                navToggle.setAttribute('aria-expanded', 'false');
                
                const icon = navToggle.querySelector('i');
                icon.classList.remove('fa-xmark');
                icon.classList.add('fa-bars');
            }
        });
    });
    
    // Handle keyboard events for accessibility
    if (primaryNav) {
        primaryNav.addEventListener('keyup', (e) => {
            if (e.key === 'Escape' && primaryNav.classList.contains('active')) {
                primaryNav.classList.remove('active');
                navToggle.setAttribute('aria-expanded', 'false');
                
                const icon = navToggle.querySelector('i');
                icon.classList.remove('fa-xmark');
                icon.classList.add('fa-bars');
                
                navToggle.focus();
            }
        });
    }
}

/**
 * Update active navigation link based on scroll position
 */
function updateNavOnScroll() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let currentSection = '';
    
    sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.scrollY >= (sectionTop - 150)) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach((link) => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

/**
 * Menu Tab Functionality
 */
function initMenuTabs() {
    const menuTabs = document.querySelectorAll('.menu-tab');
    const menuCategories = document.querySelectorAll('.menu-category');
    
    if (menuTabs.length > 0) {
        menuTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                // Remove active class from all tabs
                menuTabs.forEach(t => t.classList.remove('active'));
                
                // Add active class to clicked tab
                tab.classList.add('active');
                
                // Hide all menu categories
                menuCategories.forEach(category => category.classList.remove('active'));
                
                // Show the selected category
                const categoryId = tab.getAttribute('data-category');
                document.getElementById(categoryId).classList.add('active');
            });
        });
    }
}

/**
 * Gallery Filter Functionality
 */
function initGalleryFilter() {
    const galleryTabs = document.querySelectorAll('.gallery-tab');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    if (galleryTabs.length > 0) {
        galleryTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                // Remove active class from all tabs
                galleryTabs.forEach(t => t.classList.remove('active'));
                
                // Add active class to clicked tab
                tab.classList.add('active');
                
                // Get the filter category
                const filter = tab.getAttribute('data-category');
                
                // Filter gallery items
                galleryItems.forEach(item => {
                    if (filter === 'all' || item.classList.contains(filter)) {
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        });
    }
}

/**
 * Contact Form Handling
 */
function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const phone = document.getElementById('phone').value;
            const message = document.getElementById('message').value;
            
            // Perform basic validation
            if (!name || !email || !message) {
                showFormMessage('Please fill in all required fields.', 'error');
                return;
            }
            
            if (!isValidEmail(email)) {
                showFormMessage('Please enter a valid email address.', 'error');
                return;
            }
            
            // This is a static form, so we'll just show a success message
            // In a real implementation, you would send this data to a server
            showFormMessage('Thank you for your message. We will get back to you soon!', 'success');
            
            // Reset the form
            contactForm.reset();
        });
    }
}

/**
 * Display form submission feedback
 */
function showFormMessage(message, type) {
    // Check if a message already exists and remove it
    const existingMessage = document.querySelector('.form-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    // Create message element
    const messageElement = document.createElement('div');
    messageElement.className = `form-message ${type}`;
    messageElement.textContent = message;
    
    // Append after the submit button
    const contactForm = document.getElementById('contact-form');
    const submitButton = contactForm.querySelector('button[type="submit"]');
    submitButton.insertAdjacentElement('afterend', messageElement);
    
    // Remove message after 5 seconds
    setTimeout(() => {
        messageElement.remove();
    }, 5000);
}

/**
 * Validate email format
 */
function isValidEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

/**
 * Initialize Leaflet Map
 */
function initMap() {
    const mapContainer = document.getElementById('restaurant-map');
    
    if (mapContainer && typeof L !== 'undefined') {
        // Create map centered at restaurant location (example coordinates)
        const map = L.map('restaurant-map').setView([19.0760, 72.8777], 15);
        
        // Add OpenStreetMap tiles
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);
        
        // Add marker for restaurant location
        const restaurantMarker = L.marker([19.0760, 72.8777]).addTo(map);
        restaurantMarker.bindPopup("<b>Mana Oori Ruchulu</b><br>123 Culinary Street, Foodie District<br>Mumbai, Maharashtra - 400001").openPopup();
    }
}

/**
 * Scroll to Top Button
 */
function initScrollToTop() {
    const scrollTopButton = document.getElementById('scroll-top');
    
    if (scrollTopButton) {
        scrollTopButton.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

/**
 * Toggle visibility of Scroll to Top button
 */
function showScrollToTopButton() {
    const scrollTopButton = document.getElementById('scroll-top');
    
    if (scrollTopButton) {
        if (window.scrollY > 500) {
            scrollTopButton.classList.add('active');
        } else {
            scrollTopButton.classList.remove('active');
        }
    }
}
