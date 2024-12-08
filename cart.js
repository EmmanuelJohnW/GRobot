// Function to calculate and update the cart count
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const totalCount = cart.reduce((count, item) => count + item.quantity, 0);
    const cartCountElement = document.querySelector('#cart-count');

    if (cartCountElement) {
        cartCountElement.textContent = totalCount; // Update the cart count in the navbar
    }
}

// Function to load the cart and display its contents
function loadCart() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartItemsContainer = document.getElementById('cart-items');
    const totalPriceElement = document.getElementById('total-price');

    cartItemsContainer.innerHTML = ''; // Clear previous items
    let totalPrice = 0;

    if (cart.length === 0) {
        // Alert the user if the cart is empty
        cartItemsContainer.innerHTML = `
            <div class="alert alert-warning text-center" role="alert">
                Your cart is empty. Start adding items to your cart!
            </div>
        `;
        totalPriceElement.textContent = '0.00'; // Set total price to zero
        return;
    }

    cart.forEach(item => {
        totalPrice += item.price * item.quantity;

        const itemElement = document.createElement('div');
        itemElement.classList.add('row', 'mb-3', 'align-items-center');

        itemElement.innerHTML = `
            <div class="col-md-6">
                <h5>${item.name}</h5>
                <p>Price: $${item.price.toFixed(2)}</p>
            </div>
            <div class="col-md-3 d-flex align-items-center">
                <button class="btn btn-secondary btn-sm decrease-quantity" data-product-id="${item.id}">-</button>
                <span class="mx-2">${item.quantity}</span>
                <button class="btn btn-secondary btn-sm increase-quantity" data-product-id="${item.id}">+</button>
            </div>
            <div class="col-md-3 text-end">
                <button class="btn btn-danger btn-sm remove-item" data-product-id="${item.id}">Remove</button>
            </div>
        `;

        cartItemsContainer.appendChild(itemElement);
    });

    totalPriceElement.textContent = totalPrice.toFixed(2);
    updateCartCount(); // Update cart count in the navbar
}

// Function to remove an item from the cart
function removeFromCart(productId) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart = cart.filter(item => item.id !== productId);
    localStorage.setItem('cart', JSON.stringify(cart)); // Update the cart in localStorage
    loadCart(); // Reload the cart
    updateCartCount(); // Update cart count
}

// Function to update the quantity of a product
function updateQuantity(productId, change) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const product = cart.find(item => item.id === productId);

    if (product) {
        product.quantity += change;
        if (product.quantity <= 0) {
            // If quantity becomes zero or less, remove the product
            removeFromCart(productId);
        } else {
            localStorage.setItem('cart', JSON.stringify(cart)); // Update the cart in localStorage
            loadCart(); // Reload the cart
        }
    }
    updateCartCount(); // Update cart count
}

// Function to check if the cart is empty before proceeding
function handleCheckout(event) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Check if the cart is empty
    if (cart.length === 0) {
        event.preventDefault(); // Prevent form submission or navigation
        alert('Your cart is empty! Please add items to your cart before proceeding to checkout.');
        return;
    }

    // Proceed with the checkout process (you can add additional logic here)
    alert('Proceeding to checkout...');
}

// Add an event listener to the checkout button
document.addEventListener('DOMContentLoaded', () => {
    const checkoutButton = document.querySelector('.btn-primary');

    if (checkoutButton) {
        checkoutButton.addEventListener('click', handleCheckout);
    }

    updateCartCount(); // Update cart count when the page loads
});

// Add event listeners for quantity buttons and remove buttons
document.addEventListener('click', event => {
    const target = event.target;

    if (target.classList.contains('remove-item')) {
        const productId = target.getAttribute('data-product-id');
        removeFromCart(productId);
    }

    if (target.classList.contains('increase-quantity')) {
        const productId = target.getAttribute('data-product-id');
        updateQuantity(productId, 1); // Increase quantity by 1
    }

    if (target.classList.contains('decrease-quantity')) {
        const productId = target.getAttribute('data-product-id');
        updateQuantity(productId, -1); // Decrease quantity by 1
    }
});

// Load the cart when the page loads
window.onload = loadCart;
