import admin from "firebase-admin";
import { v4 as uuidv4 } from "uuid"; // For unique filenames

// Initialize Firebase Admin if not already initialized
if (!admin.apps.length) {
    const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);

    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        storageBucket: "travelmap-d6020.appspot.com", // Add storage bucket here
    });
}

const bucket = admin.storage().bucket(); // Access Firebase storage
export const db = admin.firestore();

export default async function handler(req, res) {
    if (req.method === "POST") {
        try {
            const { slug, name, latitude, longitude, images } = req.body;

            // Validate newPlace object structure
            if (!slug || !name || !latitude || !longitude || !images || images.length === 0) {
                return res.status(400).json({ message: "Missing required fields or images" });
            }

            const imageUploadPromises = [];

            // 1. Upload the first image as cover.png
            const coverImage = images[0];
            const coverImageFileName = `images/${slug}/cover.png`;
            const coverImageUploadPromise = uploadImageToStorage(coverImage, coverImageFileName);
            // imageUploadPromises.push(coverImageUploadPromise);

            // 2. Upload the rest of the images to /images/[slug]/additional directory
            for (let i = 1; i < images.length; i++) {
                const imageFile = images[i];
                const imageFileName = `images/${slug}/additional/${uuidv4()}.png`; // Assign a unique name to each image
                const imageUploadPromise = uploadImageToStorage(imageFile, imageFileName);
                // imageUploadPromises.push(imageUploadPromise);
            }

            // const [coverImageUrl, ...imageUrls] = await Promise.all(imageUploadPromises);

            // Add the new place to the 'places' collection in Firestore
            await db.collection("places").add(req.body);

            // Alternative mentioned on Issue #43 on Github - https://github.com/furkanunsalan/TravelMap/issues/43
            // it shouldn't work with 'imageUrls' variable name. additionalImages is the way to go.

            // await db.collection("places").add({
            //     ...req.body,
            //     coverImageUrl, // URL of the cover image
            //     imageUrls, // URLs of other images
            // });

            res.status(200).json({ message: "Place added successfully" });
        } catch (error) {
            console.error("Error adding place:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    } else {
        res.setHeader("Allow", ["POST"]);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}

// Function to upload images to Firebase Storage
async function uploadImageToStorage(file, destinationPath) {
    const buffer = Buffer.from(file, 'base64'); // Assuming images are coming as base64 strings

    const fileRef = bucket.file(destinationPath);
    await fileRef.save(buffer, {
        contentType: "image/png", // Adjust the content type accordingly
        metadata: {
            firebaseStorageDownloadTokens: uuidv4(), // Generate a download token
        },
    });

    // Get the public URL of the uploaded file
    const publicUrl = await fileRef.getSignedUrl({
        action: "read",
        expires: "03-01-2500",
    });

    return publicUrl[0]; // Return the public URL of the uploaded image
}
