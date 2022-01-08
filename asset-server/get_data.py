from pprint import pprint
import datetime

from utils import get_session
from db_def import Color, Tag, NFT

def filter_by_color():
    with get_session() as session:
        colors = session.query(Color).filter(Color.name == "red").first()
        print(colors.nfts[0].colors[0].nfts[0].colors[0].nfts[0].colors[0].nfts[0].colors[0].nfts[0].colors[0])

if __name__ == "__main__":
    filter_by_color()
    # with get_session() as session:
    #     red = session.query(Color).filter(Color.name == "red").first()
    #     print(red.all_red())
