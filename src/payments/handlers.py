from aiogram import F, Router
from aiogram.types import (
    Message,
    LabeledPrice,
    ContentType,
    PreCheckoutQuery,
    ShippingQuery,
)

from src.config import conf
from src.db.dependencies import db
from src.payments import constants as constants

router = Router()

# Хэндлер обработки начала покупки
@router.message(F.content_type == ContentType.WEB_APP_DATA)
async def buy_process(msg: Message) -> None:
    prod_id = msg.web_app_data.data
    if prod_id.isnumeric():
        prod = await db.get_product(int(prod_id))
        if prod:
            # Конвертируем цену в копейки (целые числа)
            price_amount = int(float(prod["amount"]) * 100)
            price = [LabeledPrice(label=prod["name"], amount=price_amount)]
        else:
            await msg.answer(constants.WRONG_PRODUCT_INFO_MSG)
            return
    else:
        await msg.answer(constants.WRONG_PRODUCT_INFO_MSG)
        return

    await msg.answer_invoice(
        title="Оплата заказа",
        description=price[0].label,
        provider_token=conf.pay_token,
        currency="rub",
        need_email=True,
        need_phone_number=True,
        prices=price,
        start_parameter="example",
        payload="some_invoice",
        is_flexible=True,
    )

# Проверяет правильность адреса доставки
def check_validity(query: ShippingQuery) -> bool:
    city = query.shipping_address.city.strip().lower()
    valid_cities = set(map(str.lower, constants.VALID_CITIES))
    return (
        query.shipping_address.country_code == "RU"
        and city in valid_cities
    )

# Хэндлер обработки вопроса о доставке
@router.shipping_query()
async def shipping_process(query: ShippingQuery) -> None:
    if not check_validity(query):
        await query.answer(
            ok=False,
            error_message=constants.NO_DELIVERY_MSG.format(query.shipping_address.city),
        )
        return

    await query.answer(
        ok=True,
        shipping_options=constants.SHIPPING_OPTIONS,
    )

# Хэндлер подтверждения оплаты
@router.pre_checkout_query()
async def pre_checkout_process(pre_checkout: PreCheckoutQuery) -> None:
    await pre_checkout.answer(ok=True)

# Хэндлер успешной оплаты
@router.message(F.content_type == ContentType.SUCCESSFUL_PAYMENT)
async def successful_payment(msg: Message) -> None:
    await msg.answer(constants.ORDER_ACCEPTED_MSG)
