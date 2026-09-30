/* 

The Grandmaster Crucible: The Booking Dashboard

Scenario:
You are building the dashboard for a boutique hotel. You need to fetch the real-time room status for multiple floors. One of the floors is undergoing network maintenance and its API will fail. You must fetch the data, ignore the offline floor, filter out the occupied rooms, and calculate exactly how many available beds exist for each room type.

Task 1: The Provider
Write fetchFloorData(floorNumber) returning a Promise. Simulate a 400ms delay.

If floorNumber is 1, resolve:
[{ id: "101", type: "  stanDard ", available: true, beds: 2 }, { id: "102", type: "Suite", available: false, beds: 4 }]

If floorNumber is 2, resolve:
[{ id: "201", type: " SUITE", available: true, beds: 4 }, { id: "202", type: " standard", available: true, beds: 1 }]

If floorNumber is 3, reject: "Floor 3 network offline".

Task 2: The Consumer & Aggregator
Write an async function getAvailableBeds(floorsArray).

Fetch Concurrently: Fetch all floors passed into the array simultaneously without crashing.

Filter & Flatten: Extract only the data from fulfilled promises and flatten it into one master array of rooms.

Filter Available: Remove any rooms where available is false.

Clean & Group: Normalize the type strings (lowercase, trim). Group the data into a single object where the keys are the cleaned room types, and the values are the total sum of available beds for that type.

Example Execution:

JavaScript
getAvailableBeds([1, 2, 3]).then(console.log);
Strict Expected Output:

JavaScript
{
  standard: 3,
  suite: 4
}
*/

const fetchFloorData = (floorNumber) => {
  return new Promise((res, rej) => {
    setTimeout(() => {
      switch (floorNumber) {
        case 1:
          res([
            { id: "101", type: "  stanDard ", available: true, beds: 2 },
            { id: "102", type: "Suite", available: false, beds: 4 },
          ]);
          break;
        case 2:
          res([
            { id: "201", type: " SUITE", available: true, beds: 4 },
            { id: "202", type: " standard", available: true, beds: 1 },
          ]);
          break;
        case 3:
          rej("Floor 3 network offline");
          break;
      }
    }, 400);
  });
};

const getAvailableBeds = async (floorsArray) => {
  const promisesToResolve =
    floorsArray.length > 0 &&
    floorsArray.map((florNum) => {
      return fetchFloorData(florNum);
    });

  try {
    const allResolvedData = await Promise.allSettled(promisesToResolve);

    const availableRooms = allResolvedData
      .filter((res) => res.status === "fulfilled")
      .flatMap((res) => res.value)
      .filter((room) => room.available)
      .map((room) => {
        const normalizeType = room.type.toLowerCase().trim();
        return { ...room, type: normalizeType };
      });

    const GrupedData = new Map();
    for (const room of availableRooms) {
      if (GrupedData.has(room.type)) {
        const totalBed = GrupedData.get(room.type) + room.beds;
        GrupedData.set(room.type, totalBed);
      } else {
        GrupedData.set(room.type, room.beds);
      }
    }

    console.log(Object.fromEntries(GrupedData));
  } catch (err) {
    console.log("Error From the catch Block => ", err);
  }
};

getAvailableBeds([1, 2, 3]);
