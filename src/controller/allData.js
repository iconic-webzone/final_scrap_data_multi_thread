
import ArrayModel from "../model/websiteModel.js";


const getAllJson = async(req,res) => {
    try {
        const getAlldata =await ArrayModel.find()
        res.status(200).send(getAlldata)
    } catch (error) {
        console.error(error)
        res.status(404).send(error)
    }
    
}

export default getAllJson;