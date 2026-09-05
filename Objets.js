const user = {
  name: "Alamin",
  age: 25,
  role: "developer",
};

// console.log(Object.keys(user));
// console.log(Object.values(user));
// console.log(Object.entries(user));

const products = [
  { name: "Laptop", price: 1000, inStock: true },
  { name: "Phone", price: 500, inStock: false },
  { name: "Watch", price: 200, inStock: true },
  { name: "Tablet", price: 700, inStock: true },
];

const AvailabelProducts = products
  .filter((item) => item.inStock === true)
  .map((item) => item.name);

console.log(AvailabelProducts);
