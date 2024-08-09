#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request, make_response, jsonify, session
from flask_restful import Resource
# Local imports
from config import app, db, api
# Add your model imports
from models import User, Comment, Listing, Like
# Views go here!
 
class CheckSession(Resource):
    def get(self):
        if session.get('user_id'):
            user = db.session.query(User).filter(User.id == session['user_id']).first()
            return user.to_dict(), 200
        return {'error': 'Unauthorized. Not Logged In'}, 401

class ListingIndex(Resource):
    def get(self):
        listings = db.session.query(Listing).join(User).filter(Listing.user_id == User.id).all()
        return [list.to_dict() for list in listings], 200
    
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

class ListingsById(Resource):
    def get(self):
        user_id = session.get('user_id')
        listings = Listing.query.filter(Listing.user_id == user_id).all()
        return [list.to_dict() for list in listings], 200

class UpdateUser(Resource):
    def patch(self):
        user_id = session.get('user_id')
        user = User.query.filter(User.id == user_id).first()
        first_name = request.get_json()['first_name']
        last_name = request.get_json()['last_name']
        username = request.get_json()['username']
        user.first_name = first_name
        user.last_name = last_name
        user.username = username

        try:
            db.session.add(user)
            db.session.commit()

            return user.to_dict(), 201
        except:
            return {'error': 'Username taken. Please choose another.'}

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
        session['user_id'] = None
        return {}, 204

class Signup(Resource):
    def post(self):
        first_name = request.get_json()['first_name']
        last_name = request.get_json()['last_name']
        username = request.get_json()['username']
        password = request.get_json()['password']
        user = User(first_name=first_name, last_name=last_name, username=username)
        user.password_hash = password
    
        try:
            db.session.add(user)
            db.session.commit()
            session['user_id'] = user.id
            return user.to_dict(), 201
        except:
            return {'error': 'Failed to sign up.'}, 422

class Comments(Resource):
    def get(self):
        comments = Comment.query.all()
        return [comment.to_dict() for comment in comments], 200
    
    def post(self):
        body = request.get_json()['body']
        user_id = request.get_json()['user_id']
        listing_id = request.get_json()['listing_id']

        comment = Comment(body=body, user_id=user_id, listing_id=listing_id)

        try:
            db.session.add(comment)
            db.session.commit()
            return comment.to_dict(), 201
        
        except:
            return {'error': 'Failed to post comment.'}, 422

class Likes(Resource):
    def get(self):
        likes = db.session.query(Like).all()
        return [like.to_dict() for like in likes], 200
    
    def post(self):
        heart_color = request.get_json()['heart_color']
        user_id = request.get_json()['user_id']
        listing_id = request.get_json()['listing_id']

        like = Like(heart_color=heart_color, user_id=user_id, listing_id=listing_id)
        try:
            db.session.add(like)
            db.session.commit()

            return like.to_dict(), 201
        except:
            return {'error': 'Failed to like post.'}, 422
    
    def delete(self): 
        matched_like_id = request.get_json()['id']
        like = Like.query.filter(Like.id == matched_like_id).first()
        db.session.delete(like)
        db.session.commit()
        return {}, 204




        
api.add_resource(ListingIndex, '/listingindex')
api.add_resource(CheckSession, '/check_session')
api.add_resource(Login, '/login')
api.add_resource(Logout, '/logout')
api.add_resource(Signup, '/signup')
api.add_resource(Comments, '/comments')
api.add_resource(ListingsById, '/mylistings')
api.add_resource(UpdateUser, '/updateuser')
api.add_resource(Likes, '/likes')




if __name__ == '__main__':
    app.run(port=5555, debug=True)

