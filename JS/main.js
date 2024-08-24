if (document.readyState == "loading") {
  document.addEventListener("DOMContentLoaded", ready);
} else {
  ready();
}

function ready() {
  let removebutton = document.getElementsByClassName("cart-remove");
  for (let i = 0; i < removebutton.length; i++) {
    let removebtn = removebutton[i];
    removebtn.addEventListener("click", removecartItem);
  }

  var quantityinputs = document.getElementsByClassName("cart-quantity");
  for (var i = 0; i < quantityinputs.length; i++) {
    var input = quantityinputs[i];
    input.addEventListener("change", quantityChanged);
  }

  var addproduct = document.querySelectorAll(".addtoCart");
  for (var i = 0; i < addproduct.length; i++) {
    var button = addproduct[i];
    button.addEventListener("click", addCartclicked);
  }

  let loves = document.getElementsByClassName("love");
  for (let i = 0; i < loves.length; i++) {
    let love = loves[i];
    love.addEventListener("click", function () {
      alert("you added ❤️");
    });
  }



  document
    .getElementsByClassName("btn-buy")[0]
    .addEventListener("click", buyCart);
}

function buyCart() {
  let cartContent = document.getElementsByClassName("cart-content")[0];
  if (cartContent.hasChildNodes()) {
    alert("Your order is placed");
  } else {
    alert("No product added");
  }

  while (cartContent.hasChildNodes()) {
    cartContent.removeChild(cartContent.firstChild);
  }

  updatetotal();
}

function quantityChanged(event) {
  let input = event.target;
  if (isNaN(input.value) || input.value <= 0) {
    input.value = 1;
  }
  updatetotal();
}

function removecartItem(event) {
  let removebtn = event.target;
  removebtn.parentElement.remove();
  updatetotal();
}

function addCartclicked(event) {
  let button = event.target;
  let shopdetails = button.parentElement;
  let title = shopdetails.getElementsByClassName("title")[0].innerText;
  let price = shopdetails.getElementsByClassName("price")[0].innerText;
  let productImg = shopdetails.getElementsByClassName("img")[0].src;
  addProductToCart(title, price, productImg);
  updatetotal();
}

function addProductToCart(title, price, productImg) {
  let cartItems = document.getElementsByClassName("cart-content")[0];
  let cartShopBox = document.createElement("div");
  cartShopBox.classList.add("cart-box");
  var cartItemsNames = cartItems.getElementsByClassName("cart-product-title");

  for (var i = 0; i < cartItemsNames.length; i++) {
    if (cartItemsNames[i].innerText === title) {
      alert("You have already added this product to the cart");
      return;
    }
  }

  let cartBoxContent = `
                      <img src="${productImg}" alt="" class="cart-img">
                      <div class="detail-box">
                          <div class="cart-product-title">${title}</div>
                          <div class="cart-price">${price}</div>
                          <input type="number" value="1" class="cart-quantity">
                      </div>
                      <!-- Remove cart -->
                      <i class="fa-solid fa-trash cart-remove"></i>`;

  cartShopBox.innerHTML = cartBoxContent;
  cartItems.appendChild(cartShopBox);

  cartShopBox
    .getElementsByClassName("cart-remove")[0]
    .addEventListener("click", removecartItem);
  cartShopBox
    .getElementsByClassName("cart-quantity")[0]
    .addEventListener("change", quantityChanged);
}

function updatetotal() {
  let cartcontent = document.getElementsByClassName("cart-content")[0];
  let cartboxes = document.getElementsByClassName("cart-box");
  let total = 0;
  for (let i = 0; i < cartboxes.length; i++) {
    let carbox = cartboxes[i];
    let priceElement = carbox.getElementsByClassName("cart-price")[0];
    let quantityElement = carbox.getElementsByClassName("cart-quantity")[0];
    let price = parseFloat(priceElement.innerHTML.replace("$", " "));
    let quantity = quantityElement.value;
    total += price * quantity;
  }
  total = Math.round(total * 100) / 100;
  document.getElementsByClassName("total-price")[0].innerText = "$" + total;
}
