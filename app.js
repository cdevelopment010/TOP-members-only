require("dotenv").config();

const path = require("node:path");
const express = require("express"); 
const app = express();
const assetsPath = path.join(__dirname, "public");
const PORT = process.env.PORT || 3000;

const indexRouter = require("./routes/indexRouter");
const signUpRouter = require("./routes/signUpRouter");
const signInRouter = require("./routes/signInRouter");
const signOutRouter = require("./routes/signOutRouter");
const messagesRouter = require("./routes/messagesRouter");
const usersRouter = require("./routes/usersRouter");

app.use(express.json());
app.use(express.urlencoded({extended: true})); 
app.use(express.static(assetsPath));

app.set("views", path.join(__dirname,"views"));
app.set("view engine", "ejs"); 

app.use("/", indexRouter);
app.use("/sign-up", signUpRouter);
app.use("/sign-in", signInRouter);
app.use("/sign-out", signOutRouter);
app.use("/messages", messagesRouter);
app.use("/users", usersRouter);

app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));

