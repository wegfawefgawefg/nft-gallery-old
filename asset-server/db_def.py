from pprint import pprint

import sqlalchemy as sa
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm.session import Session

from settings import DB_SETTINGS

Base = declarative_base()

'''lookup to json shit for rendering theobjs on frontend'''

def create_tables():
    print("Creating tables...")
    engine = sa.create_engine('mysql+pymysql://{user}:{password}@{host}:{port}/{default_db}'.format(**DB_SETTINGS))
    connection = engine.connect()
    Base.metadata.create_all(connection) #Creates the table
    r = connection.execute("SHOW TABLES").fetchall()
    d = [dict(i) for i in r]
    pprint(d)

nft_colors_table = sa.Table('nft_colors', Base.metadata,
    sa.Column('nft_id', sa.Integer, sa.ForeignKey('nft.id')),
    sa.Column('color_id', sa.Integer, sa.ForeignKey('color.id')))

nft_tags_table = sa.Table('nft_tags', Base.metadata,
    sa.Column('nft_id', sa.Integer, sa.ForeignKey('nft.id')),
    sa.Column('tag_id', sa.Integer, sa.ForeignKey('tag.id')))
    
class Color(Base):
    __tablename__ = 'color'
    id = sa.Column(sa.Integer, primary_key=True)
    name = sa.Column(sa.String(255), nullable=False, unique=True)

    def __repr__(self):
        return f"<Color(name={self.name})>"

    def all_red(self):
        '''with current session fetch all nfts that are red'''
        session = Session.object_session(self)
        colors = session.query(Color).filter(Color.name == "red").first()
        return colors.nfts

class Tag(Base):
    __tablename__ = 'tag'
    id = sa.Column(sa.Integer, primary_key=True)
    name = sa.Column(sa.String(255), nullable=False, unique=True)

    def __repr__(self):
        return f"<Tag(name={self.name})>"

class NFT(Base):
    __tablename__ = 'nft'
    id = sa.Column(sa.Integer, primary_key=True)
    name = sa.Column(sa.String(255))
    date = sa.Column(sa.DateTime)
    mint_cost = sa.Column(sa.Integer)
    num_squares = sa.Column(sa.Integer)
    colors = sa.orm.relationship('Color', secondary=nft_colors_table, backref='nfts')
    tags = sa.orm.relationship('Tag', secondary=nft_tags_table, backref='nfts')

    def __repr__(self):
        return f"<NFT(name={self.name}, mint_cost={self.mint_cost}, date={self.date}, num_squares={self.num_squares})>"

    def to_json(self):
        return {
            "id": self.id,
            "name": self.name,
            "date": self.date,
            "mint_cost": self.mint_cost,
            "num_squares": self.num_squares,
            "colors": [c.name for c in self.colors],
            "tags": [t.name for t in self.tags]
        }

if __name__ == "__main__":
    create_tables()