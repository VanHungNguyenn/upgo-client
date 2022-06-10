import React from 'react'
import './Contact.css'
import {
	facebookLink,
	twitterLink,
	telegramLink,
	youtubeLink,
} from '~/constants/contact'

const Contact = () => {
	return (
		<section className='contact'>
			<div className='custom__card'>
				<div className='custom__card-header'>
					{/* font awesome contacts */}
					<i className='fas fa-address-book'></i>
					Contact
				</div>
				<div className='custom__card-body'>
					<div className='contact__list'>
						<a
							href={facebookLink}
							target='_blank'
							rel='noopener noreferrer'
							className='contact__item'
						>
							<i className='fa-brands fa-facebook-f'></i>
							<div className='contact__item-tile'>Facebook</div>
						</a>
						<a
							href={twitterLink}
							target='_blank'
							rel='noopener noreferrer'
							className='contact__item'
						>
							<i className='fa-brands fa-twitter'></i>
							<div className='contact__item-tile'>Twitter</div>
						</a>
						<a
							href={telegramLink}
							target='_blank'
							rel='noopener noreferrer'
							className='contact__item'
						>
							<i className='fa-brands fa-telegram'></i>
							<div className='contact__item-tile'>Telegram</div>
						</a>
						<a
							href={youtubeLink}
							target='_blank'
							rel='noopener noreferrer'
							className='contact__item'
						>
							<i className='fa-brands fa-youtube'></i>
							<div className='contact__item-tile'>Youtube</div>
						</a>
					</div>
				</div>
			</div>
		</section>
	)
}

export default Contact
