const signupModel = require('../model/model_signup.js');

module.exports = {
    async signup(formData){
        let resData = await signupModel.signup({
            name: formData.name,
            pass: formData.pass,
            repeatpass: formData.repeatpass
        });

        return resData;
    }
}