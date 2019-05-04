const mongoose = require('mongoose');
const Routes = mongoose.model("routes");
const Sbus = mongoose.model("scheduledBus");
const Request = mongoose.model('request');
const BusOnRoute = mongoose.model('busOnRoute')
module.exports = (app) => {
    app.post('/stops', async (req,res) => {
        const data = {
            src: req.body.data.src,
            route: req.body.data.route
        }
        let busses=[]
        function obj(bus,route){
            this.bus = bus;
            this.route =route
        }
        await BusOnRoute.find({$and: [{route:data.route},{stops: {"$in" : [data.src]}}]}).then(async (result) => {
            
            result.forEach((entity) => {
                var a = new obj(entity.bus,entity.route)
                
                busses.push(a)
            })
        })
        res.send(busses)
    })
}
// const mongoose = require('mongoose');
// const Routes = mongoose.model("routes");
// const BusOnRoute = mongoose.model('busOnRoute')
// module.exports = (app) => {
//     app.post('/stops', async (req,res) => {
//         const data = {
//             src: req.body.data.src
//         }
//         let busses=[]
//         function obj(bus,route,start,end,stops){
//             this.bus = bus,
//             this.route =route,
//             this.start = start,
//             this.end = end,
//             this.stops = stops
//         }
//         await BusOnRoute.find({stops: {"$in" : [data.src]}}).then(async (result) => {
//             result.forEach(async (entity) => {
//                 await Routes.findOne({route:entity.route}).then((result)=>{
//                     var a = new obj(entity.bus,entity.route,result.start,result.end,result.stops)
//                     busses.push(a)
//                 })
//             })
//         })
        
//         res.send(busses)
//     })
// }