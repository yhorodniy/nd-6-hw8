# News Management System

A full-stack news management application built with Node.js/Express (TypeScript) for the backend and React (TypeScript) for the frontend. The system includes comprehensive validation, error handling, logging, and genre-based filtering with pagination.

## Installation and Setup

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager

### Running Both Applications
From the root directory, you can start both server and client:
    ```bash
        npm run start:app
    ```

### Backend Setup
1. Navigate to the server directory:
    ```bash
        cd server
    ```

2. Install dependencies:
    ```bash
        npm install
    ```

3. Create environment file (.env):
   ```
        NODE_ENV=development
        PORT=8000
   ```

4. Start the server in development mode:
    ```bash
        npm run dev
    ```

### Frontend Setup
1. Navigate to the client directory:
    ```bash
        cd client
    ```

2. Install dependencies:
    ```bash
        npm install
    ```

3. Start the development server:
    ```bash
        npm run dev:client
    ```
    
## Features

### Backend Features
- **RESTful API** with full CRUD operations for news posts
- **TypeScript** implementation with strict type safety
- **Data Validation** using fastest-validator with custom schemas
- **Error Handling** with custom error classes and global error handler
- **Logging System** using Winston with log rotation and separate files for different log levels
- **Genre-based Filtering** with server-side implementation
- **Pagination** with configurable page size
- **Request Logging** middleware for API monitoring

### Frontend Features
- **React with TypeScript** for type-safe UI development
- **Genre Filtering** with color-coded buttons matching post card genres
- **Pagination** integrated with server-side filtering
- **Responsive Design** with modern CSS styling
- **Form Validation** for creating and editing posts
- **Error Boundaries** and loading states
- **Dynamic Color System** for genre visualization

### Supported Genres
- **Technology** (Red color scheme)
- **Business** (Blue color scheme)
- **Health** (Green color scheme)
- **Other** (Gray color scheme)

## Project Structure

```
nd-6-hw8/
├── server/                             # Backend application
│   ├── controller/                     # Route controllers
│   │   └── newspostsController.ts
│   ├── dal/                            # Data Access Layer
│   │   └── NewspostsRepository.ts
│   ├── data/                           # JSON data storage
│   │   └── newsPosts.json
│   ├── helpers/                        # Utility functions and middleware
│   │   ├── errors.ts                   # Custom error classes
│   │   ├── errorHandler.ts             # Global error handler
│   │   ├── helper.ts                   # File management utilities
│   │   ├── logger.ts                   # Winston logger configuration
│   │   ├── requestLogger.ts            # Request logging middleware
│   │   └── validator.ts                # Data validation schemas
│   ├── routes/                         # API routes
│   │   ├── newsPosts.ts
│   │   └── staticGet.ts
│   ├── services/                       # Business logic layer
│   │   └── NewspostsService.ts
│   ├── types/                          # TypeScript type definitions
│   │   └── types.ts
│   ├── server.ts                       # Main server file
│   ├── package.json
│   └── tsconfig.json
├── client/                             # Frontend application
│   ├── src/
│   │   ├── components/                 # Reusable React components
│   │   │   ├── GenreFilter/            # Genre filtering component
│   │   │   ├── PostCard/               # News post display component
│   │   │   ├── Pagination/             # Pagination component
│   │   │   ├── Loading/                # Loading indicator
│   │   │   └── Error/                  # Error display component
│   │   ├── pages/                      # Page components
│   │   │   ├── HomePage/               # Main news list page
│   │   │   ├── PostDetailPage/         # Individual post view
│   │   │   └── PostFormPage/           # Create/edit post form
│   │   ├── services/                   # API communication
│   │   │   └── api.ts
│   │   ├── types/                      # TypeScript interfaces
│   │   │   └── index.ts
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── package.json
│   └── vite.config.ts
└── README.txt                          # This file
```

## API Endpoints

### News Posts
- **GET** `/api/newsposts` - Get paginated news posts with optional genre filtering
  - Query parameters:
    - `page` (number): Page number (default: 0)
    - `size` (number): Items per page (default: 10, max: 100)
    - `genre` (string): Filter by genre (Technology, Business, Health, Other)
  
