1. Creating a python virtual environment:

Windows:
py -3 -m venv .venv
.venv\Scripts\activate

Redhat based Linux:
python3 -m venv .venv
source .venv/bin/activate


2. Download dependencies (please do this every time before):
pip install -r requirements.txt

3. Run the server
python server.py