import axios from 'axios'

axios.create({
    baseURL: 'http://197.168.26.217:8080',
    timeout: 50000
});

export default axios;