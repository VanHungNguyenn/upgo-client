const currencyComma = (number) => {
	return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + ' VND'
}

const formatDay = (day) => {
	// switch GMT +7
	const date = new Date(day)
	date.setHours(date.getHours())

	const year = date.getFullYear()
	const month = date.getMonth() + 1
	const dateDay = date.getDate()

	const hour = date.getHours()
	const minute = date.getMinutes()

	return `${dateDay}/${month}/${year} ${hour}:${minute}`
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

const subString = (str, len = 50) => {
	if (str.length > len) {
		return str.substring(0, len) + '...'
	}

	return str
}

export { currencyComma, formatDay, createKey, formatDayWithForm, subString }
