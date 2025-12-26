# Airbnb Clone (Major Project)

A full-stack Airbnb Clone web application built using **Node.js, Express.js, MongoDB, and EJS** following the **MVC architecture**.  
This project allows users to create, view, edit, and review property listings with authentication and proper error handling.

---

## Features

- User authentication (signup & login)
- Create, edit, and delete property listings
- View all listings and individual listing details
- Add and manage reviews for listings
- Flash messages for success and error handling
- MVC-based clean folder structure
- Server-side rendering using EJS templates
- Custom error handling with async wrapper

---

## Tech Stack

- **Backend:** Node.js, Express.js
- **Frontend:** EJS, HTML, CSS, Bootstrap
- **Database:** MongoDB, Mongoose
- **Authentication:** Passport.js
- **Utilities:** Custom error handling & async wrapper

---
MAJORPROJECT/
│
├── init/ # Database initialization
│
├── models/ # Mongoose models
│ ├── listing.js
│ ├── review.js
│ └── user.js
│
├── route/ # Express routes
│ ├── listing.js
│ ├── review.js
│ └── user.js
│
├── utils/ # Utility functions
│ ├── ExpressError.js
│ └── wrapAsync.js
│
├── views/ # EJS templates
│ ├── includes/
│ │ ├── flash.ejs
│ │ ├── footer.ejs
│ │ └── navbar.ejs
│ │
│ ├── layouts/
│ │ └── boilerplate.ejs
│ │
│ ├── listings/
│ │ ├── index.ejs
│ │ ├── new.ejs
│ │ ├── edit.ejs
│ │ └── show.ejs
│ │
│ ├── users/
│ └── error.ejs
│
├── public/ # Static files
│
├── middleware.js # Custom middleware
├── app.js # Main server file
├── package.json
└── README.md


---

## Installation & Setup

1. Clone the repository  
```bash
git clone https://github.com/SakshiDeosale/Airbnb-Clone.git
---
Install dependencies

npm install


Start MongoDB
(Make sure MongoDB is running locally)

Run the application

node app.js


or (if using nodemon)

nodemon app.js


Open browser

http://localhost:3000

## Project Structure

