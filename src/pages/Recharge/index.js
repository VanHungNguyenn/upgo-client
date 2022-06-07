import './Recharge.css'
import { techcombank, momo } from '~/constants/images'
import { useSelector } from 'react-redux'

const Recharge = () => {
	const { username } = useSelector((state) => state.auth)

	console.log({ username })

	return (
		<>
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
								Upgo {username}
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
								Upgo {username}
							</div>
						</div>
					</div>
				</div>

				<div className='recharge__tutorial card'>
					{/* title */}
					<div className='recharge__tutorial-title'>
						Hướng dẫn nạp tiền
					</div>
					{/* content */}
					<div className='recharge__tutorial-content'>
						<div className='recharge__tutorial-content-item'>
							<span>Bước 1:</span> Mở app ngân hàng, website ngân
							hàng hoặc ví Momo để thực hiện chuyển tiền.
						</div>
						<div className='recharge__tutorial-content-item'>
							<span>Bước 2:</span> Nhập chính xác số tài khoản, số
							tiền cần nạp.
						</div>
						<div className='recharge__tutorial-content-item'>
							<span>Bước 3:</span> Nhập chính xác nội dung chuyển
							tiền như yêu cầu. (Ví dụ: Upgo nguyenvana)
						</div>
						<div className='recharge__tutorial-content-item'>
							<span>Bước 4:</span> Thực hiện chuyển tiền.
						</div>
						<div className='recharge__tutorial-content-item'>
							<span>Bước 5:</span> Sau khi kiểm tra, hệ thống sẽ
							xác nhận và cộng tiền vào tài khoản cho quý khách.
						</div>
						<div className='recharge__tutorial-content-item'>
							<span>Bước 6:</span> Sau 5p, nếu chưa thấy tài khoản
							được cập nhật, vui lòng liên hệ hỗ trợ để được giải
							quyết.
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default Recharge
