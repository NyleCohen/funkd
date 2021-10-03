from pypresence import Presence
import argparse
import time
import json

parser = argparse.ArgumentParser();

parser.add_argument('track', type=str)
parser.add_argument('album', type=str)
parser.add_argument('genre', type=str)
parser.add_argument('url', type=str)
parser.add_argument('image', type=str)

args = parser.parse_args()

with open('../config.json', 'r') as f:
    config = json.load(f)

clientID = config['DISCORD_CLIENT_ID']

RPC = Presence(clientID)  # Initialize the Presence client
RPC.connect()
start_time=time.time();
RPC.update(details=args.track, state=args.album, buttons=[{"label": "Listen to " + args.track, "url": args.url}, {"label": "Check out Funkd!", "url": "https://github.com/NyleCohen/funkd"}], large_image=args.image, start=start_time) 
# RPC.update(details="test", state="test", buttons=[{"label": "Listen to " + "something", "url": "https://github.com/NyleCohen/funkd"}, {"label": "Check out Funkd!", "url": "https://github.com/NyleCohen/funkd"}], large_image="mmfood", start=start_time) 

while True: 
    time.sleep(15)