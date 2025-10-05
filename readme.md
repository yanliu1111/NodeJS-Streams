# Node JS Streams
1. Node JS Streams Intro
2. Node JS - Readable Stream
3. Node JS - Writable Stream & Backpressure
4. Node JS - pipe, duplex, transform Streams
5. Node JS - HTTP Streaming

## Learning Resources
[Node-JS-Streams Youtube Tutorial](https://www.youtube.com/playlist?list=PLrwNNiB6YOA18XANsFe0CnizlhYKjJT0f)

[Node Docs on Streams](https://nodejs.org/api/stream.html)

## Learning Notes:
1. Difference Between Callback and Promise
    - Callback: A callback is a function passed as an argument to another function, which is executed after the completion of an asynchronous operation.

      - How it works: The function performing the asynchronous task takes a callback as a parameter and calls it when the task is done.
      - When to use: Use callbacks for simple, single asynchronous operations or when working with legacy Node.js APIs that rely on callbacks.
      - Pro: Simple for small tasks, support in older Nodejs versions.
      - Con: Can lead to "callback hell" with nested callbacks, harder to manage error handling.
  
      ```js
      const fs = require('fs');

      // Using a callback to read a file
      fs.readFile('example.txt', 'utf8', (err, data) => {
        if (err) {
          console.error('Error reading file:', err);
          return;
        }
        console.log('File content:', data);
      });
      ```

    - Promise: A Promise is an object representing the eventual completion (or failure) of an asynchronous operation and its resulting value. 
      - How it works: A promise has three states: pending, fulfilled, and rejected. You can attach `.then()` and `.catch()` handlers to handle the resolved value or errors.
      - When to use: Use promises for more complex asynchronous workflows, especially when chaining multiple asynchronous operations.
      - Pro: Improved readability, eEasier to chain multiple asynchronous operations. Works well with async/await.
      - Con: Slightly more complex syntax, requires understanding of promise states.
    
    **Promise:**
      ```js
      const fs = require('fs').promises;
      // Using a promise to read a file
      fs.readFile('example.txt', 'utf8')
        .then(data => {
          console.log('File content:', data);
        })
        .catch(err => {
          console.error('Error reading file:', err);
        });
      ```
      
      **Async/Await with Promise:**
      ```JS
      const fs = require('fs').promises;

      async function readFileAsync() {
        try {
          const data = await fs.readFile('example.txt', 'utf8');
          console.log('Data:', data);
        } catch (err) {
          console.error('Error:', err);
        }
      }

      readFileAsync();
      ```

    - Key Differences:
      - Readability: Promises improve code readability by allowing chaining and avoiding nested callbacks.
      - Error Handling: Promises provide a more structured way to handle errors using `.catch()`, while callbacks require manual error handling.
      - State Management: Promises have three states (pending, fulfilled, rejected), while callbacks do not have built-in state management.