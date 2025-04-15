from pydantic_settings import BaseSettings

class Config(BaseSettings):
    bot_token: str
    pay_token: str
    webapp_url: str

    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"

conf = Config()
