// scripts.js

// Cart management variables
let cart = [];

// Function to update the cart count in the header
function updateCartCount() {
  const cartCount = document.getElementById('cart-count');
  cartCount.textContent = cart.length;
}

// Function to display cart items in a modal or a dedicated section
function showCart() {
  const cartModal = document.getElementById('cart-modal');
  const cartItemsContainer = document.getElementById('cart-items');
  const totalAmount = document.getElementById('total-amount');

  // Clear previous cart items
  cartItemsContainer.innerHTML = '';

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = '<p>Your cart is empty.</p>';
    totalAmount.textContent = 'Rp. 0';
  } else {
    let totalPrice = 0;
    cart.forEach(product => {
      // Create a div for each product
      const productElement = document.createElement('div');
      productElement.classList.add('cart-item', 'flex', 'items-center', 'mb-4');
      productElement.innerHTML = `
        <img src="${product.img}" alt="${product.name}" class="w-20 h-20 object-cover mr-4"/>
        <div>
          <p><strong>${product.name}</strong></p>
          <p>Rp. ${product.price.toLocaleString()}</p>
        </div>
      `;
      cartItemsContainer.appendChild(productElement);
      totalPrice += product.price;
    });
    totalAmount.textContent = `Rp. ${totalPrice.toLocaleString()}`;
  }

  // Show the modal
  cartModal.style.display = 'block';
}

// Function to add an item to the cart
function addToCart(event) {
  const button = event.target;
  const productName = button.getAttribute('data-product');
  const productPrice = button.getAttribute('data-price');
  const productImg = button.getAttribute('data-img');

  // Create a product object
  const product = {
    name: productName,
    price: parseInt(productPrice),
    img: productImg
  };

  // Add the product to the cart array
  cart.push(product);

  // Update the cart count
  updateCartCount();
}

// Add event listeners to each "Add to Cart" button
document.querySelectorAll('.btn-primary').forEach(button => {
  button.addEventListener('click', addToCart);
});

// Add event listener to show the cart modal when clicking on the cart link
document.getElementById('cart').addEventListener('click', showCart);

// Close the cart modal
document.getElementById('close-cart').addEventListener('click', function() {
  const cartModal = document.getElementById('cart-modal');
  cartModal.style.display = 'none';
});
