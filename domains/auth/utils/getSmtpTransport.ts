export default async function getSmtpTransport() {
  const nodemailer = await import("nodemailer");
  return nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    requireTLS: true,
    auth: {
      user: process.env.NEXT_SECRET_SMTP_USER,
      pass: process.env.NEXT_SECRET_SMTP_PASSWORD
    },
    tls: {
      rejectUnauthorized: false
    }
  });
}
