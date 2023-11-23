const { getHistoryOfChat, deleteChats } = require("./ChatStorageService")
const { sendEmail } = require("../utils/SendEmails")
require("dotenv").config();
const emailNotProvided = "email not provided"
const noChatHistory = "No chat to send"

const sendChat = async( email ) => {
  if (!email) {
    throw new Error(emailNotProvided);
  }

  const userChatHistory = getHistoryOfChat(email)

  if (!userChatHistory) {
    throw new Error(noChatHistory)
  }

  const chatMessage = await sendUserChat(email);
}


module.exports = {
  sendChat
}


async function sendUserChat(email) {
  const mailDetails = {
    email,
    subject: "DiagnoBuddy Chats",
    message: "See below your chat session with Us.",
  };

  const mailMessage = await requestOTP(mailDetails);
  return mailMessage;
}


const requestOTP = async (request) => {
  const { email, subject, message } = request;

  if (!(email && message && subject)) {
    throw new Error("all fields are required");
  }

  const mailDetails = {
    email,
    subject,
    message,
  };

  const sentChat = await sendChatToMail(mailDetails);

  if (!sentChat) {
    throw new Error("problem sending chat");
  }

  return sentChat
};



const sendChatToMail = async (emailDetails) => {
  try {
    const { email, subject, message } = emailDetails;

    const emailSuccessful = await sendEmailWithChats(email, subject, message);


    return "Chat successfully sent, check mailbox"
  } catch (error) {
    throw new Error(error.message);
  }
};



async function sendEmailWithChats(email, subject, message) {
  const mailOptions = {
    from: process.env.AUTH_EMAIL,
    to: email,
    subject,
    html: `<p>${message}</p>`,
  };

  await SendEmail.sendEmail(mailOptions);
}
