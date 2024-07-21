# league-checker
Hello, this is simple react+django test of playing around with APIs

### How to run
1. Open terminal
2. ```git clone https://github.com/shacobox538/league-checker.git```
3. ```cd league-checker```


Now, you have to install backend and frontend simultaneously so for frontend:
1. ```cd frontend```
2. Install npm ```sudo apt install npm```
3. ```npm install```
4. ```npm start```

For backend now:
1. ```cd league-checker```
2. ```python3 -m venv <name_of_your_venv>``` this creates virtual environment
3. Now you have to activate it so for win: ```<name_of_your_venv>\Scripts\activate``` and for mac or linux: ```source <name_of_your_venv>/bin/activate```
4. ```pip install -r req.txt``` this installs required dependencies into your virtual environment

Now, you can simply open 2 terminals to run both of them:
#### For first terminal: ```cd league-tracker``` > verify that you are in your virtual environment (if not, actiivate it from point 3. above) > python3 manage.py runserver
      This starts django backend
#### For second terminal: ```cd league-tracker\frontend``` => ```npm start```
      This should open the main page for you


## Also you need to provide .env file which contains API_KEY given from riot and SECRET_KEY provided by django
