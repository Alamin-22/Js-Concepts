// write a function to fetch data from api and handled it using async await

const fetchData = async () => {
  try {
    // at this time the response is just a promise it can have only 3 state,
    // fulfilled,rejected and pending
    const response = await fetch("api/get-users");

    if (!response.ok) {
      throw new Error("Something went wrong");
    }

    //   now the result is the resolved promise
    const result = await response.json();

    return result;
  } catch {
    console.error("Something went wrong:");
    return null;
  }
};
