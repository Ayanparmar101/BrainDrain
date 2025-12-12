# 🎓 BrainDrain Student Portal

A comprehensive student portal built with React, Vite, and Firebase for managing courses, internships, and student profiles.

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
- Editable student profiles
- Real-time Firestore sync
- Personal details, skills, and achievements
- CGPA and semester tracking

### 📚 Learning Portal
- 14+ industry-relevant courses
- Multi-module course structure
- Video player integration
- Progress tracking

### 💼 Internship Opportunities
- Browse available internships
- Filter by domain and location
- Application tracking

### 🔔 Notifications
- Real-time notification system
- Firestore-powered updates
- Categorized by type (info, success, warning)
- Unread count badges

### 📊 Dashboard
- Hub for learning and internships
- Quick access to all features
- Clean, professional UI

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm
- Firebase account
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd BrainDrain
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up Firebase** (Already configured!)
   - Project ID: `braindrain-portal-v1`
   - Firestore and Authentication enabled
   - Configuration in `src/firebase.js`

4. **Run development server**
   ```bash
   npm run dev
   ```

5. **Open in browser**
   ```
   http://localhost:5173
   ```

## 📁 Project Structure

```
BrainDrain/
├── src/
│   ├── components/
│   │   └── Layout.jsx          # Main layout with sidebar
│   ├── contexts/
│   │   └── AuthContext.jsx     # Authentication context
│   ├── pages/
│   │   ├── Login.jsx           # Login page
│   │   ├── Dashboard.jsx       # Main dashboard
│   │   ├── Courses.jsx         # Course listing
│   │   ├── CoursePlayer.jsx    # Course player
│   │   ├── Internships.jsx     # Internship listings
│   │   ├── Profile.jsx         # User profile
│   │   ├── Notifications.jsx   # Notifications page
│   │   ├── Resources.jsx       # Resources
│   │   └── Certificates.jsx    # Certificates
│   ├── utils/
│   │   └── notifications.js    # Notification helpers
│   ├── firebase.js             # Firebase configuration
│   ├── App.jsx                 # Main app component
│   ├── main.jsx                # Entry point
│   └── index.css               # Global styles
├── public/
│   └── videos/                 # Video assets
├── firebase.json               # Firebase config
├── firestore.rules             # Firestore security rules
├── FIREBASE_SETUP.md           # Firebase setup guide
├── DEPLOYMENT.md               # Deployment instructions
└── package.json
```

## 🛠️ Tech Stack

- **Frontend**: React 18, Vite
- **Styling**: CSS Variables, Custom Design System
- **Backend**: Firebase
  - Authentication
  - Firestore Database
  - Hosting
- **Icons**: Lucide React
- **Routing**: React Router DOM

## 🎨 Design System

### Colors
- Primary: `#0B3D91` (NASA Blue)
- Accent: `#FC3D21` (NASA Red)
- Surface: `#F8F9FA`
- Text: `#1A1A1A`

### Components
- Modern, clean interface
- Responsive design
- Smooth transitions
- Professional aesthetics

## 📊 Firebase Collections

### `users/{userId}`
```javascript
{
  name: string,
  email: string,
  phone: string,
  location: string,
  department: string,
  semester: string,
  cgpa: string,
  skills: array,
  achievements: array,
  createdAt: timestamp,
  updatedAt: timestamp
}
```

### `notifications/{notificationId}`
```javascript
{
  userId: string,
  title: string,
  message: string,
  type: 'info' | 'success' | 'warning',
  read: boolean,
  createdAt: timestamp
}
```

## 🔒 Security

- Firebase Authentication required for all routes
- Firestore rules restrict data access to authenticated users
- Users can only read/write their own data
- Environment variables for sensitive config (recommended for production)

## 📦 Available Scripts

```bash
# Development
npm run dev          # Start dev server

# Production
npm run build        # Build for production
npm run preview      # Preview production build

# Deployment
firebase deploy      # Deploy to Firebase Hosting
```

## 🌐 Deployment

### Firebase Hosting (Recommended)

1. **Build the app**
   ```bash
   npm run build
   ```

2. **Deploy**
   ```bash
   firebase deploy
   ```

3. **Live URL**
   ```
   https://braindrain-portal-v1.web.app
   ```

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed instructions.

## 🧪 Testing

### Create Test User
1. Go to Firebase Console > Authentication
2. Add user with email/password
3. Use credentials to login

### Test Features
- ✅ Login/Logout
- ✅ Profile editing
- ✅ Course navigation
- ✅ Notifications

## 📝 Environment Variables

For production, create `.env.production`:

```env
VITE_FIREBASE_API_KEY=your-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-auth-domain
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-storage-bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
VITE_FIREBASE_APP_ID=your-app-id
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 👥 Authors

- **Ayan Parmar** - Initial work

## 🙏 Acknowledgments

- Firebase for backend services
- React team for the framework
- Vite for blazing fast builds
- Lucide for beautiful icons

## 📞 Support

For issues and questions:
- Create an issue on GitHub
- Check [FIREBASE_SETUP.md](./FIREBASE_SETUP.md) for Firebase help
- Review [DEPLOYMENT.md](./DEPLOYMENT.md) for deployment issues

---

**Built with ❤️ for students**

**Status**: ✅ Production Ready
**Version**: 1.0.0
**Last Updated**: November 2024
