from flask import Flask, render_template, request, json
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__, static_url_path='/static')
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:root@localhost/distances'
db = SQLAlchemy(app)

class Locations(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    locations = db.Column(db.String(100))
    travel_time = db.Column(db.String(100))
    distance = db.Column(db.String(100))

    def __init__(self, locations, travel_time, distance):
        self.locations = locations
        self.travel_time = travel_time
        self.distance = distance

    # def __repr__(self):
    #     return '<Locations {}>'.format(locations)


@app.route('/')
def index():
    return render_template('home.html')

@app.route('/about')
def about():
    return render_template('about.html')


@app.route('/insert', methods=['POST'])
def insert():
    locations = request.form['locations']
    distance = request.form['distance']
    duration = request.form['duration']

    print('locations', locations)
    print('distance', distance)
    print('duration', duration)

    locations = Locations.query.all()
    if len(locations) >= 10:
        db.session.delete(Locations.query.first())

    locations = Locations(request.form['locations'], request.form['duration'], request.form['distance'])
    db.session.add(locations)
    db.session.commit()

    return json.dumps(True)

@app.route('/retrieve_places', methods=['GET'])
def retrieve_places():
    result = []
    locations = Locations.query.all()
    for row in locations:
        location = {}
        location['locations'] = row.locations
        location['distance'] = row.distance
        location['travel_time'] = row.travel_time
        result.append(location)

    # print('locations',locations)
    return json.dumps(result)



















if __name__ == '__main__':    
    app.run(debug=True)