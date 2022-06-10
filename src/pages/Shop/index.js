import React from 'react'
import TableShop from '~/components/TableShop'

const Shop = () => {
	return (
		<div className='shop'>
			<div className='custom__card'>
				<div className='custom__card-header'>
					{/* fontawesome shop */}
					<i className='fas fa-shopping-cart'></i>
					Auto shop
				</div>
				<div className='custom__card-body'></div>
			</div>

			<TableShop />
		</div>
	)
}

export default Shop
