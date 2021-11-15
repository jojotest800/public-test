const faker = require("faker");
const uuid = require("uuid");

const total = 5000;
const fileSize = 510;

let Allbooks = [];

for (let i = 0; i < fileSize; i++) {
  Allbooks.push({
    id: uuid.v1(),
    name: faker.name.title(),
    createdAt: faker.date.future(),
  });
}

const result = [];

const steps = Math.ceil(total / fileSize);

const skip = [];

for (let j = 0; j < steps; j++) {
  skip.push(j * fileSize);
}

const getData = (sn, start, end) => {
  let d = [];
  for (let k = start; k < end; k++) {
    if (Allbooks[k]) d.push(Allbooks[k]);
  }
  return d;
};

for (const skipedNum of skip) {
  let i = 0;
  const start = skipedNum === 0 ? 0 : skipedNum;
  const endarr = fileSize + skipedNum;
  console.log(
    `step ${i++} : start index = ${start}; end index = ${endarr};}`
  );

  const data = getData(skipedNum, start, endarr);
  console.log("Data received from step :", data);
  let step = {};
  step[`step${skipedNum}`] = data;
  step[`lenght`] = data.length;
  result.push(step);
}

// console.log(Allbooks[0], skip, result);


const bookFeed = {
  NorwegianBookGroup: 120,
  supplySupplier: null
}

// const customLabel = bookFeed.NorwegianBookGroup ? JSON.stringify(bookFeed.NorwegianBookGroup):''


function getStatus(book){
  if (!book) return false

	if (book && (!book.NorwegianBookGroup && !book.supplySupplier)) return false
  
  
	if (book.NorwegianBookGroup) {
		const strVal = book.NorwegianBookGroup.toString()
		return strVal && (strVal[0] === '1' || strVal[1] === '2')
	}
	return book.supplySupplier && book.supplySupplier === 'STUD'
}

const res = getStatus(bookFeed)

// const ratio  = Math.floor(1/3*100)

console.log('get status for category book', res);