<template>
    <section class="main-box hero is-medium is-primary is-bold">
        <div class="hero-body">
            <div class="columns title-box">
                <img src="../../assets/logo.png" width="40" height="40"/>
                <div style="border-left: 2px solid; margin-left: 20px; padding-left: 20px;">
                    <h2 class="title 3">用户信息管理系统</h2>
                </div>
            </div>
            <div class="card login-box">
                <h1 class="title is-4 container" style="width: fit-content; color: hsl(0, 0%, 29%);">登 录</h1>
                <a-form-model ref="form" :model="form" :rules="rules">
                    <a-form-model-item prop="userAccount">
                        <a-input type="text" v-model="form.userAccount" placeholder="账号" @keydown.native="keyRules"
                                 :maxLength="11">
                            <a-icon slot="prefix" type="user" style="color: rgba(0,0,0,.25)"/>
                        </a-input>
                    </a-form-model-item>
                    <a-form-model-item prop="password">
                        <a-input-password v-model="form.password" placeholder="密码">
                            <a-icon slot="prefix" type="lock" style="color: rgba(0,0,0,.25)"/>
                        </a-input-password>
                    </a-form-model-item>
                    <a-form-model-item>
                        <a-checkbox v-model="rememberMe">记住我</a-checkbox>
                        <a style="float: right;" @click="forgetPwd">忘记密码</a>
                        <a-button type="primary" :loading="loading" style="width: 100%; margin-top: 15px;"
                                  @click="submit('form')">登录
                        </a-button>
                    </a-form-model-item>
                </a-form-model>

            </div>
        </div>

    </section>
</template>

<script>
import {mapMutations} from 'vuex'
import Cookie from 'js-cookie'

export default {
    name: "login",
    data() {
        return {
            form: {
                userAccount: '',
                password: ''
            },
            rules: {
                userAccount: [
                    {required: true, message: '请输入账号', trigger: 'change'},
                    {max: 11, message: '手机号不正确', trigger: 'change'}
                ],
                password: [
                    {required: true, message: '请输入密码', trigger: 'change'}
                ],
            },
            rememberMe: false,
            loading: false
        }
    },
    created() {
        //用户上次登录选择记住我时，使用cookie数据
        if (Cookie.get('userAccount') && Cookie.get('password') && Cookie.get('rememberMe')) {
            this.form.userAccount = Cookie.get('userAccount');
            this.form.password = Cookie.get('password');
            this.rememberMe = (Cookie.get('rememberMe') === 'true');
        }
    },
    methods: {
        ...mapMutations(['changeLogin', 'updateState']),
        submit(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    this.loading = true;
                    this.$request({
                        url: '/user/login',
                        method: 'POST',
                        data: {
                            userAccount: this.form.userAccount,
                            password: this.form.password
                        }
                    }).then(res => {
                        this.loading = false;
                        if (!res.data.success) {
                            this.$message.warning(res.data.desc);
                        } else {
                            this.$message.success("登录成功")
                            if (this.rememberMe) {
                                this.rememberLoginInfo();
                            } else {
                                this.removeLoginInfo();
                            }
                            this.changeLogin({
                                token: res.data.data.token,
                                userInfo: res.data.data.userInfo
                            });
                            this.updateState();
                            this.$router.push('/homePage');

                        }
                    })
                }
            })
        },
        //记住用户登录信息
        rememberLoginInfo() {
            Cookie.set('userAccount', this.form.userAccount, {expires: 7});
            Cookie.set('password', this.form.password, {expires: 7});
            Cookie.set('rememberMe', this.rememberMe, {expires: 7});
        },
        //删除用户登录信息
        removeLoginInfo() {
            Cookie.remove('userAccount');
            Cookie.remove('password');
            Cookie.remove('rememberMe');
        },
        keyRules(e) {
            let patt = /[`~!@#$%^&*()_\-+=<>?:"{}|,./;'\\[\]·~！@#￥%……&*（）——\-+={}|《》？：“”【】、；‘'，。、]/im
            if (patt.test(e.key)) {
                e.returnValue = false;
            }
            // if (e.key == 'e' || e.key == 'E' || e.key == '+' || e.key == '-' || e.key == '.') {
            //     e.returnValue = false;
            // }
        },
        forgetPwd() {
            this.$message.warning("请联系管理员");
        }
    }
}
</script>

<style>
.main-box {
    min-height: 100%;
    width: 100%;
}

.main-box .title-box {
    margin: 0 auto;
    padding-bottom: 10px;
    width: 400px;
    height: 50px;
}

.main-box .login-box {
    margin: 0 auto;
    padding: 30px;
    width: 450px;
}

.main-box .login-box input::-webkit-outer-spin-button,
.main-box .login-box input::-webkit-inner-spin-button {
    -webkit-appearance: none;
}

.main-box .login-box input[type="number"] {
    -moz-appearance: textfield;
}
</style>