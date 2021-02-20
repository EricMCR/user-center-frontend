<template>
  <section class="main-box hero is-medium is-primary is-bold">
    <div class="hero-body">
      <div class="columns title-box">
        <img src="../../assets/logo.png"/>
        <div style="border-left: 2px solid; margin-left: 20px; padding-left: 20px;">
          <h2 class="title 3">代驾信息管理系统</h2>
        </div>
      </div>
      <div class="card login-box">
        <h1 class="title is-4 container" style="width: fit-content; color: hsl(0, 0%, 29%);">登 录</h1>
        <a-form-model ref="form" :model="form" :rules="rules">
          <a-form-model-item prop="mobileNo">
            <a-input type="number" v-model="form.mobileNo" placeholder="手机号" @keydown.native="keyRules" :maxLength="11">
              <a-icon slot="prefix" type="user" style="color: rgba(0,0,0,.25)" />
            </a-input>
          </a-form-model-item>
          <a-form-model-item prop="password">
            <a-input-password v-model="form.password" placeholder="密码">
              <a-icon slot="prefix" type="lock" style="color: rgba(0,0,0,.25)" />
            </a-input-password>
          </a-form-model-item>
          <a-form-model-item>
            <a-checkbox v-model="rememberMe">记住我</a-checkbox>
            <a href="" style="float: right;">忘记密码</a>
            <a-button type="primary" style="width: 100%; margin-top: 15px;" @click="submit('form')">登录</a-button>
          </a-form-model-item>
        </a-form-model>


      </div>
    </div>

    </section>
</template>

<script>
export default {
    name: "login",
    data() {
        return {
            form: {
                mobileNo: '',
                password: ''
            },
            rules: {
                mobileNo: [
                    { required: true, message: '请输入手机号', trigger: 'change' },
                    {max: 11, message: '手机号不正确', trigger: 'change' }
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'change' }
                ],
            },
            rememberMe: false
        }
    },
    methods: {
        submit(formName){
            this.$refs[formName].validate(valid => {
                if (valid) {
                    this.$request({
                        url: '/admin/login',
                        baseURL: 'http://197.168.26.217:8080',
                        headers: {'X-Requested-With': 'XMLHttpRequest'},
                        method: 'post',
                        data: {
                            mobileNo: this.form.mobileNo,
                            password: this.form.password
                        }
                    })
                }
            })
        },
        keyRules(e) {
            if (e.key == 'e' || e.key == 'E' || e.key == '+' || e.key == '-' || e.key == '.'){
                e.returnValue = false;
            }
        }
    }
}
</script>

<style>
.main-box{
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