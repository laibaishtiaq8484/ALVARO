const products = [
    {
        id: 1,
        name: "Luna Sofa",
        category: "Sofa",
        price: 45000,
        image: "/IMG-20260820-WA0033.jpg",
        description: "A soft and comfortable sofa for relaxed evenings."
    },
    {
        id: 2,
        name: "Milo Lounge Chair",
        category: "Chair",
        price: 18500,
        image: "/images/IMG-20260820-WA0038.jpg",
        description: "A simple accent chair that adds warmth to your room."
    },
    {
        id: 3,
        name: "Oakline Dining Table",
        category: "Table",
        price: 38000,
        image: "/IMG-20260820-WA0039.jpg",
        description: "A clean wooden dining table made for everyday meals."
    },

    {
        id: 4,
        name: "Nora Bed",
        category: "Bed",
        price: 62000,
        image: "/IMG-20260820-WA0040(1).jpg",
        description: "A calm and modern bed for a comfortable bedroom."
    },

    {
        id: 5,
        name: "Arlo Coffee Table",
        category: "Table",
        price: 14500,
        image: "/IMG-20260820-WA0041.jpg",
        description: "A compact coffee table with a warm natural finish."
    },

    {
        id: 6,
        name: "Mira Accent Chair",
        category: "Chair",
        price: 21000,
        image: "/IMG-20260820-WA0042.jpg",
        description: "A cozy chair for reading, relaxing or simply sitting."
    },

    {
        id: 7,
        name: "Olive 3-Seater",
        category: "Sofa",
        price: 56000,
        image: "/IMG-20260820-WA0043.jpg",
        description: "Spacious seating with a soft and welcoming look."
    },

    {
        id: 8,
        name: "Haven Bedside Table",
        category: "Storage",
        price: 9500,
        image: "/images/IMG-20260820-WA0044.jpg",
        description: "A small bedside table for your everyday essentials."
    },

    {
        id: 9,
        name: "Cedar Wardrobe",
        category: "Storage",
        price: 48000,
        image: "/IMG-20260820-WA0045.jpg",
        description: "Practical storage with a simple wooden design."
    },

    {
        id: 10,
        name: "Elio Side Table",
        category: "Table",
        price: 11000,
        image: "/images/IMG-20260820-WA0046.jpg",
        description: "A small side table that fits beautifully beside a sofa."
    },

    {
        id: 11,
        name: "Siena Armchair",
        category: "Chair",
        price: 24000,
        image: "/IMG-20260821-WA0080.jpg",
        description: "A comfortable armchair with a timeless silhouette."
    },

    {
        id: 12,
        name: "Aster Sofa",
        category: "Sofa",
        price: 68000,
        image: "/IMG-20260820-WA0048(1).jpg",
        description: "A premium sofa designed for spacious living rooms."
    }

];
let cart = JSON.parse(
    localStorage.getItem("alvaroCart")
) || [];


/* Current selected category */

let selectedCategory = "All";


