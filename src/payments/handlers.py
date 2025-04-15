from aiogram import F, Router
from aiogram.types import (
    Message,
    LabeledPrice,
    ContentType,
    PreCheckoutQuery,
    SuccessfulPayment,
    ShippingQuery,
)

from src.config import conf
from src.payments.constants import (
    PRODUCTS_PRICES,
    VALID_CITIES,
    SHIPPING_OPTIONS,
    WRONG_PRODUCT_INFO_MSG,
    NO_DELIVERY_MSG,
    ORDER_ACCEPTED_MSG,
)

router = Router()

# Определение фиксированных продуктов
PRODUCTS_PRICES = {
    '1': {"name": "Продукт 1", "amount": 220},
    '2': {"name": "Продукт 2", "amount": 460},
    '3': {"name": "Продукт 3", "amount": 240},
    '4': {"name": "Продукт 4", "amount": 190},
    '5': {"name": "Продукт 5", "amount": 100},
    '6': {"name": "Продукт 6", "amount": 687},
    '7': {"name": "Продукт 7", "amount": 800},
    '8': {"name": "Продукт 8", "amount": 135},
    '9': {"name": "Продукт 9", "amount": 550},
    '10': {"name": "Продукт 10", "amount": 736},
    '11': {"name": "Продукт 11", "amount": 999},
    '12': {"name": "Продукт 12", "amount": 1270},
}

# Хэндлер для начала процесса покупки
@router.message(F.content_type == ContentType.WEB_APP_DATA)
async def buy_process(message: Message) -> None:
    product_id = message.web_app_data.data
    if product_id.isnumeric() and product_id in PRODUCTS_PRICES.keys():
        product = PRODUCTS_PRICES[product_id]
        price = [LabeledPrice(label=product["name"], amount=int(float(product["amount"]) * 100))]
    else:
        await message.answer(WRONG_PRODUCT_INFO_MSG)
        return

    await message.answer_invoice(
        title=f"{product['name']} ({product['amount']} руб.)",
        description=product["name"],
        provider_token=conf.pay_token,
        currency="rub",
        need_email=True,
        need_phone_number=True,
        prices=price,
        start_parameter="buy_product",
        payload="some_invoice_payload",
        is_flexible=True,
    )

# Функция проверки доставки
def check_delivery_validity(query: ShippingQuery) -> bool:
    return (
        query.shipping_address.country_code.upper() == "RU"
        and query.shipping_address.city.lower() in VALID_CITIES
    )

# Хэндлер для обработки вопросов о доставке
@router.shipping_query()
async def shipping_process(query: ShippingQuery) -> None:
    if not check_delivery_validity(query):
        await query.answer(
            ok=False,
            error_message=NO_DELIVERY_MSG.format(query.shipping_address.city),
        )
        return

    await query.answer(
        ok=True,
        shipping_options=SHIPPING_OPTIONS,
    )

# Хэндлер подтверждения платежа
@router.pre_checkout_query()
async def pre_checkout_process(query: PreCheckoutQuery) -> None:
    await query.answer(ok=True)

# Хэндлер успешной оплаты
@router.message(F.content_type == ContentType.SUCCESSFUL_PAYMENT)
async def successful_payment(message: Message) -> None:
    await message.answer(ORDER_ACCEPTED_MSG)
