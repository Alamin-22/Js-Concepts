/* 
### The Crucible: System Logs Hydrator & Analyzer

**Scenario:**
A microservice architecture triggered an alert and gave you a raw array of `logId` strings. You need to fetch their payloads concurrently, drop the useless noise, sort them chronologically, and restructure them for the UI dashboard.

#### Task 1: The Mock API (`fetchLogData(logId)`)

Write a function returning a Promise (simulate a 300ms delay).

* If `logId` is `"log_1"`, resolve: `{ id: "log_1", service: " Auth-Service ", severity: "error", timestamp: "2026-10-02T14:00:00Z" }`
* If `logId` is `"log_2"`, resolve: `{ id: "log_2", service: "payment_Gateway", severity: "warning", timestamp: "2026-10-02T15:30:00Z" }`
* If `logId` is `"log_3"`, reject: `"Connection Timeout"`
* If `logId` is `"log_4"`, resolve: `{ id: "log_4", service: "Auth-Service", severity: "info", timestamp: "2026-10-02T16:00:00Z" }`
* If `logId` is `"log_5"`, resolve: `{ id: "log_5", service: " PAYMENT_gateway ", severity: "error", timestamp: "2026-10-02T12:00:00Z" }`

#### Task 2: The Analyzer Engine (`buildLogDashboard(logIds)`)

Write the async function that takes `["log_1", "log_2", "log_3", "log_4", "log_5"]` and does the following:

1. **Concurrent Fetch:** Fetch all logs simultaneously.
2. **Error Tracking:** If a fetch fails, push the *original `logId*` (e.g., `"log_3"`) into a `failedRequests` array.
3. **Noise Filtering:** For the successful fetches, completely remove any logs where `severity === "info"`. (The dashboard only cares about warnings and errors). == done
4. **Time-Series Sorting:** Sort the remaining successful logs chronologically from **newest to oldest** (descending order). *(Hint: You can turn ISO date strings into numbers for sorting by wrapping them in `new Date(timestamp)`).*
5. **Sanitization & Grouping:**
* Clean the `service` string: trim whitespace, convert to lowercase, and replace any hyphens (`-`) with underscores (`_`).
* Group the logs by this cleaned service name.
* **The Twist:** Inside the final grouped arrays, the log objects should *not* contain the `service` property anymore (since it is already the key of the group).



#### Expected Output Shape

```javascript
{
  failedRequests: [ "log_3" ],
  dashboard: {
    payment_gateway: [
      { id: "log_2", severity: "warning", timestamp: "2026-10-02T15:30:00Z" },
      { id: "log_5", severity: "error", timestamp: "2026-10-02T12:00:00Z" }
    ],
    auth_service: [
      { id: "log_1", severity: "error", timestamp: "2026-10-02T14:00:00Z" }
    ]
  }
}

```
*/

const fetchLogData = (logId) => {
  const LogConst = {
    log_1: "log_1",
    log_2: "log_2",
    log_3: "log_3",
    log_4: "log_4",
    log_5: "log_5",
  };

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      switch (logId) {
        case LogConst.log_1:
          resolve({
            id: "log_1",
            service: " Auth-Service ",
            severity: "error",
            timestamp: "2026-10-02T14:00:00Z",
          });
          break;
        case LogConst.log_2:
          resolve({
            id: "log_2",
            service: "payment_Gateway",
            severity: "warning",
            timestamp: "2026-10-02T15:30:00Z",
          });
          break;
        case LogConst.log_3:
          reject("Connection Timeout");
          break;
        case LogConst.log_4:
          resolve({
            id: "log_4",
            service: "Auth-Service",
            severity: "info",
            timestamp: "2026-10-02T16:00:00Z",
          });
          break;
        case LogConst.log_5:
          resolve({
            id: "log_5",
            service: " PAYMENT_gateway ",
            severity: "error",
            timestamp: "2026-10-02T12:00:00Z",
          });
          break;
      }
    }, 300);
  });
};

const buildLogDashboard = async (logIds) => {
  const promisesToResolve = logIds.map((log) => {
    return fetchLogData(log);
  });

  try {
    const resolvedPromises = await Promise.allSettled(promisesToResolve);

    const failedRequests = [];
    const fulfilledData = [];

    resolvedPromises.forEach((log, idx) => {
      // using this I am targeting the current logId in respect of idx
      const OriginalLogId = logIds[idx];
      if (log.status === "fulfilled") {
        const successData = log.value;
        if (successData.severity !== "info") {
          fulfilledData.push({
            ...successData,
            service: successData.service.trim().toLowerCase(),
            timestamp: new Date(successData.timestamp),
          });
        }
      } else {
        failedRequests.push(OriginalLogId);
      }
    });
    const sortedSuccessLogs = fulfilledData.toSorted(
      (a, b) => b.timestamp - a.timestamp,
    );

    // I am doubting that we can done this using Map.groupBy(arr,callbackFun) but I am not sure so going with map.

    const GroupedData = new Map();

    for (const log of sortedSuccessLogs) {
      // here simply used the simple distructuring method so that the original obj remains same immutable.

      const { service, ...rest } = log;
      if (GroupedData.has(service)) {
        GroupedData.get(service).push(rest);
      } else {
        GroupedData.set(service, [{ ...rest }]);
      }
    }

    const finalResShape = {
      failedRequests,
      dashboard: Object.fromEntries(GroupedData),
    };

    // console.log(Object.fromEntries(GroupedData));
    // console.log(finalResShape, { depth: null }); // it should show the exact result but dont now why it shows just obj obj
    console.log(JSON.stringify(finalResShape, null, 2));
  } catch (err) {
    console.log(err);
  }
};

buildLogDashboard(["log_1", "log_2", "log_3", "log_4", "log_5"]);
