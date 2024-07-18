from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy

from config import db

# Models go here!
class User(db.Model, SerializerMixin):
    __tablename__ = 'users'
    serialize_rules = ('-comment.user', '-comment.user',)

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, nullable=False, unique=True)
    first_name = db.Column(db.String, nullable=False)
    last_name = db.Column(db.String, nullable=False)

    listings = db.relationship('Listing', back_populates='user')
    comments = db.relationship('Comment', back_populates='user')

class Listing(db.Model, SerializerMixin):
    __tablename__ = 'listings'
    serialize_rules = ('-user.listing', '-comment.listing',)

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String, nullable=False)
    body = db.Column(db.String, nullable=False)
    players_needed = db.Column(db.Integer)
    players_have = db.Column(db.Integer)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))

    user = db.relationship('User', back_populates='listings')
    comments = db.relationship('Comment', back_populates='listing')

class Comment(db.Model, SerializerMixin):
    __tablename__ = 'comments'
    serialize_rules = ('-user.comment', '-listing.comment',)

    id = db.Column(db.Integer, primary_key=True)
    body = db.Column(db.String, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    listing_id = db.Column(db.Integer, db.ForeignKey('listings.id'))

    user = db.relationship('User', back_populates='comments')
    listing = db.relationship('Listing', back_populates='comments')