# YRGO Tivoli 🎢

A digital amusement park platform built for YRGO's web development course, where students create and showcase interactive games and attractions.

![YRGO Tivoli](public/images/red-panda-wide.png)

## 🎯 Overview

YRGO Tivoli is an innovative educational platform that combines learning with fun. Students create their own digital amusements (games and attractions) and showcase them in a virtual theme park environment. The platform features an interactive grid-based exploration system, user authentication, voting mechanisms, and seamless iframe integration for games.

## ✨ Features

### 🎮 Interactive Tivoli Grid
- **Responsive Grid System**: Adaptive grid layout that works on mobile, tablet, and desktop
- **Avatar Animation**: Animated sprite-based avatar with multiple states (idle, movement, asleep)
- **Dynamic Content**: Special cells containing student-created amusements
- **Smooth Transitions**: Fluid avatar movement between grid cells

### 👥 User Management
- **Authentication System**: Secure login/register with Laravel Sanctum
- **API Key Validation**: Group-based registration system
- **Profile Management**: User profiles with GitHub and portfolio links
- **Image Uploads**: Profile and amusement image handling via Vercel Blob

### 🎪 Amusement System
- **Game Integration**: Seamless iframe embedding for student games
- **JWT Communication**: Secure token passing between parent and game iframes
- **Responsive Gaming**: Games adapt to different screen sizes and orientations
- **Stamp Collection**: Achievement system with collectible stamps

### 🗳️ Voting & Social Features
- **Peer Voting**: Vote for favorite amusements (excluding own creations)
- **Group Organization**: Students organized by development groups
- **Social Profiles**: Showcase work with GitHub and portfolio links

### 📱 Responsive Design
- **Mobile-First**: Optimized for all device sizes
- **Adaptive Layouts**: Different grid configurations for various screen sizes
- **Touch-Friendly**: Mobile-optimized interactions and navigation

## 🛠️ Tech Stack

### Frontend
- **Next.js 13+** - React framework with App Router
- **React** - Component-based UI library
- **Tailwind CSS** - Utility-first CSS framework
- **Headless UI** - Unstyled, accessible UI components
- **Laravel Breeze (Next.js)** - Authentication scaffolding foundation

### Backend Integration
- **Laravel API** - RESTful backend services (separate repository)
- **Laravel Sanctum** - API authentication and CSRF protection
- **MySQL/SQLite** - Database for user data, groups, amusements, and votes
- **Axios** - HTTP client for API communication

### File Management
- **Vercel Blob** - File storage for images
- **Next.js Image** - Optimized image handling

### Development Tools
- **SWR** - Data fetching and caching
- **Custom Hooks** - Reusable React logic

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- PHP 8.1+
- Composer
- MySQL or SQLite database
- Vercel account (for file uploads)

### Installation

This project requires both the **frontend (Next.js)** and **backend (Laravel)** to be running simultaneously.

#### 1. **Clone both repositories**
   ```bash
   # Clone the frontend (this repository)
   git clone https://github.com/WU24-Tivoli-Team-Backend/tivoli-frontend.git
   cd yrgo-tivoli
   
   # Clone the backend (in a separate directory)
   git clone https://github.com/WU24-Tivoli-Team-Backend/tivoli-backend.git
   ```

#### 2. **Setup the Laravel Backend First**
   ```bash
   cd yrgo-tivoli-backend
   
   # Install PHP dependencies
   composer install
   
   # Copy environment file
   cp .env.example .env
   
   # Generate application key
   php artisan key:generate
   
   # Configure your database in .env file
   # DB_CONNECTION=mysql
   # DB_HOST=127.0.0.1
   # DB_PORT=3306
   # DB_DATABASE=yrgo_tivoli
   # DB_USERNAME=your_username
   # DB_PASSWORD=your_password
   
   # Run database migrations
   php artisan migrate
   
   # Seed the database (optional)
   php artisan db:seed
   
   # Start the Laravel development server
   php artisan serve
   ```
   
   The Laravel backend will be available at `http://localhost:8000`

#### 3. **Setup the Next.js Frontend**
   ```bash
   cd yrgo-tivoli
   
   # Install dependencies
   npm install
   # or
   yarn install
   ```

#### 4. **Environment Setup**
   Create a `.env.local` file in the frontend directory:
   ```env
   NEXT_PUBLIC_BACKEND_URL=http://localhost:8000
   BLOB_READ_WRITE_TOKEN=your-vercel-blob-token
   ```

#### 5. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

#### 6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

> **Note**: Make sure both the Laravel backend (`http://localhost:8000`) and Next.js frontend (`http://localhost:3000`) are running simultaneously for the application to work properly.

