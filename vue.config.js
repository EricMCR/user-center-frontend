module.exports = {
    devServer: {
        proxy: {
            '/api': {
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