import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';

/**
 * Add a notification for a specific user
 * @param {string} userId - The user's UID
 * @param {object} notification - Notification data
 * @param {string} notification.title - Notification title
 * @param {string} notification.message - Notification message
 * @param {string} notification.type - Type: 'info', 'success', or 'warning'
 */
export const addNotification = async (userId, { title, message, type = 'info' }) => {
    try {
        await addDoc(collection(db, 'notifications'), {
            userId,
            title,
            message,
            type,
            read: false,
            createdAt: serverTimestamp()
        });
        console.log('Notification added successfully');
    } catch (error) {
        console.error('Error adding notification:', error);
        throw error;
    }
};

/**
 * Example usage:
 * 
 * import { addNotification } from './utils/notifications';
 * 
 * // Add a notification
 * await addNotification('user-uid-here', {
 *   title: 'Welcome!',
 *   message: 'Welcome to Udyogwork',
 *   type: 'success'
 * });
 */
