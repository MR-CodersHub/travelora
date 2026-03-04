document.addEventListener('DOMContentLoaded', () => {
    // 1. Navbar Sticky Effect
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.boxShadow = 'var(--shadow-lg)';
            header.style.height = '70px';
        } else {
            header.style.boxShadow = 'none';
            header.style.height = '80px';
        }
    });

    // 1.1 sliding Nav Indicator & Mobile Toggle
    const navLinks = document.querySelector('.nav-links');
    const links = document.querySelectorAll('.nav-links li a');
    const indicator = document.querySelector('.nav-indicator');
    const mobileToggle = document.querySelector('.mobile-toggle');

    function updateIndicator(element) {
        if (!indicator || !element) return;

        const rect = element.getBoundingClientRect();
        const parentRect = navLinks.getBoundingClientRect();

        indicator.style.width = `${rect.width}px`;
        indicator.style.left = `${rect.left - parentRect.left}px`;
        indicator.classList.add('visible');
    }

    if (navLinks && indicator) {
        // Initial position
        const activeLink = document.querySelector('.nav-links li a.active');
        if (activeLink) {
            // Delay slightly to ensure fonts/layouts are ready
            setTimeout(() => updateIndicator(activeLink), 100);
        }

        links.forEach(link => {
            link.addEventListener('mouseenter', (e) => updateIndicator(e.target));
            link.addEventListener('mouseleave', () => {
                const currentActive = document.querySelector('.nav-links li a.active');
                if (currentActive) {
                    updateIndicator(currentActive);
                } else {
                    indicator.classList.remove('visible');
                }
            });
        });

        // Handle window resize
        window.addEventListener('resize', () => {
            const currentActive = document.querySelector('.nav-links li a.active');
            if (currentActive) updateIndicator(currentActive);
        });
    }

    if (mobileToggle && navLinks) {
        mobileToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            navLinks.classList.toggle('active');
            document.body.classList.toggle('no-scroll');
            mobileToggle.querySelector('i').classList.toggle('fa-bars');
            mobileToggle.querySelector('i').classList.toggle('fa-xmark');
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!navLinks.contains(e.target) && !mobileToggle.contains(e.target)) {
                navLinks.classList.remove('active');
                document.body.classList.remove('no-scroll');
                const icon = mobileToggle.querySelector('i');
                if (icon) {
                    icon.classList.add('fa-bars');
                    icon.classList.remove('fa-xmark');
                }
            }
        });

        // Close menu when link is clicked
        links.forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                document.body.classList.remove('no-scroll');
                const icon = mobileToggle.querySelector('i');
                if (icon) {
                    icon.classList.add('fa-bars');
                    icon.classList.remove('fa-xmark');
                }
            });
        });
    }

    // 2. Search Tabs Logic (index.html & home2.html)
    const tabs = document.querySelectorAll('.tab');
    if (tabs.length > 0) {
        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                tabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
            });
        });
    }

    // 3. Blog Filter Logic (blog.html)
    const filterBtns = document.querySelectorAll('.filter-btn');
    if (filterBtns.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                console.log(`Filtering for: ${btn.textContent}`);
            });
        });
    }

    // 4. Contact Form Feedback (contact.html)
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = contactForm.querySelector('button');
            const originalText = btn.innerHTML;

            btn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> Sending...';
            btn.style.opacity = '0.7';
            btn.disabled = true;

            setTimeout(() => {
                btn.innerHTML = '<i class="fa-solid fa-check"></i> Sent Successfully!';
                btn.style.background = 'var(--success)';
                btn.style.opacity = '1';

                setTimeout(() => {
                    alert('Thank you for reaching out! A TRAVELORA expert will contact you within 24 hours.');
                    contactForm.reset();
                    btn.innerHTML = originalText;
                    btn.style.background = '';
                    btn.disabled = false;
                }, 1500);
            }, 2000);
        });
    }

    // 5. Auth Tab Switcher (login.html)
    const authTabs = document.querySelectorAll('.auth-tab');
    const authTabsContainer = document.querySelector('.auth-tabs');
    if (authTabs.length > 0) {
        authTabs.forEach((tab, index) => {
            tab.addEventListener('click', () => {
                authTabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                if (authTabsContainer) authTabsContainer.setAttribute('data-active', index);

                const btn = document.querySelector('.auth-card .btn-submit');
                const btnText = btn ? btn.querySelector('.btn-text') : null;
                const signupFields = document.querySelectorAll('.signup-only');
                const rememberForgot = document.querySelector('.remember-forgot');
                const forgotLink = document.querySelector('.forgot-link');

                if (tab.getAttribute('data-tab') === 'signup') {
                    if (btnText) btnText.textContent = 'Create Account';
                    signupFields.forEach(f => {
                        f.style.display = 'block';
                        setTimeout(() => f.style.opacity = '1', 10);
                    });
                    if (forgotLink) forgotLink.style.display = 'none';
                } else {
                    if (btnText) btnText.textContent = 'Welcome Back';
                    signupFields.forEach(f => {
                        f.style.opacity = '0';
                        setTimeout(() => f.style.display = 'none', 300);
                    });
                    if (forgotLink) forgotLink.style.display = 'block';
                }
            });
        });

        // Check for ?tab=signup in URL
        const urlParams = new URLSearchParams(window.location.search);
        if (urlParams.get('tab') === 'signup') {
            const signupTab = document.querySelector('.auth-tab[data-tab="signup"]');
            if (signupTab) signupTab.click();
        }
    }

    // 6. Password Visibility Toggle
    const togglePasswordBtns = document.querySelectorAll('.password-toggle, .toggle-password');
    if (togglePasswordBtns.length > 0) {
        togglePasswordBtns.forEach(btn => {
            btn.addEventListener('click', function () {
                const input = this.parentElement.querySelector('input');
                if (!input) return;

                const isPassword = input.getAttribute('type') === 'password';
                input.setAttribute('type', isPassword ? 'text' : 'password');

                // Toggle icon explicitly for better reliability
                if (isPassword) {
                    this.classList.remove('fa-eye-slash');
                    this.classList.add('fa-eye');
                } else {
                    this.classList.remove('fa-eye');
                    this.classList.add('fa-eye-slash');
                }

                this.classList.toggle('active');
            });
        });
    }

    // 7. Account Dropdown Toggle
    const userBtn = document.querySelector('.user-icon-btn');
    const dropdown = document.querySelector('.account-dropdown');

    if (userBtn && dropdown) {
        userBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            dropdown.classList.toggle('show');
        });

        document.addEventListener('click', (e) => {
            if (!dropdown.contains(e.target) && !userBtn.contains(e.target)) {
                dropdown.classList.remove('show');
            }
        });
    }

    // Intersection Observer for Fade-in effects
    const revealOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                observer.unobserve(entry.target);
            }
        });
    }, revealOptions);

    // Apply reveal to some cards and sections
    document.querySelectorAll('.package-card, .service-item, .step-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
        revealObserver.observe(el);
    });

    // Custom CSS for revealed state
    const revealStyle = document.createElement('style');
    revealStyle.innerHTML = `
        .revealed {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(revealStyle);
});
