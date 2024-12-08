// Function to add a product to the cart
function addToCart(productId, productName, productPrice) {
    const cart = JSON.parse(localStorage.getItem('cart')) || []; // Get the current cart or create an empty one
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity += 1; // Increment quantity if product already exists
    } else {
        cart.push({
            id: productId,
            name: productName,
            price: parseFloat(productPrice),
            quantity: 1,
        }); // Add new product to cart
    }

    localStorage.setItem('cart', JSON.stringify(cart)); // Save the updated cart
    updateCartCount(); // Update the cart count in the navbar
    alert(`${productName} has been added to your cart!`);
}

// Function to update the cart item count in the navbar
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
    document.getElementById('cart-count').textContent = cartCount;
}

// Add event listeners to all "Add to Cart" buttons
document.addEventListener('DOMContentLoaded', () => {
    updateCartCount(); // Ensure the cart count is accurate on page load

    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', () => {
            const productId = button.getAttribute('data-product-id');
            const productName = button.getAttribute('data-product-name');
            const productPrice = button.getAttribute('data-product-price');
            addToCart(productId, productName, productPrice);
        });
    });
});
