var tg = window.Telegram.WebApp;

// Расширяем на весь экран.
tg.expand();

// Настраиваем кнопку оформления заказа.
tg.MainButton.textColor = '#FFFFFF';
tg.MainButton.color = '#2cab37';

// Идентификатор выбранного товара.
let item = "";

// Цены товаров.
let prices = new Object();
prices[1] = 220;
prices[2] = 460;
prices[3] = 240;
prices[4] = 190;
prices[5] = 100;
prices[6] = 687;
prices[7] = 300;
prices[8] = 645;
prices[9] = 212;
prices[10] = 678;
prices[11] = 999;
prices[12] = 1270;

// Обработка кликов по кнопкам товаров.
for (var i = 1; i <= 12; i++) {
    let btn = document.getElementById("btn" + i.toString());
    if (!btn) continue; // Если кнопка не найдена, переходим к следующей итерации.

    // Храним идентификатор товара и цену в атрибутах data.
    btn.dataset.id = i;
    btn.dataset.price = prices[i];

    btn.addEventListener("click", function() {
        if (tg.MainButton.isVisible()) { // Корректная проверка видимости кнопки.
            tg.MainButton.hide();
        } else {
            let price = this.dataset.price; // Берём цену из атрибута data.
            tg.MainButton.setText("Перейти к оплате (" + price + " ₽)");
            item = this.dataset.id; // Сохраняем идентификатор товара.
            tg.MainButton.show();
        }
    });
}

// Отправка данных при нажатии на кнопку оформления заказа.
Telegram.WebApp.onEvent("mainButtonClicked", function() {
    tg.sendData(item); // Передаёт выбранный товар в Telegram.
});

// Добавляет информацию о пользователе в карточку.
let usercard = document.getElementById("usercard");

if (usercard && tg.initDataUnsafe && tg.initDataUnsafe.user) {
    let p = document.createElement("p");
    p.innerText = `${tg.initDataUnsafe.user.first_name}\n${tg.initDataUnsafe.user.last_name}`; // Форматируем вывод данных.
    usercard.appendChild(p);
}
