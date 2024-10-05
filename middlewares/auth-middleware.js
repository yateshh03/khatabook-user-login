let jwt = require("jsonwebtoken")

module.exports.isloggedIn = (req, res, next) => {
    const token = req.cookies.token;
    console.log("Token from cookies:", token);  // Debugging log for token

    if (token) {
        try {
            let decoded = jwt.verify(token, process.env.JWT_SECRET);
            console.log("Decoded JWT:", decoded);  // Log the decoded token
            req.user = decoded;
            next(); // Move to the next middleware or controller
        } catch (error) {
            console.error("JWT verification failed:", error.message);
            return res.redirect("/");
        }
    } else {
        console.log("Token not found, redirecting to login.");
        return res.redirect("/");
    }
};




module.exports.redirectIfLoggedIn = (req, res, next) => {
    if (req.cookies.token) {
        try {
            jwt.verify(req.cookies.token, process.env.JWT_SECRET)
            res.render("profile")

        } catch (error) {
            return next()
        }
    } else {
        next()
    }
}