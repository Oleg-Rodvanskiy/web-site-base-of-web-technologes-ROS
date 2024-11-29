async function loadOrderItems() {
    const order = JSON.parse(localStorage.getItem('order')) || [];
    if (order.length === 0) {
        document.getElementById('no-selection').classList.remove('hidden');
        return;
    }

    const orderItemsContainer = document.getElementById('order-items');
    for (const dishId of order) {
        const response = await fetch(`${apiUrl}/labs/api/dishes/${dishId}?api_key=${apiKey}`);
        const dish = await response.json();
        const itemElement = document.createElement('div');
        itemElement.innerHTML = `
            <p>${dish.name} - ${dish.price} руб. <button onclick="removeFromOrder('${dishId}')">Удалить</button></p>
        `;
        orderItemsContainer.appendChild(itemElement);
    }
}

// Function to remove item from order
function removeFromOrder(dishId) {
    let order = JSON.parse(localStorage.getItem('order')) || [];
    order = order.filter(id => id !== dishId);
    localStorage.setItem('order', JSON.stringify(order));
    location.reload(); // Reload to update order items
}

// Function to handle order submission
document.getElementById('checkout-form').addEventListener('submit', async function(event) {
    event.preventDefault();
    const order = JSON.parse(localStorage.getItem('order')) || [];
    
    if (order.length === 0) {
        alert('Ничего не выбрано для оформления заказа.');
        return;
    }

    const formData = new FormData(this);
    const orderData = {
        full_name: formData.get('full_name'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        delivery_address: formData.get('delivery_address'),
        delivery_type: formData.get('delivery_type'),
        delivery_time: formData.get('delivery_time'),
        soup_id: order[0], // Assuming first item is soup
        main_course_id: order[1] || null, // Assuming second item is main course
        salad_id: order[2] || null, // Assuming third item is salad
        drink_id: order[3] || null, // Assuming fourth item is drink
    };

    try {
        const response = await fetch(`${apiUrl}/labs/api/orders?api_key=${apiKey}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams(orderData),
        });

        if (!response.ok) {
            throw new Error('Ошибка оформления заказа');
        }

        alert('Заказ успешно оформлен!');
        localStorage.removeItem('order'); // Clear order from localStorage
        window.location.href = 'index.html'; // Redirect to main page
    } catch (error) {
        alert(error.message);
    }
});

// Load order items on page load
document.addEventListener('DOMContentLoaded', loadOrderItems);