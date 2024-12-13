const cart = JSON.parse(localStorage.getItem("cart")) || [];

function updateCartCount() {
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  document.getElementById("cart-count").textContent = cartCount;
}

function addToCart(productId, name, price) {
  const existing = cart.find((item) => item.id === productId);
  if (existing) {
    existing.quantity++;
  } else {
    cart.push({ id: productId, name, price, quantity: 1 });
  }
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
}

document.querySelectorAll(".add-to-cart").forEach((button) =>
  button.addEventListener("click", () => {
    const product = button.closest(".product");
    const id = parseInt(product.dataset.id, 10);
    const name = product.querySelector("h2").textContent;
    const price = parseFloat(product.querySelector("p").textContent.replace("$", ""));
    addToCart(id, name, price);
  })
);

updateCartCount();
