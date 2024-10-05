let userModel = require("../models/user-model");
let bcrypt = require("bcrypt");
let jwt = require("jsonwebtoken");
let flash = require("connect-flash");
let hisaabModel = require("../models/hisaab-model");
const { isloggedIn } = require("../middlewares/auth-middleware");
// let user = require("../routes/index-router");


module.exports.landingPageController = (req, res) => {
    res.render('index')
}

module.exports.registerController = (req, res) => {
    res.render('register')
}

module.exports.postRegisterController = async (req, res) => {


    let { name, username, email, password } = req.body

    if (!email || !username || !password || !name) {
        req.flash('error', "All fields are required");
        return res.redirect("/register")
    }

    try {
        let user = await userModel.findOne({ email })
        if (user) return req.flash('error', "User already exists");


        let salt = await bcrypt.genSalt(10)
        let hashed = await bcrypt.hash(password, salt)


        user = new userModel({ name, username, email, password: hashed })
        await user.save(); // Save the user to the database


        let token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET)

        res.cookie("token", token)
        req.flash("success", "account created successfully")
        return res.redirect("/profile")


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

        let token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)

        res.cookie("token", token)
        res.redirect("/profile")
    }
    else {
        res.send("Details are incorrect")
    }
}

module.exports.logoutController = (req, res) => {
    res.cookie("token", "")
    return res.redirect("/")
}

module.exports.profileController = async (req, res, next) => {
    // const id = req.user.id; 


    const startDate = req.query.startDate;
    const endDate = req.query.endDate;
    const order = req.query.byDate ? Number(req.query.byDate) : -1;


    let details = await userModel.findOne({ _id: req.user.id });
    console.log(details);

    let hisaabs = await hisaabModel.find({ user: details._id, createdAt: {
        $gte: startDate? new Date(startDate) : new Date(0),
        $lte: endDate? new Date(endDate) : new Date(),
    }
 }).sort({ createdAt : order }).exec();

    console.log({ user: details._id })
    console.log(hisaabs)




    // Render profile page with user data
    res.render('profile', { page: 'profile', details, hisaabs, isloggedIn : true });
};
