import React from 'react'
import './Dashboard.css'
import { upgo } from '~/constants/images'

const Dashboard = () => {
	return (
		<div className='dashboard'>
			<div className='custom__card'>
				<div className='custom__card-body'>
					<div className='dashboard__intro'>
						<div className='dashboard__intro-img'>
							<img src={upgo} alt='upgo' />
						</div>
						<div className='dashboard__intro-content'>
							<div className='dashboard__intro-content-item'>
								Phần mềm marketing Facebook, Instagram, Zalo,...
							</div>
							<div className='dashboard__intro-content-item'>
								Xây dựng chiến dịch, chiến lược marketing cho
								SMEs
							</div>
							<div className='dashboard__intro-content-item'>
								Xây dựng, thiết kế phần mềm, Tool, website
								chuyên nghiệp
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className='custom__card'>
				<div className='custom__card-header'>
					{/* font awesome notification */}
					<i className='fas fa-bell' />
					Thông báo
				</div>
				<div className='custom__card-body'>
					<div className='dashboard__noti'>
						<div className='dashboard__noti-item'>
							Nạp xu từ ngày 5 đến ngày 15 tháng 2 năm 2020 sẽ
							được tặng thêm 10% tổng số xu nạp.
						</div>
						<div className='dashboard__noti-item'>
							Không nên nạp tiền trong hai khung giờ 14-16h,22-24h
							tránh gặp lỗi, tiền về chậm do VIETCOMBANK cập nhật
							hệ thống.
						</div>
						<div className='dashboard__noti-item'>
							Hiện đã có phiên bản cập nhật MaxCare phiên bản
							3.5.4, quý khách vui lòng cập nhập phần mềm tại
							trang quản lý phần mềm.
						</div>
					</div>
				</div>
			</div>

			<div className='custom__card'>
				<div className='custom__card-header'>
					{/* font awesome policy and terms  */}
					<i className='fas fa-file-alt' />
					Chính sách và điều khoản
				</div>
				<div className='custom__card-body'>
					<div className='dashboard__policy-bullet'>Chính Sách</div>
					<ul className='dashboard__policy-list'>
						<li className='dashboard__policy-item'>
							Đảm bảo quyền lợi khánh hàng lên hàng đầu.
						</li>
						<li className='dashboard__policy-item'>
							Bảo trì và đền bù nếu có những những tính năng không
							đúng như quảng cáo.
						</li>
						<li className='dashboard__policy-item'>
							Phần mềm do UPGO phát triển theo tiêu chí dễ dàng sử
							dụng.
						</li>
						<li className='dashboard__policy-item'>
							Hỗ trợ nhiệt tình cho khách hàng.
						</li>
						<li className='dashboard__policy-item'>
							Thường xuyên tổ chức các event cho khách hàng.
						</li>
						<li className='dashboard__policy-item'>
							Mỗi tài khoản sở hữu phần mềm sẽ không được chuyển
							qua tài khoản khác tránh trường hợp gian lận.
						</li>
					</ul>
					<div className='dashboard__policy-bullet'>Điều Khoản</div>
					<ul className='dashboard__policy-list'>
						<li className='dashboard__policy-item'>
							Nghiêm cấm tất cả các hành vi cheat, hack, phá hoại
							hệ thống. Nếu phát hiện sẽ tiến hành khóa tài khoản
							tại hệ thống.
						</li>
						<li className='dashboard__policy-item'>
							Không được lạm dụng quyền hạn hệ thống đi lừa đảo
							khách hàng khác. Nếu phát hiện sẽ tiến hành khóa tài
							khoản tại hệ thống.
						</li>
					</ul>
				</div>
			</div>
		</div>
	)
}

export default Dashboard
