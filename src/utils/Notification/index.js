import Swal from 'sweetalert2'

const showErrorMessage = (message) => {
	Swal.fire({
		title: 'Error',
		text: message,
		icon: 'error',
		confirmButtonText: 'OK',
		confirmButtonColor: '#3970b6',
	})
}

const showSuccessMessage = (message) => {
	Swal.fire({
		title: 'Success',
		text: message,
		icon: 'success',
		confirmButtonText: 'OK',
		confirmButtonColor: '#3970b6',
	})
}

export { showErrorMessage, showSuccessMessage }
