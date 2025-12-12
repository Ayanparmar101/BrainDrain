import {
    collection,
    doc,
    getDoc,
    getDocs,
    setDoc,
    updateDoc,
    deleteDoc,
    addDoc,
    query,
    where,
    orderBy,
    limit,
    onSnapshot,
    serverTimestamp
} from 'firebase/firestore';
import { db } from '../firebase';

/**
 * Firebase Database Access Guide
 * 
 * This file contains all the common database operations you'll need.
 * Import these functions wherever you need database access.
 */

// ==================== READ OPERATIONS ====================

/**
 * Get a single document by ID
 * @param {string} collectionName - Name of the collection
 * @param {string} documentId - ID of the document
 * @returns {Promise<Object>} Document data
 */
export const getDocument = async (collectionName, documentId) => {
    try {
        const docRef = doc(db, collectionName, documentId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            return { id: docSnap.id, ...docSnap.data() };
        } else {
            console.log('No such document!');
            return null;
        }
    } catch (error) {
        console.error('Error getting document:', error);
        throw error;
    }
};

/**
 * Get all documents from a collection
 * @param {string} collectionName - Name of the collection
 * @returns {Promise<Array>} Array of documents
 */
export const getAllDocuments = async (collectionName) => {
    try {
        const querySnapshot = await getDocs(collection(db, collectionName));
        return querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
    } catch (error) {
        console.error('Error getting documents:', error);
        throw error;
    }
};

/**
 * Query documents with filters
 * @param {string} collectionName - Name of the collection
 * @param {Array} filters - Array of filter objects [{field, operator, value}]
 * @param {string} orderByField - Field to order by (optional)
 * @param {number} limitCount - Number of results to limit (optional)
 * @returns {Promise<Array>} Filtered documents
 */
export const queryDocuments = async (collectionName, filters = [], orderByField = null, limitCount = null) => {
    try {
        let q = collection(db, collectionName);

        // Apply filters
        filters.forEach(filter => {
            q = query(q, where(filter.field, filter.operator, filter.value));
        });

        // Apply ordering
        if (orderByField) {
            q = query(q, orderBy(orderByField));
        }

        // Apply limit
        if (limitCount) {
            q = query(q, limit(limitCount));
        }

        const querySnapshot = await getDocs(q);
        return querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
    } catch (error) {
        console.error('Error querying documents:', error);
        throw error;
    }
};

/**
 * Listen to real-time updates on a collection
 * @param {string} collectionName - Name of the collection
 * @param {Function} callback - Function to call when data changes
 * @returns {Function} Unsubscribe function
 */
export const listenToCollection = (collectionName, callback) => {
    const unsubscribe = onSnapshot(
        collection(db, collectionName),
        (snapshot) => {
            const data = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            callback(data);
        },
        (error) => {
            console.error('Error listening to collection:', error);
        }
    );

    return unsubscribe; // Call this to stop listening
};

// ==================== WRITE OPERATIONS ====================

/**
 * Create a new document with auto-generated ID
 * @param {string} collectionName - Name of the collection
 * @param {Object} data - Document data
 * @returns {Promise<string>} New document ID
 */
export const createDocument = async (collectionName, data) => {
    try {
        const docRef = await addDoc(collection(db, collectionName), {
            ...data,
            createdAt: serverTimestamp()
        });
        console.log('Document created with ID:', docRef.id);
        return docRef.id;
    } catch (error) {
        console.error('Error creating document:', error);
        throw error;
    }
};

/**
 * Create or overwrite a document with specific ID
 * @param {string} collectionName - Name of the collection
 * @param {string} documentId - ID for the document
 * @param {Object} data - Document data
 */
export const setDocument = async (collectionName, documentId, data) => {
    try {
        await setDoc(doc(db, collectionName, documentId), {
            ...data,
            updatedAt: serverTimestamp()
        });
        console.log('Document set successfully');
    } catch (error) {
        console.error('Error setting document:', error);
        throw error;
    }
};

/**
 * Update specific fields in a document
 * @param {string} collectionName - Name of the collection
 * @param {string} documentId - ID of the document
 * @param {Object} updates - Fields to update
 */
export const updateDocument = async (collectionName, documentId, updates) => {
    try {
        const docRef = doc(db, collectionName, documentId);
        await updateDoc(docRef, {
            ...updates,
            updatedAt: serverTimestamp()
        });
        console.log('Document updated successfully');
    } catch (error) {
        console.error('Error updating document:', error);
        throw error;
    }
};

/**
 * Delete a document
 * @param {string} collectionName - Name of the collection
 * @param {string} documentId - ID of the document
 */
export const deleteDocument = async (collectionName, documentId) => {
    try {
        await deleteDoc(doc(db, collectionName, documentId));
        console.log('Document deleted successfully');
    } catch (error) {
        console.error('Error deleting document:', error);
        throw error;
    }
};

// ==================== EXAMPLE USAGE ====================

/**
 * EXAMPLES - How to use these functions in your components
 */

// Example 1: Get all users
// const users = await getAllDocuments('users');

// Example 2: Get a specific user
// const user = await getDocument('users', 'user-id-123');

// Example 3: Query notifications for a user
// const notifications = await queryDocuments(
//   'notifications',
//   [{ field: 'userId', operator: '==', value: 'user-id-123' }],
//   'createdAt',
//   10
// );

// Example 4: Create a new notification
// const notifId = await createDocument('notifications', {
//   userId: 'user-id-123',
//   title: 'Welcome!',
//   message: 'Welcome to the portal',
//   type: 'success',
//   read: false
// });

// Example 5: Update a user profile
// await updateDocument('users', 'user-id-123', {
//   phone: '+91 98765 43210',
//   location: 'Mumbai'
// });

// Example 6: Listen to real-time updates
// const unsubscribe = listenToCollection('notifications', (data) => {
//   console.log('Notifications updated:', data);
// });
// // Later, stop listening:
// unsubscribe();

// Example 7: Delete a notification
// await deleteDocument('notifications', 'notification-id-123');

export default {
    getDocument,
    getAllDocuments,
    queryDocuments,
    listenToCollection,
    createDocument,
    setDocument,
    updateDocument,
    deleteDocument
};
