const { Router } = require("express");
const signOutRouter = Router(); 
const signOutController = require("../controllers/signOutController");


signOutRouter.get("/", signOutController.getSignOut); 

module.exports =   signOutRouter ; 