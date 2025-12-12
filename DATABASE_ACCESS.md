# 🔥 Firebase Database Access Guide

## Quick Links

### 🌐 Firebase Console (Web Interface)
**URL**: https://console.firebase.google.com
**Login**: gauri4523@gmail.com
**Project**: braindrain-portal-v1

---

## 📊 Accessing Your Data

### Method 1: Firebase Console (Easiest)

1. **Open Firebase Console**
   - Go to: https://console.firebase.google.com
   - Sign in with your Google account

2. **Select Project**
   - Click on **"braindrain-portal-v1"**

3. **Navigate to Firestore**
   - Left sidebar → **"Firestore Database"**
   - You'll see all your collections

4. **View Collections**
   - **users** - Student profiles
   - **notifications** - User notifications
   - **courses** - Course data (if added)

5. **Actions You Can Do**
   - ✅ View all documents
   - ✅ Add new documents
   - ✅ Edit existing documents
   - ✅ Delete documents
   - ✅ Search and filter
   - ✅ Export data

---

### Method 2: In Your Code

Use the helper functions I created in `src/utils/database.js`:

```javascript
import { 
  getAllDocuments, 
  getDocument, 
  createDocument,
  updateDocument,
  deleteDocument 
} from './utils/database';

// Get all users
const users = await getAllDocuments('users');

// Get specific user
const user = await getDocument('users', 'userId123');

// Create new document
await createDocument('notifications', {
  title: 'Test',
  message: 'Hello'
});

// Update document
await updateDocument('users', 'userId123', {
  phone: '+91 1234567890'
});

// Delete document
await deleteDocument('notifications', 'notifId123');
```

---

### Method 3: Firebase CLI

```bash
# View Firestore data
firebase firestore:indexes

# Export data
firebase firestore:export gs://your-bucket/export

# Import data
firebase firestore:import gs://your-bucket/export
```

---

## 📁 Your Database Structure

### Collection: `users`
**Path**: `/users/{userId}`

```javascript
{
  name: "Ayan Parmar",
  email: "ayan@example.com",
  phone: "+91 98765 43210",
  location: "Mumbai, India",
  department: "Computer Science & Engineering",
  semester: "6th Semester",
  cgpa: "8.9",
  skills: ["React", "Node.js", "Python"],
  achievements: ["Winner of Hackathon"],
  createdAt: Timestamp,
  updatedAt: Timestamp
}
```

### Collection: `notifications`
**Path**: `/notifications/{notificationId}`

```javascript
{
  userId: "user-uid-here",
  title: "New Course Available",
  message: "Introduction to AI Ethics has been added.",
  type: "info", // 'info' | 'success' | 'warning'
  read: false,
  createdAt: Timestamp
}
```

---

## 🔍 Common Operations

### 1. View All Users
**Console**: Firestore Database → users collection
**Code**:
```javascript
const users = await getAllDocuments('users');
console.log(users);
```

### 2. View User Profile
**Console**: Firestore Database → users → [userId]
**Code**:
```javascript
const user = await getDocument('users', currentUser.uid);
```

### 3. View All Notifications
**Console**: Firestore Database → notifications collection
**Code**:
```javascript
const notifications = await getAllDocuments('notifications');
```

### 4. Add Test Notification
**Console**: 
1. Go to notifications collection
2. Click "Add document"
3. Auto-generate ID or specify
4. Add fields:
   - userId: (your user ID)
   - title: "Test Notification"
   - message: "This is a test"
   - type: "info"
   - read: false
   - createdAt: (use timestamp)

**Code**:
```javascript
import { addNotification } from './utils/notifications';

await addNotification('user-uid', {
  title: 'Test',
  message: 'Hello World',
  type: 'success'
});
```

### 5. Update User Profile
**Console**: 
1. Navigate to users → [userId]
2. Click on field to edit
3. Save changes

**Code**:
```javascript
await updateDocument('users', userId, {
  phone: '+91 1234567890',
  location: 'Delhi'
});
```

---

## 🛠️ Useful Database Functions

### Get Current User's Data
```javascript
import { useAuth } from './contexts/AuthContext';
import { getDocument } from './utils/database';

const { currentUser } = useAuth();
const userData = await getDocument('users', currentUser.uid);
```

### Listen to Real-time Updates
```javascript
import { listenToCollection } from './utils/database';

// Start listening
const unsubscribe = listenToCollection('notifications', (data) => {
  console.log('Updated notifications:', data);
  setNotifications(data);
});

// Stop listening when component unmounts
return () => unsubscribe();
```

### Query with Filters
```javascript
import { queryDocuments } from './utils/database';

// Get unread notifications for current user
const unread = await queryDocuments(
  'notifications',
  [
    { field: 'userId', operator: '==', value: currentUser.uid },
    { field: 'read', operator: '==', value: false }
  ],
  'createdAt', // order by
  10 // limit
);
```

---

## 🔐 Security Rules

Current rules allow authenticated users to read/write their own data.

**View/Edit Rules**:
1. Firebase Console → Firestore Database
2. Click "Rules" tab
3. Edit and publish

**Example Rules**:
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can only access their own profile
    match /users/{userId} {
      allow read, write: if request.auth != null 
                         && request.auth.uid == userId;
    }
    
    // Users can read their own notifications
    match /notifications/{notificationId} {
      allow read: if request.auth != null 
                  && resource.data.userId == request.auth.uid;
    }
  }
}
```

---

## 📊 Monitoring & Analytics

### View Database Usage
1. Firebase Console → Firestore Database
2. Click "Usage" tab
3. See:
   - Document reads
   - Document writes
   - Storage used

### Set Up Alerts
1. Firebase Console → Alerts
2. Create alert for:
   - High read/write counts
   - Quota limits
   - Error rates

---

## 🚀 Quick Actions

### Add Sample User
```javascript
import { setDocument } from './utils/database';

await setDocument('users', 'test-user-123', {
  name: 'Test User',
  email: 'test@example.com',
  phone: '+91 9876543210',
  location: 'Mumbai',
  department: 'Computer Science',
  semester: '6th Semester',
  cgpa: '8.5',
  skills: ['React', 'Firebase'],
  achievements: ['Test Achievement']
});
```

### Add Sample Notification
```javascript
import { addNotification } from './utils/notifications';

await addNotification('user-uid-here', {
  title: 'Welcome!',
  message: 'Welcome to BrainDrain Portal',
  type: 'success'
});
```

### Export All Data
```bash
# Using Firebase CLI
firebase firestore:export gs://braindrain-portal-v1.appspot.com/backups
```

---

## 📞 Need Help?

- **Firebase Docs**: https://firebase.google.com/docs/firestore
- **Console**: https://console.firebase.google.com
- **Support**: Firebase Console → Support

---

**Quick Access**: https://console.firebase.google.com/project/braindrain-portal-v1/firestore
