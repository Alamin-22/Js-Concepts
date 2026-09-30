/* 

CoderPad Screen 1: The Ride-Share App
Background:
You are building the ride-request sequence for a Uber/Lyft clone. You need to find a driver within a strict time limit. If a driver is found, you must calculate the fastest route using redundant map servers, and fetch multiple pricing options (some of which might be unavailable) without slowing down the UI.

The Mock APIs:

JavaScript
const findDriver = (riderId) => new Promise((res, rej) => {
  setTimeout(() => {
    if (riderId === "banned") rej("Error: Rider suspended");
    else res({ name: "Dave", car: "Prius" });
  }, riderId === "rural" ? 3000 : 800);
});

const driverTimeout = (ms) => new Promise((_, rej) => {
  setTimeout(() => rej("Error: No drivers found in time"), ms);
});

const routeGoogle = () => new Promise((_, rej) => setTimeout(() => rej("Google Maps API down"), 300));
const routeMapbox = () => new Promise((res) => setTimeout(() => res("Mapbox Route Loaded"), 700));

const priceStandard = () => new Promise((res) => setTimeout(() => res("$12.50"), 400));
const priceCarpool = () => new Promise((_, rej) => setTimeout(() => rej("Carpool full"), 500));
Your Job:

Write an async function requestRide(riderId).

First, log: "Locating driver..."

Fetch the driver, but enforce a strict 2000ms timeout. If it times out or the rider is suspended, jump immediately to the catch block.

If the driver is successfully found, fetch the route and the prices concurrently:

The Route: Query both routeGoogle() and routeMapbox(). You just need the fastest successful one.

The Prices: Query both priceStandard() and priceCarpool(). You need the status of both, as the UI displays both options.

Safely extract the data. If a price failed, fallback to "Unavailable".

Log exactly: "Success! Driver [name] arriving in [car]. Route: [routeRes]. Standard: [stdPrice], Carpool: [poolPrice]"

Catch block: Log the error.

Finally block: Log "Ride request sequence closed"

Test Cases to Run:

JavaScript
requestRide("standard"); // Should succeed entirely
requestRide("rural");    // Should fail via the 2000ms timeout
requestRide("banned");   // Should fail immediately via suspension

*/

const findDriver = (riderId) =>
  new Promise((res, rej) => {
    setTimeout(
      () => {
        if (riderId === "banned") rej("Error: Rider suspended");
        else res({ name: "Dave", car: "Prius" });
      },
      riderId === "rural" ? 3000 : 800,
    );
  });

const driverTimeout = (ms) =>
  new Promise((_, rej) => {
    setTimeout(() => rej("Error: No drivers found in time"), ms);
  });

const routeGoogle = () =>
  new Promise((_, rej) => setTimeout(() => rej("Google Maps API down"), 300));
const routeMapbox = () =>
  new Promise((res) => setTimeout(() => res("Mapbox Route Loaded"), 700));

const priceStandard = () =>
  new Promise((res) => setTimeout(() => res("$12.50"), 400));
const priceCarpool = () =>
  new Promise((_, rej) => setTimeout(() => rej("Carpool full"), 500));

const requestRide = async (riderId) => {
  console.log("Locating driver...");

  try {
    const driverData = await Promise.race([
      findDriver(riderId),
      driverTimeout(2000),
    ]);
    const routeData = await Promise.any([routeGoogle(), routeMapbox()]);

    const [standardPrice, carpoolPrice] = await Promise.allSettled([
      priceStandard(),
      priceCarpool(),
    ]);

    const stPriceData =
      standardPrice.status === "fulfilled"
        ? standardPrice.value
        : "Unavailable";

    const crPolPriceData =
      carpoolPrice.status === "fulfilled" ? carpoolPrice.value : "Unavailable";

    console.log(
      `"Success! Driver [${driverData.name}] arriving in [${driverData.car}]. Route: [${routeData}]. Standard: [${stPriceData}], Carpool: [${crPolPriceData}]"`,
    );
  } catch (Err) {
    console.log(Err);
  } finally {
    console.log("Ride request sequence closed");
  }
};

requestRide("standard"); // Should succeed entirely
// requestRide("rural"); // Should fail via the 2000ms timeout
// requestRide("banned"); // Should fail immediately via suspension
