
document.addEventListener("DOMContentLoaded", () => {
    loadCartItems();
});

// Function to load cart items from localStorage
function loadCartItems() {
    const cart = JSON.parse(localStorage.getItem("cart"));
    if (cart) {
        displayCart(cart);
    }
}

// Function to display cart items
function displayCart(cart) {
    const cartElement = document.getElementById("cart");
    cartElement.innerHTML = "";

    let totalPrice = 0;

    cart.forEach(item => {
        const productElement = document.createElement("div");
        productElement.classList.add("product");

        productElement.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <h2>${item.name}</h2>
            <p>$${item.price}</p>
            <button class="remove-from-cart" data-index="${item.index}">Remove</button>
        `;

        cartElement.appendChild(productElement);

        totalPrice += item.price;
    });

    document.getElementById("total").textContent = `$${totalPrice.toFixed(2)}`;
}

// Function to remove item from cart
function removeFromCart(event) {
    const index = event.target.dataset.index;
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    loadCartItems();
}

// Add event listener to document for handling clicks on "Remove" buttons
document.addEventListener("click", event => {
    if (event.target.classList.contains("remove-from-cart")) {
        removeFromCart(event);
    }
});

// Add event listener to document for handling clicks on "Add to Cart" buttons
document.addEventListener("click", event => {
    if (event.target.classList.contains("add-to-cart")) {
        addToCart(event.target.parentElement);
    }
});

// Function to add item to cart
function addToCart(productElement) {
    const name = productElement.querySelector("h2").textContent;
    const price = parseFloat(productElement.querySelector("p").textContent.replace("$", ""));
    const image = productElement.querySelector("img").src;

    const item = { name, price, image };

    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push(item);
    localStorage.setItem("cart", JSON.stringify(cart));

    loadCartItems();
}
