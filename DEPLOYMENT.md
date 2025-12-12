# 🚀 Deployment Guide - BrainDrain Student Portal

## Prerequisites
- Node.js and npm installed
- Firebase CLI installed (`npm install -g firebase-tools`)
- Firebase project created (✅ Done: braindrain-portal-v1)

## Quick Deploy

### Step 1: Build the Application
```bash
npm run build
```
This creates an optimized production build in the `dist` folder.

### Step 2: Deploy to Firebase Hosting
```bash
firebase deploy
```

Your app will be live at: **https://braindrain-portal-v1.web.app**

## Detailed Deployment Steps

### 1. Pre-Deployment Checklist

- [ ] All code changes committed
- [ ] Firebase configuration is correct
- [ ] Environment variables set (if any)
- [ ] Build completes without errors
- [ ] Test locally with `npm run dev`

### 2. Build for Production

```bash
# Install dependencies (if not already done)
npm install

# Create production build
npm run build
```

**What this does:**
- Bundles all React components
- Minifies JavaScript and CSS
- Optimizes assets
- Outputs to `dist/` folder

### 3. Test Production Build Locally (Optional)

```bash
# Preview the production build
npm run preview
```

### 4. Deploy to Firebase

```bash
# Deploy everything (Hosting + Firestore rules)
firebase deploy

# Or deploy specific services:
firebase deploy --only hosting
firebase deploy --only firestore:rules
```

### 5. Verify Deployment

1. Visit: https://braindrain-portal-v1.web.app
2. Test login functionality
3. Check profile updates
4. Verify notifications load

## Deployment Options

### Option A: Firebase Hosting (Recommended) ✅
- **Pros**: Free tier, CDN, SSL, easy rollback
- **Cons**: Limited to static hosting
- **Cost**: Free for most use cases

```bash
firebase deploy
```

### Option B: Vercel
1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel`
3. Follow prompts

### Option C: Netlify
1. Drag and drop `dist` folder to Netlify
2. Or use Netlify CLI:
   ```bash
   npm i -g netlify-cli
   netlify deploy --prod --dir=dist
   ```

## Environment Configuration

### For Production
Create `.env.production`:
```env
VITE_FIREBASE_API_KEY=your-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-auth-domain
VITE_FIREBASE_PROJECT_ID=your-project-id
```

Update `src/firebase.js` to use environment variables:
```javascript
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  // ... etc
};
```

## Post-Deployment Tasks

### 1. Update Firestore Security Rules

Go to Firebase Console > Firestore Database > Rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users collection
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Notifications collection
    match /notifications/{notificationId} {
      allow read: if request.auth != null && resource.data.userId == request.auth.uid;
      allow create: if request.auth != null; // Allow users to create their own notifications
    }
    
    // Courses collection (read-only for all authenticated users)
    match /courses/{courseId} {
      allow read: if request.auth != null;
    }
  }
}
```

### 2. Set Up Authentication

In Firebase Console > Authentication:
1. Enable Email/Password sign-in method
2. (Optional) Enable Google sign-in
3. (Optional) Configure email templates

### 3. Create Initial Test User

```bash
# Using Firebase Console
1. Go to Authentication > Users
2. Click "Add User"
3. Email: test@student.com
4. Password: Test123!
```

### 4. Add Sample Data

Use Firebase Console or create a script:

```javascript
// Example: Add sample notification
import { addNotification } from './src/utils/notifications';

await addNotification('user-uid', {
  title: 'Welcome!',
  message: 'Welcome to BrainDrain Student Portal',
  type: 'success'
});
```

## Continuous Deployment

### GitHub Actions (Automated)

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Firebase

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run build
      - uses: FirebaseExtended/action-hosting-deploy@v0
        with:
          repoToken: '${{ secrets.GITHUB_TOKEN }}'
          firebaseServiceAccount: '${{ secrets.FIREBASE_SERVICE_ACCOUNT }}'
          channelId: live
          projectId: braindrain-portal-v1
```

## Rollback

If something goes wrong:

```bash
# View deployment history
firebase hosting:channel:list

# Rollback to previous version
firebase hosting:clone SOURCE_SITE_ID:SOURCE_CHANNEL_ID TARGET_SITE_ID:live
```

## Monitoring

### Firebase Console
- **Hosting**: View traffic and bandwidth
- **Authentication**: Monitor sign-ins
- **Firestore**: Check read/write operations
- **Performance**: Track load times

### Set Up Alerts
1. Go to Firebase Console > Alerts
2. Configure alerts for:
   - High error rates
   - Unusual traffic
   - Quota limits

## Troubleshooting

### Build Fails
```bash
# Clear cache and rebuild
rm -rf node_modules dist
npm install
npm run build
```

### Deployment Fails
```bash
# Re-authenticate
firebase login --reauth

# Check project
firebase use braindrain-portal-v1

# Try again
firebase deploy
```

### 404 Errors After Deploy
- Check `firebase.json` has correct rewrites
- Verify `dist` folder exists
- Ensure build completed successfully

## Performance Optimization

### Before Deploying
1. **Optimize Images**: Use WebP format
2. **Code Splitting**: Vite handles this automatically
3. **Lazy Loading**: Implement for routes
4. **Caching**: Configure in `firebase.json`

### firebase.json Optimization
```json
{
  "hosting": {
    "public": "dist",
    "headers": [
      {
        "source": "**/*.@(jpg|jpeg|gif|png|svg|webp)",
        "headers": [
          {
            "key": "Cache-Control",
            "value": "max-age=31536000"
          }
        ]
      }
    ]
  }
}
```

## Cost Estimation

### Firebase Free Tier (Spark Plan)
- **Hosting**: 10 GB storage, 360 MB/day transfer
- **Firestore**: 1 GB storage, 50K reads/day, 20K writes/day
- **Authentication**: Unlimited

### Typical Usage (100 active users/day)
- Hosting: ~100 MB/day ✅ Free
- Firestore: ~5K reads, ~1K writes ✅ Free
- Auth: Unlimited ✅ Free

**Estimated Cost**: $0/month for small to medium usage

## Support & Resources

- **Firebase Docs**: https://firebase.google.com/docs
- **Vite Docs**: https://vitejs.dev
- **React Docs**: https://react.dev

---

**Ready to Deploy?** Run: `npm run build && firebase deploy`

**Live URL**: https://braindrain-portal-v1.web.app (after deployment)
