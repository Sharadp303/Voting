const { signUp, signIn } = require("../controller/auth")

module.exports=function(app){
    app.post('/user/signup',signUp)
    app.post('/user/signin',signIn)

}