- **GET** `/api/newsposts/:id` - Get single news post by ID
- **POST** `/api/newsposts` - Create new news post
- **PUT** `/api/newsposts/:id` - Update existing news post
- **DELETE** `/api/newsposts/:id` - Delete news post

### Test Endpoints
- **GET** `/api/newsposts/error` - Test error handling

## Data Model

### News Post Schema
```typescript
interface NewPost {
  id: number;
  title: string;          // 1-50 characters
  text: string;           // 1-256 characters
  genre: NewsGenre;       // Technology | Business | Health | Other
  isPrivate: boolean;
  createDate: Date;
}
```

## Validation Rules

### Create/Update Post
- **Title**: Required, 1-50 characters
- **Text**: Required, 1-256 characters
- **Genre**: Must be one of: Technology, Business, Health, Other
- **isPrivate**: Boolean value required

## Error Handling

The application implements comprehensive error handling:

### Custom Error Types
- **ValidationError**: For data validation failures
- **NewspostsServiceError**: For business logic errors

### HTTP Status Codes
- **200**: Success
- **201**: Created
- **400**: Bad Request (validation errors)
- **404**: Not Found
- **500**: Internal Server Error

## Logging

The application uses Winston for logging with the following features:

### Log Levels
- **Error**: Logged to `logs/error.log`
- **Warn**: Logged to `logs/warn.log`
- **Info**: Console output and general logging
- **Debug**: Development debugging

### Log Rotation
- Daily rotation for error and warning logs
- Maximum 14 days retention
- Maximum 20MB file size

### Request Logging
All API requests are logged with:
- HTTP method and URL
- Response status code
- Response time
- Request timestamp

## Frontend Features

### Genre Filtering
- Color-coded filter buttons matching post card genres
- Server-side filtering for optimal performance
- Real-time filtering without page reload

### Pagination
- Integrated with genre filtering
- Shows current page and total results
- Responsive pagination controls

### Color System
Each genre has a consistent color scheme:
- **Technology**: Red (#e74c3c / #c0392b)
- **Business**: Blue (#3498db / #2980b9)
- **Health**: Green (#27ae60 / #229954)
- **Other**: Gray (#95a5a6 / #7f8c8d)

## Development

### Available Scripts

#### Server
- `npm run dev` - Start development server with nodemon
- `npm run build` - Compile TypeScript to JavaScript
- `npm run start:prod` - Start production server

#### Client
- `npm run dev:client` - Start Vite development server
- `npm run build:client` - Build for production
- `npm run preview` - Preview production build

### Development URLs
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:8000
- **API Documentation**: http://localhost:8000/api

## Testing

### Manual Testing
Use the following curl commands to test the API:

```bash
# Get all posts (first page)
curl "http://localhost:8000/api/newsposts?page=0&size=10"

# Get posts filtered by genre
curl "http://localhost:8000/api/newsposts?page=0&size=10&genre=Technology"

# Get single post
curl "http://localhost:8000/api/newsposts/1"

# Create new post
curl -X POST "http://localhost:8000/api/newsposts" \
  -H "Content-Type: application/json" \
  -d '{"title":"Test Post","text":"Test content","genre":"Technology","isPrivate":false}'
```

## Architecture

### Backend Architecture
- **Controller Layer**: Handles HTTP requests and responses
- **Service Layer**: Contains business logic and validation
- **Data Access Layer**: Manages data persistence
- **Middleware**: Error handling, logging, and request processing

### Frontend Architecture
- **Component-based**: Reusable React components
- **Type Safety**: Full TypeScript implementation
- **State Management**: React hooks for local state
- **API Layer**: Centralized API communication

## Performance Considerations

### Backend
- Server-side filtering reduces data transfer
- Pagination limits response size
- Efficient JSON file operations
- Request logging for monitoring

### Frontend
- Component-based architecture for reusability
- Efficient re-rendering with React hooks
- Responsive design for mobile devices
- Optimized build with Vite

## Future Enhancements

Potential improvements for the application:
- Database integration (PostgreSQL/MongoDB)
- User authentication and authorization
- Real-time updates with WebSockets
- Image upload for news posts
- Full-text search functionality
- Admin dashboard
- API rate limiting
- Unit and integration tests

## License

This project is for educational purposes.
