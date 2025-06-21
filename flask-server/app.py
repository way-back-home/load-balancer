import os
from flask import Flask, request
from datetime import datetime

app = Flask(__name__)

# Get project root directory (two levels up from app.py)
BASE_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))

# Combined logs folder in project root
COMBINED_LOG_DIR = os.path.join(BASE_DIR, "logs")
COMBINED_LOG_FILE = os.path.join(COMBINED_LOG_DIR, "requests.log")

# Local Flask log (inside flask-server/)
LOCAL_LOG_FILE = os.path.join(COMBINED_LOG_DIR,"flask_request.log")

os.makedirs(COMBINED_LOG_DIR, exist_ok=True)

@app.before_request
def log_request():
    log_line = f"{datetime.now()} - [Flask] {request.method} {request.path} from {request.remote_addr}\n"

    # Write to combined log
    with open(COMBINED_LOG_FILE, "a") as f:
        f.write(log_line)

    # Write to local Flask log
    with open(LOCAL_LOG_FILE, "a") as f:
        f.write(log_line)

@app.route('/api/hello')
def index():
    return "Hello from Flask!"

if __name__ == "__main__":
    app.run(host="0.0.0.0", debug=True)
