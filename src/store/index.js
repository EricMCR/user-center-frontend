import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        // 存储token
        Authorization: localStorage.getItem('Authorization') ? localStorage.getItem('Authorization') : '',
        username: localStorage.getItem('username') ? localStorage.getItem('username') : ''
    },
    mutations: {
        updateState (state) {
            state.Authorization = localStorage.getItem('Authorization') ? localStorage.getItem('Authorization') : '';
            state.username = localStorage.getItem('username') ? localStorage.getItem('username') : '';
        },
        // 修改token，并将token存入localStorage
        changeLogin (state, user) {
            localStorage.setItem('Authorization', user.Authorization);
            localStorage.setItem('username', user.username);
        },
        //退出登录
        removeLogin () {
            localStorage.removeItem('Authorization');
            localStorage.removeItem('username');
        }
    }
})

export default store;