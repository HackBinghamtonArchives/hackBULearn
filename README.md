# HackBU Learn Platform

HackBU Learn is an online platform for managing, serving, and tracking educational content for the HackBU community. This project contains the source code for the HackBU Learn API, the React-based frontend application, and the application's creative assets.

## Getting Started

To get started, you must first install Node and MongoDB Server. Once installed, use the following steps to get a local version of the application running on your machine.

### 1. Database

Create a Mongo database called "hackBULearn" (case-sensitive). Inside, create 4 collections (all lowercase):

- courses
- hackathons
- users
- videos

These collections can be left empty upon creation. Once you have configured your Mongo database, run `mongod` in Terminal to start the server. Ensure that the server is using port 27017. Please note: if you plan to run the existing unit tests on the application, create an identical database named 'hackBULearn_test'.

### 2. Get the code

Clone this project onto your local machine and complete the following steps within the project directory.

### 3. Frontend Application

Next, begin the continuous frontend build system. Open another shell and run the command `npm run build`. This may take a while to complete the initial build. Please note: this is a _continuous_ build system, so the command will remain in a waiting state after starting up. You do not have to quit or restart this command when code changes are made.

### 4. Backend Application

Finally, run the API server by running `npm start`. This will serve the application at http://localhost:3000. If code changes are made to the backend application, this command needs to be restarted.

## Routes

This application has both traditional and RESTful API routes. The following table describes the routing scheme:

| Route           | Method                 | Description                                    |
|-----------------|------------------------|------------------------------------------------|
| /               | GET                    | Unimplemented                                  |
| /login          | GET                    | Login/Registration page                        |
| /dashboard      | GET                    | Dashboard page                                 |
| /api/courses    | GET, POST, PUT, DELETE | API. CRUD routes for courses                   |
| /api/hackathons | GET, POST, PUT, DELETE | API. CRUD routes for hackathons                |
| /api/session    | POST, DELETE           | API. CD routes for session                     |
| /api/users      | GET, POST, PUT, DELETE | API. CRUD routes for users (Restricted)        |
| /api/users/me   | GET, POST, PUT, DELETE | API. CRUD routes for current user (Restricted) |
| /api/videos     | GET, POST, PUT, DELETE | API. CRUD routes for videos                    |
