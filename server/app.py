#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request, make_response, jsonify, session
from flask_restful import Resource
# Local imports
from config import app, db, api
# Add your model imports
from models import User, Comment, Listing
# Views go here!

@app.route('/')
def index():
    return '<h1>Project Server</h1>'

    
class CheckSession(Resource):
    def get(self):
        if session.get('user_id'):
            user = db.session.query(User).filter(User.id == session['user_id']).first()
            return user.to_dict(), 200
        return {'error': 'Unauthorized. Not Logged In'}, 401

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
        user_id = request.get_json()['user_id']

        new_listing = Listing(title=title, body=body, players_have=players_have, players_needed=players_needed, user_id=user_id)

        try:
            db.session.add(new_listing)
            db.session.commit()
    
            return new_listing.to_dict(), 201
        
        except:
            return {'error': 'Failed to create new listing'}, 422

class Login(Resource): 
    def post(self):
        username = request.get_json()['username']
        password = request.get_json()['password']
        user = User.query.filter(User.username == username).first()

        if (user) and (user.authenticate(password)):
            session['user_id'] = user.id
            return user.to_dict(), 200
        
        return {'error': 'Invalid username or password.'}, 401

class Logout(Resource):
    def delete(self):
        pass
        
api.add_resource(ListingIndex, '/listingindex')
api.add_resource(CheckSession, '/check_session')
api.add_resource(Login, '/login')




if __name__ == '__main__':
    app.run(port=5555, debug=True)

