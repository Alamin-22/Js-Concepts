const doctor1 = { name: "Dr. Smith" };
const doctor2 = { name: "Dr. Mollik" };

// A free-floating function with no object attached
function performSurgery(patient, bodyPart) {
  console.log(`${this.name} is operating on ${patient}'s ${bodyPart}.`);
}

// 1. CALL: Executes instantly. Pass arguments one by one with Commas.
console.log("--- Using CALL ---");
performSurgery.call(doctor1, "Alex", "heart");

// 2. APPLY: Executes instantly. Pass arguments in an Array.
console.log("--- Using APPLY ---");
performSurgery.apply(doctor1, ["Sarah", "brain"]);

// 3. BIND: Does NOT execute instantly. Returns a brand new function locked to the object.
console.log("--- Using BIND ---");
const mollikSurgery = performSurgery.bind(doctor2);

// Now you can use this new function whenever you want, and it will always remember doctor2.
mollikSurgery("John", "knee");
mollikSurgery("Emma", "appendix");
