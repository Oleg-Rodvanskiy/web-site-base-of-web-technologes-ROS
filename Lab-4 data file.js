// dishes.js
const dishes = [
    { keyword: "gazpacho", name: "Гаспачо", price: 300, category: "soup", count: "500ml", image: "soups/gazpacho.jpg" },
    { keyword: "borscht", name: "Борщ", price: 250, category: "soup", count: "400ml", image: "soups/borcht.jpg" },
    { keyword: "steak", name: "Стейк", price: 1200, category: "main", count: "250g", image: "mains/steak.jpg" },
    { keyword: "pasta", name: "Паста", price: 700, category: "main", count: "300g", image: "mains/pasta.jpg" },
    { keyword: "coke", name: "Кока-Кола", price: 150, category: "drink", count: "330ml", image: "drinks/coke.jpg" },
    { keyword: "juice", name: "Сок", price: 200, category: "drink", count: "300ml", image: "drinks/juice.jpg" }
];

// Sort dishes by name in each category
dishes.sort((a, b) => a.name.localeCompare(b.name));