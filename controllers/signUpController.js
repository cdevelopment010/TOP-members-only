const { body, validationResult} = require("express-validator"); 
const passport = require("passport");
const bcrypt = require("bcryptjs");
const db = require("../db/queries");

const validateUser = [
    body("email").trim()
        .notEmpty().withMessage("Email must not be empty")
        .isLength({min: 3}).withMessage("Email must be at least 3 characters")
        .isEmail().withMessage("Must be a valid email"),
    body("password").trim()
        .notEmpty().withMessage("Password must not be empty")
        .isLength({ min: 6}).withMessage("Password must be at least 6 characters")
        .escape(),
    body("confirmPassword").custom((value, { req }) => {
        return value === req.body.password;
    }).withMessage("Passwords do not match")
]

exports.getSignUpForm = async (req, res) => {
    res.render("signUpForm");
}

exports.postSignUpForm = [
    validateUser,

    async (req, res, next) => {

        const user = { email: req.body.email, firstname: req.body.firstname, lastname: req.body.lastname }

        const errors = validationResult(req); 
        
        if(!errors.isEmpty()) {

            return res.status(400).render("signUpForm", {
                user: user,
                errors: errors.array()
            })
        }

        try {
            bcrypt.hash(req.body.password, 10, async(err, hashedPassword)=> {
                if (err) {
                    return next(err);
                }
    
                //populate db
                user.password = hashedPassword; 

                try {
                    const id = await db.postCreateUser(user);
                    user.id = id;

                    req.login(user, (err)=> {
                        if (err) { return next(err)}
                        return res.redirect("/");
                    })

                } catch(err) {
                    const errors = [{msg: err.detail, code: err.code}]
                    return res.status(400).render("signUpForm", {
                        user: user,
                        errors: errors
                    })
                }
    
            })

        } catch(err) {
            return next(err);
        }

    }
]