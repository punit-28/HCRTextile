// pages/api/contact.js (Pages Router)
import nodemailer from 'nodemailer';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    try {
        const { name, email, phone, subject, message } = req.body;

        // Validate
        if (!name || !email || !message) {
            return res.status(400).json({ 
                success: false, 
                message: 'Name, email, and message are required' 
            });
        }

        // Create transporter
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        // Main email
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: process.env.TO_EMAIL,
            subject: `Contact Form: ${subject || 'New Message'} from ${name}`,
            html: `
                <h2>New Contact Form Submission</h2>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ''}
                ${subject ? `<p><strong>Subject:</strong> ${subject}</p>` : ''}
                <p><strong>Message:</strong></p>
                <p>${message}</p>
            `
        });

        // Auto-reply to user
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Thank you for contacting us!',
            html: `
                <h2>Thank You for Contacting Us! ✨</h2>
                <p>Dear ${name},</p>
                <p>We have received your message and will get back to you within 24-48 hours.</p>
                <p>Best regards,<br>Your Team</p>
            `
        });

        res.status(200).json({ 
            success: true, 
            message: 'Email sent successfully!' 
        });

    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Failed to send email' 
        });
    }
}