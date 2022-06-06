const currencyComma = (number) => {
	return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

const formatDay = (day) => {
	const year = day.split('-')[0]
	const month = day.split('-')[1]
	const date = day.split('-')[2].split('T')[0]

	return `${date}/${month}/${year}`
}

const createKey = (number = 20) => {
	const key = []
	// key created number, letter and special symbol
	for (let i = 0; i < number; i++) {
		const random = Math.floor(Math.random() * 3)
		if (random === 0) {
			key.push(String.fromCharCode(Math.floor(Math.random() * 26) + 97))
		} else if (random === 1) {
			key.push(String.fromCharCode(Math.floor(Math.random() * 26) + 65))
		} else {
			key.push(String.fromCharCode(Math.floor(Math.random() * 10) + 48))
		}
	}

	return key.join('')
}

const formatDayWithForm = (day) => {
	const year = day.split('-')[0]
	const month = day.split('-')[1]
	const date = day.split('-')[2].split('T')[0]

	return `${year}-${month}-${date}`
}

export { currencyComma, formatDay, createKey, formatDayWithForm }