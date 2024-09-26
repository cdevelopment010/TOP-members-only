const { Router } = require("express");
const usersRouter = Router(); 


usersRouter.get("/", (req, res) => {
    res.send("users...")
}); 

module.exports =   usersRouter ; 