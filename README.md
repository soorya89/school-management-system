# school-management-system

# Project Description

   The School Management System is a web-based platform that streamlines the management of students, library records, and fee histories for different classes within a school. It incorporates Role-Based Access Control (RBAC) to limit access to specific functionalities based on user roles.

## Features

- **User Authentication**: Secure login for different roles.
- **CRUD Operations**: Manage student details, library history, and fees history.
- **Role-Based Access Control**: Different access levels for Admin, Office Staff, and Librarians.
- **Confirmation Dialogs**: Prevent accidental deletions or modifications.

## Technology

- **Frontend**: React, Redux
- **Backend**: Node.js, Express
- **Database**: MongoDB
- **State Management**: Redux for global state management

## Setup Instructions
  
- Node.js (>= 18.x)
- MongoDB (local installation or Atlas)
- Git

## Backend

# Clone repository
- https://github.com/soorya89/school-management-system.git

# Install
- npm install

# Create a `.env` file in the Backend directory with the following environment variables:
  PORT=5000
  MONGODB_URI=your_mongodb_connection_string
  JWT_SECRET=your_jwt_secret

# Start the server:
- npm start
 
 
 ## Frontend
  
  # navigate to frontend directory
  - cd ../frontend
  
  # Install
  - npm install

  # Create a `config.js` file in the Backend directory with the following environment variables:
  - BASE_URL='http://localhost:5000'
  
  # Start the server:
  - npm run dev

  ## List of Used Libraries

### Backend Libraries

- express
- mongoose
- dotenv
- jsonwebtoken
- bcryptjs

### Frontend Libraries

- react-vite
- react-dom
- react-router-dom
- redux
- axios

## Video Presentation
https://youtu.be/plBhnKAA5mc
