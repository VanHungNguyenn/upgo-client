import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const Table = ({
	title,
	createTitle,
	linkNewtitle,
	data,
	columns,
	searchPlaceholder,
}) => {
	const [dataSource, setDataSource] = useState(data)
	const [currentPage, setCurrentPage] = useState(1)
	const [itemsPerPage, setItemsPerPage] = useState(10)
	const [search, setSearch] = useState('')

	useEffect(() => {
		setDataSource(data)
	}, [data])

	const renderData = (data) => {
		return data.map((item, i) => {
			return (
				<tr key={i}>
					{columns.map((column, j) => {
						if (column.render) {
							return <td key={j}>{column.render(item)}</td>
						} else {
							return (
								<td key={j}>
									<div className='fw-bold'>
										{item[column.dataIndex]}
									</div>
								</td>
							)
						}
					})}
				</tr>
			)
		})
	}

	const filterData = (e) => {
		if (e.target.value !== '') {
			setSearch(e.target.value)
			const filterTable = data.filter((item) => {
				let filter = []

				columns.forEach((column) => {
					if (column.key !== 'action') {
						filter.push(
							item[column.dataIndex]
								.toString()
								.toLowerCase()
								.includes(e.target.value.toLowerCase())
						)
					}
				})

				return filter.includes(true)
			})

			setCurrentPage(1)
			setDataSource(filterTable)
		} else {
			setSearch('')
			setDataSource(data)
		}
	}

	const pages = []

	const totalPages = Math.ceil(data.length / itemsPerPage)

	for (let i = 1; i <= totalPages; i++) {
		pages.push(i)
	}

	const renderPageNumbers = pages.map((page, i) => {
		return (
			<div
				key={i}
				className={`page-item ${currentPage === page ? 'active' : ''}`}
				style={{ cursor: 'pointer' }}
				onClick={() => setCurrentPage(page)}
			>
				<div className='page-link'>{page}</div>
			</div>
		)
	})

	return (
		<>
			<div className='d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4'>
				<div className='d-block mb-4 mb-md-0'>
					<h2 className='h4'>{title}</h2>
				</div>
				<div className='btn-toolbar mb-2 mb-md-0'>
					<Link
						to={`${linkNewtitle}`}
						className='btn btn-sm btn-gray-800 d-inline-flex align-items-center'
					>
						<svg
							className='icon icon-xs me-2'
							fill='none'
							stroke='currentColor'
							viewBox='0 0 24 24'
							xmlns='http://www.w3.org/2000/svg'
						>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								strokeWidth='2'
								d='M12 6v6m0 0v6m0-6h6m-6 0H6'
							></path>
						</svg>
						{createTitle}
					</Link>
				</div>
			</div>
			<div className='table-settings mb-4'>
				<div className='row align-items-center justify-content-between'>
					<div className='col col-md-6 col-lg-3 col-xl-4'>
						<div className='input-group me-2 me-lg-3 fmxw-400'>
							<span className='input-group-text'>
								<svg
									className='icon icon-xs'
									x-description='Heroicon name: solid/search'
									xmlns='http://www.w3.org/2000/svg'
									viewBox='0 0 20 20'
									fill='currentColor'
									aria-hidden='true'
								>
									<path
										fillRule='evenodd'
										d='M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z'
										clipRule='evenodd'
									></path>
								</svg>
							</span>
							<input
								type='text'
								className='form-control'
								placeholder={searchPlaceholder}
								value={search}
								onChange={filterData}
							/>
						</div>
					</div>
					<div className='col-4 col-md-2 col-xl-1 ps-md-0 text-end'>
						<div className='dropdown'>
							<button
								className='btn btn-link text-dark dropdown-toggle dropdown-toggle-split m-0 p-1'
								data-bs-toggle='dropdown'
								aria-haspopup='true'
								aria-expanded='false'
							>
								<svg
									className='icon icon-sm'
									fill='currentColor'
									viewBox='0 0 20 20'
									xmlns='http://www.w3.org/2000/svg'
								>
									<path
										fillRule='evenodd'
										d='M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z'
										clipRule='evenodd'
									></path>
								</svg>
								<span className='visually-hidden'>
									Toggle Dropdown
								</span>
							</button>
							<div className='dropdown-menu dropdown-menu-xs dropdown-menu-end pb-0'>
								<span className='small ps-3 fw-bold text-dark'>
									Show
								</span>
								{itemsPerPage === 10 ? (
									<div
										className='dropdown-item d-flex align-items-center fw-bold'
										onClick={() => {
											setCurrentPage(1)
											setItemsPerPage(10)
										}}
									>
										10
										<svg
											className='icon icon-xxs ms-auto'
											fill='currentColor'
											viewBox='0 0 20 20'
											xmlns='http://www.w3.org/2000/svg'
										>
											<path
												fillRule='evenodd'
												d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
												clipRule='evenodd'
											></path>
										</svg>
									</div>
								) : (
									<div
										className='dropdown-item fw-bold'
										onClick={() => {
											setCurrentPage(1)
											setItemsPerPage(10)
										}}
									>
										10
									</div>
								)}
								{itemsPerPage === 20 ? (
									<div
										className='dropdown-item fw-bold d-flex align-items-center'
										onClick={() => {
											setCurrentPage(1)
											setItemsPerPage(20)
										}}
									>
										20
										<svg
											className='icon icon-xxs ms-auto'
											fill='currentColor'
											viewBox='0 0 20 20'
											xmlns='http://www.w3.org/2000/svg'
										>
											<path
												fillRule='evenodd'
												d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
												clipRule='evenodd'
											></path>
										</svg>
									</div>
								) : (
									<div
										className='dropdown-item fw-bold'
										onClick={() => {
											setCurrentPage(1)
											setItemsPerPage(20)
										}}
									>
										20
									</div>
								)}
								{itemsPerPage === 50 ? (
									<div
										className='dropdown-item fw-bold d-flex align-items-center rounded-bottom'
										onClick={() => {
											setCurrentPage(50)
											setItemsPerPage(20)
										}}
									>
										50
										<svg
											className='icon icon-xxs ms-auto'
											fill='currentColor'
											viewBox='0 0 20 20'
											xmlns='http://www.w3.org/2000/svg'
										>
											<path
												fillRule='evenodd'
												d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
												clipRule='evenodd'
											></path>
										</svg>
									</div>
								) : (
									<div
										className='dropdown-item fw-bold rounded-bottom'
										onClick={() => {
											setCurrentPage(1)
											setItemsPerPage(50)
										}}
									>
										50
									</div>
								)}
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className='card card-body border-0 shadow table-wrapper table-responsive mb-1'>
				<table className='table table-hover'>
					<thead>
						<tr>
							{columns.map((column, i) => {
								return (
									<th key={i} className='border-gray-200'>
										{column.title}
									</th>
								)
							})}
						</tr>
					</thead>
					<tbody>{renderData(dataSource)}</tbody>
				</table>
				<div className='card-footer px-3 border-0 d-flex flex-column flex-lg-row align-items-center justify-content-between'>
					<nav aria-label='Page navigation example'>
						<ul className='pagination mb-0'>
							<li className='page-item'>
								<div
									className='page-link'
									onClick={() => {
										if (currentPage > 1) {
											setCurrentPage(currentPage - 1)
										}
									}}
									style={{
										cursor: 'pointer',
									}}
								>
									Previous
								</div>
							</li>
							{renderPageNumbers}
							<li className='page-item'>
								<div
									className='page-link'
									onClick={() => {
										if (currentPage < totalPages) {
											setCurrentPage(currentPage + 1)
										}
									}}
									style={{ cursor: 'pointer' }}
								>
									Next
								</div>
							</li>
						</ul>
					</nav>
					<div className='fw-normal small mt-4 mt-lg-0'>
						Showing <b>{currentPage}</b> out of{' '}
						<b>{pages.length}</b> entries
					</div>
				</div>
			</div>
		</>
	)
}

export default Table
