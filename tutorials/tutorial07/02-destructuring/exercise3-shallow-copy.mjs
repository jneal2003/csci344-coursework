const original = {
    name: "Eve",
    age: 20,
    courses: ['CSCI 182', 'CSCI 344']
};

// Use spread operator to create a shallow copy
// Modify the copy's name property
// Modify the copy's courses array (add a new course, e.g., 'CSCI 370')
// Print both original and copy to see the difference

const copy = { ...original };

copy.name = "Eve Modified";

copy.courses.push('CSCI 370');

console.log("og:");
console.log(original);

console.log("copy:");
console.log(copy);