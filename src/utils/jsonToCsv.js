import { Parser } from 'json2csv';
import fs from 'fs';

function flattenArray(arr) {
    return arr.join(',');
}

const jsonToCsv = (json) => {

    function flattenJSON(json) {
        return json.map(entry => {
            const flattenedEntry = {};
    
            for (const [key, value] of Object.entries(entry)) {
                if (Array.isArray(value)) {
                    flattenedEntry[key] = flattenArray(value);
                } else {
                    flattenedEntry[key] = value;
                }
            }
    
            return flattenedEntry;
        });
    }
    
    const flattenedJson = flattenJSON(json);
    
    const fields = Object.keys(flattenedJson[0]);
    const opts = { fields };
    
    try {
        const parser = new Parser(opts);
        const csv = parser.parse(flattenedJson);
        fs.writeFileSync('./public/temp/new.csv', csv);
        console.log("file written successfully")
        console.log(csv);
    } catch (err) {
        console.error(err);
    }

}

export default jsonToCsv ;




 

