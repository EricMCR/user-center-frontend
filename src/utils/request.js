import axios from 'axios'
import store from '@/store'

const request = axios.create({
    baseURL: '/api',
    headers: {
        token: store.state.Authorization
    },
    timeout: 50000
});

export default request;