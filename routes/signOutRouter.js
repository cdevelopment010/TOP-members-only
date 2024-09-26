const { Router } = require("express");
const signOutRouter = Router(); 


signOutRouter.get("/", (req, res) => {
    res.send("sign out...")
}); 

module.exports =   signOutRouter ; 