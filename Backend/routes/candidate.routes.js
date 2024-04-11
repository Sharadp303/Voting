const { addC, delC, getC, voteC, getCanVotes } = require("../controller/candidate")
const { verifyToken } = require("../middleware/authmiddleware")

module.exports=function(app){
    app.post('/can/add',addC)
    app.delete('/can/del',delC)
    app.get('/can/vote/:canName',getCanVotes)
    app.get('/can',getC)
    app.get('/can/:canId',[verifyToken],voteC)
}