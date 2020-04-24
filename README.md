# Node Auth Boilerplate 

This is a boilerplate for an express app with local user authentication. It exists so I have a customized boilerplate so I can use this to start my projects. 

## What it includes

* Local Auth (email and Password)
* Passport amd passport-local
* Sessions for saving user info and displaying flash messages
* Settings for PostgreSQL and Sequelize
* Hashed passwords
* EJS templating and EJS layouts
* Sequelize User model
* Materialize styling - with nav and footer

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

## Included Routes

**Routes in index.js (main)**

| Method | Path | Purpose |
| ------ | -------------- | -------------------- |
| GET | `/` | Home Page |
| GET | `*` | Catch for all 404s | 

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

## Directions For Use

### 1. Clone the repository, but with different name ####

```sh
git clone <repo_link> <new_name>
```
**For Example**

```sh
git clone git@github.com/spazevic/Auth_Boiler.git shiny-new-project
```
### 2. Install modules from package.json ###

```sh
npm i
```
### 3. Customize for new project ###

Remove the defaulty stuff. For example:

* Title in `layout.ejs`
* Logo field in the nav bar
* Description and Repository fields in package.json
* Remove this boilerplate's readme content
* Switch Favicon (Logo in tab)

### 4. Create a new database for the new project ###

```sh
createdb <new_db_name>
```

### 5. Alter Sequelize Config File ###

In `config/config.json`, update the database name to the one created in step 4. Check other settings, username, password, and dialect.

### 6. Check user model for relevence to new project's needs ###

For example, if new project doesn't need birthday field, delete from user model and user migration files

### 7. Run the sequelize migrations ###
```sh
sequelize db:migrate
```

### 8. Create a file for the enviornment varibles

```sh
touch .env
```

Or create in text editor

Include the following .env varibles:

* SESSION_SECRET - the key for the sesion to use

### 9. Run the server and make sure it works ###

```sh
nodemon or node index.js
```
