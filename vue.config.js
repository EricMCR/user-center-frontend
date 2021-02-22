module.exports = {
    devServer: {
        proxy: {
            '/api': {
                //target要改为服务所在的服务器IP
                target: 'http://197.168.26.217:8080',
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