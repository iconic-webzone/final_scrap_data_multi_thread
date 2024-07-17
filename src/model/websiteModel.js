import mongoose from "mongoose";



const websites = new mongoose.Schema({
    websiteNamesArray:{
        type: [String],
        required: true
    },
    name: {
        type: String,
        required: true,
    }
},
    {
        timestamps: true
    })

const websiteModel = mongoose.model('websites', websites);


export default websiteModel;
