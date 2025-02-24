<p align="center" >
  <img src="https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white">
  <img src="https://img.shields.io/badge/Express%20js-000000?style=for-the-badge&logo=express&logoColor=white">
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB">
  <img src="https://img.shields.io/badge/Node%20js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white">
  <img src="https://img.shields.io/badge/Render-46E3B7?style=for-the-badge&logo=render&logoColor=white">
  <img src="https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white">
</p>

 <img src="https://img.shields.io/github/last-commit/armen-asriyan/eval-backend">

# Portfolio Website with Admin Dashboard

A full-stack portfolio website built with React and Node.js, featuring user authentication, admin dashboard, and GDPR-compliant cookie management. The project was made for an evaluation.

## Table of Contents

- [Portfolio Website with Admin Dashboard](#portfolio-website-with-admin-dashboard)
  - [Table of Contents](#table-of-contents)
  - [Features](#features)
  - [Tech Stack](#tech-stack)
    - [Frontend](#frontend)
    - [Backend](#backend)
  - [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
  - [Demo](#demo)
  - [Credits](#credits)

## Features

- 🎨 Modern and responsive design with dark/light theme support
- 🔒 Secure authentication system
- 👩‍💼 Admin dashboard for content management
- 🍪 GDPR-compliant cookie management using tarteaucitron.js
- 📱 Mobile-friendly interface
- 🔄 Dynamic content loading
- 📝 Skills and about section management

## Tech Stack

### Frontend

- React.js
- React Router DOM
- Axios for API calls
- React Icons
- useHooks: A collection of modern, server-safe React hooks – from the ui.dev team.
- react-router-hash-link : Hash link support for React Router

### Backend

- Node.js & Express.js
- MongoDB with Mongoose
- JWT for authentication
- Cookie-parser for cookie management
- Bcrypt for password hashing
- Multer for file upload
- File-type for file type validation
- Cloudinary for image storage
- Winston & Morgan for logging
- Express Validator for input validation
- Helmet for security headers
- CORS support
- express-rate-limit to limit repeated requests
- Development tools:
  - Dotenv for environment variables
  - Nodemon for development server reloading
  - Cross-env for cross-environment variable support

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB
- Cloudinary account
- Yarn

### Installation

1. Clone the repository

```bash
git clone https://github.com/armen-asriyan/eval-backend.git
cd eval-backend
```

2. Install backend dependencies

```bash
cd backend
yarn install
```

3. Install frontend dependencies

```bash
cd ../frontend
yarn install
```

4. Configure environment variables

   4.1 Create backend `.env` file:

   ```bash
   touch backend/.env
   ```

   4.2 with the following contents:

   ```ini
   PORT = 'YOUR_PORT'
   DB_NAME = 'YOUR_DB_NAME'
   MONGO_URI= 'YOUR_MONGODB_URI'
   JWT_SECRET = 'YOUR_JWT_SECRET'

   CLOUDINARY_NAME = 'YOUR_CLOUDINARY_NAME'
   CLOUDINARY_API_KEY = 'YOUR_CLOUDINARY_API_KEY'
   CLOUDINARY_API_SECRET = 'YOUR_CLOUDINARY_API_SECRET'

   NODE_ENV = 'development'

   CLIENT_URL='YOUR_CLIENT_URL (for cors)'
   ```

   4.3 Create frontend `.env` file:

   ```bash
   touch frontend/.env
   ```

   with the following contents:

   ```ini
   PORT = 'YOUR_PORT'

   REACT_APP_API_URL = 'YOUR_BACKEND_API_URL'

   REACT_APP_SITE_KEY = 'YOUR_RECAPTCHA_SITE_KEY'
   REACT_APP_SECRET_KEY = 'YOUR_RECAPTCHA_SECRET_KEY'
   ```

5. Start the backend server

```bash
cd backend
yarn run dev
```

6. Run the frontend app

```bash
cd ../frontend
yarn start
```

7. Open your browser and navigate to `http://localhost:YOUR_PORT`

🚀 That's it! You should now have a fully functional portfolio website with admin dashboard.

<p align="center">📌 Don't forget to create the first user with the `/register` endpoint</p>

## Demo

<p>
    Desktop:
    <br/>
    <img src="./documentation/desktop-screenshot.png">
</p>

<p>
    Mobile:
    <br/>
    <img src="./documentation/mobile-screenshot.png" width="50%">
</p>

👉 [Live Demo on Vercel](https://eval-backend.vercel.app/)

## Credits

- [Greg Sithole](https://github.com/GregSithole/gregsithole-react-portfolio) for the original template
- [AmauriC](https://github.com/AmauriC) for tarteaucitron.js