## 🏗️ Architecture

This project follows a **decoupled architecture** with separate frontend and backend repositories:

- **Frontend (This Repository)**: Next.js application handling UI, user interactions, and client-side logic
- **Backend (Separate Repository)**: Laravel API providing authentication, data management, and business logic

### Communication Flow
```
Next.js Frontend (Port 3000)
         ↕️ HTTP/AJAX Requests
Laravel Backend (Port 8000)
         ↕️ Database Queries  
    MySQL/SQLite Database
```

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── (app)/             # Authenticated app layout
│   │   ├── dashboard/     # User dashboard
│   │   ├── groups/        # Group management
│   │   ├── tivoli/        # Main Tivoli grid
│   │   └── votes/         # Voting system
│   ├── (auth)/            # Authentication pages
│   └── layout.js          # Root layout
├── components/            # Reusable components
│   ├── amusement/         # Amusement-related components
│   ├── forms/             # Form components
│   ├── group-information/ # Group display components
│   ├── tivoli/            # Tivoli grid system
│   └── voting/            # Voting components
├── hooks/                 # Custom React hooks
├── lib/                   # Utility functions
└── public/               # Static assets
```

## 🎮 Core Components

### Tivoli Grid System
The heart of the application featuring:
- **GridPrinter**: Main grid container with responsive layout
- **GridCell**: Individual interactive cells
- **Avatar**: Animated character with sprite-based animations
- **AvatarAnimation**: Handles sprite sheet animations

### Game Integration
- **GameIframe**: Responsive iframe wrapper for games
- **JwtMessageBridge**: Secure communication with embedded games
- **Responsive Design**: Adapts game display to device orientation

### Authentication Flow
- **Registration**: API key validation for group assignment
- **Login**: Secure authentication with JWT token generation
- **Profile Management**: User information and image uploads

## 🎨 Styling & Design

- **Tailwind CSS**: Utility-first styling approach
- **Custom CSS**: Specialized animations and effects for Tivoli grid
- **Responsive Design**: Mobile-first approach with breakpoint-specific layouts
- **Theme**: Cohesive design system with consistent color palette

## 🔧 API Integration

The frontend communicates with the Laravel backend through RESTful APIs:

### Authentication Endpoints
- `POST /register` - User registration with API key validation
- `POST /login` - User authentication
- `POST /logout` - User logout
- `GET /sanctum/csrf-cookie` - CSRF token retrieval
- `GET /api/jwt-token` - JWT token for iframe games

### User Management
- `GET /api/user` - Get current user data
- `PATCH /api/user` - Update user profile
- `POST /api/validate-api-key` - Validate group API key

### Amusement Management  
- `GET /api/amusements` - List all amusements
- `POST /api/amusements` - Create new amusement
- `PUT /api/amusements/{id}` - Update amusement
- `DELETE /api/amusements/{id}` - Delete amusement

### Group & Social Features
- `GET /api/groups` - List all groups
- `GET /api/users` - List all users
- `POST /api/votes` - Submit vote for amusement
- `GET /api/votes` - Get voting statistics

> **Backend Repository**: The complete API documentation and Laravel backend code is available in the [backend repository](https://github.com/WU24-Tivoli-Team-Backend/tivoli-backend).

## 🎯 Key Features Explained

### Interactive Grid Navigation
Users click on grid cells to move their avatar around the Tivoli park. Special cells contain amusements that trigger modals with game details and playable content.

### JWT Game Communication
Games embedded in iframes receive JWT tokens for authentication, enabling secure communication between the parent application and student-created games.

### Responsive Game Display
Games automatically adjust their aspect ratios based on device type:
- Mobile Portrait: 9:16
- Mobile Landscape: 16:9  
- Tablet Portrait: 4:3
- Desktop: 16:9 or 21:9

### Stamp Collection System
Users earn stamps by interacting with amusements, creating a gamification layer that encourages exploration.

## 🤝 Contributing

This project was created for YRGO's web development course. Students contribute by:
1. Creating their own amusements/games
2. Integrating games with the JWT communication system
3. Adding game metadata and descriptions
4. Participating in the voting system

## 📝 License

This project is created for educational purposes as part of YRGO's web development curriculum.

## 🙏 Acknowledgments

- **[Laravel Breeze - Next.js Edition](https://github.com/laravel/breeze-next)** - Authentication scaffolding and project foundation
- **YRGO** - For providing the educational framework
- **Student Developers** - For creating amazing games and attractions
- **Red Panda** - Our beloved mascot throughout the platform

---

**Built with ❤️ by YRGO Web Development Students**
