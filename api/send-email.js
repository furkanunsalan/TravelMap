import nodemailer from "nodemailer";

export default async function handler(req, res) {
    if (req.method === "POST") {
        try {
            const { formData } = req.body;

            if (!formData) {
                return res.status(400).json({ error: "Missing form data" });
            }

            // Remove circular references (if any)
            function removeCircularReferences(obj, seen = new WeakSet()) {
                if (obj && typeof obj === "object") {
                    if (seen.has(obj)) {
                        return; // Circular reference found, remove it
                    }
                    seen.add(obj);
                    for (const key of Object.keys(obj)) {
                        removeCircularReferences(obj[key], seen);
                    }
                }
            }
            removeCircularReferences(formData);

            const transporter = nodemailer.createTransport({
                host: "mail.kurumsaleposta.com",
                port: 587,
                secure: false, // Use true if using port 465 for SSL
                auth: {
                    user: "travelmap@descite.org",
                    pass: process.env.MAIL_PASS,
                },
                tls: {
                    rejectUnauthorized: false, // Bypass certificate validation
                },
            });

            const mailOptions = {
                from: "travelmap@descite.org",
                to: "me@furkanunsalan.dev",
                subject: "New Place Submission",
                text: `New place submitted:\n\n${JSON.stringify(
                    formData,
                    null,
                    2
                )}`,
            };

            await transporter.sendMail(mailOptions);

            res.status(200).json({ message: "Email sent successfully" });
        } catch (error) {
            console.error("Error sending email:", error); // Log the error to Vercel's logs
            res.status(500).json({
                error: "An error occurred while sending the email.",
            });
        }
    } else {
        res.setHeader("Allow", ["POST"]);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
