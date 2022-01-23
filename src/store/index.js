import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        // 存储token
        Authorization: localStorage.getItem('Authorization') ? localStorage.getItem('Authorization') : '',
        userInfoText: localStorage.getItem('userInfo') ? localStorage.getItem('userInfo') : ''
    },
    mutations: {
        updateState (state) {
            state.Authorization = localStorage.getItem('Authorization') ? localStorage.getItem('Authorization') : '';
            state.userInfoText = localStorage.getItem('userInfo') ? localStorage.getItem('userInfo') : '';
        },
        // 修改token，并将token存入localStorage
        changeLogin (state, user) {
            localStorage.setItem('Authorization', user.Authorization);
            localStorage.setItem('userInfo', JSON.stringify(user.userInfo));
        },
        //退出登录
        removeLogin () {
            localStorage.removeItem('Authorization');
            localStorage.removeItem('userInfo');
        }
    }
})

export default store;