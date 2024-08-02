
import startWorkers from "../ai/main.js";
import ArrayModel from "../model/websiteModel.js";
import readXlsx from "../utils/readXlsx.js";
import processStrings from "../utils/validUrls.js";





const extractEmailFromUrl = async (req, res) => {

    try {
        if (!req.file?.path) {
            return res.status(400).send("No file uploaded.");
        }

        const csvFile = req.file.path;
        console.log(req.file, "extractEmailFromUrl");
        const data = await readXlsx(csvFile);
        console.log(data, "csvFileRead");
        const httpsAddedUrls = await processStrings(data.onlyCompany, 1000);
        let allData =await startWorkers(httpsAddedUrls)
        // const httpsAddedUrls = await processStrings(data.onlyCompany, 1000);
        // console.log(httpsAddedUrls, "httpsAddedUrls");
        // do_multithreading(httpsAddedUrls)
        //     .then(async (data) => {
        //         console.log(data)
        //        let dataModel = new ArrayModel({ items: data, fileName: req.file.filename });
        //        let savedData = await dataModel.save()
        //         console.log(savedData)
        //         res.json(savedData)
        //     })
        //     .catch((err) => { console.log(err) })

        // const workerPromises = [];
        // for (let i = 0; i < 4; i++) {
        //     workerPromises.push(createWorker());
        // }


        // const thread_results = await Promise.all(workerPromises);

        // const allArray = [];
        // for(let array in thread_results){
        //     allArray.push(...array);
        // }
        res.status(200).send(`result is ${allData}`);

    } catch (error) {
        console.log(error);
        return res.status(500).send({
            message: `It is from :: extractEmailUrl ${error.message}`
        });
    }
};
export default extractEmailFromUrl;