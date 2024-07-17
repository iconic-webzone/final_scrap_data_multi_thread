
import { json2csv } from 'json-2-csv';
import fs from 'fs' ;


const json2Csv = (data) => {
    

    const csv = json2csv(data, {
        parseValue:true,
        prependHeader:true,
        sortHeader:false,
        trimFieldValues:false,
        trimHeaderFields:false,
        unwindArrays:true
    })
    

    try {
        fs.writeFileSync('./public/temp/new.csv', csv);
        console.log("file written successfully")
      } catch (err) {
        console.error(err);
      }
   
}

export default json2Csv ;



