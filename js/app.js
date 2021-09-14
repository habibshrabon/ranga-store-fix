// Load products function
const loadProducts = () => {
  // API call
  const url = `https://fakestoreapi.com/products`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => showProducts(data));
};
loadProducts();

// show all product in UI
const showProducts = (products) => {
  const allProducts = products.map((pd) => pd);
  for (const product of allProducts) {
    const image = product.image; //Fix this images to image
    const div = document.createElement("div");
    div.classList.add("product");
    div.innerHTML = `<div class="single-product">
      <div class="product-thumb">
        <img class="product-image mb-2" src=${image}></img>
      </div>
        <h4>${product.title.slice(0, 20)}</h4>
        <p>Category: ${product.category}</p>
        <p>
          <i class="fas fa-star icon-bg"></i>
          <i class="fas fa-star icon-bg"></i>
          <i class="fas fa-star icon-bg"></i>
          <i class="fas fa-star icon-bg"></i>
          <i class="far fa-star icon-bg"></i> 
          (${product.rating.rate}) 
        </p>
        <p><span class="rating-style">Reviews:</span> ${
          product.rating.count
        }</p>
        <h2>Price: $ ${product.price}</h2>
          <button onclick="addToCart(${product.id},${
      product.price
    })" id="addToCart-btn" class="buy-now btn btn-black bg-black text-white">add to cart</button>
          <button id="details-btn" class="btn btn-danger">Details</button>
      </div>
      `;
    document.getElementById("all-products").appendChild(div);
  }
};
let count = 0;
const addToCart = (id, price) => {
  count = count + 1;
  updatePrice("price", price);
  updateTaxAndCharge();
  updateTotal();
  document.getElementById("total-Products").innerText = count;
};
//  get input value function
const getInputValue = (id) => {
  const element = document.getElementById(id).innerText;
  const converted = parseFloat(element);
  return converted;
};

// main price update function
const updatePrice = (id, value) => {
  const convertedOldPrice = getInputValue(id);
  const convertPrice = parseFloat(value);
  const total = convertedOldPrice + convertPrice;
  document.getElementById(id).innerText = total.toFixed(2); // (2) decimal set
};

// set innerText function
const setInnerText = (id, value) => {
  document.getElementById(id).innerText = value;
};

// update delivery charge and total Tax
const updateTaxAndCharge = () => {
  const priceConverted = getInputValue("price");
  if (priceConverted > 200) {
    setInnerText("delivery-charge", 30);
    setInnerText("total-tax", parseFloat(priceConverted * 0.2).toFixed(2)); // (2) decimal set
  }
  if (priceConverted > 400) {
    setInnerText("delivery-charge", 50);
    setInnerText("total-tax", parseFloat(priceConverted * 0.3).toFixed(2)); // (2) decimal set
  }
  if (priceConverted > 500) {
    setInnerText("delivery-charge", 60);
    setInnerText("total-tax", parseFloat(priceConverted * 0.4).toFixed(2)); // (2) decimal set
  }
};

//grandTotal update function
const updateTotal = () => {
  const grandTotal =
    getInputValue("price") +
    getInputValue("delivery-charge") +
    getInputValue("total-tax");
  document.getElementById("total").innerText = grandTotal.toFixed(2); // (2) decimal set
};
