// Dados dos produtos
const products = [
    {
        id: 1,
        name: "Conjunto Nike Dri Fit",
        price: 279.90,
        category: "camisetas",
        image: "https://cdn.awsli.com.br/600x700/1925/1925256/produto/321848354/5da1b34b-bdca-4407-966e-823583191c5b-4qddtpsbcl.jpeg"
    },
    {
        id: 2,
        name: "Nike Air Max Tn Plus",
        price: 999.90,
        category: "acessorios",
        image: "https://imgnike-a.akamaihd.net/1300x1300/022147NYA1.jpg"
    },
    {
        id: 3,
        name: "Nike Shox 12 Molas",
        price: 329.90,
        category: "acessorios",
        image: "https://acdn-us.mitiendanube.com/stores/001/808/148/products/img_2403-f7076a56a689c7c48317324890248373-1024-1024.webp"
    },
    {
        id: 4,
        name: "Calça Nike Sportswear",
        price: 129.90,
        category: "calcas",
        image: "https://cdn.awsli.com.br/64x50/2420/2420757/produto/214574293/0f8154aa-ad4c-473b-939f-7676515684dc-kxgl5av3fq.jfif"
    },
    {
        id: 5,
        name: "Nike Air Force Branco",
        price: 49.90,
        category: "acessorios",
        image: "https://lojavirus.fbitsstatic.net/img/p/tenis-nike-air-force-1-07-white-white-dd8959-100-72564/296097-1.jpg?w=1200&h=1200&v=no-value"
    },
    {
        id: 6,
        name: "Blusa Nike Tech",
        price: 639.90,
        category: "camisetas",
        image: "https://cdn.awsli.com.br/600x450/1046/1046773/produto/335284015/c06181b97b0a7aa429fdfa21e9b3fb44-w44t58fhio.jpg"
    },
    {
        id: 7,
        name: "Conjunto Amiri",
        price: 659.90,
        category: "camisetas",
        image: "https://photos.enjoei.com.br/conjunto-amiri-102687018/800x800/czM6Ly9waG90b3MuZW5qb2VpLmNvbS5ici9wcm9kdWN0cy8zNzQyMTk1MS9mZTAxYTgwNDI5OGExN2Y2ZDZmNWJjMmIzZWRiYjk4MC5qcGc"
    },
    {
        id: 8,
        name: "Calça Nike Dri Fit",
        price: 169.90,
        category: "calcas",
        image: "https://images.tcdn.com.br/img/img_prod/1303097/calca_nike_infantil_drifit_academy23_90903_1_5a1835378e0087902b9b164ea7d082ff_20250929200510.jpg"
    }
];

// Estado da aplicação
let cart = [];
let currentFilter = 'all';

// Elementos DOM
const productsGrid = document.getElementById('products-grid');
const filterButtons = document.querySelectorAll('.filter-btn');
const cartCount = document.getElementById('cart-count');
const cartItems = document.getElementById('cart-items');
const cartTotalPrice = document.getElementById('cart-total-price');
const loginBtn = document.getElementById('login-btn');
const cartBtn = document.getElementById('cart-btn');
const loginModal = document.getElementById('login-modal');
const registerModal = document.getElementById('register-modal');
const cartModal = document.getElementById('cart-modal');
const checkoutModal = document.getElementById('checkout-modal');
const closeButtons = document.querySelectorAll('.close');
const registerLink = document.getElementById('register-link');
const loginLink = document.getElementById('login-link');
const continueShoppingBtn = document.getElementById('continue-shopping');
const checkoutBtn = document.getElementById('checkout-btn');
const backToShopBtn = document.getElementById('back-to-shop');
const nextStepButtons = document.querySelectorAll('.next-step');
const checkoutSteps = document.querySelectorAll('.checkout-step');
const steps = document.querySelectorAll('.step');

// Inicialização
document.addEventListener('DOMContentLoaded', function() {
    displayProducts(products);
    setupEventListeners();
    updateCartCount();
});

// Configurar event listeners
function setupEventListeners() {
    // Filtros de produtos
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            filterProducts(filter);
            
            // Atualizar botões ativos
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // Modais
    loginBtn.addEventListener('click', () => openModal(loginModal));
    cartBtn.addEventListener('click', () => openModal(cartModal));
    
    // Fechar modais
    closeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const modal = this.closest('.modal');
            closeModal(modal);
        });
    });
    
    // Alternar entre login e registro
    registerLink.addEventListener('click', function(e) {
        e.preventDefault();
        closeModal(loginModal);
        openModal(registerModal);
    });
    
    loginLink.addEventListener('click', function(e) {
        e.preventDefault();
        closeModal(registerModal);
        openModal(loginModal);
    });
    
    // Carrinho
    continueShoppingBtn.addEventListener('click', () => closeModal(cartModal));
    checkoutBtn.addEventListener('click', () => {
        closeModal(cartModal);
        openModal(checkoutModal);
    });
    
    // Checkout
    backToShopBtn.addEventListener('click', () => {
        closeModal(checkoutModal);
        cart = [];
        updateCart();
        resetCheckout();
    });
    
    nextStepButtons.forEach(button => {
        button.addEventListener('click', function() {
            const nextStep = this.getAttribute('data-next');
            goToStep(nextStep);
        });
    });
    
    // Fechar modal ao clicar fora
    window.addEventListener('click', function(e) {
        if (e.target.classList.contains('modal')) {
            closeModal(e.target);
        }
    });
    
    // Formulários
    document.getElementById('login-form').addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Login realizado com sucesso!');
        closeModal(loginModal);
    });
    
    document.getElementById('register-form').addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Cadastro realizado com sucesso!');
        closeModal(registerModal);
    });
}

