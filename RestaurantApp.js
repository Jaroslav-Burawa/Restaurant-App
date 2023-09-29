import {menuArray} from "./Data.js"

const items = document.getElementById("items");
const order = document.getElementById("order");
const modalForm = document.getElementById("modal-form-hidden");
const paymentCardForm = document.getElementById("payment-card-form");

function displayMenu() {
    menuArray.map(function(item) {
        items.innerHTML += 
        `<div class="item-container">
            <div>
                <img class="item-picture" src="${item.picture}">
            </div>
            <div class="item-info">
                <p class="item-name">${item.name}<p>
                <p class="item-description">${item.ingredients.join(", ")}</p>
                <p class="item-price">${item.price} €</p>
            </div>
            <div class="add-item">
            <svg class="add-button" id="${item.id}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50">
                <circle cx="25" cy="25" r="24.25" stroke="#DEDEDE" stroke-width="1.5"/>
                <text x="50%" y="50%" text-anchor="middle" dominant-baseline="middle" fill="#000">
                        +
                </text>
            </svg>
            </div>
        </div>`
    })
}
displayMenu();

// EVENT LISTENERS FOR ADD BUTTONS
const pizza = document.getElementById("0");
pizza.addEventListener("click", function() {
    orderArray.push(menuArray[0])
    getOrderFromArray();
    displayOrder();
})
const hamburger = document.getElementById("1");
hamburger.addEventListener("click", function() {
        orderArray.push(menuArray[1])
        getOrderFromArray();
        displayOrder();
    })
    const beer = document.getElementById("2");
    beer.addEventListener("click", function() {
        orderArray.push(menuArray[2])
        getOrderFromArray();
        displayOrder();
    })
    
// ARRAY FOR STORING THE CURRENT ORDER
const orderArray = [];

function getOrderFromArray() {
    const listOfItems = orderArray.map(function(item, index) {
        return `<li id="item-${index}">${item.name} 
                <button id="remove-${index}" class="remove-button">remove</button>
                <text class="price">${item.price} €</text></li>`;
    })
    return listOfItems
}

document.addEventListener("click", function(e) {
    
    if (e.target.id.startsWith("remove-")) {
        // Extract the index from the id
        const index = parseInt(e.target.id.split("-")[1], 10);
        // More about split method in Notion
        
        orderArray.splice(index, 1);
        
        // Update the display
        getOrderFromArray();
        displayOrder();
    }
});


function getPrice() {
    const priceOfOrder = orderArray.reduce(function(total, currentItem) {
        return total + currentItem.price;
    }, 0)
    return priceOfOrder;
}

function displayOrder() {
    order.innerHTML = 
    `<div id="order-box">
        <p id="your-order">Your Order</p>
        <div id="ordered-items">
            <!-- Here comes the added items -->
            <ul id="order-list">
            ${getOrderFromArray().join("")}
            </ul>
        </div>
        <hr>
        <div id="total-price-box">
            <p id="total-price">Total Price: </p>
            <p id="current-price">${getPrice()} €</p>
        </div>
        <button id="purchase-button">Complete Order</button>
     </div>
     `
}
// EVENT LISTENER FOR PURCHASE BUTTON. THIS BUTTON IS DYNAMICALLY GENERATED WITH INNERHTML.
// THIS MEANS TECHNICALLY ITS A STRING AND IT CANNOT BE TARGETED NORMALLY WITH GIVEN ID.
// SO EVENT DELEGATION IS USED THERE TO TARGET IT...
order.addEventListener("click", function(e) {
    if (e.target.id === "purchase-button") {
        modalForm.style.display = "block";
    }
});

paymentCardForm.addEventListener("submit", function(e) {
    e.preventDefault();
    const formData = new FormData(paymentCardForm);
    const userName = formData.get("user-name");

    modalForm.style.display = "none";
    order.style.display = "none";

    const thx = document.getElementById("thx-message");
    thx.innerHTML = `<h2 id="thx-title">Thanks ${userName}, your order is on its way!</h2>`;

})