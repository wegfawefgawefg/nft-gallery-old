from pprint import pprint
import datetime

from utils import get_session
from db_def import Color, Tag, NFT

'''
def load(path):
    for root, dirs, files in os.walk(path):
        for file in files:
            if file.endswith(".json"):
                with open(os.path.join(root, file)) as f:
                    data = json.load(f)
                    insert(data)
'''

def pop_nfts():
    with get_session() as session:

        colors = session.query(Color).all()
        tags = session.query(Tag).all()
        nft_data = {
            "name": "nft0",
            "mint_cost": 68.37162826514526,
            "date": datetime.datetime.now(),
            "tags": [t for t in tags if t.name in ["cool", "funny", "cute"]],
            "num_squares": 3,
            "colors": [c for c in colors if c.name in ["red", "green", "blue"]]
        }
        session.add(NFT(**nft_data))
        session.commit()

if __name__ == "__main__":
    pop_nfts()
    