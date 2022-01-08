import sqlalchemy as sa
from sqlalchemy.orm import sessionmaker

from settings import DB_SETTINGS

def get_session():
    db = sa.create_engine('mysql+pymysql://{user}:{password}@{host}:{port}/{default_db}'.format(**DB_SETTINGS))
    return sessionmaker(bind=db)()