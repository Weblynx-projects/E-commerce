// ===================================
// SHOP.JS - Shop page functionality
// Filtering, sorting, and product display
// ===================================

let filteredProducts = [...products];
let currentFilters = {
    category: 'all',
    types: [],
    minPrice: 0,
    maxPrice: 50000,
    sortBy: 'featured'
};

// Render product card for shop page
function renderShopProductCard(product) {
    const isWishlisted = wishlist.has(product.id);
    
    if (!product.image) {
        console.warn('Product missing image:', product);
    }
    
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

// Apply all filters
function applyFilters() {
    filteredProducts = products.filter(product => {
        // Category filter
        if (currentFilters.category !== 'all' && product.category !== currentFilters.category) {
            return false;
        }

        // Type filter
        if (currentFilters.types.length > 0 && !currentFilters.types.includes(product.type)) {
            return false;
        }

        // Price filter
        if (product.price < currentFilters.minPrice || product.price > currentFilters.maxPrice) {
            return false;
        }

        return true;
    });

    // Apply sorting
    sortProducts();
    renderProducts();
}

// Sort products
function sortProducts() {
    switch (currentFilters.sortBy) {
        case 'price-low':
            filteredProducts.sort((a, b) => a.price - b.price);
            break;
        case 'price-high':
            filteredProducts.sort((a, b) => b.price - a.price);
            break;
        case 'newest':
            filteredProducts.sort((a, b) => b.id - a.id);
            break;
        default: // featured
            filteredProducts.sort((a, b) => {
                if (a.bestseller && !b.bestseller) return -1;
                if (!a.bestseller && b.bestseller) return 1;
                return 0;
            });
    }
}

// Render products to grid
function renderProducts() {
    const grid = document.getElementById('shopProductsGrid');
    const resultsCount = document.getElementById('resultsCount');

    if (!grid) {
        console.error('Grid element not found');
        return;
    }

    console.log('Rendering products:', filteredProducts.length);

    if (filteredProducts.length === 0) {
        grid.innerHTML = `
            <div style="grid-column: 1 / -1; text-align: center; padding: 4rem 0;">
                <p style="font-size: 1.125rem; color: var(--color-text-muted);">
                    No products found matching your filters.
                </p>
            </div>
        `;
    } else {
        grid.innerHTML = filteredProducts.map(renderShopProductCard).join('');
    }

    if (resultsCount) {
        const count = filteredProducts.length;
        resultsCount.textContent = `Showing ${count} ${count === 1 ? 'item' : 'items'}`;
    }

    // Add stagger animation
    const cards = grid.querySelectorAll('.product-card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.animation = `fadeInUp 0.4s ease ${index * 0.05}s forwards`;
    });
}

// Setup category filters
function initCategoryFilters() {
    const categoryInputs = document.querySelectorAll('input[name="category"]');
    
    categoryInputs.forEach(input => {
        input.addEventListener('change', (e) => {
            currentFilters.category = e.target.value;
            applyFilters();
        });
    });
}

// Setup type filters
function initTypeFilters() {
    const typeInputs = document.querySelectorAll('input[name="type"]');
    
    typeInputs.forEach(input => {
        input.addEventListener('change', (e) => {
            if (e.target.checked) {
                currentFilters.types.push(e.target.value);
            } else {
                currentFilters.types = currentFilters.types.filter(t => t !== e.target.value);
            }
            applyFilters();
        });
    });
}

// Setup price filter
function initPriceFilter() {
    const applyBtn = document.getElementById('applyPriceFilter');
    const minInput = document.getElementById('minPrice');
    const maxInput = document.getElementById('maxPrice');

    if (applyBtn && minInput && maxInput) {
        applyBtn.addEventListener('click', () => {
            currentFilters.minPrice = parseInt(minInput.value) || 0;
            currentFilters.maxPrice = parseInt(maxInput.value) || 50000;
            applyFilters();
        });
    }
}

// Setup sort dropdown
function initSortDropdown() {
    const sortSelect = document.getElementById('sortBy');
    
    if (sortSelect) {
        sortSelect.addEventListener('change', (e) => {
            currentFilters.sortBy = e.target.value;
            applyFilters();
        });
    }
}

// Clear all filters
function initClearFilters() {
    const clearBtn = document.getElementById('clearFilters');
    
    if (clearBtn) {
        clearBtn.addEventListener('click', () => {
            // Reset filters
            currentFilters = {
                category: 'all',
                types: [],
                minPrice: 0,
                maxPrice: 50000,
                sortBy: 'featured'
            };

            // Reset UI
            document.querySelectorAll('input[name="category"]').forEach(input => {
                input.checked = input.value === 'all';
            });
            document.querySelectorAll('input[name="type"]').forEach(input => {
                input.checked = false;
            });
            document.getElementById('minPrice').value = 0;
            document.getElementById('maxPrice').value = 50000;
            document.getElementById('sortBy').value = 'featured';

            applyFilters();
        });
    }
}

// Check URL parameters for filters
function checkURLParams() {
    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get('category');
    
    if (category) {
        currentFilters.category = category;
        const categoryInput = document.querySelector(`input[name="category"][value="${category}"]`);
        if (categoryInput) {
            categoryInput.checked = true;
        }
    }
}

// Navbar scroll effect (duplicate from main.js for shop page)
function handleScroll() {
    const navbar = document.getElementById('navbar');
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
}

// Initialize shop page
document.addEventListener('DOMContentLoaded', () => {
    console.log('Shop page loaded. Products available:', typeof products !== 'undefined', products?.length || 0);
    
    checkURLParams();
    initCategoryFilters();
    initTypeFilters();
    initPriceFilter();
    initSortDropdown();
    initClearFilters();
    applyFilters();

    // Scroll event listener
    window.addEventListener('scroll', handleScroll, { passive: true });
});
