from aiogram.types import LabeledPrice, ShippingOption

ORDER_ACCEPTED_MSG = (
    """Заказ принят в обработку. \nОжидайте звонка от нас. \n\nВаш GEOSHOP🖤"""
)
WRONG_PRODUCT_INFO_MSG = """Неправильный формат информации о товаре 😒"""
NO_DELIVERY_MSG = """Доставка в город {} не осуществляется 😒"""
VALID_CITIES = {
    "нижний новгород",
    "иркутск",
    "санкт-петербург",
    "сочи",
    "москва",
    "зима",
    "братск",
    "владивосток",
}
SHIPPING_PRICES = {
    "regular": [LabeledPrice(label="Обычная доставка", amount=0 * 100)],
    "fast": [LabeledPrice(label="Быстрая доставка", amount=100 * 100)],
}
SHIPPING_OPTIONS = [
    ShippingOption(
        id="regular", title="Обычная (1-2 дня)", prices=SHIPPING_PRICES["regular"]
    ),
    ShippingOption(id="fast", title="Быстрая (12 ч)", prices=SHIPPING_PRICES["fast"]),
]
