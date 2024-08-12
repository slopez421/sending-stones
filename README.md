
# The Tavern

As an avid fan of TTRPG games, one of the most common and frustrating issues I find myself encountering is actually being able to play with other people. There are many online communities available to discuss games or play test new editions, but there is a struggle felt among all players in actually putting together a table to play. With apps like Discord and Zoom, there are certainly tools out there capable of hosting an online TTRPG party/server, but not as many tools dedicated to *finding* players for those servers. 

The Tavern seeks to provide that solution.

## Frontend

Created with a React frontend and a Flask-API backend, The Tavern has a navigation bar with three client-side routes leading to the user’s *Account* page, the *Homepage*, and *My Posts*, a page where users can track all the posts they have created. 

Before the user can see any of this, they are first greeted with a Login form that takes in a username and password and checks for a match in the database. If there is a match, the user is then logged in and their user id from the database is assigned to their session cookie, a special cookie imported by Flask. These form fields are validated by Yup to ensure the fields cannot be left empty. If there is no match for username and password, the server sends a message that is displayed on the login form to the user, informing them there has been an error and either the username or password is incorrect. If the user is new, they may also click the ‘Don’t have an account?’ button that will replace the Login form with a Signup form instead. These fields are also validated through Yup and ensure the user cannot sign up with a username that already exists in the database. Once a user signs up successfully, they are logged in automatically and are then redirected to the homepage with the navbar at the very top.

On the far right side of the navbar, there is a logout button that will send a fetch() delete request to the database to set the user’s session[‘user_id’] cookie to None, which will effectively log out the user.

Most of the activity lives on the Homepage of The Tavern.

### Homepage

Here, users will see the Adventuring Board, a welcome message, and an index of all posts submitted by all users. 

The Adventuring Board is a form with four input fields where users must supply a title for their post, a description of their campaign so other users have an understanding of what environment they will be playing in, how many players are currently in the campaign, and how many more players they are seeking to join their campaign. This form is validated on the front end using the yup library and controlled through the Formik library’s {useFormik} hook. The yup library ensures the form cannot be submitted without a value in each input, with the first two being strings and the bottom two being integers. Each submission sends a fetch “post” request to the database and returns a response; if that response is successful, then state is updated to ‘refresh’ the page and display the new set of posts, with the most recent appearing in the top row. 

The welcome message introduces users to the app with a playful blurb and a statistical count of the current “Adventures” (posts) in the database. 

Below the welcome message are the “adventures waiting”. Every post submitted appears in this section and is rendered with a ListingCard to display the information supplied by the form. Users can comment on each post and see posts left by other users. Comments live in a collapsible box to reduce space taking up screen design. 
The text input for a comment is also controlled through Formik and validated with Yup to ensure no empty strings are submitted. Similar to the Adventuring Board form, a comment submission sends a fetch() “POST” request to the database, and if the response is successful, a re-render is triggered by updating state to refresh the page. 

### MyPosts

This route displays the user’s own posts and associated comments. The user’s own posts are held in state that updates with every new post.

### My Account

This route displays the user’s account details on a red card, specifically the user’s name and username. If the user wishes to update their details, they can click the “Edit Account” button and a form will replace the card content. This form is validated through Yup to ensure the fields can be submitted while empty. If the user wishes to update their username, they cannot choose one that is currently assigned to another user. If they try, an error message will display, preventing them from doing so. All usernames must be unique. 

## Backend

### Config

The config file instantiates most of the imports and configurations to avoid circular import issues from occurring later on.

We instantiate the app with Flask and set attributes to turn off modification tracking. 
We instantiate our database with SQLAlchemy.

Flask-RESTful's Api is initialized with our application instance and populates with resources later in App.py. These resources inherit from the Resource class. 

We add these resources to our Api instance with add_resource(). Each resource uses the defined HTTP verb instance methods (such as def get(), def post(), def delete(), def update(), etc.) to determine which routes to create at the URL provided. 


### Models

In the models folder, we have our three database models, User, Comment, and Listing. For reference, Listing refers to a Post on the client side.

All three classes inherit from db.Model and SQLAlchemy’s extension SerializerMixin, which allows for set rules on serialization so the models do not run into infinite recursion depth while serializing our objects. 

Because the app will set up user authentication and password protection, bcrypt has been imported for use. 

### User

The User model has a corresponding table named ‘users’ and five attributes assigned to the Column type: id (the primary key), username, _password_hash, first_name, and last_name. 

Database constraints are put on the columns so null values are not saved and the username is unique, which ensures two identical usernames cannot exist at the same time. 

A hashed version of the user’s password is saved to the database instead of the password itself for security purposes. When a new user is created, the @password_hash.setter function takes in the password and bcrypt both salts and hashes the password before saving the hashed password.

When a user logs in, their password is run through the authenticate method, which takes in the password and runs it through Bcrypt along with the salt. If there is a match, the user is logged in. 

### Listing

