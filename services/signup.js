const signupModel = require('../model/model_signup.js');

module.exports = {
    async signup(formData){
        let resData = await signupModel.signup({
            name: formData.name,
            pass: formData.password,
            repeatpass: formData.repeatpass
        });
        console.timeLog(resData);
        return resData;
    }
}