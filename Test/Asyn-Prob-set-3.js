/* 
### CoderPad Screen: The Smart Home Orchestrator

**Background:**
You are programming the "Morning Routine" sequence for a smart home hub. The sequence must securely authenticate the user, boot up the security cameras with a strict time limit, connect to the thermostat using the fastest available network protocol, and manage secondary tasks like coffee and window blinds without halting if one fails.

**The Mock APIs (Copy these into your code):**

```javascript
const authenticate = (user) => new Promise((res, rej) => {
  setTimeout(() => {
    if (user === "guest") rej("Error: Guests cannot trigger morning routine");
    else res("Authenticated");
  }, 300);
});

const loadCameraFeed = (isNetworkSlow) => new Promise((res) => {
  setTimeout(() => res("Camera Feed Live"), isNetworkSlow ? 2000 : 1000);
});

const cameraTimeout = (ms) => new Promise((_, rej) => {
  setTimeout(() => rej(`Error: Camera feed timed out after ${ms}ms`), ms);
});

const connectThermostatLocal = () => new Promise((_, rej) => setTimeout(() => rej("Local network down"), 400));
const connectThermostatBluetooth = () => new Promise((res) => setTimeout(() => res("Connected via Bluetooth"), 800));
const connectThermostatCloud = () => new Promise((res) => setTimeout(() => res("Connected via Cloud"), 1200));

const startCoffee = () => new Promise((res) => setTimeout(() => res("Brewing Espresso"), 500));
const openBlinds = (isWeekend) => new Promise((res, rej) => {
  setTimeout(() => {
    if (isWeekend) rej("Blinds stay closed on weekends");
    else res("Blinds opened");
  }, 600);
});

```

**Your Job:**

1. Write an `async` function `runMorningRoutine(user, isWeekend, isNetworkSlow)`.
2. First, log: `"Initiating Morning Routine..."`
3. **Phase 1 (Critical):** `await` the `authenticate(user)` function. If it rejects, the entire function should abort to the catch block.
4. **Phase 2 (Time-Sensitive):** Race `loadCameraFeed(isNetworkSlow)` against a `cameraTimeout(1500)`. If the camera takes too long, it must throw an error and abort the routine. Save the winning result.
5. **Phase 3 (Redundancy):** The thermostat must connect via the fastest successful method. Use the correct concurrency method to check `connectThermostatLocal()`, `connectThermostatBluetooth()`, and `connectThermostatCloud()`. Save the winning string.
6. **Phase 4 (Independent Tasks):** Concurrently trigger `startCoffee()` and `openBlinds(isWeekend)`.
* If coffee succeeds, use the result. If it fails, fallback to `"No Coffee"`.
* If blinds succeed, use the result. If they fail, fallback to `"Blinds Closed"`.


7. **The Output:** Log exactly: `"Routine Complete. Camera: [cameraRes]. Thermostat: [thermoRes]. Coffee: [coffeeRes]. Blinds: [blindsRes]"`
8. **Catch Block:** Log the exact error.
9. **Finally Block:** Log exactly: `"Morning Routine sequence terminated"`

**Test Cases to Run:**

```javascript
// 1. Perfect conditions (weekday, normal network)
runMorningRoutine("admin", false, false); 

// 2. Weekend (blinds should fail and use fallback, everything else succeeds)
runMorningRoutine("admin", true, false); 

// 3. Network is slow (Camera should hit the 1500ms timeout and crash the routine)
runMorningRoutine("admin", false, true); 

// 4. Guest user (Auth fails immediately)
runMorningRoutine("guest", false, false);

```
 */

const authenticate = (user) =>
  new Promise((res, rej) => {
    setTimeout(() => {
      if (user === "guest") rej("Error: Guests cannot trigger morning routine");
      else res("Authenticated");
    }, 300);
  });

const loadCameraFeed = (isNetworkSlow) =>
  new Promise((res) => {
    setTimeout(() => res("Camera Feed Live"), isNetworkSlow ? 2000 : 1000);
  });

const cameraTimeout = (ms) =>
  new Promise((_, rej) => {
    setTimeout(() => rej(`Error: Camera feed timed out after ${ms}ms`), ms);
  });

const connectThermostatLocal = () =>
  new Promise((_, rej) => setTimeout(() => rej("Local network down"), 400));
const connectThermostatBluetooth = () =>
  new Promise((res) => setTimeout(() => res("Connected via Bluetooth"), 800));
const connectThermostatCloud = () =>
  new Promise((res) => setTimeout(() => res("Connected via Cloud"), 1200));

const startCoffee = () =>
  new Promise((res) => setTimeout(() => res("Brewing Espresso"), 500));
const openBlinds = (isWeekend) =>
  new Promise((res, rej) => {
    setTimeout(() => {
      if (isWeekend) rej("Blinds stay closed on weekends");
      else res("Blinds opened");
    }, 600);
  });

const runMorningRoutine = async (user, isWeekend, isNetworkSlow) => {
  console.log("Initiating Morning Routine...");

  try {
    await authenticate(user);

    const cameraData = await Promise.race([
      loadCameraFeed(isNetworkSlow),
      cameraTimeout(1500),
    ]);

    const thermostData = await Promise.any([
      connectThermostatLocal(),
      connectThermostatBluetooth(),
      connectThermostatCloud(),
    ]);

    const [coffeeRes, blindRes] = await Promise.allSettled([
      startCoffee(),
      openBlinds(isWeekend),
    ]);

    const coffeeData =
      coffeeRes.status === "fulfilled" ? coffeeRes.value : "No Coffee";

    const blindData =
      blindRes.status === "fulfilled" ? blindRes.value : "Blinds Closed";

    console.log(
      `"Routine Complete. Camera: [${cameraData}]. Thermostat: [${thermostData}]. Coffee: [${coffeeData}]. Blinds: [${blindData}]"`,
    );
  } catch (Err) {
    console.log(Err);
  } finally {
    console.log(`"Morning Routine sequence terminated"`);
  }
};

// 1. Perfect conditions (weekday, normal network)
// runMorningRoutine("admin", false, false);

// 2. Weekend (blinds should fail and use fallback, everything else succeeds)
// runMorningRoutine("admin", true, false);

// 3. Network is slow (Camera should hit the 1500ms timeout and crash the routine)
runMorningRoutine("admin", false, true);

// 4. Guest user (Auth fails immediately)
runMorningRoutine("guest", false, false);
