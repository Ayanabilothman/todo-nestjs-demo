# Todo Application

Welcome to the NestJS Todo Demo! This powerful app offers seamless task management with registration, account activation through link sent to the email and login options, including Gmail integration. Enjoy secure and efficient CRUD operations for todos, routes are protected using Bearer token. The app uses MongoDB with Mongoose for robust data handling, while custom exception filters ensure smooth error management.The responses are chached to reduce server load and enhance user experience. All are documented with Swagger for easy API exploration.

## Features

- **User Registration and Login**:

  - Register with email and password.
  - Login with email/password or Gmail.
  - Email verification using Nodemailer.

- **Todo Management**:

  - Create, Read, Update, and Delete (CRUD) operations for todos.

- **File Upload**:

  - Upload images using Multer.
  - Custom file validation using magic numbers for security.

- **Security**:

  - Authentication using Bearer tokens.

- **Documentation**:

  - API documentation with Swagger.

- **Database**:

  - MongoDB with Mongoose for data modeling.

- **Error Handling**:

  - Custom exception filters for database and Mongoose errors.

- **Caching**:
  - Using cache manager to cache the data..

## Getting Started

### Prerequisites

- Node.js
- MongoDB
- Gmail account for OAuth (for Gmail login and sending emails)

### Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/Ayanabilothman/todo-nestjs-demo.git
   cd todo-app
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Environment Variables**:
   Create a `.env` file and configure the required variables.

4. **Run the application**:

   ```bash
   npm run start
   ```

5. **Access Swagger Documentation**:

   Visit `http://localhost:3000/api` to view the Swagger documentation.

## License

This project is licensed under the MIT License.

---

This application is a comprehensive solution for managing tasks with robust features and security implementations. Enjoy using it!
