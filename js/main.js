// ===================================
// MAIN.JS - Homepage functionality
// ===================================

// Wishlist management
class Wishlist {
    constructor() {
        this.items = this.loadWishlist();
        this.updateBadge();
    }

    loadWishlist() {
        const saved = localStorage.getItem('maisonEliteWishlist');
        return saved ? JSON.parse(saved) : [];
    }

    saveWishlist() {
        localStorage.setItem('maisonEliteWishlist', JSON.stringify(this.items));
    }

    toggle(productId) {
        const index = this.items.indexOf(productId);
        if (index > -1) {
            this.items.splice(index, 1);
        } else {
            this.items.push(productId);
        }
        this.saveWishlist();
        this.updateBadge();
        return this.items.includes(productId);
    }

    has(productId) {
        return this.items.includes(productId);
    }

    updateBadge() {
        const badge = document.getElementById('wishlistBadge');
        if (badge) {
            badge.textContent = this.items.length;
            if (this.items.length > 0) {
                badge.classList.add('active');
            } else {
                badge.classList.remove('active');
            }
        }
    }
}

const wishlist = new Wishlist();

// Render product card
function renderProductCard(product) {
    const isWishlisted = wishlist.has(product.id);
    
    return `
        <article class="product-card" data-id="${product.id}">
            <div class="product-image">
                <a href="product.html?id=${product.id}">
                    <img src="${product.image}" alt="${product.name}" loading="lazy">
                </a>
                ${product.badge ? `<span class="product-badge">${product.badge}</span>` : ''}
                <button class="wishlist-btn ${isWishlisted ? 'active' : ''}" 
                        onclick="toggleWishlist(${product.id})"
                        aria-label="Add to wishlist">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                    </svg>
                </button>
            </div>
            <div class="product-details">
                <p class="product-category">${product.category}</p>
                <h3 class="product-title">
                    <a href="product.html?id=${product.id}">${product.name}</a>
                </h3>
                <p class="product-price">R${product.price.toLocaleString('en-ZA')}</p>
            </div>
        </article>
    `;
}

// Toggle wishlist
function toggleWishlist(productId) {
    const isNowWishlisted = wishlist.toggle(productId);
    const button = document.querySelector(`[data-id="${productId}"] .wishlist-btn`);
    
    if (button) {
        if (isNowWishlisted) {
            button.classList.add('active');
        } else {
            button.classList.remove('active');
        }
    }
}

// Load best sellers
function loadBestSellers() {
    const grid = document.getElementById('bestSellersGrid');
    if (!grid) return;

    const bestsellers = products.filter(p => p.bestseller).slice(0, 4);
    grid.innerHTML = bestsellers.map(renderProductCard).join('');
}

// Navbar scroll effect
let lastScroll = 0;
function handleScroll() {
    const navbar = document.getElementById('navbar');
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    lastScroll = currentScroll;
}

// Smooth scroll for anchor links
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Newsletter form submission
function initNewsletter() {
    const form = document.getElementById('newsletterForm');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = form.querySelector('input[type="email"]').value;
        
        // Show success message
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            bottom: 2rem;
            right: 2rem;
            background-color: var(--color-primary);
            color: var(--color-surface);
            padding: 1rem 1.5rem;
            z-index: 3000;
            animation: slideInUp 0.3s ease;
        `;
        notification.textContent = 'Thank you for subscribing!';
        document.body.appendChild(notification);

        setTimeout(() => {
            notification.style.animation = 'fadeOut 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }, 3000);

        form.reset();
    });
}

// Intersection Observer for fade-in animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.8s ease forwards';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe sections
    document.querySelectorAll('.featured-collections, .best-sellers, .brand-values').forEach(section => {
        section.style.opacity = '0';
        observer.observe(section);
    });
}

// Page load animations
function initPageAnimations() {
    // Stagger animation for collection cards
    const collectionCards = document.querySelectorAll('.collection-card');
    collectionCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.animation = `fadeInUp 0.6s ease ${index * 0.1}s forwards`;
    });
}

// Initialize everything when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    loadBestSellers();
    initSmoothScroll();
    initNewsletter();
    initScrollAnimations();
    initPageAnimations();
    
    // Scroll event listener
    window.addEventListener('scroll', handleScroll, { passive: true });
});
