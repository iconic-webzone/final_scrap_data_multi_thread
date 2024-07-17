// Function to validate a single URL
function isValidURL(url) {
    // Regular expression to match URLs
    var urlRegex = /^(?:https?:\/\/)?(?:www\.)?([a-z0-9\-._~:/?#[\]@!$&'()*+,;=]+)$/i;
    return urlRegex.test(url);
  }
  
  // Function to process strings and validate URLs asynchronously in chunks
  function processStrings(strings, chunkSize) {
    return new Promise((resolve, reject) => {
      let validURLs = [];
      let currentIndex = 0;
    //   let cache = {}
  
      function processChunk() {
        for (var i = 0; i < chunkSize && currentIndex < strings.length; i++) {
          // console.log(strings[currentIndex]);
          var url = "https://" + strings[currentIndex];

         
          if (isValidURL(url)) {
            validURLs.push(url);
          }
          currentIndex++;
        }
  
        if (currentIndex < strings.length) {
          // Process the next chunk asynchronously
          setTimeout(processChunk, 0);
        } else {
          // All URLs processed, resolve the promise with valid URLs array
          resolve(validURLs);
        }
      }
  
      // Start processing the first chunk
      processChunk();
    });
  }
  

  export default processStrings ;
  