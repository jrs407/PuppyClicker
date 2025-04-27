# PuppyClicker 🐕

A Cookie Clicker-style game featuring adorable puppies! Click and collect puppies to build your puppy empire.

## Features 🎮

- Interactive clicking gameplay
- Multiple puppy breeds to collect
- Automatic puppy generation system
- User authentication system
- Progress saving
- Custom cursor animations
- Responsive design

## Tech Stack 💻

- **Frontend**:
  - React
  - TypeScript
  - Vite
  - CSS3

- **Backend**:
  - Node.js
  - Express
  - TypeScript
  - MySQL

- **Development**:
  - Docker
  - Docker Compose

## Prerequisites 📋

- Docker and Docker Compose
- Node.js 18 or higher
- MySQL 8.0

## Installation 🚀

1. Clone the repository:
```bash
git clone https://github.com/yourusername/PuppyClicker.git
cd PuppyClicker
```

2. Start the application using Docker Compose:
```bash
docker-compose up --build
```

The application will be available at:
- Frontend: http://localhost:5173
- Backend: http://localhost:8080
- Database: localhost:3307

## Project Structure 📁

```
PuppyClicker/
├── Frontend/             # React frontend application
│   └── puppy-clicker/
│       ├── src/         # Source files
│       ├── public/      # Static files
│       └── ...
├── Backend/             # Node.js backend application
│   ├── endpoints/       # API endpoints
│   ├── config/         # Configuration files
│   ├── sql/           # Database scripts
│   └── ...
└── docker-compose.yml  # Docker composition file
```

## Game Mechanics 🎯

- Click the main puppy to earn points
- Purchase different breeds of puppies that generate points automatically
- Each puppy breed has unique characteristics and production rates
- Prices increase with each purchase following a 15% increment formula

## Development 👨‍💻

To run the application in development mode:

1. Start the containers:
```bash
docker-compose up
```

2. The development environment includes:
   - Hot-reloading for frontend and backend
   - Database persistence
   - Automatic TypeScript compilation

## License 📄

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.