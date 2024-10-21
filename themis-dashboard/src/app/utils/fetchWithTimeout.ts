const fetchWithTimeout = (url: string, options: any = {}, timeout = 60000) => {
  return new Promise((resolve, reject) => {
    // Set up a timeout
    const timer = setTimeout(() => {
      reject(new Error("Request timed out"));
    }, timeout);

    // Perform the fetch request
    fetch(url, options)
      .then(response => {
        clearTimeout(timer);  // Clear the timeout when the fetch completes
        if (!response.ok) {
          reject(new Error(`Failed with status: ${response.status}`));
        }
        resolve(response.json());  // Parse the JSON response
      })
      .catch(err => {
        clearTimeout(timer);  // Clear the timeout on error
        reject(err);
      });
  });
};
