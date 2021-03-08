import api from '../index'

export default {
    NewsIndexData() {
        return api.get('/News/IndexData')
    }
}