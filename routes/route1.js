const mongoose = require('mongoose');
const Routes = mongoose.model("routes");
const Sbus = mongoose.model("scheduledBus");
const Request = mongoose.model('request');
const BusOnRoute = mongoose.model('busOnRoute')

module.exports = (app) => {
    let totalReq = {
        r1: {
            r : 0,
            b : 0
        },
        r2: {
            r : 0,
            b : 0
        },
        r3: {
            r : 0,
            b : 0
        }
    }
    app.post('/api/stop', async (req, res) => {
        // console.log(busArray[0].stops[0].stop)


        const data = {
            src: req.body.data.src,
            dest: req.body.data.dest,
            route: req.body.data.route,
            ticketCount: req.body.data.ticketCount
        }
        console.log(data.ticketCount)
        await Routes.findOne({ route: data.route }).then(async (result) => {


            if (result.start === data.src) {
                console.log("it is a terminal")
                if (result.stops.includes(data.dest) === false && data.dest !== result.end) {
                    console.log("destination entered is not in this route")
                }
                await Request.findOneAndUpdate({ route: data.route }, { $inc: { "req": data.ticketCount } })
                    .then((result) => {
                        console.log("ticket print and requested for the bus")
                    })
            }
            if (result.stops.includes(data.src)) {
                console.log("it is a bus stop")
                if (result.stops.includes(data.dest) === false && data.dest !== result.end) {
                    console.log("destination entered is not in this route")
                }
                await BusOnRoute.find({ $and: [{ route: data.route }, { stops: { "$in": [data.src] } }] })
                    .then(async (result) => {
                        let scheduledBusses = result
                        if (scheduledBusses.length > 0) {
                            
                           
                            totalReq[data.route].r = totalReq[data.route].r + parseInt(data.ticketCount)
                            console.log(totalReq[data.route].r)
                            
                                    if (totalReq[data.route].r > parseInt(scheduledBusses.length * 20)) {
                                        let reqToGenerate = totalReq[data.route].r - (scheduledBusses.length * 20)
                                        
                                        await Request.findOneAndUpdate({ route: data.route }, { $inc: { "req": reqToGenerate } })
                                            .then(async (result) => {
                                                console.log(`bus is on route but not enough => request generated for  ${reqToGenerate}`)
                                                totalReq[data.route].r = 0
                                            })
                                        
                                    }

                                    else {
                                        console.log(` bus is on route total req is ${totalReq[data.route].r} request needed ${(scheduledBusses.length * 20)}`)
                                    }
                            //     }
                            // }

                        }
                        else {
                            
                            await Request.findOneAndUpdate({ route: data.route }, { $inc: { "req": data.ticketCount } })
                                            .then(async (result) => {
                                                console.log("no bus on route request generated for " + parseInt(data.ticketCount))
                                                
                                            })
                        }

                        // if (scheduledBusses.length !== 0) {
                        //     await scheduledBusses.forEach(async (entity) => {
                        //         await BusOnRoute.findOne({ bus: entity }).then(async (result) => {
                        //             if (result !== null) {
                        //                 let stopsInBusOnRoute = result.stops
                        //                 console.log(stopsInBusOnRoute)

                        //                 if (stopsInBusOnRoute.includes(data.src)) {

                        //                     console.log("ticket print && bus is on route")

                        //                 }
                        //                 else {
                        //                     await Request.findOneAndUpdate({ route: data.route }, { $inc: { "req": data.ticketCount } })
                        //                         .then(async (result) => {
                        //                             console.log("bus has crossed the stop ticket print and requested for the bus")
                        //                         })
                        //                 }
                        //             }
                        //         })
                        //     })
                        // }
                        // else {
                        //     await Request.findOneAndUpdate({ route: data.route }, { $inc: { "req": data.ticketCount } })
                        //         .then(async (result) => {
                        //             console.log("no scheduled bus ticket print and requested for the bus")
                        //         })
                        // }

                    })
            }



        })




        // Sbus.findOne({ route: data.route }).then((result) => {
        //     console.log(result.bus)
        //     busArray.forEach((item) => {
        //         if (item.bus === result.bus.toString()) {
        //             const stops = item.stops;
        //             stops.forEach((item) => {
        //                 if (item.stop === data.src) {
        //                     if (item.crossed) {
        // Request.findOneAndUpdate({route: data.route},{ $inc: { "req" : 1 }})
        // .then((result) => {
        //     console.log("updated")
        // })
        //                     }
        //                     else {
        //                         console.log("print the ticket")
        //                     }
        //                 }
        //             })
        //         }
        //         else {
        //             console.log("update request table 2")
        //         }
        //     })
        // })


        res.end()
    });

}
 ///// AFTER LOGIN
        // Routes.findOne({
        //     $and: [
        //         {
        //             $or: [{ start: data.src },
        //             { stops: { "$in": [data.src] } }
        //             ]
        //         },
        //         {
        //             $or: [{ end: data.dest },
        //             { stops: { "$in": [data.dest] } }
        //             ]
        //         }]
        // }).then((result) => {















            // const mongoose = require('mongoose');
            // const Routes = mongoose.model("routes");
            // const Sbus = mongoose.model("scheduledBus");
            // const Request = mongoose.model('request');
            // const BusOnRoute = mongoose.model('busOnRoute')
            // module.exports = (app) => {
            //     app.post('/api/stop', async (req, res) => {
            //         // console.log(busArray[0].stops[0].stop)


            //         const data = {
            //             src: req.body.data.src,
            //             dest: req.body.data.dest,
            //             route: req.body.data.route,
            //             ticketCount: req.body.data.ticketCount
            //         }
            //         console.log(data.ticketCount)
            //         await Routes.findOne({ route: data.route }).then(async (result) => {


            //             if (result.start === data.src) {
            //                 console.log("it is a terminal")
            //                 if (result.stops.includes(data.dest) === false && data.dest !== result.end) {
            //                     console.log("destination entered is not in this route")
            //                 }
            //                 await Request.findOneAndUpdate({ route: data.route }, { $inc: { "req": data.ticketCount } })
            //                     .then((result) => {
            //                         console.log("ticket print and requested for the bus")
            //                     })
            //             }
            //             if (result.stops.includes(data.src)) {
            //                 console.log("it is a bus stop")
            //                 if (result.stops.includes(data.dest) === false && data.dest !== result.end) {
            //                     console.log("destination entered is not in this route")
            //                 }
            //                 await Sbus.findOne({ route: data.route }).then(async (result) => {
            //                     let scheduledBusses = result.bus
            //                     console.log(scheduledBusses + " test")
            //                     if (scheduledBusses.length !== 0) {
            //                         await scheduledBusses.forEach(async (entity) => {
            //                             await BusOnRoute.findOne({ bus: entity }).then(async (result) => {
            //                                 if (result !== null) {
            //                                     let stopsInBusOnRoute = result.stops
            //                                     console.log(stopsInBusOnRoute)

            //                                     if (stopsInBusOnRoute.includes(data.src)) {

            //                                         console.log("ticket print && bus is on route")

            //                                     }
            //                                     else {
                                                    
            //                                     }
            //                                 }
            //                             })
            //                         })
            //                     }
            //                     else {
            //                         await Request.findOneAndUpdate({ route: data.route }, { $inc: { "req": data.ticketCount } })
            //                             .then(async (result) => {
            //                                 console.log("no scheduled bus ticket print and requested for the bus")
            //                             })
            //                     }

            //                 })
            //             }



            //         })




            //         // Sbus.findOne({ route: data.route }).then((result) => {
            //         //     console.log(result.bus)
            //         //     busArray.forEach((item) => {
            //         //         if (item.bus === result.bus.toString()) {
            //         //             const stops = item.stops;
            //         //             stops.forEach((item) => {
            //         //                 if (item.stop === data.src) {
            //         //                     if (item.crossed) {
            //         // Request.findOneAndUpdate({route: data.route},{ $inc: { "req" : 1 }})
            //         // .then((result) => {
            //         //     console.log("updated")
            //         // })
            //         //                     }
            //         //                     else {
            //         //                         console.log("print the ticket")
            //         //                     }
            //         //                 }
            //         //             })
            //         //         }
            //         //         else {
            //         //             console.log("update request table 2")
            //         //         }
            //         //     })
            //         // })


            //         res.end()
            //     });

            // }
            //  ///// AFTER LOGIN
            //         // Routes.findOne({
            //         //     $and: [
            //         //         {
            //         //             $or: [{ start: data.src },
            //         //             { stops: { "$in": [data.src] } }
            //         //             ]
            //         //         },
            //         //         {
            //         //             $or: [{ end: data.dest },
            //         //             { stops: { "$in": [data.dest] } }
            //         //             ]
            //         //         }]
            //         // }).then((result) => {