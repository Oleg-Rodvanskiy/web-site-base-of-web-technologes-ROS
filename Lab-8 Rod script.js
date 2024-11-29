const apiUrl = "http://lab8-api.std-900.ist.mospolytech.ru"; // Replace with the appropriate URL based on your setup
const apiKey = "YOUR_API_KEY"; // Replace with your actual API key

// Function to load dishes from API
async function loadDishes() {
    const response = await fetch(`${apiUrl}/labs/api/dishes?api_key=${apiKey}`);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    const dishes = await response.json();
    displayDishes(dishes);
}

// Function to display dishes
function displayDishes(dishes) {
    const lunchOptionsContainer = document.querySelector('.lunch-options');
    lunchOptionsContainer.innerHTML = '';

    dishes.forEach(dish => {
        const dishElement = document.createElement('div');
        dishElement.classList.add('lunch-option');
        dishElement.innerHTML = `
            <div class="dish">
                <img src="${dish.image}" alt="${dish.name}" />
                <p>${dish.name}</p>
                <p class="dessert">Цена: ${dish.price} руб.</p>
                <p class="dessert">Вес: ${dish.count}</p>
                <button onclick="addDishToOrder('${dish.keyword}')">Добавить</button>
            </div>
        `;
        lunchOptionsContainer.appendChild(dishElement);
    });
}

// Function to add a dish to the order
function addDishToOrder(dishId) {
    let order = JSON.parse(localStorage.getItem('order')) || [];
    if (!order.includes(dishId)) {
        order.push(dishId);
        localStorage.setItem('order', JSON.stringify(order));
        updateOrderPanel();
    }
}

// Function to update order panel
function updateOrderPanel() {
    const order = JSON.parse(localStorage.getItem('order')) || [];
    const orderCount = order.length;
    const orderTotal = orderCount * 195; // Assume a fixed price for simplicity
    document.querySelector('.order-panel').innerHTML = `
        <p>Текущая стоимость: ${orderTotal} руб.</p>
        <a href="order.html">Перейти к оформлению</a>
    `;
}

// Load dishes on page load
document.addEventListener('DOMContentLoaded', loadDishes);