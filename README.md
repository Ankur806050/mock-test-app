# JEE Main Practice Platform

## 📖 Overview

A full-stack web application for students preparing for **JEE Main**. The platform allows students to create an account, attempt mock tests, view their scores, and track their progress.

The project will initially focus on building a **Minimum Viable Product (MVP)** with all the core functionalities. Advanced features such as chapter-wise practice, leaderboards, analytics, and an admin dashboard will be added in later versions.

---

# Tech Stack

## Frontend

* HTML
* CSS
* JavaScript

## Backend

* Node.js
* Express.js

## Database

* MongoDB
* Mongoose

## Authentication

* JWT
* bcrypt

## Tools

* Git & GitHub
* Postman
* MongoDB Compass

---

# Project Goal

* Learn Full Stack Web Development by building a real-world application.
* Practice REST API development.
* Implement Authentication & Authorization.
* Work with MongoDB and Mongoose.
* Perform CRUD operations.
* Learn frontend-backend integration using Fetch API.
* Build a portfolio-worthy project.

---

# Target Users

Currently:

* Students preparing for **JEE Main**

Future Expansion:

* JEE Advanced
* NEET
* CUET
* GATE

---

# Version 1.0 (MVP)

## Authentication

* User Signup
* User Login
* Logout
* Password Hashing
* JWT Authentication
* Protected Routes

---

## Dashboard

Students can

* View available mock tests
* Start a test
* View previous attempts

---

## Mock Tests

Each test contains

* Test Title
* Description
* Subject
* Duration
* Total Questions
* Total Marks

---

## Question Interface

* Display one question at a time
* Four options
* Select an answer
* Previous Question
* Next Question
* Submit Test

---

## Result

After submission

Display

* Total Score
* Correct Answers
* Incorrect Answers
* Unattempted Questions
* Percentage

---

## Attempt History

Students can view

* Test Name
* Score
* Date
* Time Taken

---

# Data Management

For Version 1.0

The developer will manually insert tests and questions into MongoDB.

No Admin Panel will be built initially.

---

# Database Collections

## Users

* Full Name
* Email
* Password
* Phone Number (Optional)
* Current Class (11th / 12th / Dropper)
* Created At

---

## Tests

* Title
* Description
* Subject
* Duration
* Total Questions
* Total Marks

---

## Questions

* Test ID
* Question
* Options
* Correct Answer
* Marks

---

## Attempts

* User ID
* Test ID
* Selected Answers
* Score
* Percentage
* Submitted At

---

# REST APIs

## Authentication

* POST /signup
* POST /login

---

## Tests

* GET /tests
* GET /tests/

---

## Questions

* GET /tests//questions

---

## Attempts

* POST /attempts
* GET /attempts
* GET /attempts/

---

# Folder Structure

```text
jee-main-platform/

├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   ├── .env
│   ├── server.js
│   └── package.json
│
├── frontend/
│   ├── css/
│   ├── js/
│   ├── images/
│   ├── signup.html
│   ├── login.html
│   ├── dashboard.html
│   ├── test.html
│   ├── result.html
│   └── history.html
│
├── README.md
└── .gitignore
```

---

# Version 1.0 Roadmap

## Phase 1

* [ ] Setup Express Server
* [ ] Connect MongoDB
* [ ] Create Project Structure

---

## Phase 2

* [ ] User Schema
* [ ] Test Schema
* [ ] Question Schema
* [ ] Attempt Schema

---

## Phase 3

* [ ] Signup API
* [ ] Login API
* [ ] JWT Authentication
* [ ] Protected Routes

---

## Phase 4

* [ ] Add Sample Tests to Database
* [ ] Add Sample Questions

---

## Phase 5

Frontend

* [ ] Signup Page
* [ ] Login Page
* [ ] Dashboard
* [ ] Test Page
* [ ] Result Page
* [ ] History Page

---

## Phase 6

Student Features

* [ ] View Tests
* [ ] Start Test
* [ ] Submit Test
* [ ] Calculate Score
* [ ] Store Attempt
* [ ] View Attempt History

---

# Future Enhancements

## Test Experience

* Timer
* Auto Submit
* Question Palette
* Mark for Review
* Randomized Questions

---

## Student Features

* Subject-wise Analysis
* Performance Dashboard
* Weak Topic Analysis
* Bookmark Questions
* Wrong Questions Practice
* Daily Challenge

---

## Question Bank

* Chapter-wise Questions
* Difficulty Levels
* Previous Year Questions
* Detailed Solutions

---

## Admin Module

Instead of manually adding data to MongoDB:

* Admin Login
* Create Test
* Edit Test
* Delete Test
* Add Questions
* Edit Questions
* Delete Questions
* View Student Statistics

---

## Advanced Features

* React Frontend
* Responsive Design
* Dark Mode
* Email Verification
* Forgot Password
* Leaderboard
* Performance Graphs
* Deployment
* Progressive Web App (PWA)

---

# Current Status

🚧 **Version 1.0 (MVP) — In Development**

The current objective is to build a fully functional JEE Main practice platform with authentication, mock tests, result calculation, and attempt history before moving on to advanced features.
