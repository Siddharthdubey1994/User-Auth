Fastify User Authentication API
This project provides a user authentication API built using Fastify. The API includes endpoints for user registration and login, along with middleware for authentication.

Table of Contents
    Installation
    Usage
    

Installation:
    Clone the repository:
    git clone git@github.com:Siddharthdubey1994/User-Auth.git


    Navigate to the project directory:
    cd User-Auth

    Install the dependencies:
    npm install

Usage:
    Create a .env file in the root directory and add the following environment variables:

    # JWT Secret (replace with a long random string)
    JWT_SECRET=mysecretjwtsecret 

    # Database URL (replace with your MongoDB connection string) 
    MONGODB_URL=mongodb://localhost:27017/mydatabase // Replace this with you MongoBD url

    # Server Port (optional, default is 3000)
    PORT=3000 


    Start the server:
    npm start
    The server will start on http://localhost:3000. //right now the host is hardcoded as localhost you can change that


Please refer to the swagger.yaml for endpoints info 
