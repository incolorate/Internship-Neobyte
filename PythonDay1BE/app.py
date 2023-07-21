from flask import Flask
import json

app = Flask(__name__)


@app.route("/", methods=["GET"])
def products():
    with open("db.json") as file:
        return json.load(file)


if __name__ == '__main__':
    app.run()
