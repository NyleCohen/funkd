from pypresence import Presence
import argparse
import time
import json

parser = argparse.ArgumentParser();
parser.add_argument('track', type=str)
parser.add_argument('album', type=str)
parser.add_argument('genre', type=str)
parser.add_argument('url', type=str)

args = parser.parse_args()

with open('./config.json', 'r') as f:
    config = json.load(f)

clientID = config['CLIENT_ID']

RPC = Presence(clientID)  # Initialize the Presence client
RPC.connect()
start_time=time.time();
RPC.update(state=args.track, details=args.album, buttons=[{"label": "Listen to " + args.track, "url": args.url}, {"label": "Check out Funkd!", "url": "https://github.com/NyleCohen/funkd"}], start=start_time) 

while True: 
    time.sleep(15)