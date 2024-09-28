const { Router } = require("express");
const messagesRouter = Router(); 
const messagesController = require("../controllers/messagesController");

messagesRouter.get("/", messagesController.getMessagesList); 
messagesRouter.get("/create", messagesController.getCreateMessage); 
messagesRouter.post("/create", messagesController.postCreateMessage); 
messagesRouter.post("/delete/:id", messagesController.postDeleteMessageById); 
messagesRouter.get("/:id", messagesController.getMessageById); 

module.exports = messagesRouter ; 