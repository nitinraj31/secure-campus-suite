# Secure Campus Suite Backend

A Node.js/Express backend API for the Secure Campus Suite application, built with TypeScript and MongoDB.

## Features

- User authentication and authorization
- User management (CRUD operations)
- Room management and allocation
- Role-based access control (Student, Warden, Admin)
- JWT-based authentication
- Input validation and error handling
- Security middleware (Helmet, CORS, Rate limiting)

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Language**: TypeScript
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT (JSON Web Tokens)
- **Password Hashing**: bcryptjs
- **Validation**: express-validator

## Project Structure

```
backend/
├── src/
│   ├── config/
│   │   └── database.ts          # Database connection
│   ├── controllers/             # Business logic (to be implemented)
│   ├── middleware/
│   │   └── auth.ts              # Authentication middleware
│   ├── models/
│   │   ├── User.ts              # User model
│   │   └── Room.ts              # Room model
│   ├── routes/
│   │   ├── auth.ts              # Authentication routes
│   │   ├── users.ts             # User management routes
│   │   └── rooms.ts             # Room management routes
│   ├── utils/                   # Utility functions
│   └── server.ts                # Main server file
├── tests/                       # Test files
├── .env                         # Environment variables
├── package.json                 # Dependencies and scripts
├── tsconfig.json                # TypeScript configuration
└── README.md                    # This file
```

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

### Installation

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   - Copy `.env` file and update the values as needed
   - Make sure MongoDB is running

4. Start the development server:
   ```bash
   npm run dev
   ```

The server will start on `http://localhost:5000`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user

### Users
- `GET /api/users` - Get all users (Admin/Warden only)
- `GET /api/users/:id` - Get user by ID
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user (Admin only)

### Rooms
- `GET /api/rooms` - Get all rooms
- `GET /api/rooms/:id` - Get room by ID
- `POST /api/rooms` - Create new room (Admin only)
- `PUT /api/rooms/:id` - Update room (Admin only)
- `DELETE /api/rooms/:id` - Delete room (Admin only)

### Health Check
- `GET /api/health` - API health status

## Authentication

The API uses JWT tokens for authentication. Include the token in the Authorization header:

```
Authorization: Bearer <your-jwt-token>
```

## User Roles

- **Student**: Can view their own profile and rooms
- **Warden**: Can view all users and manage room allocations
- **Admin**: Full access to all features

## Development

### Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm test` - Run tests
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier

### Testing

```bash
npm test
```

## Environment Variables

Create a `.env` file in the backend directory:

```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/secure-campus-suite
JWT_SECRET=your-super-secret-jwt-key
BCRYPT_ROUNDS=10
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## License

This project is licensed under the ISC License.
