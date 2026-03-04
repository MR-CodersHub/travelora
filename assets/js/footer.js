const Footer = {
    init: function () {
        const isPagesDir = window.location.pathname.includes("/pages/");
        const rootPrefix = isPagesDir ? "../" : "";
        const pagePrefix = isPagesDir ? "" : "pages/";
        const assetPrefix = isPagesDir ? "../" : "";

        const getRootLink = (file) => `${rootPrefix}${file}`;
        const getPageLink = (file) => `${pagePrefix}${file}`;
        const getAssetPath = (path) => `${assetPrefix}${path}`;

        const footerHTML = `
        <footer id="main-footer">
            <div class="container">
                <div class="footer-grid">
                    <div class="footer-brand">
                        <a href="${getRootLink('index.html')}" class="logo" style="display: inline-flex;">
                            <img src="${getAssetPath('assets/images/logo-icon-v2.svg')}" alt="TRAVELORA Icon">
                            <span>TRAVELORA</span>
                        </a>
                        <p>Elevating your travel experience with smart technology and curated expertise. Your journey, our masterpiece.</p>
                        <div class="footer-social">
                            <a href="#"><i class="fa-brands fa-facebook-f"></i></a>
                            <a href="#"><i class="fa-brands fa-instagram"></i></a>
                            <a href="#"><i class="fa-brands fa-twitter"></i></a>
                            <a href="#"><i class="fa-brands fa-linkedin-in"></i></a>
                        </div>
                    </div>
                    <div class="footer-links">
                        <h4>Discover</h4>
                        <ul>
                            <li><a href="${getRootLink('index.html')}"><i class="fa-solid fa-chevron-right"
                                        style="font-size: 0.7rem; color: var(--primary);"></i> Home</a></li>
                            <li><a href="${getRootLink('home2.html')}"><i class="fa-solid fa-chevron-right"
                                        style="font-size: 0.7rem; color: var(--primary);"></i> Home 2</a></li>
                            <li><a href="${getPageLink('services.html')}"><i class="fa-solid fa-chevron-right"
                                        style="font-size: 0.7rem; color: var(--primary);"></i> Services</a></li>
                            <li><a href="${getPageLink('blog.html')}"><i class="fa-solid fa-chevron-right"
                                        style="font-size: 0.7rem; color: var(--primary);"></i> Blog</a></li>
                            <li><a href="${getPageLink('faq.html')}"><i class="fa-solid fa-chevron-right"
                                        style="font-size: 0.7rem; color: var(--primary);"></i> FAQs</a></li>
                        </ul>
                    </div>
                    <div class="footer-links">
                        <h4>Support</h4>
                        <ul>
                            <li><a href="${getPageLink('about.html')}">About Us</a></li>
                            <li><a href="${getPageLink('support.html')}">Help Center</a></li>
                            <li><a href="${getPageLink('contact.html')}">Contact Us</a></li>
                            <li><a href="${getPageLink('privacy-policy.html')}">Privacy Policy</a></li>
                        </ul>
                    </div>
                    <div class="footer-links">
                        <h4>Contact Us</h4>
                        <ul class="footer-contact">
                            <li><i class="fa-solid fa-location-dot"></i> 123 Travel Ave, Suite 100, CA</li>
                            <li><i class="fa-solid fa-phone"></i> +1 (800) 123-TRAVEL</li>
                            <li><i class="fa-solid fa-envelope"></i> hello@travelora.com</li>
                        </ul>
                    </div>
                </div>
                <div class="footer-bottom">
                    <p>&copy; 2026 TRAVELORA. All rights reserved.</p>
                    <div class="footer-bottom-links">
                        <a href="#">Terms of Service</a>
                        <a href="#">Cookie Policy</a>
                    </div>
                </div>
            </div>
        </footer>
        `;

        // Wait for DOM content to be loaded if not already
        const inject = () => {
            // Remove any existing footer to avoid duplicates
            const existing = document.querySelector('footer');
            if (existing) existing.remove();

            document.body.insertAdjacentHTML('beforeend', footerHTML);
        };

        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', inject);
        } else {
            inject();
        }
    }
};

Footer.init();
