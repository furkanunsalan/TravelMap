import { db } from "../util/firebase.js";
import { getStorage } from "firebase-admin/storage"; // Import Firebase Storage module

export default async (req, res) => {
    try {
        const placesRef = db.collection("places");
        const snapshot = await placesRef.get();

        if (snapshot.empty) {
            res.status(404).json({ message: "No places found" });
            return;
        }

        const places = [];
        const storage = getStorage(); // Fetch Firebase Storage instance
        const defaultImageUrl = '/placeholder.png'; // Your default image path

        // Prepare promises for fetching images
        const imagePromises = snapshot.docs.map(async (doc) => {
            const place = { id: doc.id, ...doc.data() };
            const imagePath = `images/${place.slug}/cover.png`;
            const file = storage.bucket().file(imagePath);

            try {
                const [exists] = await file.exists();
                if (exists) {
                    const coverImageUrl = await file.getSignedUrl({
                        action: 'read',
                        expires: '03-17-2025', // Expiration date for the URL
                    });
                    place.coverImageUrl = coverImageUrl[0]; // Assign the URL to the place object
                } else {
                    place.coverImageUrl = defaultImageUrl; // Set fallback image URL
                }
            } catch (error) {
                console.error(`Error fetching image for ${place.slug}:`, error.message);
                place.coverImageUrl = defaultImageUrl; // Fallback to default image
            }

            return place; // Return the place object
        });

        // Wait for all image promises to resolve
        const resolvedPlaces = await Promise.all(imagePromises);
        res.status(200).json({ places: resolvedPlaces });
    } catch (error) {
        res.status(500).json({
            error: "Internal Server Error",
            details: error.message,
        });
    }
};
