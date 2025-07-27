import requests
import hmac
import hashlib
import base64
import urllib.parse
import json
import os
import time
from dotenv import load_dotenv

def handle_sign(encoded_json: str):
    try:
        load_dotenv()
        app_secret = os.getenv("VK_APP_TOKEN")
        if not app_secret:
            raise ValueError("Empty VK_APP_TOKEN")


        decoded_bytes = base64.b64decode(encoded_json)
        launch_params = json.loads(decoded_bytes.decode('utf-8'))
        params = launch_params

        received_sign = launch_params.pop('sign', None)
        if not received_sign:
            return None


        vk_ts = int(launch_params.get('vk_ts', 0))
        now = int(time.time())
        max_age = 300
        if abs(now - vk_ts) > max_age:
            print(f"Timestamp too old or too far in future: vk_ts={vk_ts}, now={now}")
            return None


        vk_params = {k: v for k, v in launch_params.items() if k.startswith('vk_')}
        sorted_items = sorted(vk_params.items())
        param_string = '&'.join(f'{k}={v}' for k, v in sorted_items)


        digest = hmac.new(
            app_secret.encode('utf-8'),
            param_string.encode('utf-8'),
            hashlib.sha256
        ).digest()
        computed_sign = base64.urlsafe_b64encode(digest).decode('utf-8').rstrip('=')


        return params if computed_sign == received_sign else None

    except Exception as e:
        print(f"Sign validation error: {e}")
        return None