The Listing model has a corresponding table named ‘listings’ and six attributes assigned to the Column type: id (the primary key), title, body, players_needed, players_have, and the user_id (the foreign key relating to which user id this listing belongs to.)

Database constraints are placed on the integer-based columns, players_have and players_need. 

Either of these attributes must be less than or equal to 6; else, there is an AttributeError raised. This is done with the knowledge in mind that most TTRPG tables rarely have more than six players seated. However, it is still possible and in those rare cases, the exception is allowed that a Listing can have x amount of players and seek x more. 

### Comment

The Comment model has a corresponding table named ‘comments’ and four attributes assigned to the Column type: id (the primary key), body, user_id (the foreign key relating to which user id this comment belongs to), and listing_id (the foreign key relating to which listing id this comment belongs to). 

The body attribute sets nullable to False, meaning null values cannot be stored. The body attribute is also the only attribute a user inputs. 

### Like

The Like model is an association model that takes in one user-submittable attribute, the color of the heart, and has two foreign keys/relationships to User and Listing.

### App.py

After importing our models,app, db, api, Resource, request, and session, we set up our views in App.py. All views in this file inherit from the aforementioned Resource class so we can set up routes at the bottom of the file. 

CheckSession only allows a get() request and is used to check if the current session has a ‘user_id’ cookie assigned to the session. If there is not one, an error message is returned instead with a 401 unauthorized code. If there is a ‘user_id’, the database queries a search through the User table for a User whose id matches the session[‘user_id’] value. Once a match is found, the user’s row is returned serialized with the to_dict() method and a 200 success code. 

ListingIndex
The get() method returns a query that joins the Listing table with the User table. All listings are returned in an array as serialized objects. The reason this is done with a join table instead of simply returning a query of Listings is to connect the User_id to Listing.user_id so our query can also return the listing’s associated username, which lives in the User table. 

The post() method takes in the values provided by request.get_json(), the form values provided from the client side, and attempts to create a new Listing object. If it is successful, the new listing is added to the database and returned as an object with the to_dict() method and the 201 created status code. If it is unsuccessful, an error message is returned instead with the 422 code (unsuccessful request due to invalid data.) 

ListingsById only accepts a get() request as well. The user_id is pulled from the current ‘user_id’ stored in the session. The database returns an array of listings whose user_id matches the user_id of the current logged-in user. This is what is displayed on the MyPosts page on the client side. 

Signup only accepts a post() request since it is designed to create a new user. Signup looks for the values provided by request.get_json() and attempts to create a new User object. Here, it is taking the password provided and assigning it to the password_hash, beginning the process of hashing and salting the password *first* before it is saved. The original password is never saved in this process. 

If the fields were filled out correctly and the constraints/validations pass, then the user is added to the database and automatically logged in. By assigning the new user’s id to session[‘user_id’], the user is auto-logged in. If the database fails to add the user for any reason, an error message is returned instead with the 422 code (unsuccessful request due to invalid data). 

Login also only accepts a post() request. After receiving a username and password from the request, the database searches for a User whose username matches the username provided. If there is a match, the password is then run through the user.authenticate() method. If there is a match here too, and only if there is a password match, then the user’s id is assigned to the session and the user is auto-logged in. The User object is then returned serialized with the to_dict() method and a 200 success code. If there is no match (either with the username or with the password), an error message is returned with a 401 unauthorized code. 

Logout only accepts a delete() request and assigns a value of None to the session[‘user_id’], which in turn will log the user out due to CheckSession being called again. An empty object is then returned with a 204 successfully processed code. 
204 is used instead of 200 because there is no context to return, whereas 200 would usually imply a successful request with additional content supplied (such as retrieving information and returning that information). 

Comments accepts a post() request that takes in a body value, the user_id, and the listing_id which is provided by the client-side form. The user only has to supply the body (or the “comment” itself). If a new Comment object is successfully created, then that instance is saved/mapped to the database table and returned serialized with a 201 successful post code. If it is not successfully created, then it is not saved to the database and instead, an error message is returned with a 422 code (unsuccessful request due to invalid data). 

Likes accepts a post() request that takes in the heart color provided by the user's selection, the user_id passed in from the User currently logged into a session, and the listing_id that is obtained from the Listing this Like exists on. A successful like is returned and state is updated on the React side to display this like. 
Likes also accepts a delete() request that takes in the id of the current Like and deletes it from the database. State is then called again on the React side to delete the heart_color and display the heart options for the user. 

At the bottom of the file, there are resources added for each relevant path. 
add_resource() takes in two arguments: the Resource itself (the class name) and the URL path that the client side will be fetching to. 

### Seed.py

The seed file provides randomized Users, Listings and Comments. The faker library is imported for use here as well as bcrypt to ensure the password hash is working for our seed data as well.

### Credits

Client side: 
[Tailwind CSS](https://tailwindcss.com/docs/installation)
[daisyUI](https://daisyui.com/docs/install/)
