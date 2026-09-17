document.addEventListener('DOMContentLoaded', () => {
    
    // --- Thrilling Intro Curtain Animation Dismiss ---
    const introCurtain = document.getElementById('introCurtain');
    if (introCurtain) {
        // Automatically hide intro after 1.8 seconds
        setTimeout(() => {
            introCurtain.classList.add('hide');
        }, 1800);

        // Also allow instant dismiss on click
        introCurtain.addEventListener('click', () => {
            introCurtain.classList.add('hide');
        });
    }

    // --- Navbar Scroll Effect ---
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }

    // --- WhatsApp Booking Form Logic ---
    const bookingForm = document.getElementById('bookingForm');
    const phoneNumber = "917416907487"; // Mobile number for booking

    if (bookingForm) {
        bookingForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Get form values
            const name = document.getElementById('name').value.trim();
            const packageSelected = document.getElementById('package').value;
            const date = document.getElementById('date').value;
            const scope = document.getElementById('scope').value.trim();

            // Construct the message
            let message = `Hello, my name is *${name}*.\n\n`;
            message += `I'm interested in booking the *${packageSelected}* package.\n`;
            if (date) {
                message += `Preferred Date: ${date}\n`;
            }
            message += `\n*Project Details & Scope:*\n${scope}\n\n`;
            message += `Looking forward to hearing from you!`;

            // Encode message for URL
            const encodedMessage = encodeURIComponent(message);

            // Construct WhatsApp URL
            const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

            // Open in new tab
            window.open(whatsappUrl, '_blank');
            
            // Reset form after sending
            bookingForm.reset();
        });
    }

    // --- Video Modal Logic ---
    const modal = document.getElementById('videoModal');
    const closeBtn = document.querySelector('.close-modal');
    const youtubePlayer = document.getElementById('youtubePlayer');
    const videoCards = document.querySelectorAll('.video-card');

    // Open modal
    videoCards.forEach(card => {
        card.addEventListener('click', () => {
            const videoUrl = card.getAttribute('data-video');
            if(videoUrl) {
                let embedUrl = videoUrl;
                if (!embedUrl.includes('/embed/')) {
                    if (embedUrl.includes('watch?v=')) {
                        embedUrl = embedUrl.replace('watch?v=', 'embed/');
                    } else if (embedUrl.includes('youtu.be/')) {
                        embedUrl = embedUrl.replace('youtu.be/', 'www.youtube.com/embed/');
                    }
                }
                const separator = embedUrl.includes('?') ? '&' : '?';
                youtubePlayer.src = `${embedUrl}${separator}autoplay=1`;
                modal.classList.add('active');
                document.body.style.overflow = 'hidden'; // Prevent background scrolling
            }
        });
    });

    // Close modal function
    const closeModal = () => {
        if (modal) {
            modal.classList.remove('active');
            document.body.style.overflow = 'auto'; // Restore scrolling
            setTimeout(() => {
                if (youtubePlayer) youtubePlayer.src = '';
            }, 300);
        }
    };

    // Close on X click
    if (closeBtn) {
        closeBtn.addEventListener('click', closeModal);
    }

    // Close on outside click
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });
    }

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal && modal.classList.contains('active')) {
            closeModal();
        }
    });

    // --- Interactive Package Selection helper ---
    const packageBtns = document.querySelectorAll('.select-package-btn');
    const packageSelect = document.getElementById('package');
    packageBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const pkgName = btn.getAttribute('data-package');
            if (packageSelect && pkgName) {
                packageSelect.value = pkgName;
            }
            const bookingSection = document.getElementById('booking');
            if (bookingSection) {
                bookingSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // --- Portfolio Filter Logic ---
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const category = btn.getAttribute('data-filter');

            videoCards.forEach(card => {
                if (category === 'all' || card.getAttribute('data-category') === category) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // Set today as minimum date in date picker
    const dateInput = document.getElementById('date');
    if (dateInput) {
        const today = new Date().toISOString().split('T')[0];
        dateInput.min = today;
    }
});
