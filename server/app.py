#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request, make_response, jsonify
from flask_restful import Resource


# Local imports
from config import app, db, api
# Add your model imports
from models import User, Comment, Listing

# Views go here!

@app.route('/')
def index():
    return '<h1>Project Server</h1>'

class ListingIndex(Resource):
    def get(self):
        listing_dict_list = [listing.to_dict() for listing in Listing.query.all()]
        response = make_response(listing_dict_list, 200)
        return response
    
    def post(self):

        title = request.get_json()['title']
        body = request.get_json()['body']
        players_needed = request.get_json()['players_needed']
        players_have = request.get_json()['players_have']

        new_listing = Listing(title=title, body=body, players_have=players_have, players_needed=players_needed)

        try:
            db.session.add(new_listing)
            db.session.commit()
    
            return new_listing.to_dict(), 201
        
        except:
            return {'error': 'Failed to create new listing'}, 422
        
api.add_resource(ListingIndex, '/listingindex')




if __name__ == '__main__':
    app.run(port=5555, debug=True)

