import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, subject, message } = body;

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { message: "Name, email and message are required" },
        { status: 400 },
      );
    }

    // Create transporter - FIX: createTransport not createTransporter
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || "smtp.gmail.com",
      port: parseInt(process.env.SMTP_PORT || "587"),
      secure: process.env.SMTP_SECURE === "true",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    // Email content
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: "punitmundotiya24@gmail.com",
      subject: `New Contact Form Submission: ${subject || "No Subject"}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #2C1810; color: white; padding: 20px; text-align: center; }
            .content { background: #f9f6f0; padding: 30px; border-radius: 8px; }
            .field { margin-bottom: 15px; }
            .label { font-weight: bold; color: #2C1810; }
            .value { margin-top: 5px; padding: 10px; background: white; border-radius: 5px; border-left: 4px solid #C49B5C; }
            .footer { text-align: center; padding: 20px; color: #888; font-size: 12px; }
            .badge { display: inline-block; background: #C49B5C; color: white; padding: 3px 10px; border-radius: 12px; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h2>📬 New Contact Form Submission</h2>
            </div>
            <div class="content">
              <div class="field">
                <div class="label">👤 Name</div>
                <div class="value">${name}</div>
              </div>
              <div class="field">
                <div class="label">📧 Email</div>
                <div class="value"><a href="mailto:${email}">${email}</a></div>
              </div>
              ${
                phone
                  ? `
                <div class="field">
                  <div class="label">📱 Phone</div>
                  <div class="value"><a href="tel:${phone}">${phone}</a></div>
                </div>
              `
                  : ""
              }
              ${
                subject
                  ? `
                <div class="field">
                  <div class="label">📌 Subject</div>
                  <div class="value"><span class="badge">${subject}</span></div>
                </div>
              `
                  : ""
              }
              <div class="field">
                <div class="label">💬 Message</div>
                <div class="value">${message.replace(/\n/g, "<br>")}</div>
              </div>
            </div>
            <div class="footer">
              <p>This message was sent from your website contact form.</p>
              <p>Sent at: ${new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })}</p>
            </div>
          </div>
        </body>
        </html>
      `,
      text: `
        New Contact Form Submission
        --------------------------
        Name: ${name}
        Email: ${email}
        Phone: ${phone || "Not provided"}
        Subject: ${subject || "Not specified"}
        Message: ${message}
        --------------------------
        Sent at: ${new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })}
      `,
    };
    await transporter.sendMail(mailOptions);

    // Optional: Send auto-reply to user
    const autoReplyOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Thank you for contacting us",
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 500px; margin: 0 auto; padding: 20px; }
            .header { background: #C49B5C; color: white; padding: 20px; text-align: center; }
            .content { padding: 20px; }
            .footer { text-align: center; padding: 20px; color: #888; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h2>Thank You for Contacting Us!</h2>
            </div>
            <div class="content">
              <p>Dear ${name},</p>
              <p>Thank you for reaching out to us. We have received your message and will get back to you within 24 hours.</p>
              <p>Your message details:</p>
              <ul>
                <li><strong>Subject:</strong> ${subject || "General Inquiry"}</li>
                <li><strong>Message:</strong> ${message.substring(0, 100)}${message.length > 100 ? "..." : ""}</li>
              </ul>
              <p>In the meantime, feel free to browse our collections or contact us directly at:</p>
              <p>📞 +91 700 698 0870<br>
              📧 punitmundotiya24@gmail.com</p>
              <p>Best regards,<br>
              Team</p>
            </div>
            <div class="footer">
              <p>This is an automated response. Please do not reply to this email.</p>
            </div>
          </div>
        </html>
      `,
      text: `
        Thank You for Contacting Us!

        Dear ${name},

        Thank you for reaching out to us. We have received your message and will get back to you within 24 hours.

        Your message details:
        Subject: ${subject || "General Inquiry"}
        Message: ${message.substring(0, 100)}${message.length > 100 ? "..." : ""}

        In the meantime, feel free to browse our collections or contact us directly at:
        📞 +91 700 698 0870
        📧 punitmundotiya24@gmail.com

        Best regards,
        Team

        This is an automated response. Please do not reply to this email.
      `,
    };

    // Send auto-reply
    await transporter.sendMail(autoReplyOptions);

    return NextResponse.json(
      { message: "Message sent successfully" },
      { status: 200 },
    );
  } catch (error) {
    console.error("Email sending error:", error);
    return NextResponse.json(
      { message: "Failed to send message. Please try again." },
      { status: 500 },
    );
  }
}
