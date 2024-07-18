#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc

# Remote library imports
from faker import Faker

# Local imports
from app import app
from models import db, User, Comment, Listing

fake = Faker()

def make_users():
    print("Creating users...")
    users = []
    for i in range(10):
        user = User(
          first_name = fake.first_name(),
          last_name = fake.last_name(),
          username = fake.user_name()
        )
        users.append(user)

    db.session.add_all(users)
    db.session.commit()

def make_listings():
    print("Creating listings...")
    listings = []
    for i in range(10):
        listing = Listing(
            title = fake.sentence(),
            body = fake.sentences(),
            players_needed = randint(1, 6),
            players_have = randint(1, 6),
            user_id = randint(1, len(User.query.all()))
        )

        listings.append(listing)
    db.session.add_all(listings)
    db.session.commit()

def make_comments():
    print("Creating comments...")
    comments = []
    for i in range(10):
        comment = Comment(
            body = fake.sentence(),
            user_id = randint(1, len(User.query.all())),
            listing_id = randint(1, len(User.query.all()))
        )
        comments.append(comment)
    db.session.add_all(comments)
    db.session.commit



if __name__ == '__main__':
    with app.app_context():
        print("Starting seed...")
        # Seed code goes here!
        print("Deleting records...")
        make_users()
        make_listings()
        make_comments()
        print("Complete.")
