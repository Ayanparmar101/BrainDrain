# 🔐 NutraSim Sign-In Setup Guide

## Quick Fix for Sign-In Issues

### Step 1: Enable Email/Password Authentication in Firebase

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project: **braindrain-portal-v1**
3. Click **Authentication** in the left sidebar
4. Go to **Sign-in method** tab
5. Click on **Email/Password**
6. Toggle **Enable** to ON
7. Click **Save**

### Step 2: Create a Test User Account

You have two options:

#### Option A: Using Firebase Console (Recommended)
1. Still in **Authentication** section
2. Click **Users** tab
3. Click **Add User**
4. Enter:
   - Email: `demo@nutrasim.com`
   - Password: `demo123`
5. Click **Add User**

#### Option B: Using the Sign-Up Flow
1. Modify the Login.jsx to add a sign-up button (already done!)
2. Create a sign-up page that calls the `signup` function from AuthContext
3. Sign up with your details

### Step 3: Test Login

1. Open your app at `http://localhost:5173`
2. Enter credentials:
   - Email: `demo@nutrasim.com`
   - Password: `demo123`
3. Click **Sign In**

## Common Issues & Solutions

### Issue: "Failed to sign in"
**Solution**: Make sure Email/Password authentication is enabled in Firebase Console (Step 1 above)

### Issue: "User not found"
**Solution**: Create a user account first using Firebase Console (Step 2 above)

### Issue: "Invalid email or password"
**Solution**: 
- Check that you typed the email and password correctly
- Passwords are case-sensitive
- Make sure the user exists in Firebase Authentication Users list

### Issue: "Network error"
**Solution**:
- Check your internet connection
- Verify Firebase config in `src/firebase.js` is correct
- Check browser console for detailed error messages

### Issue: App keeps loading
**Solution**:
- Clear browser cache
- Check browser console for errors
- Verify Firebase is initialized correctly

## Test Account Credentials

After setting up in Firebase Console, use:
- **Email**: `demo@nutrasim.com`
- **Password**: `demo123`

## Need More Help?

1. **Check Browser Console**: Press F12 and look at Console tab for error messages
2. **Check Firebase Rules**: Make sure Firestore rules allow authenticated users to read/write
3. **Verify Firebase Config**: Check that `src/firebase.js` has the correct credentials

## Firestore Security Rules

Make sure your Firestore has these rules set up:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can read/write their own data
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Notifications for authenticated users
    match /notifications/{notificationId} {
      allow read: if request.auth != null;
      allow write: if request.auth != null;
    }
    
    // Courses - everyone can read
    match /courses/{courseId} {
      allow read: if true;
      allow write: if false;
    }
  }
}
```

## Quick Debug Steps

1. Open browser DevTools (F12)
2. Go to Console tab
3. Try to sign in
4. Look for any error messages
5. Common errors:
   - `auth/user-not-found`: User doesn't exist - create the account first
   - `auth/wrong-password`: Incorrect password
   - `auth/invalid-email`: Email format is wrong
   - `auth/operation-not-allowed`: Email/Password auth not enabled in Firebase
   - `auth/network-request-failed`: Internet or Firebase connection issue

## Success! 🎉

Once you can sign in, you'll see the NutraSim Dashboard with:
- Your 14-day streak tracker
- Nutrition courses
- Health metrics
- Leaderboard and achievements
- And much more!

---

**Still having issues?** Check the browser console and share the error message for more specific help.
