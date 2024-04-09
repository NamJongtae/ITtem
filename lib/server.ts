import nodemailer from "nodemailer";

export const smtpTransport = nodemailer.createTransport({
  service: "gamil",
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  requireTLS: true,
  auth: {
    user: process.env.NEXT_SECRET_SMTP_USER,
    pass: process.env.NEXT_SECRET_SMTP_PASSWORD,
  },
  tls: {
    rejectUnauthorized: false,
  },
});
