module.exports = {
    devServer: {
        proxy: {
            '/api': {
                target: 'http://172.18.100.6:8899', // 目标接口
                pathRewrite: {
                    '^/api': '', // 把 /api 替换成 ''
                    changeOrigin: true // 表示是否跨域
                }
            },
        }
    }
}