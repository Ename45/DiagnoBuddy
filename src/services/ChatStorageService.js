
const chatStorage = new Map();

// console.log("chat storage foe enamesit@gmail,com==============================>{} ", chatStorage.forEach((chat) => return chat))

const logChatStoreContent = () => {
  chatStorage.forEach((chats, email) => {
    console.log(`Chat history for ${email}:`);
    chats.forEach((chat, index) => {
      console.log(
        `  ${index + 1}. Message: ${chat.message}, Response: ${JSON.stringify(
          chat.response
        )}`
      );
    });
  });
}


const addChat = (email, message, response ) => {
  if (!chatStorage.has(email)) {
    chatStorage.set(email, [])
  }

  chatStorage.get(email).push({ message, response })

  logChatStoreContent()
};


const getHistoryOfChat = ( email ) => {
  return chatStorage.get(email) || [];
};


const deleteChats = (email) => {
  if (chatStorage.has(email)) {
    chatStorage.delete(email)
  }else {
    return `No chat history for ${email}`
  }

  logChatStoreContent()
}


module.exports = {
  addChat,
  getHistoryOfChat,
  deleteChats
}