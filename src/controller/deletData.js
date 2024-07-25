import ArrayModel from "../model/websiteModel.js";


const deleteData = async(req,res) => {
    console.log(req.query._id)
    try {
        const deletedData =await ArrayModel.deleteOne(req.query._id)
        res.status(200).send(deletedData)
    } catch (error) {
        console.error(error)
        res.status(404).send(error)
    }
    
}

export default deleteData;