import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        // 存储token
        Authorization: localStorage.getItem('Authorization') ? localStorage.getItem('Authorization') : '',
        id: localStorage.getItem('id') ? localStorage.getItem('id') : '',
        username: localStorage.getItem('username') ? localStorage.getItem('username') : '',
        auth: localStorage.getItem('auth') ? localStorage.getItem('auth') : '',
        userInfo: localStorage.getItem('userInfo') ? localStorage.getItem('userInfo') : ''
    },
    getters: {
        getUserInfo: state => {
            return localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : '';
        }
    },
    mutations: {
        updateState (state) {
            state.Authorization = localStorage.getItem('Authorization') ? localStorage.getItem('Authorization') : '';
            state.id = localStorage.getItem('id') ? localStorage.getItem('id') : '';
            state.username = localStorage.getItem('username') ? localStorage.getItem('username') : '';
            state.auth = localStorage.getItem('auth') ? localStorage.getItem('auth') : '';
            state.userInfo = localStorage.getItem('userInfo') ? localStorage.getItem('userInfo') : '';
        },
        // 修改token，并将token存入localStorage
        changeLogin (state, user) {
            localStorage.setItem('Authorization', user.Authorization);
            localStorage.setItem('id', user.id);
            localStorage.setItem('username', user.username);
            localStorage.setItem('auth', user.auth);
            localStorage.setItem('userInfo', user.userInfo);
        },
        //退出登录
        removeLogin () {
            localStorage.removeItem('Authorization');
            localStorage.removeItem('id');
            localStorage.removeItem('username');
            localStorage.removeItem('auth');
            localStorage.removeItem('userInfo');
        }
    }
})

export default store;