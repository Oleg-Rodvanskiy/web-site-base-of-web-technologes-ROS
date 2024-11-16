document.getElementById('order-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission

    const soup = document.getElementById('soup').value;
    const main = document.getElementById('main').value;
    const salad = document.getElementById('salad').value;
    const drink = document.getElementById('drink').value;

    // Validate selections
    const notificationMessage = validateOrder(soup, main, salad, drink);

    if (notificationMessage) {
        showNotification(notificationMessage);
    } else {
        // Here you would typically send the order to the server
        alert('Заказ успешно оформлен!');
        clearForm();
    }
});

function validateOrder(soup, main, salad, drink) {
    if (!soup && !main && !salad && !drink) {
        return "Ничего не выбрано. Выберите блюда для заказа";
    }
    if (!drink && (soup || main || salad)) {
        return "Выберите напиток";
    }
    if (soup && !main && !salad) {
        return "Выберите главное блюдо/салат/стартер";
    }
    if ((salad || (salad && !soup)) && !main) {
        return "Выберите суп или главное блюдо";
    }
    if (!main && drink) {
        return "Выберите главное блюдо";
    }

    return null; // All validations passed
}

function showNotification(message) {
    const notification = document.getElementById('notification');
    const notificationMessage = document.getElementById('notification-message');
    notificationMessage.textContent = message;
    notification.classList.remove('hidden');

    document.getElementById('close-notification').addEventListener('click', function() {
        notification.classList.add('hidden');
    });
}

function clearForm() {
    document.getElementById('order-form').reset();
}