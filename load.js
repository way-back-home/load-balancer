
const fetch = global.fetch || require('node-fetch');

const url = 'https://6wfjyk-8080.csb.app/api/hello';

const previewToken = 'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJDb2RlU2FuZGJveCIsImV4cCI6MTc1MzA4ODkzNywiaWF0IjoxNzUwNDk2OTM3LCJpc3MiOiJDb2RlU2FuZGJveCIsImp0aSI6IjExNWE2MTkzLTFkMmYtNGNkNy04ZGI5LWY1Y2I0ZjNmMjcwYiIsIm5iZiI6MTc1MDQ5NjkzNiwicGVybWlzc2lvbiI6InByZXZpZXciLCJzaG9ydGlkIjoiNndmanlrIiwic3ViIjoiVXNlcjp1c2VyX0hmQ2tScGVMR3JreXllSkxncEg3aXYiLCJ0eXAiOiJhY2Nlc3MifQ.NiZz8rW7Lv3JmLzRqKfYdLi-OZZsiDyqs6n8641qVJTvZ3v7RCGE2-tPJ4TOJCaOblZReEffY8QCPUTgVg3PGg'; // your full token here
const requestsPerSecond = 10;
const totalSeconds = 60;
let count = 0;

function sendRequest(requestNumber) {
  fetch(url, {
    headers: {
      'Cookie': `csb_preview_token=${previewToken}`
    }
  })
    .then(res => res.text())
    .then(text => {
      console.log(`Request #${requestNumber}:`, text.trim());
    })
    .catch(err => {
      console.log(`Request #${requestNumber}: Error`, err.message);
    });
}

function startLoadTest() {
  let intervalCount = 0;

  const intervalId = setInterval(() => {
    if (intervalCount >= totalSeconds) {
      clearInterval(intervalId);
      console.log('Load test completed');
      return;
    }

    for (let i = 0; i < requestsPerSecond; i++) {
      const reqNum = count + 1;
      count++;

      // Add random delay within the second (0-1000 ms)
      const delay = Math.floor(Math.random() * 100);

      setTimeout(() => {
        sendRequest(reqNum);
      }, delay);
    }

    intervalCount++;
  }, 1000);
}

startLoadTest();
