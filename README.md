[![Open in Visual Studio Code](https://classroom.github.com/assets/open-in-vscode-2e0aaae1b6195c2367325f4f02e2d04e9abb55f0b24a779b69b11b9e10269abc.svg)](https://classroom.github.com/online_ide?assignment_repo_id=21883253&assignment_repo_type=AssignmentRepo)

# Personalized News Aggregator API

A secure, JWT-authenticated RESTful API that allows users to register, log in, manage personal news preferences, and fetch personalized news articles based on their selected topics.

**15/15 tests passing** · Clean architecture · Production-ready patterns

### Features

- User registration & login with bcrypt password hashing
- JWT-based authentication (Bearer token)
- Protected routes with custom auth middleware
- User preferences management (GET/PUT `/users/preferences`)
- Personalized news fetching using GNews API
- In-memory user storage (perfect for assignment scope)
- Proper separation of concerns (controllers → services → routes → middleware)
- Graceful error handling & consistent response format
- Environment-based configuration

### Endpoints

| Method | Endpoint                | Description                     | Auth Required |
|-------|-------------------------|----------------------------------|---------------|
| POST  | `/users/signup`         | Register new user                | No            |
| POST  | `/users/login`          | Login and receive JWT            | No            |
| GET  | `/users/preferences`    | Get user's saved preferences     | Yes           |
| PUT   | `/users/preferences`    | Update preferences              | Yes           |
| GET   | `/news`                 | Fetch personalized news          | Yes           |

### Tech Stack

- Node.js
- Express.js
- bcryptjs – password hashing
- jsonwebtoken – JWT auth
- axios – external API calls
- GNews API – news source
- dotenv – environment variables

### Project Structure

src/
├── controllers/     # Request handlers
├── routes/          # Express routers
├── middleware/      # JWT authentication
├── models/          # In-memory User model
├── services/        # Business logic (news fetching)
├── utils/           # AppError class
├── app.js           # Express app configuration
└── server.js        # Server startup (app.listen)


### Setup & Run Locally

```bash
# Clone and install
git clone <your-repo-url>
cd news-aggregator-api
npm install

# Create .env file
cp .env.example .env

# Add your free GNews API key at https://gnews.io
# Edit .env and set:
NEWS_API_KEY=your_actual_key_here
JWT_SECRET=any-long-secret-string

# Start server
node server.js
# or
npm start

Server runs on http://localhost:3000

Run Tests
`bash npm run test
`

All 15 tests should pass successfully.

