import LightImage from '~/assets/img/brand/light.svg'
import DarkImage from '~/assets/img/brand/dark.svg'
import Avatar from '~/assets/img/team/profile-picture-3.jpg'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import { showErrorMessage, showSuccessMessage } from '~/components/Notification'
import { logout } from '~/redux/toolkits/authSlice'

const DefaultLayout = () => {
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const { role, username } = useSelector((state) => state.auth)

	const handleLogout = async () => {
		try {
			showSuccessMessage('Logout success')
			dispatch(logout())
			localStorage.removeItem('token')
			navigate('/')
		} catch (error) {
			showErrorMessage(error.response.data.message)
		}
	}

	return (
		<>
			<nav className='navbar navbar-dark navbar-theme-primary px-4 col-12 d-lg-none'>
				<a className='navbar-brand me-lg-5' href='~/index.html'>
					<img
						className='navbar-brand-dark'
						src={LightImage}
						alt='Volt logo'
					/>
					<img
						className='navbar-brand-light'
						src={DarkImage}
						alt='Volt logo'
					/>
				</a>
				<div className='d-flex align-items-center'>
					<button
						className='navbar-toggler d-lg-none collapsed'
						type='button'
						data-bs-toggle='collapse'
						data-bs-target='#sidebarMenu'
						aria-controls='sidebarMenu'
						aria-expanded='false'
						aria-label='Toggle navigation'
					>
						<span className='navbar-toggler-icon'></span>
					</button>
				</div>
			</nav>

			<nav
				id='sidebarMenu'
				className='sidebar d-lg-block bg-gray-800 text-white collapse'
				data-simplebar
			>
				<div className='sidebar-inner px-4 pt-3'>
					<div className='user-card d-flex d-md-none align-items-center justify-content-between justify-content-md-center pb-4'>
						<div className='d-flex align-items-center'>
							<div className='avatar-lg me-4'>
								<img
									src={Avatar}
									className='card-img-top rounded-circle border-white'
									alt='Bonnie Green'
								/>
							</div>
							<div className='d-block'>
								<h2 className='h5 mb-3'>Hi, {username.name}</h2>
								<div
									className='btn btn-secondary btn-sm d-inline-flex align-items-center'
									onClick={handleLogout}
								>
									<svg
										className='icon icon-xxs me-1'
										fill='none'
										stroke='currentColor'
										viewBox='0 0 24 24'
										xmlns='http://www.w3.org/2000/svg'
									>
										<path
											strokeLinecap='round'
											strokeWidth='2'
											d='M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1'
										></path>
									</svg>
									Sign Out
								</div>
							</div>
						</div>
						<div className='collapse-close d-md-none'>
							<a
								href='#sidebarMenu'
								data-bs-toggle='collapse'
								data-bs-target='#sidebarMenu'
								aria-controls='sidebarMenu'
								aria-expanded='true'
								aria-label='Toggle navigation'
							>
								<svg
									className='icon icon-xs'
									fill='currentColor'
									viewBox='0 0 20 20'
									xmlns='http://www.w3.org/2000/svg'
								>
									<path
										fillRule='evenodd'
										d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z'
										clipRule='evenodd'
									></path>
								</svg>
							</a>
						</div>
					</div>
					<ul className='nav flex-column pt-3 pt-md-0'>
						<li className='nav-item pb-5'>
							<div className='nav-link d-flex align-items-center justify-content-center'>
								<Link to='/'>
									<img
										src={LightImage}
										alt='logo'
										width='50'
									/>
								</Link>
							</div>
						</li>
						{/* dashboard */}
						<li className='nav-item'>
							<Link to='/' className='nav-link'>
								<span className='sidebar-icon'>
									<svg
										className='icon icon-xs me-2'
										fill='currentColor'
										viewBox='0 0 20 20'
										xmlns='http://www.w3.org/2000/svg'
									>
										<path d='M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z'></path>
										<path d='M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z'></path>
									</svg>
								</span>
								<span className='sidebar-text'>Dashboard</span>
							</Link>
						</li>
						{/* shop */}
						<li className='nav-item'>
							<Link to='/shop' className='nav-link'>
								<span className='sidebar-icon'>
									<svg
										className='icon icon-xs me-2'
										fill='currentColor'
										viewBox='0 0 20 20'
										xmlns='http://www.w3.org/2000/svg'
									>
										<path d='M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z'></path>
										<path d='M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z'></path>
									</svg>
								</span>
								<span className='sidebar-text'>Shop</span>
							</Link>
						</li>

						{/* recharge */}
						<li className='nav-item'>
							<Link to='/topup' className='nav-link'>
								<span className='sidebar-icon'>
									<svg
										className='icon icon-xs me-2'
										fill='currentColor'
										viewBox='0 0 20 20'
										xmlns='http://www.w3.org/2000/svg'
									>
										<path d='M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z'></path>
										<path d='M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z'></path>
									</svg>
								</span>
								<span className='sidebar-text'>Recharge</span>
							</Link>
						</li>
						{/* manage software */}
						<li className='nav-item'>
							<Link to='/manage' className='nav-link'>
								<span className='sidebar-icon'>
									<svg
										className='icon icon-xs me-2'
										fill='currentColor'
										viewBox='0 0 20 20'
										xmlns='http://www.w3.org/2000/svg'
									>
										<path d='M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z'></path>
										<path d='M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z'></path>
									</svg>
								</span>
								<span className='sidebar-text'>
									Software Manage
								</span>
							</Link>
						</li>
						{/* history */}
						<li className='nav-item'>
							<Link to='/history' className='nav-link'>
								<span className='sidebar-icon'>
									<svg
										className='icon icon-xs me-2'
										fill='currentColor'
										viewBox='0 0 20 20'
										xmlns='http://www.w3.org/2000/svg'
									>
										<path d='M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z'></path>
										<path d='M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z'></path>
									</svg>
								</span>
								<span className='sidebar-text'>History</span>
							</Link>
						</li>
						{/* contact */}
						<li className='nav-item'>
							<Link to='/contact' className='nav-link'>
								<span className='sidebar-icon'>
									<svg
										className='icon icon-xs me-2'
										fill='currentColor'
										viewBox='0 0 20 20'
										xmlns='http://www.w3.org/2000/svg'
									>
										<path d='M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z'></path>
										<path d='M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z'></path>
									</svg>
								</span>
								<span className='sidebar-text'>Contact</span>
							</Link>
						</li>
						{role === 1 || role === 0 ? (
							<>
								{/* keys */}
								<li className='nav-item'>
									<span
										className='nav-link collapsed d-flex justify-content-between align-items-center'
										data-bs-toggle='collapse'
										data-bs-target='#keymenu'
									>
										<span>
											<span className='sidebar-icon'>
												<svg
													className='icon icon-xs me-2'
													fill='currentColor'
													viewBox='0 0 20 20'
													xmlns='http://www.w3.org/2000/svg'
												>
													<path
														fillRule='evenodd'
														d='M2 5a2 2 0 012-2h8a2 2 0 012 2v10a2 2 0 002 2H4a2 2 0 01-2-2V5zm3 1h6v4H5V6zm6 6H5v2h6v-2z'
														clipRule='evenodd'
													></path>
													<path d='M15 7h1a2 2 0 012 2v5.5a1.5 1.5 0 01-3 0V7z'></path>
												</svg>
											</span>
											<span className='sidebar-text'>
												Keys
											</span>
										</span>
										<span className='link-arrow'>
											<svg
												className='icon icon-sm'
												fill='currentColor'
												viewBox='0 0 20 20'
												xmlns='http://www.w3.org/2000/svg'
											>
												<path
													fillRule='evenodd'
													d='M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z'
													clipRule='evenodd'
												></path>
											</svg>
										</span>
									</span>
									<div
										className='multi-level collapse'
										id='keymenu'
										aria-expanded='false'
									>
										<ul className='flex-column nav'>
											<li className='nav-item'>
												<Link
													className='nav-link'
													to='/keys'
												>
													<span className='sidebar-text'>
														List Keys
													</span>
												</Link>
											</li>
											<li className='nav-item'>
												<Link
													className='nav-link'
													to='/add-key'
												>
													<span className='sidebar-text'>
														Add Key
													</span>
												</Link>
											</li>
										</ul>
									</div>
								</li>
							</>
						) : null}

						{role === 0 ? (
							<>
								{/* members */}
								<li className='nav-item'>
									<span
										className='nav-link collapsed d-flex justify-content-between align-items-center'
										data-bs-toggle='collapse'
										data-bs-target='#membermenu'
									>
										<span>
											<span className='sidebar-icon'>
												<svg
													className='icon icon-xs me-2'
													fill='currentColor'
													viewBox='0 0 20 20'
													xmlns='http://www.w3.org/2000/svg'
												>
													<path
														fillRule='evenodd'
														d='M2 5a2 2 0 012-2h8a2 2 0 012 2v10a2 2 0 002 2H4a2 2 0 01-2-2V5zm3 1h6v4H5V6zm6 6H5v2h6v-2z'
														clipRule='evenodd'
													></path>
													<path d='M15 7h1a2 2 0 012 2v5.5a1.5 1.5 0 01-3 0V7z'></path>
												</svg>
											</span>
											<span className='sidebar-text'>
												Members
											</span>
										</span>
										<span className='link-arrow'>
											<svg
												className='icon icon-sm'
												fill='currentColor'
												viewBox='0 0 20 20'
												xmlns='http://www.w3.org/2000/svg'
											>
												<path
													fillRule='evenodd'
													d='M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z'
													clipRule='evenodd'
												></path>
											</svg>
										</span>
									</span>
									<div
										className='multi-level collapse'
										id='membermenu'
										aria-expanded='false'
									>
										<ul className='flex-column nav'>
											<li className='nav-item'>
												<Link
													className='nav-link'
													to='/members'
												>
													<span className='sidebar-text'>
														List Members
													</span>
												</Link>
											</li>
											<li className='nav-item'>
												<Link
													className='nav-link'
													to='/add-member'
												>
													<span className='sidebar-text'>
														Add Member
													</span>
												</Link>
											</li>
										</ul>
									</div>
								</li>
								{/* statistic */}
								<li className='nav-item'>
									<Link to='/statistic' className='nav-link'>
										<span className='sidebar-icon'>
											<svg
												className='icon icon-xs me-2'
												fill='currentColor'
												viewBox='0 0 20 20'
												xmlns='http://www.w3.org/2000/svg'
											>
												<path d='M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z'></path>
												<path d='M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z'></path>
											</svg>
										</span>
										<span className='sidebar-text'>
											Statistic
										</span>
									</Link>
								</li>
							</>
						) : null}
					</ul>
				</div>
			</nav>

			<main className='content'>
				<nav className='navbar navbar-top navbar-expand navbar-dashboard navbar-dark ps-0 pe-2 pb-0'>
					<div className='container-fluid px-0'>
						<div
							className='d-flex justify-content-end w-100'
							id='navbarSupportedContent'
						>
							<ul className='navbar-nav align-items-center'>
								<li className='nav-item dropdown ms-lg-3'>
									<div
										className='nav-link dropdown-toggle pt-1 px-0'
										role='button'
										data-bs-toggle='dropdown'
										aria-expanded='false'
									>
										<div className='media d-flex align-items-center'>
											<img
												className='avatar rounded-circle'
												src={Avatar}
												alt='avatar'
											/>
											<div className='media-body ms-2 text-dark align-items-center d-none d-lg-block'>
												<span className='mb-0 font-small fw-bold text-gray-900'>
													{username.name}
												</span>
											</div>
										</div>
									</div>
									<div className='dropdown-menu dashboard-dropdown dropdown-menu-end mt-2 py-1'>
										<Link
											to='/profile'
											className='dropdown-item d-flex align-items-center'
										>
											<svg
												className='dropdown-icon text-gray-400 me-2'
												fill='currentColor'
												viewBox='0 0 20 20'
												xmlns='http://www.w3.org/2000/svg'
											>
												<path
													fillRule='evenodd'
													d='M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z'
													clipRule='evenodd'
												></path>
											</svg>
											My Profile
										</Link>
										<div
											role='separator'
											className='dropdown-divider my-1'
										></div>
										<Link
											to='#'
											className='dropdown-item d-flex align-items-center'
											onClick={handleLogout}
										>
											<svg
												className='dropdown-icon text-danger me-2'
												fill='none'
												stroke='currentColor'
												viewBox='0 0 24 24'
												xmlns='http://www.w3.org/2000/svg'
											>
												<path
													strokeLinecap='round'
													strokeWidth='2'
													d='M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1'
												></path>
											</svg>
											Logout
										</Link>
									</div>
								</li>
							</ul>
						</div>
					</div>
				</nav>
				<div className='mt-5'>
					<Outlet />
				</div>
			</main>
		</>
	)
}

export default DefaultLayout
