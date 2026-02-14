// ===================================
// PRODUCT DATA - Luxury Fashion Items
// All prices in South African Rand (ZAR)
// ===================================

const products = [
    {
        id: 1,
        name: 'Heritage Cashmere Coat',
        category: 'womens',
        type: 'jackets',
        price: 18999,
        image: 'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=600&h=800&fit=crop',
        images: [
            'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=600&h=800&fit=crop',
            'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600&h=800&fit=crop',
            'https://images.unsplash.com/photo-1544441893-675973e31985?w=600&h=800&fit=crop'
        ],
        description: 'An exquisite double-breasted coat crafted from the finest Italian cashmere. Features a timeless silhouette with hand-stitched lapels and luxurious horn buttons. The perfect investment piece for the discerning wardrobe.',
        details: 'Composition: 100% Cashmere\nLining: 100% Silk\nMade in Italy\nDry clean only',
        badge: 'New',
        bestseller: true,
        sizes: ['XS', 'S', 'M', 'L', 'XL']
    },
    {
        id: 2,
        name: 'Milan Leather Handbag',
        category: 'accessories',
        type: 'bags',
        price: 24500,
        image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=600&h=800&fit=crop',
        images: [
            'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=600&h=800&fit=crop',
            'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=600&h=800&fit=crop',
            'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&h=800&fit=crop'
        ],
        description: 'Sophisticated structured tote handcrafted from premium calfskin leather. Features signature gold-tone hardware, protective feet, and a spacious interior with multiple compartments. Timeless elegance for everyday luxury.',
        details: 'Material: Italian Calfskin Leather\nHardware: 18k Gold-plated\nDimensions: 32cm x 28cm x 14cm\nMade in Italy',
        badge: 'Bestseller',
        bestseller: true
    },
    {
        id: 3,
        name: 'Tailored Wool Blazer',
        category: 'mens',
        type: 'jackets',
        price: 14999,
        image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&h=800&fit=crop',
        images: [
            'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&h=800&fit=crop',
            'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600&h=800&fit=crop',
            'https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?w=600&h=800&fit=crop'
        ],
        description: 'Impeccably tailored single-breasted blazer in superfine merino wool. Modern slim fit with natural shoulder construction and hand-finished buttonholes. A wardrobe essential for the modern gentleman.',
        details: 'Composition: 100% Merino Wool\nLining: Cupro\nMade in Italy\nHalf-canvassed construction',
        bestseller: true,
        sizes: ['46', '48', '50', '52', '54', '56']
    },
    {
        id: 4,
        name: 'Aviator Sunglasses',
        category: 'accessories',
        type: 'sunglasses',
        price: 6499,
        image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=600&h=800&fit=crop',
        images: [
            'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=600&h=800&fit=crop',
            'https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?w=600&h=800&fit=crop'
        ],
        description: 'Classic aviator sunglasses with lightweight titanium frame and premium polarized lenses. Offers superior UV protection while maintaining timeless style. Includes leather case and microfiber cloth.',
        details: 'Frame: Titanium\nLenses: Polarized CR-39\nUV Protection: 100% UVA/UVB\nMade in Japan',
        badge: 'Limited',
        bestseller: false
    },
    {
        id: 5,
        name: 'Silk Evening Dress',
        category: 'womens',
        type: 'dresses',
        price: 22999,
        image: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=600&h=800&fit=crop',
        images: [
            'https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=600&h=800&fit=crop',
            'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600&h=800&fit=crop',
            'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=600&h=800&fit=crop'
        ],
        description: 'Flowing maxi dress in pure mulberry silk with delicate draping. Features an elegant cowl neckline and adjustable shoulder straps. Perfect for evening soirées and special occasions.',
        details: 'Composition: 100% Mulberry Silk\nLining: Silk Charmeuse\nMade in France\nDry clean only',
        bestseller: true,
        sizes: ['XS', 'S', 'M', 'L']
    },
    {
        id: 6,
        name: 'Swiss Automatic Watch',
        category: 'accessories',
        type: 'watches',
        price: 45999,
        image: 'https://images.unsplash.com/photo-1547996160-81dfa63595aa?w=600&h=800&fit=crop',
        images: [
            'https://images.unsplash.com/photo-1547996160-81dfa63595aa?w=600&h=800&fit=crop',
            'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=600&h=800&fit=crop',
            'https://images.unsplash.com/photo-1509048191080-d2984bad6ae5?w=600&h=800&fit=crop'
        ],
        description: 'Precision-engineered automatic timepiece with 42mm stainless steel case and sapphire crystal. Features exhibition case back showcasing the intricate Swiss movement. Water resistant to 100 meters.',
        details: 'Movement: Swiss Automatic\nCase: 316L Stainless Steel\nCrystal: Sapphire\nWater Resistance: 100m',
        badge: 'Exclusive',
        bestseller: true
    },
    {
        id: 7,
        name: 'Premium Leather Sneakers',
        category: 'mens',
        type: 'shoes',
        price: 8999,
        image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&h=800&fit=crop',
        images: [
            'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&h=800&fit=crop',
            'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=600&h=800&fit=crop',
            'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=600&h=800&fit=crop'
        ],
        description: 'Contemporary low-top sneakers crafted from premium Italian leather. Features cushioned insole, rubber sole, and minimalist design. The perfect blend of comfort and sophistication for modern living.',
        details: 'Upper: Italian Calfskin\nLining: Leather\nSole: Natural Rubber\nMade in Portugal',
        bestseller: true,
        sizes: ['40', '41', '42', '43', '44', '45']
    },
    {
        id: 8,
        name: 'Merino Wool Sweater',
        category: 'mens',
        type: 'knitwear',
        price: 6999,
        image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=600&h=800&fit=crop',
        images: [
            'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=600&h=800&fit=crop',
            'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=600&h=800&fit=crop'
        ],
        description: 'Luxuriously soft crew neck sweater in extra-fine merino wool. Features ribbed cuffs and hem with a classic fit that works for any occasion. An essential layering piece for the refined wardrobe.',
        details: 'Composition: 100% Extra-Fine Merino Wool\nGauge: 12-gauge knit\nMade in Scotland\nMachine washable',
        bestseller: false,
        sizes: ['S', 'M', 'L', 'XL', 'XXL']
    },
    {
        id: 9,
        name: 'Silk Scarf Collection',
        category: 'accessories',
        type: 'scarves',
        price: 4999,
        image: 'https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=600&h=800&fit=crop',
        images: [
            'https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=600&h=800&fit=crop',
            'https://images.unsplash.com/photo-1610652492500-ded49cebc486?w=600&h=800&fit=crop'
        ],
        description: 'Hand-rolled silk twill scarf featuring an exclusive artistic print. Made from the finest Como silk with meticulous attention to detail. An effortless way to add elegance to any ensemble.',
        details: 'Composition: 100% Silk Twill\nDimensions: 90cm x 90cm\nMade in Italy\nHand-rolled edges',
        badge: 'New',
        bestseller: false
    },
    {
        id: 10,
        name: 'Cashmere Wrap Coat',
        category: 'womens',
        type: 'jackets',
        price: 21999,
        image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600&h=800&fit=crop',
        images: [
            'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600&h=800&fit=crop',
            'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=600&h=800&fit=crop'
        ],
        description: 'Enveloping wrap coat in double-faced cashmere with a tie belt. Features oversized lapels and patch pockets for a relaxed yet refined silhouette. Ultimate luxury for cooler months.',
        details: 'Composition: 100% Double-faced Cashmere\nMade in Italy\nBelt included\nDry clean only',
        bestseller: true,
        sizes: ['XS', 'S', 'M', 'L', 'XL']
    },
    {
        id: 11,
        name: 'Leather Chelsea Boots',
        category: 'mens',
        type: 'shoes',
        price: 12999,
        image: 'https://images.unsplash.com/photo-1608256246200-53e635b5b65f?w=600&h=800&fit=crop',
        images: [
            'https://images.unsplash.com/photo-1608256246200-53e635b5b65f?w=600&h=800&fit=crop',
            'https://images.unsplash.com/photo-1603808033192-082d6919d3e1?w=600&h=800&fit=crop'
        ],
        description: 'Classic Chelsea boots in premium full-grain leather with Goodyear welt construction. Features elastic side panels and leather sole. A timeless design built to last generations.',
        details: 'Upper: Full-grain Leather\nConstruction: Goodyear Welt\nSole: Leather\nMade in England',
        bestseller: true,
        sizes: ['40', '41', '42', '43', '44', '45']
    },
    {
        id: 12,
        name: 'Gold-Plated Cufflinks',
        category: 'accessories',
        type: 'jewelry',
        price: 3499,
        image: 'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=600&h=800&fit=crop',
        images: [
            'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=600&h=800&fit=crop'
        ],
        description: 'Sophisticated square cufflinks with 18k gold plating and subtle engraved detailing. Comes in a luxury presentation box. The perfect finishing touch for formal attire.',
        details: 'Material: Brass with 18k Gold Plating\nDimensions: 15mm x 15mm\nPresentation box included',
        badge: 'Gift',
        bestseller: false
    }
];

// Export for use in other JS files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = products;
}
