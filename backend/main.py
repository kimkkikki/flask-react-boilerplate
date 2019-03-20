from flask import Flask, render_template
from flask_webpack import Webpack
from backend.settings import get_config


app = Flask(__name__, static_folder='../static')
config = get_config()

app.config.update({
    'WEBPACK_MANIFEST_PATH': config['manifestFile'],
    'DEBUG': config['debug'],
    })
webpack = Webpack()
webpack.init_app(app)


@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def index(path):
    return render_template('index.jinja2')