function showProducts(productList) {

    const productsGrid =
        document.getElementById("productsGrid");

    productsGrid.innerHTML = "";


    if (productList.length === 0) {

        productsGrid.innerHTML = `
            <p>No furniture found.</p>
        `;

        return;
    }


    productList.forEach(function(product) {

        const productHTML = `

            <article class="product-card">

                <div class="product-image-box">

                    <img
                        src="${product.image}"
                        alt="${product.name}"
                    >

                    <button
                        class="wishlist"
                        onclick="addToWishlist(${product.id})"
                    >
                        ♡
                    </button>

                </div>


                <div class="product-info">

                    <span class="product-category">
                        ${product.category}
                    </span>

                    <h3>
                        ${product.name}
                    </h3>

                    <p class="product-description">
                        ${product.description}
                    </p>


                    <div class="product-bottom">

                        <span class="product-price">
                            Rs. ${product.price.toLocaleString()}
                        </span>

                        <button
                            class="add-button"
                            onclick="addToCart(${product.id})"
                        >
                            Add +
                        </button>

                    </div>

                </div>

            </article>

        `;


        productsGrid.innerHTML += productHTML;

    });

}
function filterProducts(category) {

    selectedCategory = category;

    const searchText =
        document
        .getElementById("searchInput")
        .value
        .toLowerCase();


    let filteredProducts = products;


    if (category !== "All") {

        filteredProducts =
            filteredProducts.filter(function(product) {

                return product.category === category;

            });

    }
    if (searchText !== "") {

        filteredProducts =
            filteredProducts.filter(function(product) {

                return (
                    product.name
                        .toLowerCase()
                        .includes(searchText)
                    ||
                    product.category
                        .toLowerCase()
                        .includes(searchText)
                );

            });

    }


    showProducts(filteredProducts);

}
function searchProducts() {

    filterProducts(selectedCategory);

}
function addToCart(productId) {

    const product =
        products.find(function(item) {

            return item.id === productId;

        });


    const alreadyInCart =
        cart.find(function(item) {

            return item.id === productId;

        });


    if (alreadyInCart) {

        alreadyInCart.quantity += 1;

    } else {

        cart.push({

            ...product,

            quantity: 1

        });

    }


    saveCart();

    updateCartCount();

    showCart();

}
function saveCart() {

    localStorage.setItem(
        "alvaroCart",
        JSON.stringify(cart)
    );

}
function updateCartCount() {

    const totalItems =
        cart.reduce(function(total, item) {

            return total + item.quantity;

        }, 0);


    document.getElementById("cartCount")
        .textContent = totalItems;

}
function openCart() {

    document.getElementById("cartOverlay")
        .style.display = "flex";

    showCart();

}

function closeCart() {

    document.getElementById("cartOverlay")
        .style.display = "none";

}
function showCart() {

    const cartItems =
        document.getElementById("cartItems");
    cartItems.innerHTML = "";
    if (cart.length === 0) {

        cartItems.innerHTML = `
            <div class="empty-cart">
                <p>Your cart is empty.</p>
                <p>Find something beautiful for your home.</p>
            </div>
        `;

        document.getElementById("cartTotal")
            .textContent = "Rs. 0";

        return;

    }
    cart.forEach(function(item) {

        cartItems.innerHTML += `

            <div class="cart-item">

                <img
                    src="${item.image}"
                    alt="${item.name}"
                >


                <div>

                    <h4>
                        ${item.name}
                    </h4>

                    <p class="cart-price">
                        Rs. ${item.price.toLocaleString()}
                    </p>


                    <div class="quantity-control">

                        <button
                            onclick="changeQuantity(${item.id}, -1)"
                        >
                            −
                        </button>

                        <span>
                            ${item.quantity}
                        </span>

                        <button
                            onclick="changeQuantity(${item.id}, 1)"
                        >
                            +
                        </button>

                    </div>


                    <button
                        class="remove-button"
                        onclick="removeFromCart(${item.id})"
                    >
                        Remove
                    </button>

                </div>

            </div>

        `;

    });


    calculateTotal();

}
function changeQuantity(productId, change) {

    const item =
        cart.find(function(product) {

            return product.id === productId;

        });


    if (!item) {
        return;
    }


    item.quantity += change;


    if (item.quantity <= 0) {

        removeFromCart(productId);

        return;

    }


    saveCart();

    updateCartCount();

    showCart();

}
function removeFromCart(productId) {

    cart =
        cart.filter(function(item) {

            return item.id !== productId;

        });


    saveCart();

    updateCartCount();

    showCart();

}
function calculateTotal() {

    const total =
        cart.reduce(function(sum, item) {

            return sum +
                (item.price * item.quantity);

        }, 0);


    document.getElementById("cartTotal")
        .textContent =
        `Rs. ${total.toLocaleString()}`;

}

function placeOrder() {

    if (cart.length === 0) {

        alert(
            "Your cart is empty. Please add a product first."
        );

        return;
    }


    alert(
        "Thank you for your order! ALVARO will process it shortly."
    );


    cart = [];


    saveCart();

    updateCartCount();

    showCart();

}


function addToWishlist(productId) {

    const product =
        products.find(function(item) {

            return item.id === productId;

        });


    alert(
        `${product.name} added to your wishlist ❤️`
    );

}



showProducts(products);

updateCartCount();