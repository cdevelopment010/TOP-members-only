const { body, validationResult} = require("express-validator"); 

const validateUser = [
    body("email").trim()
        .notEmpty().withMessage("Email must not be empty")
        .isLength({min: 3}).withMessage("Email must be at least 3 characters")
        .isEmail().withMessage("Must be a valid email"),
    body("password").trim()
        .notEmpty().withMessage("Password must not be empty")
        .isLength({ min: 6}).withMessage("Password must be at least 6 characters")
        .escape()
]

exports.getSignInForm = async (req, res) => {
    res.render("signInForm");
}

exports.postSignInForm = [
    validateUser,

    async (req, res) => {

        const user = { email: req.body.email }

        const errors = validationResult(req); 
        
        if(!errors.isEmpty()) {

            return res.status(400).render("signInForm", {
                user: user,
                errors: errors.array()
            })
        }
        res.redirect("/")
    }
]