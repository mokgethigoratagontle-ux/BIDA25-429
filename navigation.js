/**
 * Kgolo Excellence Academy - Shared Navigation Logic
 */

document.addEventListener("DOMContentLoaded", () => {
    // 1. Dynamic Active Page Highlighting
    highlightActiveLinks();

    // 2. Setup Responsive Mobile Navigation
    setupMobileMenu();
});

/**
 * Automatically adds the 'active' class to header and footer links
 * matching the current page's filename.
 */
function highlightActiveLinks() {
    const currentPath = window.location.pathname;
    const currentPage = currentPath.substring(currentPath.lastIndexOf("/") + 1) || "index.html";

    // Select all links in the header <nav> and footer lists
    const navLinks = document.querySelectorAll("nav a, .footer-links a");

    navLinks.forEach(link => {
        const href = link.getAttribute("href");
        if (!href) return;

        // Extract filename from href
        const linkPage = href.substring(href.lastIndexOf("/") + 1);

        // Standardize base comparison (e.g. index.html vs empty paths)
        if (currentPage === linkPage || 
            (currentPage === "" && linkPage === "index.html") ||
            (currentPage === "index.html" && linkPage === "")) {
            link.classList.add("active");
        } else {
            link.classList.remove("active");
        }
    });
}

/**
 * Sets up listeners and behavior for the mobile menu hamburger button.
 */
function setupMobileMenu() {
    const menuToggle = document.querySelector(".menu-toggle");
    const navMenu = document.getElementById("navMenu");

    if (menuToggle && navMenu) {
        menuToggle.addEventListener("click", () => {
            navMenu.classList.toggle("active");
            
            // Toggle hamburger icon '☰' to close '✕'
            if (navMenu.classList.contains("active")) {
                menuToggle.innerHTML = "✕";
                menuToggle.style.transform = "rotate(90deg)";
            } else {
                menuToggle.innerHTML = "☰";
                menuToggle.style.transform = "rotate(0deg)";
            }
        });

        // Close menu if a user clicks outside of header/nav areas on mobile
        document.addEventListener("click", (event) => {
            const isClickInside = menuToggle.contains(event.target) || navMenu.contains(event.target);
            if (!isClickInside && navMenu.classList.contains("active")) {
                navMenu.classList.remove("active");
                menuToggle.innerHTML = "☰";
                menuToggle.style.transform = "rotate(0deg)";
            }
        });

        // Close menu if screen is resized beyond tablet breakpoint (e.g. rotated device)
        window.addEventListener("resize", () => {
            if (window.innerWidth > 768 && navMenu.classList.contains("active")) {
                navMenu.classList.remove("active");
                menuToggle.innerHTML = "☰";
                menuToggle.style.transform = "rotate(0deg)";
            }
        });
    }
}
