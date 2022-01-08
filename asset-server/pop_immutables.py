from utils import get_session
from db_def import Color, Tag, NFT

def pop_colors():
    with get_session() as session:
        colors = ["red", "green", "blue", "yellow", "purple", "orange"]
        for color in colors:
            session.add(Color(name=color))
        session.commit()

def pop_tags():
    with get_session() as session:
        tags = ["cool", "funny", "cute", "scary"]
        for tag in tags:
            session.add(Tag(name=tag))
        session.commit()

if __name__ == "__main__":
    pop_colors()
    pop_tags()