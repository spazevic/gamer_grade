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
| GET | '`/auth/login` | Login Form Page |
| POST | `/auth/login` | Process Login Form Data |
| GET | `/auth/login` | 

## Directions For Use
