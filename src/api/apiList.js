// import all api and export them
import accounts from './account/index'
import orderProcess from './orderProcess/index'
import policy from './policy/index'

export default {
    accounts, // 开户
    orderProcess, // 业务受理
    policy, // 政策
}