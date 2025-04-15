var tg = window.Telegram.WebApp;

// Расширяем на весь экран.
tg.expand();

// Настраиваем стиль главной кнопки.
tg.MainButton.textColor = '#FFFFFF';
tg.MainButton.color = '#2cab37';

// Массив цен товаров
let prices = {
    '1': 220,
    '2': 460,
    '3': 240,
    '4': 190,
    '5': 100,
    '6': 687,
    '7': 300,
    '8': 645,
    '9': 212,
    '10': 678,
    '11': 999,
    '12': 1270
};

// Сохраняем выбранный товар
let item = '';

// По очереди обрабатываем все кнопки
for (let i = 1; i <= 12; i++) {
    let btn = document.getElementById('btn' + i);
    if (!btn) continue; // если кнопка не найдена, продолжаем дальше

    // Атрибут data-id хранит идентификатор товара
    btn.dataset.id = i;

    // Привязываем обработчик клика
    btn.addEventListener('click', function() {
        let itemID = this.dataset.id;
        let price = prices[itemID];

        if (typeof price === 'undefined') return; // если цена не определена, ничего не делаем

        if (tg.MainButton.isVisible()) {
            tg.MainButton.hide(); // скрываем кнопку, если она уже видна
        } else {
            tg.MainButton.setText(`Перейти к оплате (${price} ₽)`); // ставим цену товара
            item = itemID; // сохраняем выбранный товар
            tg.MainButton.show(); // показываем кнопку
        }
    });
}

// Реакция на клик по главной кнопке
Telegram.WebApp.onEvent('mainButtonClicked', function() {
    if (item !== '') {
        tg.sendData(item); // отправляем выбранный товар
    }
});

// Информация о пользователе (только если есть initDataUnsafe)
let usercard = document.getElementById('usercard');

if (usercard && tg.initDataUnsafe && tg.initDataUnsafe.user) {
    let p = document.createElement('p');
    p.innerHTML = ` Имя: ${tg.initDataUnsafe.user.first_name}<br /> Фамилия: ${tg.initDataUnsafe.user.last_name} `;
    usercard.appendChild(p);
}
