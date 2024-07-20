from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.orm import validates

from config import db

# Models go here!
class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, nullable=False, unique=True)
    first_name = db.Column(db.String, nullable=False)
    last_name = db.Column(db.String, nullable=False)

    listings = db.relationship('Listing', back_populates='user')
    comments = db.relationship('Comment', back_populates='user')

    serialize_rules = ('-comments.user', '-comments.user',)



class Listing(db.Model, SerializerMixin):
    __tablename__ = 'listings'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String, nullable=False)
    body = db.Column(db.String, nullable=False)
    players_needed = db.Column(db.Integer, db.CheckConstraint('players_needed <= 6'))
    players_have = db.Column(db.Integer, db.CheckConstraint('players_have <= 6'))
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))

    user = db.relationship('User', back_populates='listings')
    comments = db.relationship('Comment', back_populates='listing')

    serialize_rules = ('-user.listings', '-comment.listings',)

    @validates('players_needed', 'players_have')
    def validate_players_needed(self, key, players):
        if int(players) > 6:
            raise AttributeError("Players should be equal to or less than 6.")
        return int(players)


class Comment(db.Model, SerializerMixin):
    __tablename__ = 'comments'

    id = db.Column(db.Integer, primary_key=True)
    body = db.Column(db.String, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    listing_id = db.Column(db.Integer, db.ForeignKey('listings.id'))

    user = db.relationship('User', back_populates='comments')
    listing = db.relationship('Listing', back_populates='comments')

    serialize_only = ('body',)