var tg = window.Telegram.WebApp;

// Расширяем окно приложения на полный экран
tg.expand();

// Настраиваем основную кнопку
tg.MainButton.textColor = '#FFFFFF';
tg.MainButton.color = '#2cab37';

// Массив для хранения соответствия id товара цене
let prices = {};
prices['1'] = 220;
prices['2'] = 460;
prices['3'] = 240;
prices['4'] = 190;
prices['5'] = 100;
prices['6'] = 687;
prices['7'] = 800;
prices['8'] = 135;
prices['9'] = 550;
prices['10'] = 736;
prices['11'] = 999;
prices['12'] = 1270;

// Сохраняем выбранный товар
let currentItem = '';

// Обходим все кнопки
for (let i = 1; i <= 12; i++) {
    let btn = document.getElementById('btn' + i);
    if (!btn) continue; // пропускаем, если элемент отсутствует

    // Присваиваем атрибут data-id для хранения номера товара
    btn.dataset.id = i;

    // добавляем обработчик события клика
    btn.addEventListener('click', function(event) {
        event.preventDefault();
        let itemID = this.dataset.id;
        let price = prices[itemID];

        if (typeof price === 'undefined') return; // проверяем наличие цены

        if (tg.MainButton.isVisible()) {
            tg.MainButton.hide(); // прячем кнопку, если она уже видна
        } else {
            tg.MainButton.setText(`Перейти к оплате (${price} ₽)`); // обновляем текст кнопки
            currentItem = itemID; // сохраняем выбранный товар
            tg.MainButton.show(); // показываем кнопку
        }
    });
}

// Обрабатываем событие нажатия на главную кнопку
Telegram.WebApp.onEvent('mainButtonClicked', function() {
    if (currentItem !== '') {
        tg.sendData(currentItem); // отправляем выбранный товар
    }
});

// Блок с информацией о пользователе
let usercard = document.getElementById('usercard');

if (usercard && tg.initDataUnsafe && tg.initDataUnsafe.user) {
    let p = document.createElement('p');
    p.innerHTML = ` Имя: ${tg.initDataUnsafe.user.first_name}<br /> Фамилия: ${tg.initDataUnsafe.user.last_name} `;
    usercard.appendChild(p);
}
