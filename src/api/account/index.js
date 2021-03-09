import api from '../index'

export default {
    accounts(params) {
        return api.get('/accounts', params)
    },
    pesonals(params) {
        return api.get('/accounts/' + params.id + '/pesonals')
    },
    logistics(params) {
        return api.get('/accounts/' + params.id + '/logistics')
    },
    logistic(params) {
        let headers = {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
        return api.post('/accounts/logistic', params, headers)
    },
    status(params) {
        return api.post('/accounts/status', params)
    }
}