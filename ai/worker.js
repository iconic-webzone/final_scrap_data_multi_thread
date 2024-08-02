import axios from 'axios';
import * as cheerio from 'cheerio';
import async from 'async';
import { workerData, parentPort } from 'worker_threads';

const { urls } = workerData;

async function scrapWebsite(url) {
  try {
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);
    const links = $('a[href^="mailto:"]');
    const emails = new Set();
    const mailtoPattern = /^mailto:([^?]+)/;

    links.each((index, link) => {
      const href = $(link).attr('href');
      if (href && href.startsWith('mailto:')) {
        const email = mailtoPattern.exec(href);
        if (email) {
          emails.add(decodeURIComponent(email[1]));
        }
      }
    });

    return { emails: Array.from(emails), url: url.replace('https://', '') };
  } catch (error) {
    console.error(`Error fetching data from ${url}: ${error.message}`);
    return { emails: null, url: url.replace('https://', '') };
  }
}

const dataAfterScrapingWebs = (urls) => {
  return new Promise((resolve, reject) => {
    const allUrl = urls.map((url) => {
      return async () => {
        try {
          return await scrapWebsite(url);
        } catch (error) {
          console.error('Error scraping this website', error.message);
        }
      };
    });

    async.parallel(allUrl, (err, results) => {
      if (err) {
        console.error('Error scraping websites', err.message);
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
};

const do_multithreading = async (urls) => {
  const results = await dataAfterScrapingWebs(urls);
  parentPort.postMessage(results);
};

do_multithreading(urls);
