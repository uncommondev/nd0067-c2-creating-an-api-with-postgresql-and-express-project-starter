#Storefront Backend Documentation

From a high-level view, this is the documentation for the backend for the storefront written in TypeScript using a PostgresSQL backend.

##Overview

The project uses Express to provide a CRUD API for creating orders, users and products which are stored in a PostgreSQL backend. JWTs are used to provide authorisation and authentication.

#Environment Setup

A crucial file for the backend is the .env file. You will need to add your details for your particular server setup. The file contents below will have some details populated for the local PostgreSQL setup but you can adjust this if you choose to use a different setup for your DB.

`.env`

    POSTGRES_HOST = '127.0.0.1'
    
    POSTGRES_DB = 'storefront'
    
    POSTGRES_TEST_DB = 'storefront_test'
    
    POSTGRES_USER = 'store_user'
    
    POSTGRES_TEST_USER = 'test_user'
    
    POSTGRES_PASSWORD = '********'
    
    POSTGRES_TEST_PASSWORD = '********'
    
    ENV = 'dev'
    
    TOKEN_SECRET = '********'
    
    BCRYPT_PASSWORD = '********'
    
    SALT_ROUNDS = 10



You will need to add this file to the root directory of the project and add/replace the details as required (host, password, etc).



The next step is to pull in all required dependencies with this command: `npm install`

##PostgresSQL Setup



For the local backend SQL server, Docker Compose is used to provide a PostgreSQL server.



Inside the directory run: `docker-compose up`



This will start the PostgreSQL instance.



To stop it, either type `docker-compose down` or use: `ctrl+c`

You will also need a psql client to interact with the database to create the two users necessary for `dev` and `test`.

## Database Setup

You will need to connect to your PostgreSQL instance and create two users and two databases.

Create dev user: `CREATE USER store_user WITH PASSWORD 'Password123';`

Create test user: `CREATE USER test_user WITH PASSWORD '123Password';`

Create dev DB: `CREATE DATABASE storefront;`

Create test DB: `CREATE DATABASE storefront_test;`

Assign permissions for dev:
`\c storefront`
`GRANT ALL PRIVILEGES ON DATABASE storefront TO store_user;`

Assign permissions for test:
`\c storefront`
`GRANT ALL PRIVILEGES ON DATABASE storefront_test TO test_user;`

##Testing Setup

Before testing, change the `ENV` value in `env` to `test`. Once you have finished testing, revert it back to `dev`. 

Testing couldn't be easier! All you need to do is run: `npm run test`


This will clear the current DB setup, run the tests and clear the DB before finishing up.

##Database Migrations


To help make development easier, this project is configure to use database migrations (db-migrate). If you want want to work in dev run:

`db-migrate --env dev up`

To clear-down the database:

`db-migrate --env dev down`

Same applies to test to bring up:

`db-migrate --env test up`

Clear-down:

`db-migrate --env test down`

If there are any issues with the database, you can clear all migrations with this command:

`db-migrate reset`

##Export a file

You can export the current file by clicking **Export to disk** in the menu. You can choose to export the file as plain Markdown, as HTML using a Handlebars template or as a PDF.

#Project Setup

The structure of the project is straightforward with a few key files and folders to be aware of:

- `.env` - your configuration file to store all your sensitive information (make sure to add it to your `.gitignore`)

- `server.ts` - Configures Express for the project

- `database.ts` - Takes the sensitive information from `.env` and sets up the DB connection

- `/src` - Main project folder for the TypeScript files

- `/src/models` - Contains the models (functions for interacting with the DB) for orders, products and users

- `/src/handlers` - Contains the Express endpoints that call the models and provide the CRUD functionality

- `/src/tests` - Unit and integration tests for the project

- `/migrations` - Database migrations for creating and destroying the databases while testing and setting up for use

- `/dist` - Output folder for the compiled TypeScript

# Useful Commands

-`npm run test` - Runs the tests as the test user on the test database
-`npm run lint` - Formats the files and checks with ESLint and Prettier
-`npm run tsc`- Compiles the TypeScript
-`npm run start` - Starts a local server running on port 3000 for you to run queries against the endpoints

# Postman Testing

To help you further with testing, here is a link to a collection of endpoint tests that you can use with your development: [Postman Collection](https://go.postman.co/workspace/My-Workspace~964c436f-4ff5-473a-83eb-d19b0916e567/collection/17944040-1dcbb585-c58d-4c75-9efd-865d3685578e)