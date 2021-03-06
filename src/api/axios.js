import axios from 'axios'

// 创建 axios 实例
let http = axios.create({
    baseURL: process.env.VUE_APP_API_URL, // 一定要VUE_APP_A为前缀
    timeout: 60000
})

// 设置 post、put 默认 Content-Type
http.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';
http.defaults.headers.put['Content-Type'] = 'application/json;charset=UTF-8';
http.defaults.headers["Cache-Control"] = "no-cache";

// 添加请求拦截器
http.interceptors.request.use(config => {
    if (config.method === 'post' || config.method === 'put') {
        // config.data = JSON.stringify(config.data)
    } else if (config.method === 'get') {
        // 给GET 请求后追加时间戳
        let symbol = config.url.indexOf('?') >= 0 ? '&' : '?'
        config.url += symbol + '_=' + Date.now()
    }
    // 请求发送前进行处理
    return config
}, error => {
    // 请求错误处理
    return Promise.reject(error)
})

// 添加响应拦截器
http.interceptors.response.use(response => {
    let { data } = response
    return data
}, error => {
    let info = {}
    let { status, statusText, data } = error.response
    if (!error.response) {
        info = {
            code: 5000,
            msg: 'Network Error'
        }
    } else {
        // 此处整理错误信息格式
        info = {
            code: status,
            data: data,
            msg: statusText
        }
    }
    return Promise.reject(info)
})

export default function () {
    return http
}