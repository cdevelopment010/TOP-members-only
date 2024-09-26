const { Router } = require("express");
const signInRouter = Router(); 
const signInController = require("../controllers/signInController");


signInRouter.get("/", signInController.getSignInForm);
signInRouter.post("/", signInController.postSignInForm); 

module.exports =   signInRouter ; 