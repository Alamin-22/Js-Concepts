const demoData = async () => {
  try {
    const res = await fetch("https://jsonplaceholder.typicode.com/posts/1");

    if (!res.ok) {
      throw new Error(`Something Went Wrong Error is : ${res.status} `);
    }
    const data = await res.json();
    console.log(data);

    // return data;
  } catch (err) {
    console.log(err);
  }
};

demoData();
