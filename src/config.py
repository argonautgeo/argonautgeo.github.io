from pydantic_settings import BaseSettings, SettingsConfigDict


class Config(BaseSettings):
    bot_token: "7930467714:AAGnJixu-zm1bpe3MK90o4DeeALRHiTQXsM"
    pay_token: "1744374395:TEST:577bcbcc61a58ae0ad9a"
    webapp_url: "https://argonautgeo.github.io/"

    model_config = SettingsConfigDict(env_file=".env", extra="ignore")


conf = Config()
