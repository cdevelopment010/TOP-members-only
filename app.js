require("dotenv").config();
const ejsLayouts = require('express-ejs-layouts');
const path = require("node:path");
const express = require("express"); 
const app = express();
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require("bcryptjs");
const assetsPath = path.join(__dirname, "public");
const PORT = process.env.PORT || 3000;
const db = require("./db/queries");

const indexRouter = require("./routes/indexRouter");
const signUpRouter = require("./routes/signUpRouter");
const signInRouter = require("./routes/signInRouter");
const signOutRouter = require("./routes/signOutRouter");
const messagesRouter = require("./routes/messagesRouter");

app.use(express.json());
app.use(express.urlencoded({extended: true})); 
app.use(express.static(assetsPath));

app.set("views", path.join(__dirname,"views"));
app.set("view engine", "ejs"); 
app.use(ejsLayouts);
app.set('layout', 'layout');

app.use(session({ secret: "dogs", resave: false, saveUninitialized: false}));
app.use(passport.session());



passport.use(
    new LocalStrategy(
        {
            usernameField: 'email', 
            passwordField: 'password'
        },
        async (email, password, done) => {
        try {
            const user = await db.getUserByEmail(email);
            if(!user) {
                return done(null, false, {message: "Incorrect email"});
            }

            const match = await bcrypt.compare(password, user.password);
            if (!match) {
                return done(null, false, {message: "Incorrect password"});
            }

            return done(null, user);

        } catch(err) {
            return done(err);
        }
    })
)

passport.serializeUser((user, done) => {
    done(null, user.id)
}); 

passport.deserializeUser(async (id, done) => {
    try {
        const user = await db.getUserById(id);
        done(null, user)
    } catch(err) {
        done(err);
    }
})

app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    next(); 
})


app.use("/", indexRouter);
app.use("/sign-up", signUpRouter);
app.use("/sign-in", signInRouter);
app.use("/sign-out", signOutRouter);
app.use("/messages", messagesRouter);

app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));

