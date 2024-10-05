const express = require("express");
const router = express.Router()

const { landingPageController, registerController,
    postRegisterController, postLoginController, logoutController, profileController
} = require("../controllers/index-controllers");
const { isloggedIn, redirectIfLoggedIn } = require("../middlewares/auth-middleware");


router.get('/', redirectIfLoggedIn, landingPageController);
router.get('/register', registerController);
router.post('/register', postRegisterController);
router.post('/login', postLoginController);
router.get('/logout', logoutController);
router.get('/profile', isloggedIn, profileController);





module.exports = router