## Backend Setup

1. Naviage to the backend directory
    ```bash
    cd ./backend
    ```

2. Create a python virtual environment:
Windows:
    ```bash
    py -3 -m venv .venv
    .venv\Scripts\activate
    ```
Redhat based Linux:
    ```bash
    python3 -m venv .venv
    source .venv/bin/activate
    ```

3. Install dependencies:
    ```bash
    pip install -r requirements.txt
    ```

4. Run the server
    ```bash
    python server.py
    ```
