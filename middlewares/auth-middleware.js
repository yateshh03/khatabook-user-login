let jwt = require("jsonwebtoken")

module.exports.isloggedIn = (req, res, next) => {
    if(req.cookies.token){
        try {
            let decoded = jwt.verify(req.cookies.token, process.env.NODE_ENV)
            req.user = decoded
            next()
            
        } catch (error) {
            return res.redirect("/")
            
        }
    }else{
        return res.redirect("/")
    }
}


module.exports.redirectIfLoggedIn = (req, res, next) => {
    if(req.cookies.token){
        try {
            jwt.verify(req.cookies.token, process.env.JWT_SECRET)
            res.render("profile")
            
        } catch (error) {
            return next()
        }
    }else{
        next()
    }
}