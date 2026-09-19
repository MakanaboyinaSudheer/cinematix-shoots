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

    // --- Video & Poster Modal Logic ---
    const modal = document.getElementById('videoModal');
    const closeBtn = document.querySelector('.close-modal');
    const youtubePlayer = document.getElementById('youtubePlayer');
    const modalVideoWrapper = document.getElementById('modalVideoWrapper');
    const modalPosterWrapper = document.getElementById('modalPosterWrapper');
    const posterImage = document.getElementById('posterImage');
    const posterBookBtn = document.getElementById('posterBookBtn');

    // Close modal function
    const closeModal = () => {
        if (modal) {
            modal.classList.remove('active');
            document.body.style.overflow = 'auto'; // Restore scrolling
            setTimeout(() => {
                if (youtubePlayer) youtubePlayer.src = '';
                if (modalVideoWrapper) modalVideoWrapper.style.display = 'block';
                if (modalPosterWrapper) modalPosterWrapper.style.display = 'none';
            }, 300);
        }
    };

    // Poster Click Triggers
    const viewPosterBtns = document.querySelectorAll('.package-img-wrapper, .view-poster-btn');
    viewPosterBtns.forEach(trigger => {
        trigger.addEventListener('click', (e) => {
            e.stopPropagation();
            const imgUrl = trigger.getAttribute('data-img') || trigger.closest('.package-showcase-card')?.getAttribute('data-image');
            const pkgName = trigger.getAttribute('data-title') || trigger.closest('.package-showcase-card')?.getAttribute('data-package');

            if (imgUrl && modal) {
                if (modalVideoWrapper) modalVideoWrapper.style.display = 'none';
                if (modalPosterWrapper) modalPosterWrapper.style.display = 'flex';
                if (posterImage) posterImage.src = imgUrl;
                if (posterBookBtn && pkgName) posterBookBtn.setAttribute('data-package', pkgName);

                modal.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    });

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
            e.stopPropagation();
            const pkgName = btn.getAttribute('data-package');
            if (packageSelect && pkgName) {
                for (let option of packageSelect.options) {
                    if (option.value === pkgName || option.value.includes(pkgName) || pkgName.includes(option.value)) {
                        packageSelect.value = option.value;
                        break;
                    }
                }
            }
            closeModal();
            const bookingSection = document.getElementById('booking');
            if (bookingSection) {
                bookingSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Set today as minimum date in date picker
    const dateInput = document.getElementById('date');
    if (dateInput) {
        const today = new Date().toISOString().split('T')[0];
        dateInput.min = today;
    }

    // --- Scroll Reveal Animations ---
    const showcaseCards = document.querySelectorAll('.package-showcase-card');
    showcaseCards.forEach((card, index) => {
        card.classList.add('reveal-on-scroll', `stagger-${index + 1}`);
    });

    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach((card, index) => {
        card.classList.add('reveal-on-scroll', `stagger-${(index % 3) + 1}`);
    });

    const sectionHeaders = document.querySelectorAll('.section-header');
    sectionHeaders.forEach(header => {
        header.classList.add('reveal-on-scroll');
    });

    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -40px 0px',
        threshold: 0.12
    };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-revealed');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.reveal-on-scroll').forEach(el => {
        revealObserver.observe(el);
    });
});
