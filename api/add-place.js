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

export const db = admin.firestore();

export default async function handler(req, res) {
    if (req.method === 'POST') {
        try {
            const newPlace = req.body;

            // Validate newPlace object structure if needed
            if (!newPlace.slug || !newPlace.name || !newPlace.latitude || !newPlace.longtitude) {
                return res.status(400).json({ message: 'Missing required fields' });
            }

            // Add the new place to the 'places' collection
            await db.collection('places').add(newPlace);

            res.status(200).json({ message: 'Place added successfully' });
        } catch (error) {
            console.error('Error adding place:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
