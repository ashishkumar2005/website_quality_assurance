const products = [
  {
    id: 1,
    name: "Wireless Mouse",
    category: "accessories",
    price: 699,
    rating: 4.4,
    image: "https://images.unsplash.com/photo-1527814050087-3793815479db?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 2,
    name: "USB Keyboard",
    category: "accessories",
    price: 1199,
    rating: 4.2,
    image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 3,
    name: "Bluetooth Speaker",
    category: "electronics",
    price: 2499,
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 4,
    name: "Laptop Stand",
    category: "workspace",
    price: 999,
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 5,
    name: "Noise Cancelling Headphones",
    category: "electronics",
    price: 4999,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 6,
    name: "Desk Organizer",
    category: "workspace",
    price: 799,
    rating: 4.1,
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 7,
    name: "Smart Watch",
    category: "electronics",
    price: 3499,
    rating: 4.3,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 8,
    name: "Webcam Full HD",
    category: "accessories",
    price: 1899,
    rating: 4.0,
    image: "https://images.unsplash.com/photo-1618329027137-a520b57c6606?auto=format&fit=crop&w=900&q=80",
  },
];

const state = {
  cart: [],
  couponApplied: false,
  loggedIn: false,
};

const productGrid = document.getElementById("productGrid");
const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");
const sortSelect = document.getElementById("sortSelect");
const cartItems = document.getElementById("cartItems");
const cartTotals = document.getElementById("cartTotals");
const cartCount = document.getElementById("cartCount");
const couponInput = document.getElementById("couponInput");
const couponMessage = document.getElementById("couponMessage");
const checkoutMessage = document.getElementById("checkoutMessage");
const orderPanel = document.getElementById("orderPanel");

function money(value) {
  return `₹${value.toLocaleString("en-IN")}`;
}

function setMessage(element, message, type = "") {
  element.textContent = message;
  element.className = `form-message ${type}`.trim();
}

function getVisibleProducts() {
  const search = searchInput.value.trim().toLowerCase();
  const category = categoryFilter.value;
  const sort = sortSelect.value;

  let filtered = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(search);
    const matchesCategory = category === "all" || product.category === category;
    return matchesSearch && matchesCategory;
  });

  if (sort === "low-high") {
    filtered = filtered.sort((a, b) => a.price - b.price);
  }

  if (sort === "high-low") {
    filtered = filtered.sort((a, b) => b.price - a.price);
  }

  return filtered;
}

function renderProducts() {
  const visibleProducts = getVisibleProducts();

  if (!visibleProducts.length) {
    productGrid.innerHTML = `<div class="panel">No products found. Try another keyword or category.</div>`;
    return;
  }

  productGrid.innerHTML = visibleProducts
    .map(
      (product) => `
        <article class="product-card">
          <img src="${product.image}" alt="${product.name}" />
          <div class="product-body">
            <h3>${product.name}</h3>
            <div class="product-meta">
              <span>${product.category}</span>
              <span>${product.rating} rating</span>
            </div>
            <div class="product-meta">
              <span class="price">${money(product.price)}</span>
              <button class="primary-button" type="button" onclick="addToCart(${product.id})">Add</button>
            </div>
          </div>
        </article>
      `
    )
    .join("");
}

function addToCart(productId) {
  const existing = state.cart.find((item) => item.id === productId);

  if (existing) {
    existing.quantity += 1;
  } else {
    const product = products.find((item) => item.id === productId);
    state.cart.push({ ...product, quantity: 1 });
  }

  renderCart();
}

function changeQuantity(productId, change) {
  const item = state.cart.find((cartItem) => cartItem.id === productId);
  if (!item) return;

  item.quantity += change;

  if (item.quantity <= 0) {
    state.cart = state.cart.filter((cartItem) => cartItem.id !== productId);
  }

  renderCart();
}

function removeFromCart(productId) {
  state.cart = state.cart.filter((item) => item.id !== productId);
  renderCart();
}

function getTotals() {
  const subtotal = state.cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discount = state.couponApplied ? Math.round(subtotal * 0.1) : 0;
  const tax = Math.round((subtotal - discount) * 0.05);
  const total = subtotal - discount + tax;
  return { subtotal, discount, tax, total };
}

