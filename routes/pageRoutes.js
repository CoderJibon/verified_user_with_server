//file include
const express = require('express');
const multer = require('multer');
const path = require('path');
const { 
    homeRouter,
    unverifiedRouter,
    createRouter,
    createVerifiedRouter,
    userSingleVies,
    emailConfirmation,
    userRemove,
    userUpdateData,
    userEditData,
    smsVerified,
    smsVerifiedChecker
    } = require('../controllers/pageControllers');

//single multer called
const storage = multer.diskStorage({
    destination : (req,file,cb) => {
        cb(null,path.join(__dirname,'../public/userPhoto'));
    },
    filename : (req,file,cb)=>{
        cb(null,Date.now()+"_"+file.originalname);
    }
});

const userPhotoMulter = multer({
    storage : storage
}).single('multer_single_photo');


//router init
const router = express.Router();

// home page router
router.get('/', homeRouter);

// unverified user page router
router.get('/unverified', unverifiedRouter);

// create user page router
router.get('/create',createRouter);

// create submit user page router
router.post('/create/user_verified',userPhotoMulter,createVerifiedRouter);

// Single user view page router
router.get('/user/view/:id',userSingleVies);

//confirmation page
router.get('/user/confirmation/:token',emailConfirmation);

// delate user
router.get('/user/:id',userRemove);

//edit user data
router.get('/user/update/:id',userEditData);

//update user data
router.post('/user/update/:id',userPhotoMulter,userUpdateData);

//sms verify router
router.get('/user/user_verified/:id', smsVerified);
//sms verify Checker router
router.post('/user/user_verified/:id', smsVerifiedChecker);


// module exports
module.exports = router;


