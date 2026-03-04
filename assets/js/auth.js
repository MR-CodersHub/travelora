// Auth Protection Logic
document.addEventListener('DOMContentLoaded', () => {
    const currentPage = window.location.pathname;
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const userRole = localStorage.getItem('role');

    // Protect Admin Dashboard
    if (currentPage.includes('admin-dashboard.html')) {
        if (!isLoggedIn || userRole !== 'admin') {
            window.location.href = 'login.html';
        }
    }

    // Protect User Dashboard
    if (currentPage.includes('user-dashboard.html')) {
        if (!isLoggedIn || userRole !== 'user') {
            window.location.href = 'login.html';
        }
    }

    // Logout Logic
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            localStorage.clear();
            window.location.href = 'login.html';
        });
    }
});
