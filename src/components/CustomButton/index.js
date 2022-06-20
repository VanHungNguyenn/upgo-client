const CustomButton = ({ children, ...props }) => {
	return (
		<div className='btn-toolbar mb-2 mb-md-0' {...props}>
			<div className='btn btn-sm btn-gray-800 d-inline-flex align-items-center'>
				{children}
			</div>
		</div>
	)
}

export default CustomButton
