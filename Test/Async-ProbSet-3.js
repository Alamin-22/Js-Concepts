/* 
The Crucible: Cross-Border Inventory Aggregator
Scenario:
You are building the dashboard for a cross-border e-commerce platform. You need to pull inventory data from multiple regional servers at the same time. Some servers will fail. For the servers that succeed, you must clean their messy data, merge it, and pivot it so the UI can render it perfectly.

Task 1: The Regional Mock API
Write a function fetchRegionalInventory(region) that returns a new Promise.

Simulate a 500ms network delay.

If the region is "US", resolve with this array:
[{ name: "   iPhoNe 13  ", category: "phones", qty: 10 }, { name: " macbook Air ", category: "laptops", qty: 5 }]

If the region is "EU", resolve with this array:
[{ name: "IPHONE 13", category: "phones", qty: 15 }, { name: "   galaXy s23 ", category: "phones", qty: 20 }]

If the region is "ASIA", reject with the string: "ASIA server timeout".

Task 2: The Aggregator Engine
Write an asynchronous function buildGlobalCatalog(regionsArray).

Fetch Concurrently: Take the array of region strings (e.g., ["US", "ASIA", "EU"]) and fetch them all simultaneously. You must handle the fact that the "ASIA" server will fail without crashing the whole function.

Filter & Flatten: Extract only the successful data arrays and flatten them into one single continuous array of products.

Clean & Pivot (Synchronous Master Test): Transform that raw array into a single summary object.

The object keys must be the category names.

The value for each category must be a nested object tracking the cleaned item name and its total combined quantity across all regions.

String Cleaning Rule: Item names must have all leading/trailing whitespace removed, and be converted to completely lowercase (e.g., "   iPhoNe 13  " becomes "iphone 13").

Example Execution:

JavaScript
buildGlobalCatalog(["US", "ASIA", "EU"]).then(console.log);
Strict Expected Output:

JavaScript
{
  phones: {
    "iphone 13": 25,
    "galaxy s23": 20
  },
  laptops: {
    "macbook air": 5
  }
}
*/

// Task 1: The Regional Mock API

const fetchRegionalInventory = (region) => {
  const Regions = { US: "US", EU: "EU", ASIA: "ASIA" };
  return new Promise((res, rej) => {
    setTimeout(() => {
      switch (region) {
        case Regions.US:
          res([
            { name: "   iPhoNe 13  ", category: "phones", qty: 10 },
            { name: " macbook Air ", category: "laptops", qty: 5 },
          ]);
          break;

        case Regions.EU:
          res([
            { name: "IPHONE 13", category: "phones", qty: 15 },
            { name: "   galaXy s23 ", category: "phones", qty: 20 },
          ]);
          break;
        case Regions.ASIA:
          rej("ASIA server timeout");
          break;
      }
    }, 500);
  });
};

// Task 2: The Aggregator Engine

const buildGlobalCatalog = async (regionsArray) => {
  const functionsToCall =
    regionsArray.length > 0 &&
    regionsArray.map((region) => {
      return fetchRegionalInventory(region);
    });

  try {
    const [usaRes, asiaRes, euRes] = await Promise.allSettled(functionsToCall);
    const usaData = usaRes.status === "fulfilled" ? usaRes.value : [];
    const asiaData = asiaRes.status === "fulfilled" ? asiaRes.value : [];
    const euData = euRes.status === "fulfilled" ? euRes.value : [];

    const ultimateProducts = [...usaData, ...asiaData, ...euData];

    const cleanedArryOfProds = ultimateProducts.map((prod) => {
      const cleanedName = prod.name.toLowerCase().trim();
      return { ...prod, name: cleanedName };
    });

    const uniqueProducts = new Map();

    for (const prod of cleanedArryOfProds) {
      if (uniqueProducts.has(prod.name)) {
        const currentProd = uniqueProducts.get(prod.name);
        uniqueProducts.set(prod.name, {
          ...currentProd,
          qty: currentProd.qty + prod.qty,
        });
      } else {
        uniqueProducts.set(prod.name, prod);
      }
    }

    const mergedInventory = [...uniqueProducts.values()];

    const grupedData = new Map();

    for (const prod of mergedInventory) {
      if (grupedData.has(prod.category)) {
        const currentData = grupedData.get(prod.category);
        const newObj = { [prod.name]: prod.qty };
        grupedData.set(prod.category, { ...currentData, ...newObj });
      } else {
        const newObj = { [prod.name]: prod.qty };

        grupedData.set(prod.category, newObj);
      }
    }

    console.log(Object.fromEntries(grupedData));
  } catch (err) {
    console.log(err);
  } finally {
    console.log("");
  }
};

buildGlobalCatalog(["US", "ASIA", "EU"]);
