import nodemailer from "nodemailer";
import env from "../config/env.js";

export const sendNotificationEmail = async (data) => {
  const { name, email, message } = data;
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    service: "Gmail",
    auth: {
      user: env.EMAIL_USER,
      pass: env.EMAIL_PASS,
    },
  });
  const mailOptions = {
    from: `<${env.EMAIL_USER}>`,
    to: env.EMAIL_USER,
    subject: `Phản hồi của người dùng ${name} về DevJournal`,
    html: `
      <div style="font-family: Arial, sans-serif; border: 1px solid #ddd; padding: 20px;">
        <h2 style="color: #333;">Bạn có tin nhắn mới từ khách hàng</h2>
        <p><strong>Người gửi:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Nội dung:</strong></p>
        <blockquote style="background: #f9f9f9; padding: 15px; border-left: 5px solid #ccc;">
          ${message}
        </blockquote>
      </div>
    `,
    replyTo: email,
  };

  return transporter.sendMail(mailOptions);
};
