from aiogram.types import ReplyKeyboardMarkup, KeyboardButton
from aiogram.types.web_app_info import WebAppInfo

from src.config import conf

main_kb = [
    [KeyboardButton(text="Сделать заказ", web_app=WebAppInfo(url="https://argonautgeo.github.io/"))]
]

reply_main_kb = ReplyKeyboardMarkup(
    keyboard=main_kb,
    
    resize_keyboard=True,
    input_field_placeholder="Выберите пункт меню",
)
