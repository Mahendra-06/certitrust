# CERTI-TRUST Frontend

A modern, responsive frontend application for the CERTI-TRUST certificate verification platform built with React, TypeScript, and Tailwind CSS.

## Features

### 🏠 Home Page
- Hero section with compelling call-to-action
- User type selection cards
- Feature highlights
- Statistics and testimonials
- Modern gradient backgrounds and animations

### 👥 User Types
- **Government**: Certificate management and verification
- **Institute**: Student certificate issuance and management
- **Student**: Personal certificate portfolio and sharing
- **Recruiter/Verifier**: Candidate certificate verification

### 🔐 Authentication
- User-specific login pages with tailored UI
- Registration form for institutes
- Password strength indicators
- Demo credentials for testing

### 📊 Dashboards
- Role-specific dashboard layouts
- Real-time statistics and metrics
- Certificate management tables
- Quick action buttons
- Responsive design for all screen sizes

### 🎨 Design System
- Consistent color scheme with primary blue theme
- Modern typography using Inter font
- Smooth animations and transitions
- Hover effects and micro-interactions
- Mobile-first responsive design

## Technology Stack

- **React 18** - Modern React with hooks
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Client-side routing
- **Lucide React** - Beautiful icon library

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Navigate to the Frontend directory:
```bash
cd Frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### Available Scripts

- `npm start` - Runs the app in development mode
- `npm run build` - Builds the app for production
- `npm test` - Launches the test runner
- `npm run eject` - Ejects from Create React App

## Project Structure

```
src/
├── components/
│   └── Layout.tsx          # Main layout with navigation
├── pages/
│   ├── Home.tsx           # Landing page
│   ├── About.tsx          # About page
│   ├── Benefits.tsx       # Benefits page
│   ├── UserTypeSelection.tsx # User type selection
│   ├── Login.tsx          # Login page
│   ├── Register.tsx       # Registration page
│   └── Dashboard.tsx      # Dashboard page
├── App.tsx                # Main app component
├── index.tsx              # App entry point
└── index.css              # Global styles and Tailwind imports
```

## User Flow

1. **Landing Page** → User sees the main CERTI-TRUST homepage
2. **User Type Selection** → User chooses their role (Government, Institute, Student, Recruiter)
3. **Authentication** → User logs in or registers based on their role
4. **Dashboard** → User accesses their personalized dashboard with role-specific features

## Design Features

### Color Palette
- Primary: Blue (#3B82F6)
- Secondary: Gray (#64748B)
- Success: Green (#10B981)
- Warning: Yellow (#F59E0B)
- Error: Red (#EF4444)

### Typography
- Font Family: Inter (Google Fonts)
- Headings: Bold weights (600-700)
- Body: Regular weight (400-500)

### Components
- Consistent button styles with hover effects
- Card components with subtle shadows
- Form inputs with focus states
- Responsive grid layouts
- Smooth page transitions

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is part of the SIH (Smart India Hackathon) prototype for CERTI-TRUST.

## Demo Credentials

For testing purposes, use these demo credentials:

- **Email**: demo@{userType}.com
- **Password**: demo123

Replace {userType} with: government, institute, student, or recruiter
