import fs from 'fs';
import xlsx from 'xlsx';

const readXlsx = (xlsxFile) => {
    return new Promise((resolve, reject) => {
        try {
            // Read the file
            const workbook = xlsx.readFile(xlsxFile);
            // Get the first sheet name
            const sheetName = workbook.SheetNames[0];
            // Get the sheet
            const sheet = workbook.Sheets[sheetName];
            // Convert sheet to JSON
            const results = xlsx.utils.sheet_to_json(sheet);
            
            const onlyCompany = results.map(data => data.websiteName);

            resolve({ onlyCompany, results });
        } catch (error) {
            reject(error);
        }
    });
};



export default readXlsx;
