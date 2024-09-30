const { body, validationResult} = require("express-validator"); 
const passport = require("passport");
const db = require("../db/queries");

const validateUser = [
    body("email").trim()
        .notEmpty().withMessage("Email must not be empty")
        .isLength({min: 3}).withMessage("Email must be at least 3 characters")
        .isEmail().withMessage("Must be a valid email"),
    body("password").trim()
        .notEmpty().withMessage("Password must not be empty")
        .isLength({ min: 6}).withMessage("Password must be at least 6 characters")
]

exports.getSignInForm = async (req, res) => {
    if (req.user) {
        return res.redirect("/");
    }
    res.render("signInForm", {
        errors: req.session.messages?.map(x => {return {msg: x}})
    });
    req.session.messages = [];
    req.session.save(err => {
        if (err) console.log(err);
    });
}

exports.postSignInForm = (req, res, next) => {
    passport.authenticate("local", (err, user, info) => {
        
        if (err) {
            return next(err); 
        }

        if (!user) {
            let errors = [{msg: "User does not exist. Please create user."}]
            return res.status(400).render("signInForm", {
                errors: errors,
            })
        }

        // Log the user in
        req.logIn(user, async (err) => {
            if (err) {
                return next(err); 
            }
            try {
                await db.updateLastLogin(user.id);
                return res.redirect("/"); 
            } catch (dbError) {
                return next(dbError); 
            }
        });
    })(req, res, next); 
};