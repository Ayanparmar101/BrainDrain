/**
 * Database Test Script
 * 
 * This script tests all database operations.
 * Run this in your browser console or create a test page.
 */

import {
    getAllDocuments,
    getDocument,
    createDocument,
    updateDocument,
    queryDocuments,
    listenToCollection
} from './utils/database';
import { addNotification } from './utils/notifications';

// Test 1: Get all users
export const testGetAllUsers = async () => {
    console.log('🧪 Test 1: Getting all users...');
    try {
        const users = await getAllDocuments('users');
        console.log('✅ Success! Found', users.length, 'users');
        console.log('Users:', users);
        return users;
    } catch (error) {
        console.error('❌ Failed:', error);
    }
};

// Test 2: Get specific user
export const testGetUser = async (userId) => {
    console.log('🧪 Test 2: Getting user', userId);
    try {
        const user = await getDocument('users', userId);
        console.log('✅ Success! User data:', user);
        return user;
    } catch (error) {
        console.error('❌ Failed:', error);
    }
};

// Test 3: Create test notification
export const testCreateNotification = async (userId) => {
    console.log('🧪 Test 3: Creating test notification...');
    try {
        await addNotification(userId, {
            title: 'Test Notification',
            message: 'This is a test notification created by the test script',
            type: 'info'
        });
        console.log('✅ Success! Notification created');
    } catch (error) {
        console.error('❌ Failed:', error);
    }
};

// Test 4: Query notifications
export const testQueryNotifications = async (userId) => {
    console.log('🧪 Test 4: Querying notifications for user', userId);
    try {
        const notifications = await queryDocuments(
            'notifications',
            [{ field: 'userId', operator: '==', value: userId }],
            'createdAt'
        );
        console.log('✅ Success! Found', notifications.length, 'notifications');
        console.log('Notifications:', notifications);
        return notifications;
    } catch (error) {
        console.error('❌ Failed:', error);
    }
};

// Test 5: Real-time listener
export const testRealtimeListener = () => {
    console.log('🧪 Test 5: Setting up real-time listener...');
    try {
        const unsubscribe = listenToCollection('notifications', (data) => {
            console.log('📡 Real-time update! Notifications:', data.length);
        });
        console.log('✅ Listener active! Make changes in Firebase Console to see updates.');
        console.log('💡 Call unsubscribe() to stop listening');
        return unsubscribe;
    } catch (error) {
        console.error('❌ Failed:', error);
    }
};

// Run all tests
export const runAllTests = async (userId) => {
    console.log('🚀 Running all database tests...\n');

    await testGetAllUsers();
    console.log('\n');

    await testGetUser(userId);
    console.log('\n');

    await testCreateNotification(userId);
    console.log('\n');

    await testQueryNotifications(userId);
    console.log('\n');

    const unsubscribe = testRealtimeListener();
    console.log('\n');

    console.log('✅ All tests completed!');
    console.log('💡 Listener is still active. Call unsubscribe() to stop.');

    return unsubscribe;
};

/**
 * HOW TO USE:
 * 
 * 1. In your React component:
 * 
 * import { runAllTests } from './utils/databaseTests';
 * import { useAuth } from './contexts/AuthContext';
 * 
 * const { currentUser } = useAuth();
 * 
 * // Run tests
 * const unsubscribe = await runAllTests(currentUser.uid);
 * 
 * // Later, stop the listener
 * unsubscribe();
 * 
 * 
 * 2. Or in browser console (after logging in):
 * 
 * import('./utils/databaseTests').then(tests => {
 *   tests.runAllTests('your-user-id-here');
 * });
 */

export default {
    testGetAllUsers,
    testGetUser,
    testCreateNotification,
    testQueryNotifications,
    testRealtimeListener,
    runAllTests
};
