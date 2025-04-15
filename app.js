var tg = window.Telegram.WebApp;

// Расширяем на весь экран.
tg.expand();

// Настройки цвета основной кнопки
tg.MainButton.textColor = '#FFFFFF';
tg.MainButton.color = '#2cab37';

// Хранение выбранного товара
let item = "";

// Цены товаров
let prices = {
    '1': 220,
    '2': 460,
    '3': 240,
    '4': 190,
    '5': 100,
    '6': 687,
    '7': 800,
    '8': 135,
    '9': 550,
    '10': 736,
    '11': 999,
    '12': 1270
};

// Назначаем обработчики событий на каждую кнопку
for (let i = 1; i <= 12; i++) {
    let btn = document.getElementById("btn" + i);
    if (!btn) continue; // пропустить, если элемент не найден

    // Установим ID товара через атрибут data-id
    btn.dataset.id = i;

    btn.addEventListener("click", function() {
        let itemID = this.dataset.id;
        let price = prices[itemID];

        if (typeof price === 'undefined') return; // защитимся от ситуаций, когда цена не найдена

        if (tg.MainButton.isVisible()) {
            tg.MainButton.hide(); // скроем кнопку, если она уже открыта
        } else {
            tg.MainButton.setText("Перейти к оплате (" + price + " ₽)"); // обновление текста кнопки
            item = itemID; // сохраним выбранный товар
            tg.MainButton.show(); // покажем кнопку
        }
    });
}

// Отправка данных при нажатии основной кнопки
Telegram.WebApp.onEvent("mainButtonClicked", function() {
    if (item != "") {
        tg.sendData(item); // отправляем выбранный товар
    }
});

// Показ информации о пользователе
let usercard = document.getElementById("usercard");

if (usercard && tg.initDataUnsafe && tg.initDataUnsafe.user) {
    let p = document.createElement("p");
    p.innerHTML = ` Имя: ${tg.initDataUnsafe.user.first_name}<br /> Фамилия: ${tg.initDataUnsafe.user.last_name} `;
    usercard.appendChild(p);
}
