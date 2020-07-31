const DEFAULT_NETWORK_TIMEOUT = 5000;

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function timeout(ms, processName) {
  return new Promise(async (_, reject) => {
    await sleep(ms);
    reject(`${processName} timed out after ${ms}ms`);
  });
}

function withTimeout(promise, ms, processName) {
  return Promise.race([promise, timeout(ms, processName)]);
}

function inspect(message) {
  return (value) => {
    console.log(message, value);
    return value;
  };
}

export { DEFAULT_NETWORK_TIMEOUT, sleep, timeout, withTimeout, inspect };
