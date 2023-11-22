const express = require("express");
const router = express.Router()
const ChatController = require("../controllers/ChatController")


router.post("/ask", ChatController.processResponses)



module.exports = router