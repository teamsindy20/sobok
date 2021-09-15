import { Spin } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'

const antIcon = <LoadingOutlined spin />

function Loading() {
  return <Spin delay={500} indicator={antIcon} />
}

export default Loading
