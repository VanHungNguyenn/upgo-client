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

console.log(createKey())
