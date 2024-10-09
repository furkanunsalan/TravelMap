import admin from "firebase-admin";

// Initialize Firebase Admin if not already initialized
if (!admin.apps.length) {
    const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);

    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        storageBucket: "travelmap-d6020.appspot.com", // Add the Firebase Storage bucket
    });
}

export const db = admin.firestore();
export const storage = admin.storage(); // Export the Firebase Storage instance
