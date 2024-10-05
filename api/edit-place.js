import admin from "firebase-admin";

// Initialize Firebase Admin if not already initialized
if (!admin.apps.length) {
    // eslint-disable-next-line no-undef
    const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);

    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
    });
}

export const db = admin.firestore();

export default async function handler(req, res) {
    if (req.method === "PUT") {
        try {
            const updatedPlace = req.body;

            // Validate updatedPlace object structure if needed
            if (
                !updatedPlace.slug ||
                !updatedPlace.name ||
                !updatedPlace.latitude ||
                !updatedPlace.longitude
            ) {
                return res
                    .status(400)
                    .json({ message: "Missing required fields" });
            }

            // Query Firestore for the place with the matching slug
            const placeQuery = await db
                .collection("places")
                .where("slug", "==", updatedPlace.slug)
                .get();

            if (placeQuery.empty) {
                return res.status(404).json({ message: "Place not found" });
            }

            // Update the found document
            const placeDoc = placeQuery.docs[0];
            await placeDoc.ref.update(updatedPlace);

            res.status(200).json({
                message: "Place updated successfully",
                updatedPlace,
            });
        } catch (error) {
            console.error("Error updating place:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    } else {
        res.setHeader("Allow", ["PUT"]);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
