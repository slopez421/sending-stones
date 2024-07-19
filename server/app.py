#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request, make_response
from flask_restful import Resource

# Local imports
from config import app, db, api
# Add your model imports
from models import User, Comment, Listing

# Views go here!

@app.route('/')
def index():
    return '<h1>Project Server</h1>'

class Listings(Resource):
    def get(self):
        listing_dict_list = [listing.to_dict() for listing in Listing.query.all()]
        response = make_response(listing_dict_list, 200)
        return response

api.add_resource(Listings, '/listings')




if __name__ == '__main__':
    app.run(port=5555, debug=True)

