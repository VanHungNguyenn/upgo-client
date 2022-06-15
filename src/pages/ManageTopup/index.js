import React from 'react'
import { Tabs } from 'antd'
import HistoryMomo from '~/components/HistoryMomo'
import HistoryBank from '~/components/HistoryBank'
import HistoryTransaction from '~/components/HistoryTransaction'
const { TabPane } = Tabs

const ManageTopup = () => {
	return (
		<>
			<Tabs defaultActiveKey='1' type='card'>
				<TabPane tab='History Transaction' key='1'>
					<HistoryTransaction />
				</TabPane>
				<TabPane tab='History Bank' key='2'>
					<HistoryBank />
				</TabPane>
				<TabPane tab='History Momo' key='3'>
					<HistoryMomo />
				</TabPane>
			</Tabs>
		</>
	)
}

export default ManageTopup
