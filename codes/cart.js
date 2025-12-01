
// Load cart from localStorage (or start empty)
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// ADD TO CART
function addToCart(name, price, img) {
	//restricts access
       if(localStorage.getItem("userLoggedIn") !== "true"){
        alert("Please login before adding items to cart.");
        window.location.href="Login.html";
        return;
	   }

    let item = cart.find(p => p.name === name);

    if(item){
        item.qty++;
    } else {
        cart.push({ name, price, img, qty: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Item added to cart!");
}



// CHANGE QTY
function changeQty(index, amount){
    cart[index].qty += amount;

    if(cart[index].qty <= 0){
        cart.splice(index,1);
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    displayCartUI();
}



// REMOVE ITEM
function removeItem(index){
    cart.splice(index,1);
    localStorage.setItem("cart", JSON.stringify(cart));
    displayCartUI();
}



// DISPLAY CART UI
function displayCartUI(){
    let container = document.getElementById("cart-container");
    container.innerHTML = "";

    let subtotal = 0;
    let taxRate = 0.15;
    let discountRate = 0;  // default NO discount

// Count total quantity of all items
let totalItems = 0;
cart.forEach(item => totalItems += item.qty);

// APPLY DISCOUNT ONLY IF 3+ ITEMS ARE IN CART
if(totalItems >= 3){
    discountRate = 0.10; // 10% OFF
}


    cart.forEach((item,index)=>{
        subtotal += item.price * item.qty;

        container.innerHTML += `
        <div class="cart-card">
            <img src="${item.img}" class="cart-img">

            <div class="cart-info">
                <h3>${item.name}</h3>
                <p>$${item.price} each</p>

                <div class="qty-box">
                    <button onclick="changeQty(${index},-1)" class="qty-btn"> < </button>
                    <span>${item.qty}</span>
                    <button onclick="changeQty(${index},1)" class="qty-btn"> > </button>
                </div>

                <p class="subtotal">Subtotal: $${item.qty * item.price}</p>
            </div>

            <button onclick="removeItem(${index})" class="remove-btn">
                <span class="material-icons">delete</span>
            </button>
        </div>`;
    });

    // TAX + DISCOUNT CALCULATION FIXED 🔥
    let discountAmount = subtotal * discountRate;
    let taxedAmount = subtotal * taxRate;
    let grandTotal = subtotal - discountAmount + taxedAmount;

    // Update UI
    document.getElementById("cart-subtotal").innerText = subtotal.toFixed(2);
    document.getElementById("cart-discount").innerText = discountAmount.toFixed(2);
    document.getElementById("cart-tax").innerText = taxedAmount.toFixed(2);
    document.getElementById("cart-total").innerText = grandTotal.toFixed(2);
	
}
	
	function loadCheckout(){
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let subtotal = 0;

    cart.forEach(item => {
        subtotal += item.price * item.qty;
    });

    let tax = subtotal * 0.15;
    let discount = (totalItems >= 3) ? subtotal * 0.10 : 0;  // 10% only if 3+
    let finalTotal = subtotal + tax - discount;

    // SEND VALUE TO CHECKOUT SCREEN
    document.getElementById("summary-total").innerText = finalTotal.toFixed(2);

}