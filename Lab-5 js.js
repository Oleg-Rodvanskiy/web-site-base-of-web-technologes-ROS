const menu = {
    soup: [
        { name: "Гаспачо", kind: "veg" },
        { name: "Суп-пюре из лосося", kind: "fish" },
        { name: "Щи", kind: "meat" },
        { name: "Уха", kind: "fish" },
        { name: "Суп с фрикадельками", kind: "meat" },
        { name: "Томатный суп", kind: "veg" },
    ],
    main: [
        { name: "Рыба на гриле", kind: "fish" },
        { name: "Стейк", kind: "meat" },
        { name: "Шашлык", kind: "meat" },
        { name: "Паста с овощами", kind: "veg" },
        { name: "Салат с тунцом", kind: "fish" },
        { name: "Овощное рагу", kind: "veg" },
    ],
    salad: [
        { name: "Салат с креветками", kind: "fish" },
        { name: "Цезарь", kind: "meat" },
        { name: "Салат из свежих овощей", kind: "veg" },
        { name: "Греческий салат", kind: "veg" },
    ],
    drink: [
        { name: "Кофе", kind: "hot" },
        { name: "Чай", kind: "hot" },
        { name: "Сок", kind: "cold" },
        { name: "Газировка", kind: "cold" },
        { name: "Минеральная вода", kind: "cold" },
        { name: "Молочный коктейль", kind: "cold" },
    ],
    dessert: [
        { name: "Мороженое", kind: "small" },
        { name: "Торт", kind: "medium" },
        { name: "Пирожное", kind: "large" },
        { name: "Пудинг", kind: "medium" },
        { name: "Фруктовый салат", kind: "small" },
        { name: "Кекс", kind: "small" },
    ],
};

function displayDishes(category) {
    const dishesContainer = document.querySelector(`#${category}-section .dishes`);
    dishesContainer.innerHTML = ''; // Clear previous dishes
    menu[category].forEach(dish => {
        const dishElement = document.createElement('div');
        dishElement.textContent = dish.name;
        dishesContainer.appendChild(dishElement);
    });
}

function filterDishes(category, kind) {
    const dishesContainer = document.querySelector(`#${category}-section .dishes`);
    dishesContainer.innerHTML = ''; // Clear previous dishes
    const filteredDishes = menu[category].filter(dish => dish.kind === kind);
    filteredDishes.forEach(dish => {
        const dishElement = document.createElement('div');
        dishElement.textContent = dish.name;
        dishesContainer.appendChild(dishElement);
    });
}

document.querySelectorAll('.filters button').forEach(button => {
    button.addEventListener('click', (event) => {
        const category = event.target.closest('.filters').getAttribute('data-category');
        const kind = event.target.getAttribute('data-kind');

        // Toggle active class
        const isActive = event.target.classList.toggle('active');
        if (isActive) {
            filterDishes(category, kind);
        } else {
            displayDishes(category); // Show all dishes if filter is removed
        }
    });
});

// Initial display of dishes
for (const category in menu) {
    displayDishes(category);
}