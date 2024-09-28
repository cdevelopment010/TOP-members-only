const db = require("../db/queries");

exports.getHomePage = async (req, res) =>{
    const messages = await db.getAllMessages(); 

    res.render("index", {
        messages: messages
    });
}

exports.getLogOut = async (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        res.redirect("/");
    })
}