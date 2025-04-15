import asyncio
import logging
import sys

from aiogram import Bot, Dispatcher
from aiogram.fsm.storage.memory import MemoryStorage

from src.config import conf
from src.payments.handlers import router as payment_router
from src.users.handlers import router as user_router


# Конфигурация логирования
logging.basicConfig(level=logging.INFO, stream=sys.stdout)

# Инициализация роутеров
routers = [user_router, payment_router]

# Создаем экземпляр диспетчера и регистрируем роутеры
dp = Dispatcher(storage=MemoryStorage())
dp.include_routers(*routers)

# Создаем экземпляр бота
bot = Bot(token=conf.bot_token, parse_mode="HTML")

async def main():
    async with bot:
        await dp.start_polling(bot)

if __name__ == "__main__":
    try:
        # Запуск главного цикла программы
        asyncio.run(main())
    except (KeyboardInterrupt, SystemExit):
        logging.info("Bot stopped")
