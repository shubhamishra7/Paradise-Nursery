const cart = JSON.parse(localStorage.getItem("cart")) || [];

function renderCart() {
  const cartItems = document.getElementById("cart-items");
  const totalCost = document.getElementById("total-cost");

  cartItems.innerHTML = "";
  let total = 0;

  cart.forEach((item, index) => {
    const itemTotal = item.price * item.quantity;
    total += itemTotal;

    const div = document.createElement("div");
    div.className = "cart-item";
    div.innerHTML = `
      <img src="assets/images/product-${item.id}.jpg" alt="${item.name}">
      <span>${item.name}</span>
      <span>$${item.price}</span>
      <span>
        <button onclick="updateQuantity(${index}, -1)">-</button>
        ${item.quantity}
        <button onclick="updateQuantity(${index}, 1)">+</button>
      </span>
      <span>$${itemTotal}</span>
      <button onclick="removeItem(${index})">Remove</button>
    `;
    cartItems.appendChild(div);
  });

  totalCost.textContent = total.toFixed(2);
  document.getElementById("cart-count").textContent = cart.length;
}

function updateQuantity(index, change) {
  cart[index].quantity += change;
  if (cart[index].quantity <= 0) cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}

function removeItem(index) {
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}

document.getElementById("checkout").addEventListener("click", () => {
  alert("Checkout successful!");
  localStorage.clear();
  renderCart();
});

renderCart();
