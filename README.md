# Leone-Library


Start up frontend
```
/frontend
npm run dev
```

First backend startup
```
python3 -m venv .venv
source .venv/bin/activate

python -m pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

Start up backend afterwards
```
/backend
python3 manage.py runserver
```

Run storybook
```
cd frontend
npm run storybook
```

Run storybook (refreshes every change)
```
cd frontend
nvm use 25.2.1
npm run storybook
```