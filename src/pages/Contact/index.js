import React from 'react'
import './Contact.css'

const Contact = () => {
	return (
		<section className='contact'>
			<div className='contact__list'>
				<div className='contact__item'>
					<i className='fa-brands fa-facebook-f'></i>
					<div className='contact__item-tile'>Facebook</div>
				</div>
				<div className='contact__item'>
					<i className='fa-brands fa-twitter'></i>
					<div className='contact__item-tile'>Twitter</div>
				</div>
				<div className='contact__item'>
					<i className='fa-brands fa-telegram'></i>
					<div className='contact__item-tile'>Telegram</div>
				</div>
				<div className='contact__item'>
					<i className='fa-brands fa-youtube'></i>
					<div className='contact__item-tile'>Youtube</div>
				</div>
			</div>
		</section>
	)
}

export default Contact
