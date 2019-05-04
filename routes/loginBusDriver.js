const mongoose = require('mongoose');
const Route = mongoose.model('routes')
module.exports = (app) => { app.post('/loginBusDriver', async (req,res) => {
    // res.writeHead(200,{
    //     Connection: 'keep-alive',
    //     'Content-Type': 'text/event-stream',
    //     'Cache-Control': 'no-cache'
    // })
    
    // setTimeout(()=>res.write(`data: This is data`),1000)
    let dataToSend = {
        check: Boolean,
        
    }
    console.log(req.body.data)
    if(req.body.data.user  === "kinsh" && req.body.data.password === "kinsh"){
        dataToSend.check = true
        // dataToSend.routes.push("r2","r3")
        
        // let src=req.body.data.stop.toString()
        
        // await Route.find({stops:{$in:[src]}}).then((res)=>{
        //     res.forEach(element => {
        //         dataToSend.routes.push(element.route)
        //     });
        // })
    }
    else dataToSend.check = false
    // console.log(dataToSend.routes)
    res.send(dataToSend)
    
})
}