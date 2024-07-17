import fs from 'fs';
import csv from 'csv-parser';

const readCsv = (csvFile) => {
    return new Promise((resolve, reject) => {
        const results = [];
        const onlyCompany = [];

        fs.createReadStream(csvFile)
            .pipe(csv())
            .on('data', (data) => {
                results.push(data);
            })
            .on('end', () => {
                results.forEach((data) => {
                    onlyCompany.push(data.websiteName);
                });

                // fs.createReadStream(results)
                // .on('data', (data)=>{
                //     onlyCompany.push(data.websiteName)
                // })
                

                resolve({ onlyCompany, results });
            })
            .on('error', (error) => {
                reject(error);
            });
    });
};

export default readCsv;
