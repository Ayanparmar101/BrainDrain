# 🥗 NutraSim - Nutrition & Wellness Platform

A comprehensive nutrition and wellness simulation platform built with React, Vite, and Firebase for managing nutrition courses, meal plans, and health tracking.

![Status](https://img.shields.io/badge/status-ready-success)
![Firebase](https://img.shields.io/badge/firebase-integrated-orange)
![React](https://img.shields.io/badge/react-18.x-blue)

## ✨ Features

### 🔐 Authentication
- Firebase Authentication with email/password
- Protected routes
- Persistent login sessions
- Secure logout

### 👤 Profile Management
- Editable user profiles
- Real-time Firestore sync
- Personal details, dietary preferences, and health goals
- BMI and health score tracking

### 📚 Learning Hub
- 30+ nutrition and wellness courses
- Multi-module course structure
- Video player integration
- Progress tracking
- Categories: Sports Nutrition, Plant-Based, Clinical, Holistic, and more

### 🍎 Nutrition Programs
- Certified Nutritionist Program
- Dietitian Internship opportunities
- Sports Nutrition Specialist training
- Wellness Coach certification

### 🔔 Notifications
- Real-time notification system
- Firestore-powered updates
- Meal plan reminders
- Course deadlines and achievements

### 📊 Dashboard
- Comprehensive health and learning analytics
- 14-day streak tracking
- Nutrition schedule visualization
- Achievement system with badges
- Global leaderboard
- Interactive tabs: Overview, Courses, Activity, Achievements, Leaderboard, Schedule

### 🧪 Tools & Simulations
- BMI Calculator & Body Composition Analyzer
- Meal Planning Simulator
- Nutrient Tracker
- Calorie Calculator

### 📜 Certificates
- Digital certificate gallery
- Downloadable certificates
- Course completion tracking

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm
- Firebase account
- Git

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd BrainDrain
```

2. **Install dependencies**
```bash
npm install
```

3. **Configure Firebase**
   - Create a Firebase project
   - Enable Authentication (Email/Password)
   - Create a Firestore database
   - Copy your config to `src/firebase.js`

4. **Start development server**
```bash
npm run dev
```

## 🎨 Design Theme

NutraSim uses a health-focused design with:
- **Primary Color**: Green (#16a34a) - Health and wellness
- **Accent Color**: Orange (#f97316) - Energy and vitality
- **Background**: Light gradients with green and orange accents

## 📊 Firebase Collections

### `users/{userId}`
- name, email, phone, location
- age, weight, height, bmi
- dietaryPreferences, healthGoals
- healthScore

### `notifications/{notificationId}`
- userId, title, message, type
- read status, timestamp

### `courses/{courseId}`
- title, category, level, duration
- instructor, modules, rating

### `enrollments/{enrollmentId}`
- userId, courseId, progress
- lastAccessed, completed

## 📦 Available Scripts

```bash
npm run dev      # Start dev server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

## 🌐 Deployment

### Firebase Hosting
```bash
npm install -g firebase-tools
firebase login
firebase init hosting
npm run build
firebase deploy
```

## 🎯 Key Features

### Dashboard Analytics
- Real-time stats tracking
- 14-day learning streak
- Health score visualization
- Global leaderboard
- Activity feed
- Weekly nutrition tracking

### Course System
- 30+ nutrition courses
- Progress tracking
- Interactive modules
- Certificates upon completion

### Achievement System
- Badges for milestones
- Rarity levels (Common to Legendary)
- Points system
- Progress tracking

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push and open a Pull Request

## 📄 License

MIT License

## 👥 Authors

- **Ayan Parmar** - NutraSim Platform Development

## 🙏 Acknowledgments

- Firebase for backend services
- React and Vite teams
- Lucide for icons
- Nutrition science community

## 🔮 Future Enhancements

- AI-powered meal recommendations
- Barcode scanner for food logging
- Fitness tracker integration
- Social community features
- Mobile app (React Native)
- Telemedicine integration
- Recipe database
- Grocery list generator

---

**Built with ❤️ for health and wellness**

**Status**: ✅ Production Ready  
**Version**: 1.0.0  
**Last Updated**: January 2026  
**Platform**: NutraSim - Nutrition & Wellness Simulation Platform
