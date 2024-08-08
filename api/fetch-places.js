// api/fetch-places.js
import admin from 'firebase-admin';

// Initialize Firebase Admin if not already initialized
if (!admin.apps.length) {
    // eslint-disable-next-line no-undef
    const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);

    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        // Firestore is not necessary for the storage bucket but can be added if needed
    });
}

const db = admin.firestore();

export default async (req, res) => {
    try {
        // Reference to the Firestore collection 'places'
        const placesRef = db.collection('places');
        const snapshot = await placesRef.get();

        if (snapshot.empty) {
            res.status(404).json({ message: 'No places found' });
            return;
        }

        // Map over documents and get data
        const places = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
        }));

        res.status(200).json({ places });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error', details: error.message });
    }
};
