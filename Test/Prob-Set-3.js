/* 

Mid-Level Crucible: The Multi-Tenant Webhook Pipeline & Dead-Letter Queue
This scenario reflects real-world microservices that process distributed event payloads under rate-limits, malformed schemas, and network dropouts.

Scenario
An integration gateway ingests webhooks from external tenant services. Each event batch contains events with varying schemas, some missing timestamps, some duplicate eventIds across tenants, and some pointing to services that drop connections.

Requirements
1. Mock Ingestion Client (dispatchWebhook(event))
Write a function that returns a Promise simulating delivery to an external webhook sink:

Delays response randomly between 150ms and 300ms (Math.floor(Math.random() * 151) + 150).

If event.payload contains { triggerFailure: true }, reject with "Connection dropped: ECONNRESET".

If !event.tenantId || !event.eventId, reject with "Malformed payload: missing identifiers".

Otherwise, resolve with { eventId: event.eventId, status: "DELIVERED", latencyMs: <delay> }.

2. Ingestion & Normalization Engine (processWebhookStream(events))
Write an asynchronous function that handles the batch:

Deduplication: Filter out duplicates based on the compound key ${tenantId}:${eventId}. If duplicates exist in the incoming batch, keep only the first occurrence.

Sanitization: Normalize tenantId to lowercase and trimmed string.

Concurrent Dispatch: Send all unique, validated events through dispatchWebhook concurrently.

Resilience & Segregation:

Collect all delivered events.

Collect all failed dispatches into a Dead-Letter Queue (DLQ) format: { eventId, reason }. (For malformed payloads where eventId is undefined, record eventId: "UNKNOWN").

Aggregation: Return a summary object with the exact structure:

JavaScript
{
  metrics: {
    totalIngested: number,
    uniqueProcessed: number,
    deliveredCount: number,
    failureCount: number
  },
  deliveredIdsByTenant: {
    [tenantId]: string[] // array of eventId strings delivered for that tenant
  },
  deadLetterQueue: [
    { eventId: string, reason: string }
  ]
}
Test Input
JavaScript
const stream = [
  { tenantId: " tenant_A ", eventId: "evt_1", payload: { triggerFailure: false } },
  { tenantId: "tenant_a", eventId: "evt_1", payload: { triggerFailure: false } }, // duplicate compound key
  { tenantId: "tenant_B", eventId: "evt_2", payload: { triggerFailure: true } }, // fails delivery
  { tenantId: "tenant_A", eventId: "evt_3", payload: { triggerFailure: false } },
  { tenantId: "", eventId: "evt_4", payload: { triggerFailure: false } }, // malformed
  { tenantId: "tenant_C", eventId: "evt_5", payload: { triggerFailure: false } }
];

// processWebhookStream(stream).then(console.log);
Expected Shape
JavaScript
{
  metrics: {
    totalIngested: 6,
    uniqueProcessed: 5,
    deliveredCount: 3,
    failureCount: 2
  },
  deliveredIdsByTenant: {
    tenant_a: ["evt_1", "evt_3"],
    tenant_c: ["evt_5"]
  },
  deadLetterQueue: [
    { eventId: "evt_2", reason: "Connection dropped: ECONNRESET" },
    { eventId: "evt_4", reason: "Malformed payload: missing identifiers" }
  ]
}
Construct the provider and ingestion engine in a blank environment, verify against the edge cases, and share your implementation.
*/

const dispatchWebhook = (event) => {
  return new Promise((resolve, reject) => {
    const randomDelay = Math.floor(Math.random() * 151 + 150);

    setTimeout(() => {
      if (event.payload.triggerFailure) {
        reject("Connection dropped: ECONNRESET");
      } else if (!event.tenantId || !event.eventId) {
        reject("Malformed payload: missing identifiers");
      } else {
        resolve({
          eventId: event.eventId,
          status: "DELIVERED",
          // latencyMs: `<${randomDelay}>`,
          latencyMs: randomDelay,
        });
      }
    }, randomDelay);
  });
};

const processWebhookStream = async (events) => {
  const uniqueEvents = [];
  const seenKeys = new Set();

  for (const e of events) {
    const cleanedTenantID = e.tenantId.trim().toLowerCase();
    const compoundKey = `${cleanedTenantID}:${e.eventId}`;

    if (seenKeys.has(compoundKey)) continue;

    seenKeys.add(compoundKey);
    uniqueEvents.push({ ...e, tenantId: cleanedTenantID });
  }

  // console.log(uniqueEvents);

  const arryOfPromises = uniqueEvents.map((e) => {
    return dispatchWebhook(e);
  });

  try {
    const resolvedPromises = await Promise.allSettled(arryOfPromises);

    const deliveredIdsByTenant = new Map();
    const deadLetterQueue = [];

    resolvedPromises.forEach((res, i) => {
      const originalEvent = uniqueEvents[i];

      if (res.status === "fulfilled") {
        const deliveredEvent = res.value.eventId;
        if (deliveredIdsByTenant.has(originalEvent.tenantId)) {
          const currentArryOfEId = deliveredIdsByTenant.get(
            originalEvent.tenantId,
          );
          currentArryOfEId.push(deliveredEvent);
        } else {
          deliveredIdsByTenant.set(originalEvent.tenantId, [deliveredEvent]);
        }
      } else {
        const failedEvent = res;
        deadLetterQueue.push({
          eventId: originalEvent.eventId,
          reason: failedEvent.reason,
        });
      }
    });

    const metrics = {
      totalIngested: events.length,
      uniqueProcessed: uniqueEvents.length,
      deliveredCount: deliveredIdsByTenant.size,
      failureCount: deadLetterQueue.length,
    };

    const finalResShape = {
      metrics,
      deliveredIdsByTenant: Object.fromEntries(deliveredIdsByTenant),
      deadLetterQueue,
    };

    console.log(finalResShape);
  } catch (err) {
    console.log(err);
  }
};

const stream = [
  {
    tenantId: " tenant_A ",
    eventId: "evt_1",
    payload: { triggerFailure: false },
  },
  {
    tenantId: "tenant_a",
    eventId: "evt_1",
    payload: { triggerFailure: false },
  }, // duplicate compound key
  { tenantId: "tenant_B", eventId: "evt_2", payload: { triggerFailure: true } }, // fails delivery
  {
    tenantId: "tenant_A",
    eventId: "evt_3",
    payload: { triggerFailure: false },
  },
  { tenantId: "", eventId: "evt_4", payload: { triggerFailure: false } }, // malformed
  {
    tenantId: "tenant_C",
    eventId: "evt_5",
    payload: { triggerFailure: false },
  },
];

processWebhookStream(stream);
