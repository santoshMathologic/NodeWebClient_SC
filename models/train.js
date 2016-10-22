var mongoose = require('mongoose');
var trainSchema = new mongoose.Schema({
    name: { type: String, default: "",index: true},
    runningDays: [{type:Number}],
    train_no: Number,
    fromStation : String,
    toStation: String,
    trainType: String,
    markDelete:{type:Boolean,default:false},
    
})
module.exports = mongoose.model('train', trainSchema);