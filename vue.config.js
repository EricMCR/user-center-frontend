module.exports = {
    devServer: {
        port: 8888,
        proxy: {
            '/api': {
                //target要改为服务所在的服务器IP
                target: 'http://127.0.0.1:9999',
                // 允许跨域
                changeOrigin: true,
                ws: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    }
}