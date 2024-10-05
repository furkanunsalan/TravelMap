import admin from "firebase-admin";

// Initialize Firebase Admin if not already initialized
if (!admin.apps.length) {
    // eslint-disable-next-line no-undef
    const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);

    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        // Firestore is not necessary for the storage bucket but can be added if needed
    });
}

export const db = admin.firestore();
