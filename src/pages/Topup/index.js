import './Topup.css'
import { techcombank, momo } from '~/constants/images'
import { useSelector } from 'react-redux'

const Topup = () => {
	const { username } = useSelector((state) => state.auth)

	return (
		<>
			<div className='d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4'>
				<div className='d-block mb-4 mb-md-0'>
					<h2 className='h4'>Topup</h2>
				</div>
			</div>
			<div className='recharge'>
				<div className='recharge__info'>
					<div className='recharge__info-item'>
						<div className='recharge__info-item__image'>
							<img src={techcombank} alt='techcombank' />
						</div>
						<div className='recharge__info-item__content'>
							<div className='recharge__info-item__content-title'>
								Card number:
							</div>
							<div className='recharge__info-item__content-value'>
								19038545221010
							</div>
						</div>
						<div className='recharge__info-item__content'>
							<div className='recharge__info-item__content-title'>
								Account name:
							</div>
							<div className='recharge__info-item__content-value'>
								NGUYEN VAN HUNG
							</div>
						</div>
						<div className='recharge__info-item__content'>
							<div className='recharge__info-item__content-title'>
								Bank name:
							</div>
							<div className='recharge__info-item__content-value'>
								TECHCOMBANK
							</div>
						</div>
						<div className='recharge__info-item__content'>
							<div className='recharge__info-item__content-title'>
								Content:
							</div>
							<div className='recharge__info-item__content-value'>
								Upgo {username.name}
							</div>
						</div>
					</div>
					<div className='recharge__info-item'>
						<div className='recharge__info-item__image'>
							<img src={momo} alt='momo' />
						</div>
						<div className='recharge__info-item__content'>
							<div className='recharge__info-item__content-title'>
								Phone number:
							</div>
							<div className='recharge__info-item__content-value'>
								0332305444
							</div>
						</div>
						<div className='recharge__info-item__content'>
							<div className='recharge__info-item__content-title'>
								Account name:
							</div>
							<div className='recharge__info-item__content-value'>
								NGUYEN VAN HUNG
							</div>
						</div>
						<div className='recharge__info-item__content'>
							<div className='recharge__info-item__content-title'>
								Wallet name:
							</div>
							<div className='recharge__info-item__content-value'>
								MOMO
							</div>
						</div>
						<div className='recharge__info-item__content'>
							<div className='recharge__info-item__content-title'>
								Content:
							</div>
							<div className='recharge__info-item__content-value'>
								Upgo {username.name}
							</div>
						</div>
					</div>
				</div>

				<div className='custom__card'>
					<div className='custom__card-header'>
						{/* fontawesome money */}
						<i className='fas fa-money-bill-wave'></i>
						H?????ng d???n n???p ti???n
					</div>
					<div className='custom__card-body'>
						<div className='recharge__tutorial-content'>
							<div className='recharge__tutorial-content-item'>
								M??? app ng??n h??ng, website ng??n h??ng ho???c v?? Momo
								????? th???c hi???n chuy???n ti???n.
							</div>
							<div className='recharge__tutorial-content-item'>
								Nh???p ch??nh x??c s??? t??i kho???n, s??? ti???n c???n n???p.
							</div>
							<div className='recharge__tutorial-content-item'>
								Nh???p ch??nh x??c n???i dung chuy???n ti???n nh?? y??u c???u.
								(V?? d???: Upgo nguyenvana)
							</div>
							<div className='recharge__tutorial-content-item'>
								Th???c hi???n chuy???n ti???n.
							</div>
							<div className='recharge__tutorial-content-item'>
								Sau khi ki???m tra, h??? th???ng s??? x??c nh???n v?? c???ng
								ti???n v??o t??i kho???n cho qu?? kh??ch.
							</div>
							<div className='recharge__tutorial-content-item'>
								Sau 5p, n???u ch??a th???y t??i kho???n ???????c c???p nh???t,
								vui l??ng li??n h??? h??? tr??? ????? ???????c gi???i quy???t.
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default Topup
