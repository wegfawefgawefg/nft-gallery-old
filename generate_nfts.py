# use pillow to make 64 images
# each image is a 500x500 pixel image
# each image has random squares in it (1-4 random squares)
# each square is a random size (1-10)
# each square is a random color ("red", "green", "blue", "yellow", "purple", "orange")
#  after each square is drawn, the image is saved to a folder
#  the image is saved as a png
#  make a json file with the following info:
#     -date made
#     -mint cost

#     -color
#     -num squares
#     -tags {"cool", "funny", "cute", "scary"}
import os
import json
import random
from PIL import Image, ImageDraw, ImageFont
IMAGE_WIDTH = 250
IMAGE_HEIGHT = 250

def make_nft(name):

    mint_const = random.random() * 100
    # random date between 1/1/2019 and 1/1/2020
    date = random.randint(1546300800, 1577836800)
    tags = random.sample(["cool", "funny", "cute", "scary"], k=random.randint(1, 4))
    img = Image.new('RGB', (IMAGE_WIDTH, IMAGE_WIDTH), (0, 0, 0))
    draw = ImageDraw.Draw(img)
    num_squares = random.randint(1, 4)

    colors = set()
    for _ in range(num_squares):
        color = random.choice(["red", "green", "blue", "yellow", "purple", "orange"])
        if color not in colors:
            colors.add(color)
        size = random.randint(IMAGE_WIDTH // 10, IMAGE_WIDTH // 2)
        x = random.randint(0, IMAGE_WIDTH - size)
        y = random.randint(0, IMAGE_HEIGHT - size)
        draw.rectangle([x, y, x + size, y + size], fill=color)
    img.save(f"assets/{name}.png")

    with open(f"assets/{name}.json", "w") as f:
        info = {
            "name": name,
            "mint_const": mint_const,
            "date": date,
            "tags": tags,
            "num_squares": num_squares,
            "colors": list(colors)
        }
        json.dump(info, f)

if __name__ == "__main__":
    #  make asset folder if not exists
    if not os.path.exists("assets"):
        os.makedirs("assets")
    for i in range(1, 10):
        make_nft(f"nft{i}")