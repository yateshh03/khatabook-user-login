const { isloggedIn } = require("../middlewares/auth-middleware")
const hisaabModel = require("../models/hisaab-model")

module.exports.createController = async (req, res, next) => {
    res.render("create", { page: "profile" })
}

module.exports.postCreateController = async (req, res, next) => {
    let { title, description } = req.body

    if (!title || !description) {
        req.flash("error", "All fields are required")
        return res.redirect("/profile")
    }

    var isEncrypted = req.body.encrypted == "on" ? true : false
    var isShareable = req.body.shareable == "on" ? true : false
    var isEditable = req.body.editable == "on" ? true : false
    var passcode = req.body.passcode

    let newHisaab = await hisaabModel.create({
        title,
        description,
        user: req.user.id,
        encrypted: isEncrypted,
        shareable: isShareable,
        editpermissions: isEditable,
        passcode
    })

    await newHisaab.save()

    console.log(newHisaab)

    res.redirect("/profile")


    console.log(req.body)
}



const mongoose = require('mongoose');

module.exports.viewHisaabController = async (req, res) => {
    const id = req.params.id;


    try {
        const hisaab = await hisaabModel.findById(id);

        if(!hisaab){
            return res.redirect("/profile")
        }

        if(hisaab.encrypted){
            return res.render("passcode", {isloggedIn: true, id})
        }



        res.render("hisaab", { isloggedIn: true, hisaab, page: "profile" });
    } catch (error) {
        console.error("Error fetching Hisaab:", error);
        return res.status(500).send("Server error");
    }
};


module.exports.deleteHisaabController = async (req, res) => {
    const id = req.params.id
    console.log(id)

    const hisaab = await hisaabModel.findById({ _id: id, user: req.user.id })

    if (!hisaab) {
        return res.redirect("/profile");
    }

    await hisaab.deleteOne({
        _id: id
    })

    return res.redirect("/profile");
    console.log(hisaab)


}


// GET controller to render the edit form
module.exports.editHisaabController = async (req, res, next) => {
    const id = req.params.id;

    // if (!mongoose.Types.ObjectId.isValid(id)) {
    //     return res.redirect("/profile");
    // }

    try {
        const hisaab = await hisaabModel.findById(id);

        if (!hisaab) {
            console.log("Hisaab not found");
            return res.redirect("/profile");
        }

        res.render("edit", { page: "profile", hisaab, isloggedIn: true });
    } catch (error) {
        console.log("Error fetching hisaab:", error);
        res.redirect("/profile");
    }
};


module.exports.postEditController = async (req, res, next) => {

    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.redirect("/profile");
    }

    try {
        const hisaab = await hisaabModel.findById(id);

        if (!hisaab) {
            console.log("Hisaab not found");
            return res.redirect("/profile");
        }

        hisaab.title = req.body.title;
        hisaab.description = req.body.description;
        hisaab.editable = req.body.editable == "on" ? true : false;
        hisaab.shareable = req.body.shareable == "on" ? true : false;
        hisaab.encrypted = req.body.encrypted == "on" ? true : false;
        hisaab.passcode = req.body.passcode;

        await hisaab.save()

        res.redirect("/profile")




    } catch (error) {
        console.log("Error fetching hisaab:", error);
        res.redirect("/profile");
    }

}


module.exports.readVerifiedHisaabController = async (req, res) => {

    const id = req.params.id

    const hisaab = await hisaabModel.findOne({ _id : id })

    if(!hisaab){
        return res.redirect("/profile")
    }

    if(hisaab.passcode !== req.body.passcode){
        return res.redirect("/profile")
    }
    
    
    res.render("hisaab", {
        isloggedIn: true, hisaab
    })
}









