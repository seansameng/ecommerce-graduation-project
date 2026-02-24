# E-Commerce Graduation Project Documentation

## Overview
This repository contains a full-stack e-commerce platform with a React frontend and a Spring Boot backend. Key features include product browsing, cart and checkout flow, user authentication, admin management pages, and order processing.

## Tech Stack
- Frontend: React (Create React App), React Router, Axios, Tailwind, MUI
- Backend: Spring Boot 3.5, Spring Security, JPA, MySQL
- Auth: JWT

## Project Structure
- `frontend/` React client
- `backend/` Spring Boot API
- `backend/src/main/resources/application.properties` backend config

## Prerequisites
- Node.js 18+ and npm
- Java 21
- Maven (or use `backend/mvnw`)
- MySQL 8+

## Backend Setup
1. Create a MySQL database (default name in config: `ecommerce_gp`).
2. Update DB credentials and JWT secret in `backend/src/main/resources/application.properties`.
3. From the repo root:
   1. `cd backend`
   2. `./mvnw spring-boot:run` (Windows: `mvnw.cmd spring-boot:run`)

The backend runs on `http://localhost:8080`.

## Frontend Setup
1. From the repo root:
   1. `cd frontend`
   2. `npm install`
   3. `npm start`

The frontend runs on `http://localhost:3000`.

## Environment Configuration
Frontend API base URL is configured in `frontend/src/api/axios.js`.
You can override it with:
- `REACT_APP_API_BASE_URL` (example: `http://localhost:8080/api`)

## Authentication
- JWT tokens are stored in `localStorage` under `authToken`.
- Admin routes are under `/admin`.

## Key Routes
Public:
- `/` Home
- `/products` Product list
- `/products/:id` Product details
- `/cart`
- `/checkout`
- `/orders`, `/account`, `/settings`

Admin:
- `/admin` Dashboard
- `/admin/products`
- `/admin/users`
- `/admin/categories`
- `/admin/orders`
- `/admin/settings`

## Scripts
Frontend:
- `npm start` run dev server
- `npm test` run tests
- `npm run build` build production assets

Backend:
- `./mvnw spring-boot:run` run API
- `./mvnw test` run tests

## Notes
- Database schema is managed by JPA with `spring.jpa.hibernate.ddl-auto=update`.
- If API calls fail, verify the backend is running and `REACT_APP_API_BASE_URL` matches.
