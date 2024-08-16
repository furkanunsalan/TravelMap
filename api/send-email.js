// Example handler for /api/send-email

/*export default function handler(req, res) {
    if (req.method === 'POST') {
        // Log the request body for debugging
        console.log('Received request body:', data);



        // Respond with the received data
        res.status(200).json({
            message: 'Data received successfully',
            receivedData: data
        });
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}*/

// Example handler for /api/send-email

import nodemailer from 'nodemailer';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        try {
            const { formData } = req.body;

            if (!formData) {
                return res.status(400).json({ error: 'Missing form data' });
            }

            // Remove circular references (if any)
            function removeCircularReferences(obj, seen = new WeakSet()) {
                if (obj && typeof obj === 'object') {
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
                host: 'mail.kurumsaleposta.com',
                port: 587,
                secure: false, // Use true if using port 465 for SSL
                auth: {
                    user: 'map@furkanunsalan.dev',
                    pass: '@joQPFK#z3KckMa9'
                },
                tls: {
                    rejectUnauthorized: false // Bypass certificate validation
                }
            });

            const mailOptions = {
                from: 'map@furkanunsalan.dev',
                to: 'hi@furkanunsalan.dev',
                subject: 'New Place Submission',
                text: `New place submitted:\n\n${JSON.stringify(formData, null, 2)}`
            };

            await transporter.sendMail(mailOptions);

            res.status(200).json({ message: 'Email sent successfully' });
        } catch (error) {
            console.error('Error sending email:', error); // Log the error to Vercel's logs
            res.status(500).json({ error: 'An error occurred while sending the email.' });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}



