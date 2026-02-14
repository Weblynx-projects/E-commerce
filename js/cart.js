// ===================================
// CART MANAGEMENT SYSTEM
// Handles cart operations with localStorage persistence
// ===================================

class Cart {
    constructor() {
        this.items = this.loadCart();
        this.updateUI();
    }

    // Load cart from localStorage
    loadCart() {
        const saved = localStorage.getItem('maisonEliteCart');
        return saved ? JSON.parse(saved) : [];
    }

    // Save cart to localStorage
    saveCart() {
        localStorage.setItem('maisonEliteCart', JSON.stringify(this.items));
    }

    // Add item to cart
    addItem(product, quantity = 1, size = null) {
        const existingIndex = this.items.findIndex(item => 
            item.id === product.id && item.size === size
        );

        if (existingIndex > -1) {
            this.items[existingIndex].quantity += quantity;
        } else {
            this.items.push({
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.image,
                quantity: quantity,
                size: size,
                category: product.category
            });
        }

        this.saveCart();
        this.updateUI();
        this.showNotification('Item added to bag');
    }

    // Update item quantity
    updateQuantity(id, size, newQuantity) {
        const index = this.items.findIndex(item => 
            item.id === id && item.size === size
        );

        if (index > -1) {
            if (newQuantity <= 0) {
                this.removeItem(id, size);
            } else {
                this.items[index].quantity = newQuantity;
                this.saveCart();
                this.updateUI();
            }
        }
    }

    // Remove item from cart
    removeItem(id, size) {
        this.items = this.items.filter(item => 
            !(item.id === id && item.size === size)
        );
        this.saveCart();
        this.updateUI();
    }

    // Clear entire cart
    clearCart() {
        this.items = [];
        this.saveCart();
        this.updateUI();
    }

    // Get cart total
    getTotal() {
        return this.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    }

    // Get total item count
    getItemCount() {
        return this.items.reduce((sum, item) => sum + item.quantity, 0);
    }

    // Format price in ZAR
    formatPrice(amount) {
        return 'R' + amount.toLocaleString('en-ZA');
    }

    // Update all UI elements
    updateUI() {
        this.updateBadge();
        this.updateDrawer();
    }

    // Update cart badge
    updateBadge() {
        const badge = document.getElementById('cartBadge');
        const count = this.getItemCount();
        
        if (badge) {
            badge.textContent = count;
            if (count > 0) {
                badge.classList.add('active');
            } else {
                badge.classList.remove('active');
            }
        }
    }

    // Update cart drawer
    updateDrawer() {
        const cartItems = document.getElementById('cartItems');
        const cartSubtotal = document.getElementById('cartSubtotal');

        if (!cartItems) return;

        if (this.items.length === 0) {
            cartItems.innerHTML = '<div class="empty-cart"><p>Your bag is empty</p></div>';
        } else {
            cartItems.innerHTML = this.items.map(item => `
                <div class="cart-item" data-id="${item.id}" data-size="${item.size || ''}">
                    <div class="cart-item-image">
                        <img src="${item.image}" alt="${item.name}">
                    </div>
                    <div class="cart-item-details">
                        <h4 class="cart-item-name">${item.name}</h4>
                        ${item.size ? `<p class="cart-item-meta">Size: ${item.size}</p>` : ''}
                        <p class="cart-item-price">${this.formatPrice(item.price * item.quantity)}</p>
                        <div class="cart-item-actions">
                            <div class="cart-item-qty">
                                <button onclick="cart.updateQuantity(${item.id}, '${item.size || ''}', ${item.quantity - 1})">−</button>
                                <span>${item.quantity}</span>
                                <button onclick="cart.updateQuantity(${item.id}, '${item.size || ''}', ${item.quantity + 1})">+</button>
                            </div>
                            <button class="cart-item-remove" onclick="cart.removeItem(${item.id}, '${item.size || ''}')">Remove</button>
                        </div>
                    </div>
                </div>
            `).join('');
        }

        if (cartSubtotal) {
            cartSubtotal.textContent = this.formatPrice(this.getTotal());
        }
    }

    // Show notification
    showNotification(message) {
        // Create notification element
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            bottom: 2rem;
            right: 2rem;
            background-color: var(--color-primary);
            color: var(--color-surface);
            padding: 1rem 1.5rem;
            border-radius: 0;
            z-index: 3000;
            animation: slideInUp 0.3s ease;
        `;
        notification.textContent = message;

        document.body.appendChild(notification);

        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.animation = 'fadeOut 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }

    // Open cart drawer
    openDrawer() {
        const drawer = document.getElementById('cartDrawer');
        const overlay = document.getElementById('cartOverlay');
        
        if (drawer && overlay) {
            drawer.classList.add('active');
            overlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }

    // Close cart drawer
    closeDrawer() {
        const drawer = document.getElementById('cartDrawer');
        const overlay = document.getElementById('cartOverlay');
        
        if (drawer && overlay) {
            drawer.classList.remove('active');
            overlay.classList.remove('active');
            document.body.style.overflow = '';
        }
    }
}

// Initialize cart
const cart = new Cart();

// Hamburger menu functionality
function initHamburgerMenu() {
    const hamburgerBtn = document.getElementById('hamburgerBtn');
    const navCenter = document.querySelector('.nav-center');
    const navLinks = document.querySelectorAll('.nav-center .nav-link');

    if (!hamburgerBtn) return;

    // Toggle menu on hamburger click
    hamburgerBtn.addEventListener('click', () => {
        hamburgerBtn.classList.toggle('active');
        navCenter.classList.toggle('active');
    });

    // Close menu when a link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburgerBtn.classList.remove('active');
            navCenter.classList.remove('active');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        const navbar = document.getElementById('navbar');
        if (!navbar.contains(e.target)) {
            hamburgerBtn.classList.remove('active');
            navCenter.classList.remove('active');
        }
    });
}

// Setup event listeners when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Initialize hamburger menu
    initHamburgerMenu();

    // Cart button
    const cartBtn = document.getElementById('cartBtn');
    if (cartBtn) {
        cartBtn.addEventListener('click', () => cart.openDrawer());
    }

    // Close cart button
    const closeCart = document.getElementById('closeCart');
    if (closeCart) {
        closeCart.addEventListener('click', () => cart.closeDrawer());
    }

    // Cart overlay
    const cartOverlay = document.getElementById('cartOverlay');
    if (cartOverlay) {
        cartOverlay.addEventListener('click', () => cart.closeDrawer());
    }

    // Checkout button
    const checkoutBtn = document.getElementById('checkoutBtn');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', () => {
            if (cart.items.length > 0) {
                window.location.href = 'checkout.html';
            }
        });
    }

    // Close drawer on ESC key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            cart.closeDrawer();
        }
    });
});

// Add animation styles
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInUp {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @keyframes fadeOut {
        from {
            opacity: 1;
        }
        to {
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);
