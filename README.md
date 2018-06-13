# Distance Calulator App

This application can calculate the distance and duration between two locations

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

What things you need to install
```
pip
PostgreSQL
```

### Installing

A step by step series of examples that tell you how to get a development running

```
git clone https://github.com/uriel621/distance-app.git
```

In the directory open the terminal and follow the commandments
```
pip install flask
```

Make sure to change the app.config['SQLALCHEMY_DATABASE_URI'] (line 5) in app.py to the password you have in PostgreSQL and the correct address
```
pip install flask-SQLAlchemy
```

```
pip install psycopg2
```

```
python
    >>>from app import db
    >>>db.create_all() 
```

```
python app.py
```

After running the application it should look like this http://uriel621.pythonanywhere.com/

## Deployment
* [Python Anywhere](https:pythonanywhere.com/)
This deployment is for PythonAnywhere server

1. Make sure you have signed up for a free PythonAnywhere account and you’re logged in.
2. Go to the Web menu item and then press the Add new web app button. 
3. Click Next, then click on Flask and click on the latest version of Python that you see there and then click Next again to accept the project path.
4. In the Code section of the Web menu page click on Go to Directory next to Source Code.
5. Delete the flask_app.py file.
6. In your local computer rename your main Python file to flask_app.py. PythonAnywhere will be looking for such a file name.  
7. Use the Upload a file button to upload your own flask_app.py Python file.
8. If you have html, css and other project files, you can create a templates and a static directory in the Directories section and upload your files there.
9. Go to the Web menu page and click on the Reload button.

## Built With

* [Google Maps API](https://cloud.google.com/maps-platform/) - Distance Calculations
* [Flask](http://flask.pocoo.org/) - The web framework used
* [Bootstrap](http://getbootstrap.com/) - The css framework used

## Authors

* **Ever Uriel Garcia** - *Initial work* - [github.com/uriel621](https://github.com/uriel621)

