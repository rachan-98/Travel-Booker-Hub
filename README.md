# Travel-Booker-Hub

Travel-Booker-Hub is a full-stack booking application that allows users to search, book, and manage hotel or flight reservations. The goal of this project is to replicate how a real-world booking system works, with secure authentication, efficient data handling, and improved performance through caching.

---

## Features

* User authentication using JWT
* Search and book hotels or flights
* View and manage bookings
* Cancel reservations
* Task management with full CRUD functionality for booking-related tasks
* Redis caching to improve performance
* RESTful API design

---

## Tech Stack

* **Frontend:** React (Vite)
* **Backend:** Node.js, Express.js
* **Database:** MongoDB
* **Caching:** Redis
* **Authentication:** JWT

---

## Project Structure

backend/
├── controllers/
├── models/
├── routes/
├── middleware/
├── config/

frontend/
├── components/
├── pages/
├── services/

---

## Installation & Setup

### 1. Clone the repository

```bash
git clone https://github.com/rachan-98/Travel-Booker-Hub.git
cd Travel-Booker-Hub
```

### 2. Install dependencies

```bash
cd backend
npm install

cd ../frontend
npm install
```

### 3. Setup environment variables

Create a `.env` file in backend:

```env
PORT=5000
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret_key
REDIS_URL=your_redis_url
```

### 4. Run the project

```bash
# Backend
cd backend
npm run dev

# Frontend
cd frontend
npm run dev
```

---

## API Endpoints

### Auth

* POST `/api/auth/register`
* POST `/api/auth/login`

### Bookings

* GET `/api/bookings` → Get all bookings
* POST `/api/bookings` → Create booking
* GET `/api/bookings/:id` → Get single booking
* DELETE `/api/bookings/:id` → Cancel booking

### Tasks

* POST `/api/tasks`
* GET `/api/tasks`
* GET `/api/tasks/:id`
* PUT `/api/tasks/:id`
* DELETE `/api/tasks/:id`

---

## Screenshots

Add screenshots of your UI or Postman responses here

---

## Future Improvements

* Stripe payment integration
* Email notifications
* Admin dashboard
* Real-time booking availability

---

## What I Learned

* Building scalable REST APIs
* Implementing JWT authentication
* Using Redis for caching
* Structuring a full-stack application
* Handling real-world booking logic

---

## Why this project?

This project reflects my ability to design and build a backend system that focuses on performance, security, and clean architecture while solving a practical problem.

---

## If you like this project, consider giving it a star
