// script.js
document.addEventListener("DOMContentLoaded", () => {
    const menuContainer = document.getElementById("menu");
    const orderContainer = {
        soup: document.getElementById("soupOrder"),
        main: document.getElementById("mainDishOrder"),
        drink: document.getElementById("drinkOrder")
    };
    const totalPriceElement = document.getElementById("totalPrice");

    // Function to display dishes
    function displayDishes() {
        dishes.forEach(dish => {
            const dishCard = document.createElement("div");
            dishCard.className = "dish";
            dishCard.setAttribute("data-dish", dish.keyword);
            dishCard.innerHTML = `
                <img src="${dish.image}" alt="${dish.name}">
                <h3>${dish.name}</h3>
                <p>Цена: ${dish.price} руб.</p>
                <p>Вес/Объем: ${dish.count}</p>
            `;
            dishCard.addEventListener("click", () => selectDish(dish));
            menuContainer.appendChild(dishCard);
        });
    }

    // Function to handle dish selection
    function selectDish(dish) {
        const category = dish.category;
        const orderText = `${dish.name} (${dish.price} руб.)`;
        let currentOrder = orderContainer[category].querySelector('.dishName');

        // Update order display
        currentOrder.textContent = orderText;

        // Update total price
        updateTotalPrice();
    }

    // Function to update the total price
    function updateTotalPrice() {
        let total = 0;
        for (const key in orderContainer) {
            const dishName = orderContainer[key].querySelector('.dishName').textContent;
            if (dishName !== "Ничего не выбрано") {
                const price = parseInt(dishName.match(/\((\d+) руб.\)/)[1]);
                total += price;
            }
        }
        totalPriceElement.textContent = total > 0 ? total : "0";
    }

    // Initialize the display of dishes
    displayDishes();
});