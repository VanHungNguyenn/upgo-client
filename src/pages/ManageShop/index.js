import ManageSoftware from '~/components/ManageSoftware'
import ManageSoftwareOffer from '~/components/ManageSoftwareOffer'

const ManageShop = () => {
	return (
		<>
			<div
				style={{
					marginBottom: '1rem',
				}}
			>
				<ManageSoftware />
			</div>
			<ManageSoftwareOffer />
		</>
	)
}

export default ManageShop
