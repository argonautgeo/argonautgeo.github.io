var tg = window.Telegram.WebApp;

// Расширяем на весь экран.
tg.expand();

// Кнопка просмотра заказа (реализуется тг - не сайтом).
tg.MainButton.textColor = '#FFFFFF';
tg.MainButton.color = '#2cab37';

// Хранение выбранного товара.
let item = "";

//let prices = new Object();
let prices = new Object ();
    prices [1] = 220,
    prices [2] = 460,
    prices [3] = 240,
    prices [4] = 190,
    prices [5] = 100,
    prices [6] =  687,
	prices [7] = 800,
    prices [8] = 135,
	prices [9] = 550,
	prices [10] = 736,
	prices [11] = 999,
	prices [12] = 1270

let selectedItem = null;

//for (var i = 1; i <= 6; i++) {
	//let btn = document.getElementById("btn" + i.toString());
for (var i = 1; i <= 12; i++) {
	let btn = document.getElementById("btn" + i);
	if (!btn) continue; // защита от отсутствующих элементов
	//btn.btn_id = i;
	//btn.price = prices[i];
	btn.addEventListener("click", function() {
        const price = prices[this.id.replace('btn', '')]; // получаем цену текущего товара
        if (price === undefined) return; // проверка валидной цены

		if (tg.MainButton.isVisible()) {
            tg.MainButton.hide(); // скрываем кнопку, если она видима
        } else {
            tg.MainButton.setText("Перейти к оплате (" + price + " ₽)"); // устанавливаем новый текст кнопки
            selectedItem = this.id.replace('btn', ''); // запоминаем выбранный товар
            tg.MainButton.show(); // показываем главную кнопку
        }
    });
}

	//btn.addEventListener("click", function() {
		//if (tg.MainButton.isVisible) {
			//tg.MainButton.hide();
		//}
		//else {
			//tg.MainButton.setText("Перейти к оплате (" + btn.price.toString() + "₽)");
			//item = this.btn_id.toString();
			//tg.MainButton.show();
		//}
	//});
//}

// Отправка данных в тг.
Telegram.WebApp.onEvent("mainButtonClicked", function() {
    if (selectedItem !== null && prices.hasOwnProperty(selectedItem)) {
        tg.sendData(JSON.stringify({ item: selectedItem }));
    }
});

//Telegram.WebApp.onEvent("mainButtonClicked", function(){
	//tg.sendData(item);
//});

// Добавление в usercard данных из тг.
const usercard = document.getElementById("usercard");

if (tg.initDataUnsafe && tg.initDataUnsafe.user) {
    const p = document.createElement("p");
    p.innerHTML = ` Имя: ${tg.initDataUnsafe.user.first_name}<br/> Фамилия: ${tg.initDataUnsafe.user.last_name} `;
    usercard.appendChild(p);
}


//let usercard = document.getElementById("usercard");

//let p = document.createElement("p");

//p.innerText = `${tg.initDataUnsafe.user.first_name}
//${tg.initDataUnsafe.user.last_name}`;

//usercard.appendChild(p);
