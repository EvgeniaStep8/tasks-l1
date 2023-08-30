const formatDate = require("./task16");

// В таком же формате будет текущая дата
console.log(formatDate("MMMM Do YYYY, h:mm:ss a")); // August 30th 2023, 5:50:43 pm
console.log(formatDate("dddd")); // Wednesday
console.log(formatDate("MMM Do YY")); // Aug 30th 23
console.log(formatDate()); // 2023-08-30T17:50:43+03:00
