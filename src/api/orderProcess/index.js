import api from '../index'

export default {
    list(params) {
        return api.post('/order/list', params)
    },
    detail(params) {
        return api.get('/order/detail', params)
    },
    stat() {
        return api.get('/order/stat?seenHistory=false')
    },
    accept(params) {
        return api.post('/order/apply/accept', params)
    },
    cancel(params) {
        return api.post('/order/apply/cancel', params)
    }
}