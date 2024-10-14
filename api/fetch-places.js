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
            const coverImagePath = `images/${place.slug}/cover.png`;
            const additionalImagesPath = `images/${place.slug}/additional/`; // Path for additional images
            const coverFile = storage.bucket().file(coverImagePath);
            const additionalImages = [];

            try {
                // Fetch cover image
                const [coverExists] = await coverFile.exists();
                if (coverExists) {
                    const coverImageUrl = await coverFile.getSignedUrl({
                        action: 'read',
                        expires: '03-17-2025', // Expiration date for the URL
                    });
                    place.coverImageUrl = coverImageUrl[0]; // Assign the URL to the place object
                } else {
                    place.coverImageUrl = defaultImageUrl; // Set fallback image URL
                }

                // Fetch additional images
                const [files] = await storage.bucket().getFiles({ prefix: additionalImagesPath });
                for (const file of files) {
                    // Check if the file is an image
                    if (file.name.endsWith('.jpg') || file.name.endsWith('.png') || file.name.endsWith('.jpeg')) {
                        const additionalImageUrl = await file.getSignedUrl({
                            action: 'read',
                            expires: '03-17-2025', // Expiration date for the URL
                        });
                        additionalImages.push(additionalImageUrl[0]); // Add each URL to the array
                    }
                }
                place.additionalImageUrls = additionalImages; // Assign the array to the place object

            } catch (error) {
                console.error(`Error fetching images for ${place.slug}:`, error.message);
                place.coverImageUrl = defaultImageUrl; // Fallback to default image
                place.additionalImageUrls = []; // Ensure additional images are empty on error
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
