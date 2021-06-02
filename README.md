# luxoft-node-assignment


# Project Setup

npm install

# Run

npm start

# Test

npm test

# Task Details

1) Set up MariaDB in your local machine is done.

2) Set up npm , Node.js in your local machine is done

3) Created a users table in MariaDB with following fields:
    a) id (autoincrement)
    b) name
    c) email
    d) password
    e) role

    Above fields added dynamically by creating the user register api as folllows:

    http://localhost:3000/users/register - POST Method

4) Created REST API's with following end points

    a) Created a api for fetch users details as follows:

        http://localhost:3000/users - GET Method

       Created a api for user details sorted by username

        http://localhost:3000/users/username/{username} - GET Method


      Created a test function to fetch user details with specific id in file location "/tests/integration/routes.users.test.js

    b) Completed a api for fetching user details with specific id as follows:

        http://localhost:3000/users/userid/{id} - GET Method

        Completed API Documentaion for the above api by using swagger with the following url:

         http://localhost:3000/api-docs


    c) Completed login api with email and password as follows:

        http://localhost:3000/users/login

        For above api, implemented to show proper messages when email and password does not matches.