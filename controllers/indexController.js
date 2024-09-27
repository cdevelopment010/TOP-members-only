exports.getHomePage = async (req, res) =>{
    res.render("index");
}

exports.getLogOut = async (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        res.redirect("/");
    })
}