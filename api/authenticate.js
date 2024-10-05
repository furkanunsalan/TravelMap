// api/authenticate.js
export default async function handler(req, res) {
    if (req.method === "POST") {
        const { email, password } = req.body;

        // Replace with your actual credentials
        const validCredentials = {
            email: process.env.AUTH_EMAIL,
            password: process.env.AUTH_PASSWORD,
        };

        if (
            email === validCredentials.email &&
            password === validCredentials.password
        ) {
            res.status(200).json({ message: "Authentication successful" });
        } else {
            res.status(401).json({ error: "Invalid email or password" });
        }
    } else {
        res.status(405).json({ error: "Method not allowed" });
    }
}
