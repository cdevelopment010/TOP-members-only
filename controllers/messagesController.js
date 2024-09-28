const db = require("../db/queries");
const { body, validationResult } = require("express-validator");

const messageValidation = [
    body("title").trim().escape()
        .notEmpty().withMessage("Message title cannot be empty"), 
    body("text").trim().escape()
        .notEmpty().withMessage("Message text cannot be empty"),
    body("user_id")
        .notEmpty().withMessage("User ID cannot be empty")
        
]

exports.getMessagesList = async (req, res )=> {
    const messages = await db.getAllMessages(); 

    return res.render("messages", {
        messages: messages
    })
}

exports.getMessageById = async (req, res) => {
    const message = await db.getMessageById(req.params.id); 
    return res.render("messageDetail", {
        message: message
    })
}

exports.getCreateMessage = async (req, res) => {
    let errors = []; 
    if (!req.user) {
        errors.push({msg: "User is not currently logged in. Please log in to create a message."})
    }
    return res.render("messageForm", {
        errors: errors,
    });
}

exports.postCreateMessage = [
    messageValidation, 
    async (req, res, next)=> {
        const message = {
            title: req.body.title,
            text: req.body.text,
            user_id: req.user.id
        }

        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).render("messageForm", {
                message: message, 
                errors: errors.array()
            })
        }

        try { 
            const id = await db.createMessage(message); 
            return res.redirect(`/messages/${id}`);
        } catch(err) {
            return next(err);
        }
    }
]

// exports.getDeleteMessageById = async (req, res, next) => {

//         const { id } = req.params;  
//         try {
//             await db.deleteMessageById(id);
//             return res.redirect("/");
//         } catch(err) {
//             return next(err);
//         }
// }
exports.postDeleteMessageById = async (req, res, next) => {

        const { id } = req.params;  
        try {
            await db.deleteMessageById(id);
            return res.redirect("/");
        } catch(err) {
            return next(err);
        }
}