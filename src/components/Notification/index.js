import Swal from 'sweetalert2'

const showErrorMessage = (message) => {
	Swal.fire({
		title: 'Error',
		text: message,
		icon: 'error',
		confirmButtonText: 'OK',
		confirmButtonColor: '#1F2937',
	})
}

const showSuccessMessage = (message) => {
	Swal.fire({
		title: 'Success',
		text: message,
		icon: 'success',
		confirmButtonText: 'OK',
		confirmButtonColor: '#1F2937',
	})
}

export { showErrorMessage, showSuccessMessage }
