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
						Hướng dẫn nạp tiền
					</div>
					<div className='custom__card-body'>
						<div className='recharge__tutorial-content'>
							<div className='recharge__tutorial-content-item'>
								Mở app ngân hàng, website ngân hàng hoặc ví Momo
								để thực hiện chuyển tiền.
							</div>
							<div className='recharge__tutorial-content-item'>
								Nhập chính xác số tài khoản, số tiền cần nạp.
							</div>
							<div className='recharge__tutorial-content-item'>
								Nhập chính xác nội dung chuyển tiền như yêu cầu.
								(Ví dụ: Upgo nguyenvana)
							</div>
							<div className='recharge__tutorial-content-item'>
								Thực hiện chuyển tiền.
							</div>
							<div className='recharge__tutorial-content-item'>
								Sau khi kiểm tra, hệ thống sẽ xác nhận và cộng
								tiền vào tài khoản cho quý khách.
							</div>
							<div className='recharge__tutorial-content-item'>
								Sau 5p, nếu chưa thấy tài khoản được cập nhật,
								vui lòng liên hệ hỗ trợ để được giải quyết.
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default Topup
