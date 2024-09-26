const { Router } = require("express");
const messagesRouter = Router(); 


messagesRouter.get("/", (req, res) => {
    res.send("messages...")
}); 

module.exports = messagesRouter ; 