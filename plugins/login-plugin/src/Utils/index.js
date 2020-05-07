export const DEFAULT_NETWORK_TIMEOUT = 5000;

export function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function timeout(ms, processName) {
  return new Promise(async (_, reject) => {
    await sleep(ms)
    reject(`${processName} timed out after ${ms}ms`)
  })
}

export function withTimeout(promise, ms, processName) {
  Promise.race([
    promise,
    timeout(ms, processName)
  ])
}

export function inspect(message) {
  return (value) => {
    console.log(message, value);
    return value;
  }
}
