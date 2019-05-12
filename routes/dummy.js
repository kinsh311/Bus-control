const mongoose = require('mongoose');
const Request = mongoose.model('request');
const Routes = mongoose.model('routes')
const AvailableBus = mongoose.model('availableBus')
const ScheduledBus = mongoose.model('scheduledBus')
const BusOnRoute = mongoose.model('busOnRoute')


module.exports = (app) => {
    app.get('/test', (request,res)=> {
        
        let terminal = "kadugodi"
        let currentTime = "h"
        let time
        let interval
        let maxTime
        if(currentTime === "h"){
            time = 3000  
            interval = 3000
            maxTime =12000
        }
        let deleteRequest = Number
        let freeBus = String 
        let terminal_routes = ["r1", "r2","r3"]
        let requestThreshold=20
        let baseRequestThreshold=20
        let i;
        
        const check =async () => {
            
           
            for(i=0;i<terminal_routes.length;){
                console.log(i)
            await Request.findOne({route: terminal_routes[i]}).then(async (result)=> {
                deleteRequest = result.req
                console.log(deleteRequest+ " total request in route "+terminal_routes[i])
                if(deleteRequest >= requestThreshold){
                    await AvailableBus.findOne({terminal}).then(async (result) =>{
                        if(result.freeBus[0] !== undefined){
                            freeBus = result.freeBus[0]
                         console.log(result.freeBus[0]+" free bus")   
                        await AvailableBus.updateOne( { terminal },
                             { $pop: { freeBus: -1 } } ).then(async (results) => {
                                 const toDelete = deleteRequest >= 50 ? deleteRequest-50 : 0
                                 await Request.updateOne({route:terminal_routes[i]}, {req : toDelete} ).then(async ()=>{
                                     console.log("request updated "+toDelete)
                                     await ScheduledBus.updateOne({route:terminal_routes[i]}, {$push : {bus: freeBus}})
                                     .then(async () => {
                                        console.log("scheduled a bus")
                                        await Routes.findOne({route: terminal_routes[i] }).then(async (result) => {
                                            let retrievedStops = result.stops
                                            const newBus = new BusOnRoute({
                                                bus: freeBus,
                                                stops: retrievedStops,
                                                route: terminal_routes[i]
                                            })
                                            await newBus.save().then(() => {
                                                console.log("new Bus on route");
                                                i++
                                            })
                                            
                                        
                                        })
                                        
                                        
                                     })
                                 })
                                 
                             })
                    }
                    else {
                        console.log("bus not available")
                        i++
                    }
                })

                }
                else {
                    console.log("request not fullfilled " +deleteRequest)
                    i++
            }
                
            })
            

        }
            clearInterval(run)
            time = time + interval
            if(time<maxTime){
                requestThreshold=requestThreshold+10
            }
            if(time==maxTime){
                 requestThreshold=0
            }
           
            if (time > maxTime) {
                time = interval
                requestThreshold=baseRequestThreshold

            }
            run = setInterval(check, time)

        }
        var run = setInterval(check, time);
        console.log("adads")
        res.end("done")
    })
}