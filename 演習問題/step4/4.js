console.log("99" == 99); 		// ①
console.log("99" === 99); 	// ②

const test1 = {message: 'Good morning'};
const test2 = {message: 'Good morning'};
const test3 = test1;
console.log(test1 == test2); 	// ③
console.log(test1 === test2); 	// ④
console.log(test1 == test3); 	// ⑤
console.log(test1 === test3); 	// ⑥
