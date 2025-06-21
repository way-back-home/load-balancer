const results = {};
const url = 'https://6wfjyk-8080.csb.app/api/hello';
const totalRequests = 1000;
const concurrency = 100;

async function makeRequest() {
  try {
    const res = await fetch(url);
    const text = (await res.text()).trim();
    results[text] = (results[text] || 0) + 1;
  } catch {
    results['Error'] = (results['Error'] || 0) + 1;
  }
}

async function run() {
  let running = [];

  for (let i = 0; i < totalRequests; i++) {
    running.push(makeRequest());

    if (running.length >= concurrency) {
      await Promise.all(running);
      running = [];
      console.log(`Sent ${i + 1} requests...`);
    }
  }

  if (running.length > 0) {
    await Promise.all(running);
  }

  console.log('\n--- Load Balancer Results ---');
  for (const [key, count] of Object.entries(results)) {
    console.log(`${key}: ${count} responses`);
  }
}

run();