// Exibir produtos
function displayProducts(productsToShow) {
    productsGrid.innerHTML = '';
    
    productsToShow.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}">
            </div>
            <div class="product-info">
                <h3>${product.name}</h3>
                <div class="product-price">R$ ${product.price.toFixed(2)}</div>
                <button class="add-to-cart" data-id="${product.id}">
                    <i class="fas fa-shopping-cart"></i> Adicionar ao Carrinho
                </button>
            </div>
        `;
        
        productsGrid.appendChild(productCard);
    });
    
    // Adicionar event listeners aos botões de adicionar ao carrinho
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', function() {
            const productId = parseInt(this.getAttribute('data-id'));
            addToCart(productId);
        });
    });
}

// Filtrar produtos
function filterProducts(category) {
    currentFilter = category;
    
    if (category === 'all') {
        displayProducts(products);
    } else {
        const filteredProducts = products.filter(product => product.category === category);
        displayProducts(filteredProducts);
    }
}

// Carrinho de compras
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }
    
    updateCart();
    showNotification(`${product.name} adicionado ao carrinho!`);
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCart();
}

function updateQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    
    if (item) {
        item.quantity += change;
        
        if (item.quantity <= 0) {
            removeFromCart(productId);
        } else {
            updateCart();
        }
    }
}

function updateCart() {
    updateCartCount();
    
    if (cartModal.style.display === 'flex') {
        renderCartItems();
    }
}

function updateCartCount() {
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    cartCount.textContent = totalItems;
}

function renderCartItems() {
    cartItems.innerHTML = '';
    
    if (cart.length === 0) {
        cartItems.innerHTML = '<p class="empty-cart">Seu carrinho está vazio</p>';
        cartTotalPrice.textContent = '0.00';
        return;
    }
    
    let total = 0;
    
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <div class="cart-item-info">
                <div class="cart-item-image">
                    <img src="${item.image}" alt="${item.name}">
                </div>
                <div class="cart-item-details">
                    <h4>${item.name}</h4>
                    <div class="cart-item-price">R$ ${item.price.toFixed(2)}</div>
                </div>
            </div>
            <div class="cart-item-controls">
                <div class="cart-item-quantity">
                    <button class="quantity-btn minus" data-id="${item.id}">-</button>
                    <span>${item.quantity}</span>
                    <button class="quantity-btn plus" data-id="${item.id}">+</button>
                </div>
                <button class="remove-item" data-id="${item.id}"><i class="fas fa-trash"></i></button>
            </div>
        `;
        
        cartItems.appendChild(cartItem);
    });
    
    cartTotalPrice.textContent = total.toFixed(2);
    
    // Adicionar event listeners aos controles do carrinho
    document.querySelectorAll('.quantity-btn.minus').forEach(button => {
        button.addEventListener('click', function() {
            const productId = parseInt(this.getAttribute('data-id'));
            updateQuantity(productId, -1);
        });
    });
    
    document.querySelectorAll('.quantity-btn.plus').forEach(button => {
        button.addEventListener('click', function() {
            const productId = parseInt(this.getAttribute('data-id'));
            updateQuantity(productId, 1);
        });
    });
    
    document.querySelectorAll('.remove-item').forEach(button => {
        button.addEventListener('click', function() {
            const productId = parseInt(this.getAttribute('data-id'));
            removeFromCart(productId);
        });
    });
}

// Modais
function openModal(modal) {
    modal.style.display = 'flex';
    
    if (modal === cartModal) {
        renderCartItems();
    }
}

function closeModal(modal) {
    modal.style.display = 'none';
}

// Checkout
function goToStep(stepNumber) {
    // Atualizar etapas ativas
    checkoutSteps.forEach(step => step.classList.remove('active'));
    document.getElementById(`checkout-step-${stepNumber}`).classList.add('active');
    
    steps.forEach(step => {
        if (parseInt(step.getAttribute('data-step')) <= stepNumber) {
            step.classList.add('active');
        } else {
            step.classList.remove('active');
        }
    });
}

function resetCheckout() {
    goToStep(1);
    updateCartCount();
}

// Notificações
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background-color: var(--secondary-color);
        color: white;
        padding: 15px 20px;
        border-radius: 4px;
        z-index: 1001;
        animation: slideIn 0.3s, slideOut 0.3s 2.7s;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Adicionar estilos para a animação da notificação
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`;
document.head.appendChild(style);