

const getOTP = () =>{
    const pin = Math.round(Math.random()*1000000);
    let stringPin = pin + "";
    let OTP = "";

    if(stringPin.length > 4){
        OTP = stringPin.slice(0,4);
    }

    return OTP;

}

module.exports = getOTP;