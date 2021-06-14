 import mongoose from 'mongoose';

const Role = new mongoose.Schema({
   value: {type: String}
})

export default mongoose.model('Role', Role);