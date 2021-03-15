import api from '../index'

export default {
    policyList(params) {
        return api.get('/SocialPolicy/PolicyList', params)
    },
    getDistrict(params) {
        return api.get('/SocialPolicy/District', params)
    },
    getPolicyByNumber(params) {
        return api.get('/SocialPolicy/GetPolicyByNumber', params)
    },
    operate(data, params) {
        return api.postwithparams('/SocialPolicy/Operate', data, params)
    },
    delete(params) {
        return api.post('/SocialPolicy/Delete', params)
    },
    downloadDemo(params) {
        return api.getfile('/SocialPolicy/DownloadDemo', params)
    },
    savePolicy(params) {
        return api.post('/SocialPolicy/Policy', params)
    }
}