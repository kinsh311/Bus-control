const mongoose = require('mongoose');
const ScheduledBus = mongoose.model('scheduledBus')
const BusOnRoute = mongoose.model('busOnRoute')
const AvailableBus = mongoose.model('availableBus')
const Routes = mongoose.model('routes')
module.exports = (app) => {
   

    app.post('/busDrivers', async (req,res)=>{
        busId = "a"//req.body.data.busId
        console.log(busId)
    })
//runsin intervel
    app.post('/busDriver', async (req,res) => {
       const data={
           busId:req.body.busId,
           msg:""
       }

        
            
        await ScheduledBus.findOne({ bus: { "$in": [data.busId] } }).then((result) => {
            // console.log(result)
            if(result!== null)
            {
                
                
                console.log("bus on route")
                data.msg="bus on route"
                res.send(data.msg)
            }
        else{
                console.log("Your bus not yet scheduled")
                data.msg="Your bus not yet scheduled"
                res.send(data.msg)
            }
           
       })

     
     
        
        
    })

    app.post('/busReached' , async(req,res) =>{
        let busId = req.body.data.busId
        let route_from_which_bus_is_deleted = ""
        await ScheduledBus.findOneAndUpdate(
            {bus : {$in : [busId]}},
            {$pull: {bus : {$in : [busId]}}}
        ).then((result) =>route_from_which_bus_is_deleted=result.route)
        await BusOnRoute.deleteOne({bus:busId})
        await Routes.findOne({route:route_from_which_bus_is_deleted})
        .then(async (result)=> {
            const dest = result.end;
            await AvailableBus.findOneAndUpdate(
                {terminal: "kadugodi"},
                {$push: {freeBus:busId}}
            )
        })
    })
}