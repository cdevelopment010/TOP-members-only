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


exports.getJoinClub = (req, res) => {
    return res.render("JoinClubForm");
}

exports.postJoinClub = async (req, res) => {
    const { passcode, user_id } = req.body; 
    if (passcode != process.env.MEMBER_SECRET) { 
        let errors = [{msg: "Incorrect passcode"}]
        return res.status(400).render("JoinClubForm", {errors: errors});
    } 
    if (!req.user) { 
        let errors = [{msg: "Must be signed in to update memebership status"}]
        return res.status(400).render("JoinClubForm", {errors: errors});
    } 
    await db.updateMembership(user_id);
    return res.redirect("/");
}

exports.getAdmin = (req, res) => {
    return res.render("AdminForm");
}

exports.postAdmin = async (req, res) => {
    const { passcode, user_id } = req.body; 
    if (passcode != process.env.ADMIN_SECRET) { 
        let errors = [{msg: "Incorrect passcode"}]
        return res.status(400).render("AdminForm", {errors: errors});
    }
    
    if (!req.user) { 
        let errors = [{msg: "Must be signed in to update Admin status"}]
        return res.status(400).render("AdminForm", {errors: errors});
    } 
    await db.updateAdmin(user_id);
    return res.redirect("/");
}