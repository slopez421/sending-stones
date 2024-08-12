from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.orm import validates
from sqlalchemy.ext.hybrid import hybrid_property

from config import db, bcrypt

# Models go here!
class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    serialize_rules = ('-listings.user', '-comments.user', '-likes.user', '-_password_hash',)


    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, nullable=False, unique=True)
    _password_hash = db.Column(db.String, nullable=False)
    first_name = db.Column(db.String, nullable=False)
    last_name = db.Column(db.String, nullable=False)

    listings = db.relationship('Listing', back_populates='user')
    comments = db.relationship('Comment', back_populates='user')
    likes = db.relationship('Like', back_populates='user', cascade='all, delete-orphan')

    liked_listings = association_proxy('likes', 'listing', creator=lambda listing_obj: Like(listing=listing_obj))


    @hybrid_property
    def password_hash(self):
        raise AttributeError('Password hashes may not be viewed.')

    @password_hash.setter
    def password_hash(self, password):
        password_hash = bcrypt.generate_password_hash(
            password.encode('utf-8'))
        self._password_hash = password_hash.decode('utf-8')

    def authenticate(self, password):
        return bcrypt.check_password_hash(
            self._password_hash, password.encode('utf-8'))
    
    def __repr__(self):
        return f'<User {self.username}>'


class Listing(db.Model, SerializerMixin):
    __tablename__ = 'listings'

    serialize_rules = ('-user.listings', '-comments.listing', '-likes.listing', '-liked_users.liked_listings',)

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String, nullable=False)
    body = db.Column(db.String, nullable=False)
    players_needed = db.Column(db.Integer, db.CheckConstraint('players_needed <= 6'))
    players_have = db.Column(db.Integer, db.CheckConstraint('players_have <= 6'))
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))

    
    user = db.relationship('User', back_populates='listings')
    comments = db.relationship('Comment', back_populates='listing')

    likes = db.relationship('Like', back_populates='listing', cascade='all, delete-orphan')

    liked_users = association_proxy('likes', 'user', 
                                    creator=lambda user_obj: Like(user=user_obj))
    
   

    @validates('players_needed', 'players_have')
    def validate_players_needed(self, key, players):
        if int(players) > 6:
            raise AttributeError("Players should be equal to or less than 6.")
        return int(players)
    
    def __repr__(self): return f'<Listing {self.id}: {self.title}>'


class Comment(db.Model, SerializerMixin):
    __tablename__ = 'comments'

    serialize_only = ('body', 'id','listing_id',)

    id = db.Column(db.Integer, primary_key=True)
    body = db.Column(db.String, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    listing_id = db.Column(db.Integer, db.ForeignKey('listings.id'))

    user = db.relationship('User', back_populates='comments')
    listing = db.relationship('Listing', back_populates='comments')

    
    def __repr__(self): return f'<Comment {self.id}: {self.body}>'

class Like(db.Model, SerializerMixin):
    __tablename__ = 'likes'

    serialize_only = ('heart_color', 'user_id', 'id',)
    
    id = db.Column(db.Integer, primary_key=True)
    heart_color = db.Column(db.String)

    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    listing_id = db.Column(db.Integer, db.ForeignKey('listings.id'))

    user = db.relationship('User', back_populates='likes')
    listing = db.relationship('Listing', back_populates='likes')
 

    def __repr__(self):
        return f'<Like {self.id}:  Heart Color: {self.heart_color} by {self.user.username} on Listing: {self.listing.title}>'