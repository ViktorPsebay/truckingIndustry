import mongoose from 'mongoose';

const Post = new mongoose.Schema({
    ownerOfCargo: {type: String, required: true},
    cargoName: {type: String, required: true},
    pointOfDeparture: {type: String, required: true},
    pointOfDestination: {type: String, required: true},
    dateOfDeparture: {type: String, required: true},
    typeOfCargo: {type: String, required: true},
    weightOfCargo: {type: Number, required: true},
    volumeOfCargo: {type: Number, required: true},
    id: {type: Number},
    driverName: {type: String}
})

export default mongoose.model('Post', Post);