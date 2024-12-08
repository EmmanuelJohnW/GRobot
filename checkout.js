// Function to handle form submission
function handleCheckout(event) {
    event.preventDefault(); // Prevent default form submission

    // Validate required fields
    const requiredFields = [
        'first-name',
        'last-name',
        'email',
        'phone',
        'address',
        'city',
        'zip',
        'country',
        'state',
        'card-name',
        'card-number',
        'expiry-date',
        'cvv'
    ];

    let isValid = true;

    requiredFields.forEach(fieldId => {
        const field = document.getElementById(fieldId);

        if (!field.value.trim()) {
            field.classList.add('is-invalid'); // Highlight missing fields
            isValid = false;
        } else {
            field.classList.remove('is-invalid');
        }
    });

    if (!isValid) {
        alert('Please fill out all required fields before completing your purchase.');
        return;
    }

    // Display confirmation alert
    alert('Thank you for your order! Your items will be shipped shortly.');

    // Clear cart and redirect to Products page
    localStorage.removeItem('cart'); // Clear the cart from localStorage
    window.location.href = 'view_product.html'; // Redirect to Products page
}

// Add event listener to the checkout form
document.addEventListener('DOMContentLoaded', () => {
    const checkoutForm = document.getElementById('checkout-form');
    checkoutForm.addEventListener('submit', handleCheckout);
});
