import yaml
import pathlib

BASE_DIR = pathlib.Path(__file__).parent


def get_config():
    with open(BASE_DIR / 'configs/server.yaml', 'r') as server_config_file:
        server_config = yaml.load(server_config_file, yaml.FullLoader)
        server_config_file_path = 'configs/%s.yaml' % server_config['server']
        with open(BASE_DIR / server_config_file_path) as config_file:
            config = yaml.load(config_file, yaml.FullLoader)

            return config
