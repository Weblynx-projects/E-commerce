// ===================================
// PRODUCT DETAIL PAGE
// Image gallery, size selection, add to cart
// ===================================

let currentProduct = null;
let selectedSize = null;
let quantity = 1;

// Get product ID from URL
function getProductId() {
    const urlParams = new URLSearchParams(window.location.search);
    return parseInt(urlParams.get('id'));
}

// Load product details
function loadProduct() {
    const productId = getProductId();
    currentProduct = products.find(p => p.id === productId);

    if (!currentProduct) {
        window.location.href = 'shop.html';
        return;
    }

    // Update page content
    updateProductInfo();
    updateImageGallery();
    loadRelatedProducts();
}

// Update product information
function updateProductInfo() {
    // Breadcrumb
    const breadcrumb = document.getElementById('productBreadcrumb');
    if (breadcrumb) {
        breadcrumb.textContent = currentProduct.name;
    }

    // Product details
    document.getElementById('productName').textContent = currentProduct.name;
    document.getElementById('productPrice').textContent = `R${currentProduct.price.toLocaleString('en-ZA')}`;
    
    const description = document.getElementById('productDescription');
    if (description) {
        description.innerHTML = `<p>${currentProduct.description}</p>`;
    }

    // Product details accordion
    const detailsContent = document.getElementById('productDetailsContent');
    if (detailsContent && currentProduct.details) {
        detailsContent.innerHTML = currentProduct.details
            .split('\n')
            .map(line => `<p>${line}</p>`)
            .join('');
    }

    // Size selector
    if (currentProduct.sizes && currentProduct.sizes.length > 0) {
        const sizeGroup = document.getElementById('sizeGroup');
        const sizeSelector = document.getElementById('sizeSelector');
        
        if (sizeGroup && sizeSelector) {
            sizeGroup.style.display = 'flex';
            sizeSelector.innerHTML = currentProduct.sizes.map(size => `
                <button class="size-btn" data-size="${size}" onclick="selectSize('${size}')">
                    ${size}
                </button>
            `).join('');

            // Auto-select first size
            selectSize(currentProduct.sizes[0]);
        }
    }

    // Update page title
    document.title = `${currentProduct.name} — MAISON ÉLITE`;
}

// Update image gallery
function updateImageGallery() {
    const mainImage = document.getElementById('mainImage');
    const thumbnailGrid = document.getElementById('thumbnailGrid');

    if (!mainImage || !thumbnailGrid) return;

    const images = currentProduct.images || [currentProduct.image];
    
    // Set main image
    mainImage.src = images[0];
    mainImage.alt = currentProduct.name;

    // Create thumbnails
    if (images.length > 1) {
        thumbnailGrid.innerHTML = images.map((img, index) => `
            <div class="thumbnail ${index === 0 ? 'active' : ''}" onclick="changeMainImage('${img}', ${index})">
                <img src="${img}" alt="${currentProduct.name}">
            </div>
        `).join('');
    } else {
        thumbnailGrid.style.display = 'none';
    }
}

// Change main image
function changeMainImage(imageSrc, index) {
    const mainImage = document.getElementById('mainImage');
    const thumbnails = document.querySelectorAll('.thumbnail');

    if (mainImage) {
        mainImage.src = imageSrc;
    }

    thumbnails.forEach((thumb, i) => {
        if (i === index) {
            thumb.classList.add('active');
        } else {
            thumb.classList.remove('active');
        }
    });
}

// Select size
function selectSize(size) {
    selectedSize = size;
    
    const sizeButtons = document.querySelectorAll('.size-btn');
    sizeButtons.forEach(btn => {
        if (btn.dataset.size === size) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
}

// Quantity controls
function initQuantityControls() {
    const quantityInput = document.getElementById('quantity');
    const decreaseBtn = document.getElementById('decreaseQty');
    const increaseBtn = document.getElementById('increaseQty');

    if (decreaseBtn) {
        decreaseBtn.addEventListener('click', () => {
            if (quantity > 1) {
                quantity--;
                quantityInput.value = quantity;
            }
        });
    }

    if (increaseBtn) {
        increaseBtn.addEventListener('click', () => {
            if (quantity < 10) {
                quantity++;
                quantityInput.value = quantity;
            }
        });
    }
}

// Add to cart
function initAddToCart() {
    const addToCartBtn = document.getElementById('addToCartBtn');
    
    if (addToCartBtn) {
        addToCartBtn.addEventListener('click', () => {
            // Check if size is required but not selected
            if (currentProduct.sizes && currentProduct.sizes.length > 0 && !selectedSize) {
                alert('Please select a size');
                return;
            }

            // Add to cart with animation
            addToCartBtn.classList.add('loading');
            addToCartBtn.disabled = true;

            setTimeout(() => {
                cart.addItem(currentProduct, quantity, selectedSize);
                cart.openDrawer();
                
                addToCartBtn.classList.remove('loading');
                addToCartBtn.disabled = false;
            }, 300);
        });
    }
}

// Add to wishlist
function initAddToWishlist() {
    const wishlistBtn = document.getElementById('addToWishlistBtn');
    
    if (wishlistBtn) {
        // Check initial state
        if (wishlist.has(currentProduct.id)) {
            wishlistBtn.querySelector('svg').style.fill = 'var(--color-accent)';
            wishlistBtn.querySelector('svg').style.stroke = 'var(--color-accent)';
        }

        wishlistBtn.addEventListener('click', () => {
            const isNowWishlisted = wishlist.toggle(currentProduct.id);
            const svg = wishlistBtn.querySelector('svg');
            
            if (isNowWishlisted) {
                svg.style.fill = 'var(--color-accent)';
                svg.style.stroke = 'var(--color-accent)';
            } else {
                svg.style.fill = 'none';
                svg.style.stroke = 'currentColor';
            }
        });
    }
}

// Load related products
function loadRelatedProducts() {
    const grid = document.getElementById('relatedProductsGrid');
    if (!grid) return;

    // Get products from same category, excluding current product
    const related = products
        .filter(p => p.category === currentProduct.category && p.id !== currentProduct.id)
        .slice(0, 4);

    if (related.length === 0) {
        grid.parentElement.style.display = 'none';
        return;
    }

    grid.innerHTML = related.map(product => {
        const isWishlisted = wishlist.has(product.id);
        return `
            <article class="product-card" data-id="${product.id}">
                <div class="product-image">
                    <a href="product.html?id=${product.id}">
                        <img src="${product.image}" alt="${product.name}" loading="lazy">
                    </a>
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
    }).join('');
}

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

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
    loadProduct();
    initQuantityControls();
    initAddToCart();
    initAddToWishlist();

    // Scroll event listener
    window.addEventListener('scroll', handleScroll, { passive: true });
});
