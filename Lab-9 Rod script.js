const apiUrl = 'http://lab8-api.std-900.ist.mospolytech.ru'; // Replace with your API URL
const apiKey = 'your_api_key_here'; // Replace with your API key

async function fetchOrders() {
    const response = await fetch(`${apiUrl}/labs/api/orders?api_key=${apiKey}`);
    const orders = await response.json();
    displayOrders(orders);
}

function displayOrders(orders) {
    const orderList = document.getElementById('orderList');
    orderList.innerHTML = '';
    orders.forEach((order, index) => {
        const row = `
            <tr>
                <td>${index + 1}</td>
                <td>${new Date(order.created_at).toLocaleDateString()}</td>
                <td>${order.dish_names.join(', ')}</td>
                <td>${order.total_cost}</td>
                <td>${order.delivery_time ? order.delivery_time : 'В течение дня (с 7:00 до 23:00)'}</td>
                <td>
                    <button class="btn btn-info" onclick="viewOrder(${order.id})">Подробнее</button>
                    <button class="btn btn-warning" onclick="openEditOrder(${order.id})">Редактирование</button>
                    <button class="btn btn-danger" onclick="openDeleteOrder(${order.id})">Удаление</button>
                </td>
            </tr>
        `;
        orderList.innerHTML += row;
    });
}

async function viewOrder(orderId) {
    const response = await fetch(`${apiUrl}/labs/api/orders/${orderId}?api_key=${apiKey}`);
    const order = await response.json();
    document.getElementById('orderDetails').innerHTML = JSON.stringify(order, null, 2);
    $('#orderDetailsModal').modal('show');
}

async function openEditOrder(orderId) {
    const response = await fetch(`${apiUrl}/labs/api/orders/${orderId}?api_key=${apiKey}`);
    const order = await response.json();
    document.getElementById('editOrderId').value = order.id;
    document.getElementById('fullName').value = order.full_name;
    document.getElementById('email').value = order.email;
    document.getElementById('phone').value = order.phone;
    document.getElementById('deliveryAddress').value = order.delivery_address;
    document.getElementById('deliveryType').value = order.delivery_type;
    document.getElementById('deliveryTime').value = order.delivery_time;
    document.getElementById('comment').value = order.comment;
    $('#editOrderModal').modal('show');
}

document.getElementById('saveOrderBtn').addEventListener('click', async () => {
    const orderData = {
        full_name: document.getElementById('fullName').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        delivery_address: document.getElementById('deliveryAddress').value,
        delivery_type: document.getElementById('deliveryType').value,
        delivery_time: document.getElementById('deliveryTime').value,
        comment: document.getElementById('comment').value
    };

    const orderId = document.getElementById('editOrderId').value;
    const response = await fetch(`${apiUrl}/labs/api/orders/${orderId}?api_key=${apiKey}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams(orderData)
    });

    if (response.ok) {
        alert('Заказ успешно изменён');
        $('#editOrderModal').modal('hide');
        fetchOrders();
    } else {
        alert('Ошибка при изменении заказа');
    }
});

function openDeleteOrder(orderId) {
    document.getElementById('confirmDeleteBtn').onclick = async () => {
        const response = await fetch(`${apiUrl}/labs/api/orders/${orderId}?api_key=${apiKey}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            alert('Заказ успешно удалён');
            $('#deleteOrderModal').modal('hide');
            fetchOrders();
        } else {
            alert('Ошибка при удалении заказа');
        }
    };
    $('#deleteOrderModal').modal('show');
}

// Initialize fetching orders on page load
document.addEventListener('DOMContentLoaded', fetchOrders);