function renderCart() {
  const itemCount = state.cart.reduce((sum, item) => sum + item.quantity, 0);
  cartCount.textContent = itemCount;

  if (!state.cart.length) {
    cartItems.innerHTML = `<p>Your cart is empty.</p>`;
    cartTotals.innerHTML = "";
    return;
  }

  cartItems.innerHTML = state.cart
    .map(
      (item) => `
        <div class="cart-item">
          <div>
            <h3>${item.name}</h3>
            <span>${money(item.price)} each</span>
          </div>
          <div class="qty-control" aria-label="Quantity controls for ${item.name}">
            <button class="icon-button" type="button" onclick="changeQuantity(${item.id}, -1)">-</button>
            <strong>${item.quantity}</strong>
            <button class="icon-button" type="button" onclick="changeQuantity(${item.id}, 1)">+</button>
          </div>
          <button class="remove-button" type="button" onclick="removeFromCart(${item.id})">Remove</button>
        </div>
      `
    )
    .join("");

  const totals = getTotals();
  cartTotals.innerHTML = `
    <div class="total-line"><span>Subtotal</span><strong>${money(totals.subtotal)}</strong></div>
    <div class="total-line"><span>Discount</span><strong>-${money(totals.discount)}</strong></div>
    <div class="total-line"><span>Tax</span><strong>${money(totals.tax)}</strong></div>
    <div class="total-line final"><span>Total</span><strong>${money(totals.total)}</strong></div>
  `;
}

document.getElementById("loginForm").addEventListener("submit", (event) => {
  event.preventDefault();
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value;
  const loginMessage = document.getElementById("loginMessage");

  if (username === "qa_user01" && password === "Pass@123") {
    state.loggedIn = true;
    setMessage(loginMessage, "Login successful. You can continue checkout testing.", "success");
  } else {
    state.loggedIn = false;
    setMessage(loginMessage, "Invalid username or password.", "error");
  }
});

document.getElementById("applyCoupon").addEventListener("click", () => {
  const coupon = couponInput.value.trim().toUpperCase();

  if (!state.cart.length) {
    setMessage(couponMessage, "Add a product before applying a coupon.", "error");
    return;
  }

  if (coupon === "SAVE10") {
    state.couponApplied = true;
    setMessage(couponMessage, "Coupon SAVE10 applied successfully.", "success");
    renderCart();
    return;
  }

  state.couponApplied = false;
  setMessage(couponMessage, "Invalid coupon code.", "error");
  renderCart();
});

document.getElementById("checkout").addEventListener("submit", (event) => {
  event.preventDefault();

  const fullName = document.getElementById("fullName").value.trim();
  const email = document.getElementById("email").value.trim();
  const address = document.getElementById("address").value.trim();
  const paymentStatus = document.getElementById("paymentStatus").value;

  if (!state.loggedIn) {
    setMessage(checkoutMessage, "Please log in before placing an order.", "error");
    return;
  }

  if (!state.cart.length) {
    setMessage(checkoutMessage, "Your cart is empty.", "error");
    return;
  }

  if (!fullName || !email || !address) {
    setMessage(checkoutMessage, "Full name, email, and address are mandatory.", "error");
    return;
  }

  if (paymentStatus === "failed") {
    setMessage(checkoutMessage, "Payment failed. Order was not created.", "error");
    return;
  }

  const totals = getTotals();
  const orderId = `ORD-${Date.now().toString().slice(-6)}`;
  setMessage(checkoutMessage, "Order placed successfully.", "success");
  orderPanel.innerHTML = `
    <div class="order-card">
      <h3>Order confirmed</h3>
      <p><strong>Order ID:</strong> ${orderId}</p>
      <p><strong>Customer:</strong> ${fullName}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Delivery Address:</strong> ${address}</p>
      <p><strong>Total Paid:</strong> ${money(totals.total)}</p>
      <p><strong>Status:</strong> Confirmed</p>
    </div>
  `;

  state.cart = [];
  state.couponApplied = false;
  couponInput.value = "";
  setMessage(couponMessage, "");
  renderCart();
});

document.getElementById("cartButton").addEventListener("click", () => {
  document.getElementById("cart").scrollIntoView({ behavior: "smooth", block: "start" });
});

searchInput.addEventListener("input", renderProducts);
categoryFilter.addEventListener("change", renderProducts);
sortSelect.addEventListener("change", renderProducts);

renderProducts();
renderCart();

window.addToCart = addToCart;
window.changeQuantity = changeQuantity;
window.removeFromCart = removeFromCart;

