//file include
const getOTP = require("../utility/getOTP");
const {readFileSync,writeFileSync} = require('fs');
const path = require('path');
const sendMail = require("../utility/sendMail");
const sendSMS = require("../utility/sendSMS");


// home page Controllers
const homeRouter = (req,res) => {
    const userData = JSON.parse(readFileSync(path.join(__dirname,'../DB/userData.json')));
    
    const verifiedUser = userData.filter(data => data.isActive == true);
    res.render('home',{
        verifiedUser
    });
}

// unverified page Controllers
const unverifiedRouter = (req,res) => {
    //read file data
    const userData = JSON.parse(readFileSync(path.join(__dirname,'../DB/userData.json')));
    
    const unverifiedUser = userData.filter(data => data.isActive == false);

    res.render('unverifiedUser',{
        unverifiedUser
    });
}

// create user page Controllers
const createRouter = (req,res) =>{
    res.render('createUser');
}

// create user verified page Controllers
const  createVerifiedRouter = async (req,res) => {

    //read file data
    const userData = JSON.parse(readFileSync(path.join(__dirname,'../DB/userData.json')));
    //get form data
    const {name,email,phone} = req.body;
    //make the random id
    const userId = Date.now()+ "_" + Math.round(Math.random() * 1000);
    //user Token
    const token = Date.now()+ Math.round(Math.random() * 10000);
    //OTP code
    const OTP = getOTP();

    //user data push
    userData.push({
        id          : userId,
        name        : name,
        email       : email,
        phone       : phone,
        Photo       : req.file ? req.file.filename : "userPhoto.webp",
        token       : token,
        OTP         : OTP,
        isActive    : false
    });

    //mail send
    await sendMail(email,"Account verification", {
        name, phone, token
    } );

    //write file data
    writeFileSync(path.join(__dirname,"../DB/userData.json"),JSON.stringify(userData));
   
    res.render('emailUserVerified',{
        userId,name
    });
}

//user single view
const userSingleVies = (req,res) => {
    //read file data
    const userData = JSON.parse(readFileSync(path.join(__dirname,'../DB/userData.json')));
    //find the single user data
    const singleUser = userData.find(data => data.id == req.params.id );
   
    res.render('singleView',{
        singleUser
    });
}

const emailConfirmation = (req,res) =>{
   
    //read file data
    const userData = JSON.parse(readFileSync(path.join(__dirname,'../DB/userData.json')));
     
    //find the single user data
    const index = userData.findIndex(data => data.token == req.params.token);
    userData[index] = {
        ...userData[index],
        isActive : true
    }

   //write file data
    writeFileSync(path.join(__dirname,"../DB/userData.json"),JSON.stringify(userData));

    res.render('isVerified',{
        isActive: userData[index]?.isActive
    });
}

//user remove
const userRemove = (req,res) => {
    //read file data
    const userData = JSON.parse(readFileSync(path.join(__dirname,'../DB/userData.json')));
    // user all data without remove item
    const userDataAll = userData.filter(data => data.id !== req.params.id);
    //write file data
    writeFileSync(path.join(__dirname,"../DB/userData.json"),JSON.stringify(userDataAll));

    res.redirect('back');
}

// EDIT USER DATA
const userEditData = (req,res) => {
    //read file data
    const userData = JSON.parse(readFileSync(path.join(__dirname,'../DB/userData.json')));
    const data  = userData.find(data => data.id == req.params.id);

    res.render('update',{
        data
    });
}

//update user data
const userUpdateData = (req,res) => {
    //read file data
    const userData = JSON.parse(readFileSync(path.join(__dirname,'../DB/userData.json')));
    const index  = userData.findIndex(data => data.id == req.params.id);

    // body data
    const {name,email,phone} = req.body;

    userData[index] = {
        ...userData[index],
        name    : name,
        phone   : phone,
        Photo   : req.file ? req.file.filename : userData[index]?.Photo
    }

    //write file data
    writeFileSync(path.join(__dirname,"../DB/userData.json"),JSON.stringify(userData));

    res.redirect('back');
}

//sms verified
const smsVerified = async (req,res) => {
   //read file data
   const userData = JSON.parse(readFileSync(path.join(__dirname,'../DB/userData.json')));
     
   //find the single user data
   const data  = userData.find(data => data.id == req.params.id);

   //sms send
   await sendSMS(data.phone,`HI ${data.name}, you are welcome. Your verification code is: ${data.OTP}`);

    res.render('smsUserVerified',{
        name : data?.name,
        id   : data?.id
    });
}

//sms verify Checker 
const smsVerifiedChecker = (req,res) => {
    //read file data
   const userData = JSON.parse(readFileSync(path.join(__dirname,'../DB/userData.json')));
   //find index
   const index = userData.findIndex(data => data.OTP == req.body.OTP);

   userData[index] = {
    ...userData[index],
    isActive : true,
    OTP : ""
   }

    //write file data
    writeFileSync(path.join(__dirname,"../DB/userData.json"),JSON.stringify(userData));

    res.render('isVerified',{
        isActive: userData[index]?.isActive
    });

}

// module exports
module.exports = {
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
};