import getTime from "../../newIndex.js";
import websiteModel from "../model/websiteModel.js";
import jsonToCsvConverter from "../utils/JSONTOCSV1.js";
import json2Csv from "../utils/json2Csv.js";
import jsonToCsv from "../utils/jsonToCsv.js";
import readCsv from "../utils/readCsv.js";
import readXlsx from "../utils/readXlsx.js";
import dataAfterScrapingWebs from "../utils/scrapWebsite.js";
import processStrings from "../utils/validUrl.js";


const extractEmailFromUrl = async (req, res) => {
    getTime();
    try {
        if (!req.file?.path) {
            return res.status(400).send("No file uploaded.");
        }

        const csvFile = req.file.path;
        console.log(req.file, "extractEmailFromUrl");
        const data =await readXlsx(csvFile);
        // const data = await readCsv(csvFile);
        console.log(data, "csvFileRead");
        const httpsAddedUrls = await processStrings(data.onlyCompany, 1000);
        console.log(httpsAddedUrls, "httpsAddedUrls");
        dataAfterScrapingWebs(httpsAddedUrls)
            .then((data) => {
                console.log(data)
                // let jsonData = data.map((obj)=>{
                //     if(obj !== null) return obj
                // })
                // console.log(jsonData);
                // json2Csv(data);
                // jsonToCsv(jsonData)
                jsonToCsvConverter(data)
                
                res.json(data)
            })
            .catch((err) => { console.log(err) })

    } catch (error) {
        console.log(error);
        return res.status(500).send({
            message: `It is from :: extractEmailUrl ${error.message}`
        });
    }
};
export default extractEmailFromUrl;