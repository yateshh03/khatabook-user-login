let userModel = require("../models/user-model");
let bcrypt = require("bcrypt");
let jwt = require("jsonwebtoken");


module.exports.landingPageController = (req, res) => {
    res.render('index')
}

module.exports.registerController = (req, res) => {
    res.render('register')
}

module.exports.postRegisterController = async (req, res) => {


    let { name, username, email, password } = req.body

    try {
        let user = await userModel.findOne({ email })
        if (user) return res.send("You have been registered, Please Login!")


        let salt = await bcrypt.genSalt(10)
        let hashed = await bcrypt.hash(password, salt)


        user = new userModel({ name, username, email, password: hashed })
        await user.save(); // Save the user to the database


        let token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET)

        res.cookie("token", token)
        res.send("account created successfully")


    } catch (error) {
        res.send(error.message)
    }




}


module.exports.postLoginController = async (req, res) => {
    let { email, password } = req.body


    let user = await userModel.findOne({ email }).select("+password")
    if (!user) return res.send("Invalid email or password")

    let isMatch = await bcrypt.compare(password, user.password)
    if (isMatch) {

        let token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET)

        res.cookie("token", token)
        res.render("profile")
    }
    else{
        res.send("Details are incorrect")
    }
}

module.exports.logoutController = (req, res) => {
    res.cookie("token", "")
    return res.redirect("/")
}

module.exports.profileController = async (req, res) => {
    res.render("profile")
}