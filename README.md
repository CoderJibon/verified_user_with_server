## User Verified make the server by express


## User Verified feature List

* New User Create
* User Through Email Verification
* User Through SMS
* Verified User display
* unVerified User display
* User Delate
* User Profile View
* User Profile Edit

## Usage

If are you want to download and use

```console
npm install 
```
## Server structure

```console
//file required
const express           = require('express');
const dotenv            = require('dotenv');
const pageRoutes        = require('./routes/pageRoutes');
const expressEjsLayouts = require('express-ejs-layouts');

//environment variable
dotenv.config();
const PORT = process.env.PORT || 4000;

//express init
const app = express();

//Middleware
app.use(express.json());
app.use(express.urlencoded({extended : false}));

//public folder
app.use(express.static("public"));

//ejs init
app.set("view engine","ejs");
app.use(expressEjsLayouts);
app.set('layout','layouts/app');

//routers call
app.use(pageRoutes);

//
app.listen(PORT,()=>{
    console.log(`server running on port : ${PORT}`);
})

```

## Packages

* Express Js
* Ejs
* Express-Ejs-Layouts
* Nodemon
* bulksmsbd
* dotenv
* multer
* nodemailer
* axios
* sweetalert2

## Live Project Link

[Live Project](https://verifyusers.herokuapp.com/)

