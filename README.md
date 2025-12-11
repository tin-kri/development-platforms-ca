# News API - Development Platforms Course Assignment

A news platform built for the course Development Platforms using TypeScript and Express where users can read articles and when logged in users can submit articles.

## Features

- User registration and authentication with JWT
- Secure password hashing with bcrypt
- Public article browsing
- Protected article submission (authenticated users only)
- Input validation with Zod schemas
- Interactive API documentation with Swagger
- MySQL database with relational data

## Technologies

- **Backend Framework:** Express.js with TypeScript
- **Database:** MySQL with mysql2
- **Authentication:** JWT (jsonwebtoken) + bcrypt
- **Validation:** Zod
- **Documentation:** Swagger/OpenAPI (swagger-ui-express, swagger-jsdoc)

## Installation

### Prerequisites

- Node.js (v18 or higher)
- MySQL (v8 or higher)
- npm or yarn

### Steps

1. **Clone the repository**

```bash
   git clone https://github.com/tin-kri/development-platforms-ca
   cd development-platforms-ca
```

2. **Install dependencies**

```bash
   npm install
```

3. **Create MySQL database**

   Open MySQL Workbench or your MySQL and create the database specified in DB_NAME.

4. **Create database tables**

```sql
   CREATE TABLE users (
     id INT PRIMARY KEY AUTO_INCREMENT,
     email VARCHAR(255) NOT NULL UNIQUE,
     password_hash VARCHAR(255) NOT NULL,
     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
   );

   CREATE TABLE articles (
     id INT PRIMARY KEY AUTO_INCREMENT,
     title VARCHAR(255) NOT NULL,
     body TEXT NOT NULL,
     category VARCHAR(100) NOT NULL,
     submitted_by INT NOT NULL,
     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
     FOREIGN KEY (submitted_by) REFERENCES users(id) ON DELETE CASCADE
   );
```

## Configuration

1. **Create `.env` file**

   Copy `.env.example` to `.env` in the root directory:

```bash
   cp .env.example .env
```

2. **Configure environment variables**

   Edit `.env` with your database credentials:

```env
   PORT=3000
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=your_mysql_password
   DB_NAME=newsAPI
   JWT_SECRET=your_super_secret_jwt_key_change_in_production
```

**Important:**

- Replace `your_mysql_password` with your actual MySQL root password
- Replace `JWT_SECRET` with a long, random string (for production, use a secure random generator)

## Running the Project

### Development Mode

```bash
npm run dev
```

The server will start at `http://localhost:3000`

### Production Build

```bash
npm run build
npm start
```

## API Documentation

### Interactive Documentation

Once the server is running, visit:

```
http://localhost:3000/api-docs
```

This provides a Swagger UI where you can:

- View all endpoints
- See request/response schemas
- Test endpoints directly in the browser

## Motivation

### Why I Chose option 1, the Express.js API Option

I chose Option 1 Express.js API backend because I believe understanding both frontend and backend development is crucial for effective collaboration with other developers now and in the future. I have worked with pre-built APIs before but now I wanted to experience building one from scratch. While I could have chosen the full-stack option, I wanted to focus on the server-side to try to understand what happens behind the scenes when a frontend makes API requests. Having this knowledge will hopefully make me a more versatile developer and better team member, as I'll be able to communicate more effectively with backend developers and understand some of the constraints and possibilities on both sides of the stack.

### The parts I found most rewarding:

One pleasant surprise was how comfortable I felt working with TypeScript. Having gained experience over the last semesters made TypeScript feel intuitive and easy to work with. which gave me confidence.

I genuinely enjoyed working in MySQL Workbench. Writing queries, designing the schema with foreign keys, and seeing the relationships between users and articles come together was satisfying. The visual feedback of seeing data persist and relate to each other was good for my learning.

Despite the intimidating size of the curriculum when I first saw it, the actual implementation wasn't as difficult as I expected. Each concept built on the previous one and after a while it made sense to me.

### Challenges and frustrations:

Getting everything configured initially (TypeScript, MySQL connection, environment variables) felt tedious. There were many small configuration files that all needed to be correct, and troubleshooting errors in this phase was frustrating because I wasn't yet familiar with the ecosystem.

So a challenge for me was seeing the whole picture. When I started, I struggled to understand how all the pieces fit together - where validation should go, how middleware connects to routes, how the database ties into everything. I had to restructure my code multiple times before the architecture finally clicked in my mind.
Looking back now, I'm surprised by how much I learned without it being as overwhelming as I feared.

### Custom API vs SaaS (Supabase)

Building a custom API gave me control over authentication, validation, and database structure. It taught me about how JWT works, not just how to use it. The downside was the time it took—a pre-built solution would have been faster. I'm also responsible for security updates and fixing any bugs myself.

I have not worked with Supabase yet, but from what I understand, it would have saved a lot of development time with built-in authentication and database features. The trade-off is less learning about how things work under the hood and being dependent on their platform. I'm curious to try it in future projects to see how it compares

## License

This project is for educational purposes as part of the Development Platforms course.

## Author

Tina Kristiansen
Noroff School of Technology and Digital Media