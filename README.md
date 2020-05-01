# Gamer Grade  

This is a website that allows users to rate games and see the cumlitive rating of those games on the website. It access the IGDB API for video game information. From that the user can search for a game and give a rating of that game. They can see the list of games that have been reviewed, and can add more games from the API if they want. The list of games shows the average score given to them across all reviews on the website. If the user wants, they can change their rating or delte it entirely.

## What it includes

* Local Auth (email and Password)
* Passport amd passport-local
* Sessions for saving user info and displaying flash messages
* Settings for PostgreSQL and Sequelize
* Hashed passwords
* EJS templating and EJS layouts
* Sequelize User model
* Materialize styling - with nav and footer
* Axios for calling API

## Included Models

**User Model**

| Column | Type | Notes |
| --------- | ---------- | -----------------------------|
| id | Integer | Serial Primary Key |
| firstName | String | Required Length > 1 |
| lastName | String | - |
| email | String | Unique Login |
| password | String | Hash |
| birthday | Date | - |
| admin | Boolean | Defaulted to False |
| pic | String | - |
| bio | Text | - |
| createdAt | Date | Automatically added to Sequelize |
| updatedAt | Date | Automatically added to Sequelize |

**Game Model**

| Column | Type | Notes |
| --------- | ---------- | -----------------------------|
| id | Integer | Serial Primary Key |
| name | String | Taken from API |
| summary | Text | Taken from API |
| cover | String | Cover art for game |
| release | String | Release Date as String|

**Rating Model**

| Column | Type | Notes |
| --------- | ---------- | -----------------------------|
| id | Integer | Serial Primary Key |
| rating | Integer | Score given to game |
| userId | Integer | Id of user who gave rating |
| gameId | Integer | Id of game being rated |

## Included Routes

**Routes in index.js (main)**

| Method | Path | Purpose |
| ------ | -------------- | -------------------- |
| GET | `/` | Home Page |
| GET | `*` | Catch for all 404s |
| GET | `/about` | About Page | 

**Routes in controllers/auth.js**

| Method | Path | Purpose |
| ------ | -------------- | -------------------- |
| GET | `/auth/login` | Login Form Page |
| POST | `/auth/login` | Process Login Form Data |
| GET | `/auth/signup` | Signup Form Page |
| POST | `/auth/signup` | Process Singup Form Data |
| GET | `/auth/logout` | Remove User From Session |

**Routes in controllers/profile.js**
| Method | Path | Purpose |
| ------ | -------------- | -------------------- |
| GET | `/profile/user` | User Profile Page |
| GET | `/profile/admin` | Admin Dashboard Page |
| GET | `/profile/guest/:id` | View other user dashboard |
| GET | `/reviews'` | View your game that have been rated |
| GET | `/create/:id` | Get page to rate a game |
| GET | `/edit/:id` | Get page to edit your rating  |
| POST | `/create/:id` | Post route for rating a game|
| PUT | `/edit/:id` | Change your rating of a game |
| DELETE | `/edit/:id` | Delete your rating of a game |


**Routes in controllers/games.js**
| Method | Path | Purpose |
| ------ | -------------- | -------------------- |
| GET | `/search` | Open search page to look for game via API |
| POST | `/search` | Route to search API for game |
| POST | `/choose` | Get data from API on chosen game|
| POST | `/newGame` | Post API data to game model |
| GET | `/all` | List of all reviewed games |
| GET | `/list` | List of games that can be reviewed |
| GET | `/:id` | Info on chosen game stored in Model |

## Directions For Use

### 1. Create account on website ###
Create an account on the website. Certain fields must be filled in.

### 2. Search for a game to rate ###
Search for a game by going to the games list and then rate a game. Then Search for a game.

### 2b Add game to model ###
If you can't find a game you want on the list displayed, search for a game via the search button on the bottom of the list of reviewed games. Once you've found a game add it to the model.

### 3. Create review ###
After finding a game click on the game title. Then click the Rate This Game button

### 4. After game has been rated you can see what games you have rated ###
