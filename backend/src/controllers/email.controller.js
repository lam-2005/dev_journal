import EmailModel from "../models/email.model.js";
import { sendNotificationEmail } from "../lib/mailer.js";

const EmailController = {
  submitContact: async (req, res) => {
    try {
      const { name, email, message } = req.body;

      if (!name || !email || !message) {
        return res
          .status(400)
          .json({ success: false, message: "All feilds are required" });
      }

      const newContact = await EmailModel.contact(req.body);

      try {
        sendNotificationEmail(req.body);
      } catch (error) {
        console.error("Error is sending email: ", error.message);
        return res.status(400).json({
          message: "Error sending email",
          error: error.message,
        });
      }

      return res.status(201).json({
        success: true,
        message: "Message sent successfully",
        data: newContact,
      });
    } catch (error) {
      console.error("Error in EmailController: ", error);

      return res.status(500).json({
        success: false,
        message: "Internal Server Error",
        error: error.message,
      });
    }
  },
};

export default EmailController;
