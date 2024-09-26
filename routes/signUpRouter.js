const { Router } = require("express");
const signUpRouter = Router(); 


signUpRouter.get("/", (req, res) => {
    res.send("sign up...")
}); 

module.exports =   signUpRouter ; 