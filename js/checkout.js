// ===================================
// CHECKOUT PAGE
// Order summary and form validation
// ===================================

let shippingCost = 150; // Default standard shipping

// Load order summary
function loadOrderSummary() {
    const summaryItems = document.getElementById('summaryItems');
    const summarySubtotal = document.getElementById('summarySubtotal');
    const summaryShipping = document.getElementById('summaryShipping');
    const summaryTotal = document.getElementById('summaryTotal');

    if (!summaryItems) return;

    // Check if cart is empty
    if (cart.items.length === 0) {
        alert('Your cart is empty');
        window.location.href = 'shop.html';
        return;
    }

    // Render cart items
    summaryItems.innerHTML = cart.items.map(item => `
        <div class="summary-item">
            <div class="summary-item-image">
                <img src="${item.image}" alt="${item.name}">
            </div>
            <div class="summary-item-details">
                <h4 class="summary-item-name">${item.name}</h4>
                ${item.size ? `<p class="summary-item-meta">Size: ${item.size} | Qty: ${item.quantity}</p>` : `<p class="summary-item-meta">Qty: ${item.quantity}</p>`}
                <p class="summary-item-price">R${(item.price * item.quantity).toLocaleString('en-ZA')}</p>
            </div>
        </div>
    `).join('');

    // Update totals
    const subtotal = cart.getTotal();
    const total = subtotal + shippingCost;

    if (summarySubtotal) summarySubtotal.textContent = `R${subtotal.toLocaleString('en-ZA')}`;
    if (summaryShipping) summaryShipping.textContent = `R${shippingCost.toLocaleString('en-ZA')}`;
    if (summaryTotal) summaryTotal.textContent = `R${total.toLocaleString('en-ZA')}`;
}

// Update shipping cost
function updateShippingCost() {
    const shippingInputs = document.querySelectorAll('input[name="shipping"]');
    
    shippingInputs.forEach(input => {
        input.addEventListener('change', (e) => {
            switch(e.target.value) {
                case 'standard':
                    shippingCost = 150;
                    break;
                case 'express':
                    shippingCost = 350;
                    break;
                case 'overnight':
                    shippingCost = 650;
                    break;
            }
            loadOrderSummary();
        });
    });
}

// Format card number input
function formatCardNumber() {
    const cardInput = document.getElementById('cardNumber');
    
    if (cardInput) {
        cardInput.addEventListener('input', (e) => {
            let value = e.target.value.replace(/\s/g, '');
            let formattedValue = value.match(/.{1,4}/g)?.join(' ') || value;
            e.target.value = formattedValue;
        });
    }
}

// Format expiry date input
function formatExpiryDate() {
    const expiryInput = document.getElementById('expiry');
    
    if (expiryInput) {
        expiryInput.addEventListener('input', (e) => {
            let value = e.target.value.replace(/\s/g, '').replace('/', '');
            if (value.length >= 2) {
                value = value.slice(0, 2) + ' / ' + value.slice(2, 4);
            }
            e.target.value = value;
        });
    }
}

// Toggle payment method details
function initPaymentToggle() {
    const paymentInputs = document.querySelectorAll('input[name="payment"]');
    const cardDetails = document.getElementById('cardDetails');
    
    paymentInputs.forEach(input => {
        input.addEventListener('change', (e) => {
            if (e.target.value === 'card') {
                cardDetails.style.display = 'block';
            } else {
                cardDetails.style.display = 'none';
            }
        });
    });
}

// Form validation
function validateForm() {
    const form = document.getElementById('checkoutForm');
    
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        // Get form data
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);

        // Basic validation
        if (!data.email || !data.firstName || !data.lastName || !data.address) {
            alert('Please fill in all required fields');
            return;
        }

        // Show success message
        showOrderConfirmation(data);
    });
}

// Show order confirmation
function showOrderConfirmation(formData) {
    const orderNumber = Math.floor(100000 + Math.random() * 900000);
    const total = cart.getTotal() + shippingCost;

    // Create confirmation modal
    const modal = document.createElement('div');
    modal.style.cssText = `
        position: fixed;
        inset: 0;
        background-color: rgba(0, 0, 0, 0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 3000;
        animation: fadeIn 0.3s ease;
    `;

    modal.innerHTML = `
        <div style="
            background: white;
            padding: 3rem;
            max-width: 500px;
            text-align: center;
            animation: slideInUp 0.4s ease;
        ">
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#c9a55a" stroke-width="1.5" style="margin: 0 auto 1.5rem;">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
            <h2 style="font-family: var(--font-display); font-size: 2rem; margin-bottom: 1rem;">
                Order Confirmed!
            </h2>
            <p style="color: var(--color-text-muted); margin-bottom: 2rem; line-height: 1.6;">
                Thank you for your purchase, ${formData.firstName}!<br>
                Your order #${orderNumber} has been confirmed.<br>
                Total: <strong>R${total.toLocaleString('en-ZA')}</strong>
            </p>
            <p style="font-size: 0.875rem; color: var(--color-text-muted); margin-bottom: 2rem;">
                A confirmation email has been sent to ${formData.email}
            </p>
            <button onclick="completeOrder()" class="btn btn-primary btn-large">
                Continue Shopping
            </button>
        </div>
    `;

    document.body.appendChild(modal);
}

// Complete order
function completeOrder() {
    // Clear cart
    cart.clearCart();
    
    // Redirect to home
    window.location.href = 'index.html';
}

// Add styles for animations
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
    
    @keyframes slideInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);

// Navbar scroll effect
function handleScroll() {
    const navbar = document.getElementById('navbar');
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
}

// Initialize checkout page
document.addEventListener('DOMContentLoaded', () => {
    loadOrderSummary();
    updateShippingCost();
    formatCardNumber();
    formatExpiryDate();
    initPaymentToggle();
    validateForm();

    // Scroll event listener
    window.addEventListener('scroll', handleScroll, { passive: true });
});
