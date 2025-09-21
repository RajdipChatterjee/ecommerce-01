document.addEventListener("DOMContentLoaded", () => {
  let productList = document.getElementById("product-list");
  let cartItems = document.getElementById("cart-items");
  let emptyCartMessage = document.getElementById("empty-cart");
  let cartTotal = document.getElementById("cart-total");
  let totalPriceDisplay = document.getElementById("total-price");
  let checkoutBtn = document.getElementById("checkout-btn");

  const products = [
    { id: 1, name: "Product 1", price: 29.99 },
    { id: 2, name: "Product 2", price: 39.99 },
    { id: 3, name: "Product 3", price: 49.99 },
  ];

  localStorage.setItem("products", JSON.stringify(products));

  products.forEach((product) => {
    const productDiv = document.createElement("div");
    productDiv.classList.add("product");
    productDiv.innerHTML = `<span>${product.name} - ${product.price.toFixed(
      2
    )}</span>
        <button data-id="${product.id}">Add to cart</button>`;
    productList.appendChild(productDiv);
  });

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  renderAllCart();

  productList.addEventListener("click", (e) => {
    if (e.target.tagName === "BUTTON") {
      const productId = parseInt(e.target.getAttribute("data-id"));
      let product = products.find((product) => product.id == productId);
      const cartItem = { ...product, _p: Date.now() };
      cart.push(cartItem);
      localStorage.setItem("cart", JSON.stringify(cart));
      renderAllCart();
    }
  });

  cartItems.addEventListener("click", (e) => {
    if (e.target.tagName === "BUTTON") {
      let productId = parseInt(e.target.getAttribute("data-id"));
      cart = cart.filter((itm) => itm._p != productId);
      localStorage.setItem("cart", JSON.stringify(cart));
      renderAllCart();
    }
  });

  checkoutBtn.addEventListener("click", () => {
    cart = [];
    localStorage.setItem("cart", JSON.stringify(cart));
    renderAllCart();
    alert("Checkout successfully");
  });

  // -----------------
  // Helpers
  // -----------------
  function renderAllCart() {
    cartItems.innerHTML = "";
    if (cart.length === 0) {
      emptyCartMessage.classList.remove("hidden");
      cartTotal.classList.add("hidden");
    } else {
      emptyCartMessage.classList.add("hidden");
      cartTotal.classList.remove("hidden");
      cart.forEach((cartItm) => renderCart(cartItm));
    }
    updateTotal();
  }

  function renderCart(product) {
    const cartItem = document.createElement("div");
    cartItem.classList.add("product");
    cartItem.innerHTML = `<span>${product.name} - ${product.price.toFixed(
      2
    )}</span><button data-id="${product._p}">Remove</button>`;
    cartItems.appendChild(cartItem);
  }

  function updateTotal() {
    const total = cart.reduce((sum, item) => sum + item.price, 0);
    totalPriceDisplay.textContent = `$${total.toFixed(2)}`;
  }
});
