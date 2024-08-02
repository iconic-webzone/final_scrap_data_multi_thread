import axios from "axios";
import * as cheerio from 'cheerio';
import async from 'async';
import { workerData, parentPort } from "worker_threads";


async function scrapWebsite(url) {
  try {
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);
    // console.log($,"htmlofUrl");
    const links = $('a[href^="mailto:"]');
    console.log(links, "links");
    const emails = new Set();
    const mailtoPattern = /^mailto:([^?]+)/;
    for (const link in links) {
      const href = links[link]?.attribs?.href;
      // console.log(href,"href");
      if (href && href.startsWith("mailto:")) {
        const email = href.match(mailtoPattern)
        if (email) {
          let arrayOfEmails = mailtoPattern.exec(href);
          let decodedEmail = decodeURIComponent(arrayOfEmails[1])
          emails.add(decodedEmail)

        }
      }
    }


    console.log(Array.from(emails), url);
    console.log(`Data scraped successfully from ${url}`);
    if (emails.size > 0) {
      return { emails: Array.from(emails), url: url.replace("https://", "") };
    } else {
      return { emails: null, url: url.replace("https://", "") };
    }
  } catch (error) {
    if (error.response) {
      console.error(
        `Error fetching data from ${url}. Status code: ${error.response.status}`,
      );
      return { emails: null, url: url.replace("https://", "") };
    } else if (error.request) {
      console.error(`Error fetching data from ${url}. No response received.`);
      return { emails: null, url: url.replace("https://", "") };
    } else {
      console.error(`Error fetching data from ${url}:`, error.message);
      return { emails: null, url: url.replace("https://", "") };
    }
  }
}




const dataAfterScrapingWebs = (urls) => {


  return new Promise((res, rej) => {
    const allUrl = urls.map((url, i) => {
      return async () => {
        try {
          return await scrapWebsite(url)

        } catch (error) {
          console.error("Error scraping this website", error.message);
        }
      }


    })

    console.log(allUrl);

    async.parallel(
      allUrl,
      (err, results) => {
        if (err) {
          console.error("Error scraping websites", err.message);
          rej(err)
        }
        else {
          console.log(results, "results");
          res(results)
        }
        // console.log(err, results)
      }
    );

  })
  //     // let results = [] ;



  //     // console.log(results, "results from last scrap")
};
function sliceArrayIntoChunks(array, numChunks) {
  const result = [];
  const length = array.length;

  // Handle edge cases
  if (numChunks <= 0) {
    throw new Error('Number of chunks must be greater than 0.');
  }
  if (numChunks >= length) {
    // If numChunks is greater than or equal to the array length, return each element as a chunk
    for (let i = 0; i < length; i++) {
      result.push([array[i]]);
    }
    return result;
  }

  // Calculate chunk size
  const chunkSize = Math.ceil(length / numChunks);

  for (let i = 0; i < length; i += chunkSize) {
    const chunk = array.slice(i, i + chunkSize);
    result.push(chunk);
  }

  return result;
}

let do_multithreading = async (urls) => {


  let array_of_urls = sliceArrayIntoChunks(urls, workerData.thread_count)

  for (let array of array_of_urls) {
    dataAfterScrapingWebs(array)
    .then(data => {
      console.log(data, "data of data");
      console.log(parentPort)
      parentPort.postMessage(data);
    })
    .catch(err => console.log(err))

  }

}




export default do_multithreading;
