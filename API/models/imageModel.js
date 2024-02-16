const mongoose=require('mongoose')
const Schema=mongoose.Schema;

const imageSchema=new Schema({
    imageUrl: {
        type: String,
        required: true
    }
}, {timestamps: true});

// Sort file in descending order by creation date and time
imageSchema.index({ createdAt: -1 });

module.exports = mongoose.model('Images', imageSchema)