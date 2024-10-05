const express = require('express');
const router = express.Router();

const {
    createController,
    postCreateController, 
    viewHisaabController, 
    deleteHisaabController,
    editHisaabController, 
    postEditController,
    readVerifiedHisaabController
} = require('../controllers/hisaab-controller');
const { isloggedIn } = require('../middlewares/auth-middleware');



router.get("/create", isloggedIn, createController)
router.post("/hisaab/create", isloggedIn, postCreateController)
router.get("/hisaab/view/:id", isloggedIn, viewHisaabController)
router.get("/hisaab/delete/:id", isloggedIn, deleteHisaabController)
router.get("/hisaab/edit/:id", isloggedIn, editHisaabController); 
router.post("/hisaab/edit/:id", isloggedIn, postEditController); 


router.post("/hisaab/verify/:id", isloggedIn, readVerifiedHisaabController); 







module.exports = router