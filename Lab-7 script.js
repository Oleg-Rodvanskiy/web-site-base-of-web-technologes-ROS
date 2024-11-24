async function loadDishes() {
    const apiUrl = "http://lab7-api.std-900.ist.mospolytech.ru/api/dishes"; // URL for the API

    try {
        const response = await fetch(apiUrl);

        // Check if the response is successful
        if (!response.ok) {
            throw new Error('Network response was not ok: ' + response.statusText);
        }

        const dishes = await response.json(); // Parse JSON data
        displayDishes(dishes); // Call function to display dishes
    } catch (error) {
        console.error('Failed to load dishes:', error);
        alert('Ошибка загрузки блюд. Пожалуйста, попробуйте позже.'); // Alert user on error
    }
}

function displayDishes(dishes) {
    const lunchOptionsContainer = document.querySelector('.lunch-options');
    lunchOptionsContainer.innerHTML = ''; // Clear existing dishes

    // Loop through the dishes and create HTML elements
    dishes.forEach(dish => {
        const dishElement = document.createElement('div');
        dishElement.classList.add('lunch-option');
        dishElement.innerHTML = `
            <div class="dish">
                <img src="${dish.image}" alt="${dish.name}" />
                <p>${dish.name}</p>
                <p class="dessert">Цена: ${dish.price} руб.</p>
                <p class="dessert">Вес: ${dish.count}</p>
            </div>
        `;
        lunchOptionsContainer.appendChild(dishElement); // Append the dish element to the container
    });
}

// Call the loadDishes function to load dishes on page load
document.addEventListener('DOMContentLoaded', loadDishes);