import mongoose from "mongoose";
const Schema = mongoose.Schema;


// Define the schema for the array items
const ItemSchema = new Schema({
    emails: {
      type: [String],  // Array of strings
      default: undefined,  // Optional field, default is undefined
    },
    url: {
      type: String,  // String type for URL
      required: true  // URL is required
    }
  });
  
  // Define the schema for the array containing these items
  const ArraySchema = new Schema({
    items: {
      type: [ItemSchema],  // Array of objects, each following ItemSchema
      required: true  // Array is required
    },
    fileName:{
      type:String,
      required:true
    }
  },{ timestamps: true });
  
  // Create a model based on ArraySchema
  const ArrayModel = mongoose.model('ArrayModel', ArraySchema);

// const websiteModel = mongoose.model('websites', websites);


export default ArrayModel;
