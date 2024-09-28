const { Router } = require("express");
const indexRouter = Router(); 
const indexController = require("../controllers/indexController");

indexRouter.get("/", indexController.getHomePage); 
indexRouter.get("/join-the-club", indexController.getJoinClub);
indexRouter.post("/join-the-club", indexController.postJoinClub);
indexRouter.get("/admin", indexController.getAdmin);
indexRouter.post("/admin", indexController.postAdmin);

module.exports =   indexRouter ; 