export const items = [
  { id: 1, category: "shoes", item: "Margiela Gats", price: "$149.99" },
  { id: 2, category: "clothing", item: "Levis jeans", price: "$89.99" },
  { id: 3, category: "clothing", item: "Zara Jacket", price: "$119.99" },
  { id: 4, category: "shoes", item: "Valentino Girravanni", price: "$159.99" },
];

const productsGrid = document.querySelector(".products-grid");

window.cart = {};

function initStore() {
  renderItems();

  const savedCart = localStorage.getItem("cartItems");
  if (savedCart) {
    window.cart = JSON.parse(savedCart);
  }
}

function renderItems() {
  productsGrid.innerHTML = "";
  for (let i = 0; i < items.length; i++) {
    createProductCard(items[i], i);
  }
}

productsGrid.addEventListener("click", (e) => {
  if (e.target.className === "add-to-cart-btn") {
    const i = e.target.getAttribute("data-index");
    const item = items[i];
    addProductToCart(item);

    console.log("Added to cart:", item);
    console.log("Current cart:", window.cart);
  }
});

function addProductToCart(product) {
  if (window.cart[product.id]) {
    window.cart[product.id].quantity++;
  } else {
    window.cart[product.id] = { ...product, quantity: 1 };
  }

  localStorage.setItem("cartItems", JSON.stringify(window.cart));
}

function createProductCard(product, i) {
  const productCard = document.createElement("div");
  productCard.className = "product-card";

  let badge = "";
  if (i === 0) {
    badge = `<span class="featured-badge" style="background-color: #2563eb">NEW</span>`;
  } else if (i === 1) {
    badge = `<span class="featured-badge" style="background-color: #ef4444">BESTSELLER</span>`;
  }

  const imageArea = document.createElement("div");
  imageArea.className = "image-area";
  imageArea.innerHTML = badge;
  productCard.appendChild(imageArea);

  const productInfo = document.createElement("div");
  productInfo.className = "product-info";

  const categoryP = document.createElement("p");
  categoryP.textContent = product.category;
  productInfo.appendChild(categoryP);

  const productName = document.createElement("h6");
  productName.className = "product-name";
  productName.textContent = product.item;
  productInfo.appendChild(productName);

  const productFooter = document.createElement("div");
  productFooter.className = "product-footer";

  const priceContainer = document.createElement("div");
  const priceP = document.createElement("p");
  priceP.className = "price";
  priceP.textContent = product.price;
  priceContainer.appendChild(priceP);

  const metaP = document.createElement("p");
  metaP.className = "meta";
  metaP.textContent = "In stock · Free shipping";
  priceContainer.appendChild(metaP);

  const addToCartBtn = document.createElement("button");
  addToCartBtn.className = "add-to-cart-btn";
  addToCartBtn.setAttribute("data-index", i);
  addToCartBtn.textContent = "Add to cart";

  productFooter.appendChild(priceContainer);
  productFooter.appendChild(addToCartBtn);
  productInfo.appendChild(productFooter);

  productCard.appendChild(productInfo);
  productsGrid.appendChild(productCard);
}

initStore();
