const faker = require('faker')
const uuid = require('uuid')

const Logger = console

const total = 5000
const fileSize = 510

const Allbooks = []

// eslint-disable-next-line no-plusplus
for (let i = 0; i < fileSize; i++) {
	Allbooks.push({
		id: uuid.v1(),
		name: faker.name.title(),
		createdAt: faker.date.future()
	})
}

const result = []

const steps = Math.ceil(total / fileSize)

const skip = []

// eslint-disable-next-line no-plusplus
for (let j = 0; j < steps; j++) {
	skip.push(j * fileSize)
}

const getData = (sn, start, end) => {
	const d = []
	// eslint-disable-next-line no-plusplus
	for (let k = start; k < end; k++) {
		if (Allbooks[k]) d.push(Allbooks[k])
	}
	return d
}

// eslint-disable-next-line no-restricted-syntax
for (const skipedNum of skip) {
	let i = 0
	const start = skipedNum === 0 ? 0 : skipedNum
	const endarr = fileSize + skipedNum
	Logger.log(
		// eslint-disable-next-line no-plusplus
		`step ${i++} : start index = ${start}; end index = ${endarr};}`
	)

	const data = getData(skipedNum, start, endarr)
	Logger.log('Data received from step :', data)
	const step = {}
	step[`step${skipedNum}`] = data
	step.lenght = data.length
	result.push(step)
}

// Logger.log(Allbooks[0], skip, result);

const bookFeed = {
	NorwegianBookGroup: 120,
	supplySupplier: null
}

// const customLabel = bookFeed.NorwegianBookGroup ? JSON.stringify(bookFeed.NorwegianBookGroup):''

function getStatus (book) {
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

Logger.log('get status for category book', res)
