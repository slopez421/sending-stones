#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc

# Remote library imports
from faker import Faker

# Local imports
from app import app
from models import db, User, Comment, Listing, Like
from config import bcrypt


if __name__ == '__main__':
    with app.app_context():
        print("Starting seed...")
        # Seed code goes here!
        print("Deleting records...")
        User.query.delete()
        Comment.query.delete()
        Listing.query.delete()
        Like.query.delete()

        fake = Faker()

        print("Creating users...")
        users = []
        for i in range(10):
            user = User(
            first_name = fake.first_name(),
            last_name = fake.last_name(),
            username = fake.user_name(),
            _password_hash = bcrypt.generate_password_hash('sample').decode('utf-8'),
        )
            users.append(user)

        db.session.add_all(users)
        db.session.commit()

        print("Creating listings...")
        listings = []
        for i in range(10):
            listing = Listing(
                title = fake.sentence(),
                body = fake.sentence(),
                players_needed = randint(1, 6),
                players_have = randint(1, 6),
            )
            listing.user = rc(users)
            listings.append(listing)
        db.session.add_all(listings)
        db.session.commit()

        print("Creating comments...")
        comments = []
        for i in range(10):
            comment = Comment(
                body = fake.sentence()
            )
            comment.user = rc(users)
            comment.listing = rc(listings)
            comments.append(comment)
        db.session.add_all(comments)
        db.session.commit()

        print("Creating likes...")
        likes = []
        heart_colors = ["blue", "red", "green", "yellow", "orange", "purple", "pink"]
        for i in range(10):
            like = Like(
                heart_color = rc(heart_colors)
            )
            like.user = rc(users)
            like.listing = rc(listings)
            likes.append(like)
        db.session.add_all(likes)
        db.session.commit()

        print("Complete.")
