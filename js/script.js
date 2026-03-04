document.addEventListener('DOMContentLoaded', () => {
    // Tab Switching Logic
    const tabButtons = document.querySelectorAll('.tab-btn');
    const searchForm = document.getElementById('searchForm');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all tabs
            tabButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked tab
            button.classList.add('active');
            
            // Get tab type (round-trip, one-way, multi-city)
            const tabType = button.getAttribute('data-tab');
            console.log(`Switched to: ${tabType}`);
            
            // You could modify form fields based on tab here
            // e.g., hide return date for 'one-way'
            const dateInput = document.querySelector('.date-input');
            if (tabType === 'one-way') {
                // Just as an example interaction
                dateInput.querySelector('label').textContent = 'Departure Date';
            } else {
                dateInput.querySelector('label').textContent = 'Date';
            }
        });
    });

    // Form Validation and Submission
    searchForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const from = document.getElementById('from').value;
        const to = document.getElementById('destination').value;
        const date = document.getElementById('departureDate').value;
        
        if (!from || !to || !date) {
            alert('Please fill in all required fields');
            return;
        }

        // Animated Search Feedback
        const searchBtn = searchForm.querySelector('.btn-search');
        const originalContent = searchBtn.innerHTML;
        
        searchBtn.disabled = true;
        searchBtn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> Finding Flights...';
        searchBtn.style.opacity = '0.8';

        setTimeout(() => {
            searchBtn.innerHTML = '<i class="fa-solid fa-check"></i> Flights Found!';
            searchBtn.style.background = '#27ae60';
            
            setTimeout(() => {
                alert(`Searching flights from ${from} to ${to} on ${date}...`);
                searchBtn.disabled = false;
                searchBtn.innerHTML = originalContent;
                searchBtn.style.background = '';
                searchBtn.style.opacity = '';
            }, 1000);
        }, 2000);
    });

    // Sticky Navbar on Scroll
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.boxShadow = '0 5px 20px rgba(0,0,0,0.1)';
            navbar.style.height = '70px';
        } else {
            navbar.style.boxShadow = 'none';
            navbar.style.height = '80px';
        }
    });

    // Mobile Menu Toggle (Mockup)
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    mobileMenuBtn.addEventListener('click', () => {
        alert('Mobile menu clicked! In a full implementation, this would toggle a slide-out menu.');
    });

    // Add some reveal animations on scroll
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    document.querySelectorAll('.destination-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.6s ease-out';
        observer.observe(card);
    });
});
