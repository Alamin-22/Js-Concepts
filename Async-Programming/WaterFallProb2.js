/* 
CoderPad Screen: The Travel Aggregator
Background:
You are building the search results page for a travel aggregator. When a user searches for a destination, your backend must query three separate third-party APIs (Flights, Hotels, and Weather). These third-party APIs are notoriously flaky. If one fails, you must not crash the whole page; you must display the data you did get, and show fallbacks for the ones that failed.

Requirements:

The Mock APIs: Write three separate functions.

fetchFlight(destination): Simulates a 600ms delay. If destination is "Mars", it must reject with exactly: "Error: No flights to Mars". Otherwise, it resolves with the object: { airline: "Oceanic Airlines", price: 450 }.

fetchHotel(destination): Simulates a 900ms delay. If destination is "Atlantis", it must reject with exactly: "Error: Atlantis is underwater". Otherwise, it resolves with the object: { hotelName: "Grand Resort", rating: 4.8 }.

fetchWeather(destination): Simulates a 400ms delay. It never fails. It always resolves with the object: { temp: 75, condition: "Sunny" }.

The Frontend Consumer: Write an async function buildTravelPackage(destination).

Performance Rule: All three API calls must happen concurrently.

Resilience Rule: If any API fails, the function must not crash or jump to a catch block.

Before fetching, log exactly: "Searching packages for [destination]..."

Safely extract the data.

If the flight succeeds, grab the airline. If it fails, fallback to the string "N/A".

If the hotel succeeds, grab the hotelName. If it fails, fallback to the string "N/A".

(Weather will always succeed, so just grab the temp).

Finally, construct and log this exact string:
"Result: Flight: [airline], Hotel: [hotelName], Weather: [temp]°F"

At the very end of the execution, regardless of what happened, log exactly: "Search sequence complete"

Test Cases to Run:

JavaScript
// 1. Everything succeeds
buildTravelPackage("Hawaii"); 

// 2. Flight fails, but Hotel and Weather should still display
buildTravelPackage("Mars"); 

// 3. Hotel fails, but Flight and Weather should still display
buildTravelPackage("Mars"); 

*/

const fetchFlight = (destination) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (destination === "Mars") {
        reject("Error: No flights to Mars");
      } else {
        resolve({ airline: "Oceanic Airlines", price: 450 });
      }
    }, 600);
  });
};

const fetchHotel = (destination) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (destination === "Atlantis") {
        reject("Error: Atlantis is underwater");
      } else {
        resolve({ hotelName: "Grand Resort", rating: 4.8 });
      }
    }, 900);
  });
};

const fetchWeather = (destination) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ temp: 75, condition: "Sunny" });
    }, 400);
  });
};

const buildTravelPackage = async (destination) => {
  console.log(`Searching packages for [${destination}]...`);

  try {
    const [flightRes, hotelRes, weatherRes] = await Promise.allSettled([
      fetchFlight(destination),
      fetchHotel(destination),
      fetchWeather(destination),
    ]);

    const flightData =
      flightRes.status === "fulfilled" ? flightRes.value.airline : "N/A";

    const hotelData =
      hotelRes.status === "fulfilled" ? hotelRes.value.hotelName : "N/A";

    //   though we know this will never fail but still adding the edge case logic
    const weatherData =
      weatherRes.status === "fulfilled" ? weatherRes.value.temp : "N/A";

    console.log(
      `Result: Flight: [${flightData}], Hotel: [${hotelData}], Weather: [${weatherData}]°F`,
    );
  } catch (err) {
    console.log(err);
  } finally {
    console.log("Search sequence complete");
  }
};

// buildTravelPackage("Hawaii");
// buildTravelPackage("Mars");
buildTravelPackage("Mars");
