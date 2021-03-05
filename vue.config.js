module.exports = {
    devServer: {
        proxy: {
            '/api': {
                //target要改为服务所在的服务器IP
                target: 'http://192.168.0.107:8080',
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