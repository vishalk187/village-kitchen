/**
 * Mana Oori Ruchulu - Traditional Indian Restaurant Website
 * Lightbox functionality for image gallery
 */

document.addEventListener('DOMContentLoaded', function() {
    initLightbox();
});

/**
 * Initialize the lightbox functionality
 */
function initLightbox() {
    const lightboxLinks = document.querySelectorAll('.lightbox');
    const lightboxContainer = document.getElementById('lightbox-container');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const lightboxClose = document.querySelector('.lightbox-close');
    
    if (!lightboxContainer || !lightboxImg || !lightboxCaption || !lightboxClose) {
        console.error('Lightbox elements not found in the DOM');
        return;
    }
    
    // Open lightbox when a gallery image is clicked
    lightboxLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Get the image source and caption
            const imgSrc = this.getAttribute('href');
            const caption = this.querySelector('.gallery-overlay span').textContent;
            
            // Set the image source and caption
            lightboxImg.src = imgSrc;
            lightboxCaption.textContent = caption;
            
            // Show the lightbox
            lightboxContainer.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent scrolling
            
            // Focus on the close button for accessibility
            lightboxClose.focus();
        });
    });
    
    // Close lightbox when close button is clicked
    lightboxClose.addEventListener('click', closeLightbox);
    
    // Close lightbox when clicking outside the image
    lightboxContainer.addEventListener('click', function(e) {
        if (e.target === lightboxContainer) {
            closeLightbox();
        }
    });
    
    // Close lightbox with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && lightboxContainer.classList.contains('active')) {
            closeLightbox();
        }
    });
    
    /**
     * Close the lightbox
     */
    function closeLightbox() {
        lightboxContainer.classList.remove('active');
        document.body.style.overflow = ''; // Restore scrolling
        
        // Clear the image source after animation completes
        setTimeout(() => {
            lightboxImg.src = '';
            lightboxCaption.textContent = '';
        }, 300);
    }
}
