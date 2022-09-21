const axios = require("axios")
const dotenv = require('dotenv').config();

const sendSMS = async (to,sms) => {
   await axios.get(`https://bulksmsbd.net/api/smsapi?api_key=${process.env.API_KEY}&type=text&number=${to}&senderid=${process.env.SENDER_ID}&message=${ sms }`)
    .then((res)=>{
        console.log('Done');
    }).catch((err)=>{
        console.log('Failed');
    });
}

module.exports = sendSMS;