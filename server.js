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

//data manage
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