# Flask React boilerplate

Simple boilerplate for flask and react. react hot module replacement(HMR)

## How to start

### development

```bash
yarn install
pipenv install
python app.py

#new terminal
yarn start
```

Connect to `http://localhost:5000/`

### production

Change `development` in `backend/configs/server.yaml` to `production`

```bash
yarn build
python app.py
```

enjoy
