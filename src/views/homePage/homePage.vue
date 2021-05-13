<template>
    <a-layout class="full-height">
        <a-layout-header class="header">
            <div class="header-logo">
                <img src="../../assets/logo.png" width="40" height="40" />
                <h3 class="subtitle is-4">代驾信息管理系统</h3>
            </div>
            <div class="header-logout">

                <a-dropdown :trigger="['click']" style="cursor: pointer;">
                    <div style="display: flex; align-items: center;">
                        <h5 class="subtitle is-5">欢迎 {{ username }}</h5>
                        <a-avatar
                            shape="square"
                            size="default"
                            :style="{ backgroundColor: color, verticalAlign: 'middle' }">
                            {{ username[0] }}
                        </a-avatar>
                        <a-icon style="color: #fff; font-size: 14px; margin-top: 5px;" type="caret-down" />
                    </div>

                    <a-menu slot="overlay">
                        <a-menu-item @click="changePwd">修改密码</a-menu-item>
                        <a-menu-item @click="logout">退出登录</a-menu-item>
                    </a-menu>
                </a-dropdown>
            </div>
        </a-layout-header>
        <a-layout>
            <a-layout-sider width="200" style="background: #fff" collapsible :collapsedWidth="80">
                <a-menu
                    mode="inline"
                    @select="handleMenuSelect"
                    :style="{ height: '100%', borderRight: 0 }"
                    :selectedKeys="selectedMenuKeys" theme="dark"
                >
                    <template v-for="item in menuList">
                        <a-sub-menu v-if="item.type === 1" :key="item.url">
                            <span slot="title">
                                <a-icon :type="item.icon" />
                                <span>{{item.title}}</span>
                            </span>
                            <a-menu-item v-for="subItem in item.subMenuList" :key="subItem.url" :disabled="item.disabled">
                                <a-icon :type="subItem.icon" />
                                <span>{{subItem.title}}</span>
                            </a-menu-item>
                        </a-sub-menu>
                        <a-menu-item v-if="item.type === 2" :key="item.url" :disabled="item.disabled">
                            <a-icon :type="item.icon" />
                            <span>{{item.title}}</span>
                        </a-menu-item>
                    </template>

                </a-menu>
            </a-layout-sider>
            <a-layout>
                <a-layout-content>
                    <a-tabs v-show="tabList.length"
                            class="frame-tabs" type="editable-card"
                            style="height: 100%; padding-left: 1px;" :tabBarStyle="{margin: 0}"
                            @edit="onEdit" :activeKey="currentTabKey"
                            @change="changeTab" :tabBarGutter = 0
                            hideAdd :animated="false">
                        <a-tab-pane v-for="item in tabList" :key="item.url" :tab="item.title" :closable="true" :forceRender="false">
                            <iframe class="tab-frame" :src="item.url" :style="{height:(curHeight - 105)+'px'}"></iframe>
                        </a-tab-pane>
                    </a-tabs>

<!--                    <charts-page v-show="!tabList.length"></charts-page>-->
                </a-layout-content>

            </a-layout>
        </a-layout>

        <a-modal dialogClass="form-modal" v-model="visible" centered
                 title="修改密码"
                 @cancel="handleClose" @ok="submitForm('form')" :width="450">
            <a-form-model ref="form" :model="form" :rules="rules" layout="horizontal" labelAlign="left"
                          :label-col="labelCol" :wrapper-col="wrapperCol">

                <a-form-model-item label="原密码" prop="oldPassword">
                    <a-input-password v-model="form.oldPassword" placeholder="请输入"> </a-input-password>
                </a-form-model-item>
                <a-form-model-item label="设置新密码" prop="newPassword">
                    <a-input-password v-model="form.newPassword" placeholder="请输入"> </a-input-password>
                </a-form-model-item>
                <a-form-model-item label="确认新密码" prop="confirmPassword">
                    <a-input-password v-model="form.confirmPassword" placeholder="请输入"> </a-input-password>
                </a-form-model-item>
            </a-form-model>
        </a-modal>
    </a-layout>

</template>

<script>
import { mapMutations } from 'vuex'
import {menuList} from './menuConfig'

export default {
    name: "homePage",
    data() {
        let validatePwd = (rule, value, callback) => {
            if (value !== this.form.newPassword) {
                callback(new Error("两次输入不一致"));
            } else {
                callback();
            }
        };
        return {
            id: '',
            username: '',
            color: '#f56a00',
            colorList: ['#f56a00', '#7265e6', '#ffbf00', '#00a2ae'],

            //侧边菜单列表
            menuList: menuList,
            selectedMenuKeys: ['/#/chartsPage'],

            //当前标签页列表
            tabList: [],
            currentTabKey: '',

            curHeight: document.body.clientHeight,

            visible: false,
            labelCol: { span: 6 },
            wrapperCol: { span: 17 },
            layout: 'horizontal',
            form: {
                oldPassword: '',
                newPassword: '',
                confirmPassword: ''
            },
            rules: {
                newPassword: [
                    { required: true, message: '请设置密码', trigger: 'change' },
                    { min: 6, message: '密码最少6位', trigger: 'change' }
                ],
                oldPassword: [
                    { required: true, message: '请输入原密码', trigger: 'change' }
                ],
                confirmPassword: [
                    { required: true, message: '请再次输入新密码', trigger: 'change' },
                    { validator: validatePwd, trigger: 'change'}
                ]
            },
        }
    },
    created() {
        this.menuIfDisabledCheck();
        this.initLogoutBox();

        //默认打开首页
        let data = this.getTabData('/#/chartsPage');
        this.addTab(data);
    },
    methods: {
        ...mapMutations(['removeLogin', 'updateState']),
        initLogoutBox() {
            this.id = this.$store.state.id;
            this.username = this.$store.state.username;
            const index = Math.round(Math.random() * 3);
            this.color = this.colorList[index];
        },
        //修改密码
        changePwd() {
            this.visible = true;
        },
        //注销账号
        logout() {
            this.removeLogin();
            this.updateState();
            this.$router.push('/login');
        },
        //处理侧边菜单选中事件
        handleMenuSelect(params) {
            let data = this.getTabData(params.key);
            this.selectedMenuKeys[0] = params.key;
            this.addTab(data);
        },
        //根据url在菜单列表中查找页面数据
        getTabData(url) {
            for (let item of this.menuList) {
                if (item.type === 1 && item.subMenuList) {
                    for (let subItem of item.subMenuList) {
                        if (subItem.url === url) {
                            return subItem;
                        }
                    }
                }else if (item.type === 2 && item.url === url) {
                    return item;
                }
            }
        },
        //添加tab页
        addTab(data) {
            if (this.tabList.every(item => { return item.url !== data.url; })) {
                this.tabList.push({
                    title: data.title,
                    url: data.url
                })
            }
            this.currentTabKey = data.url;
        },
        onEdit(targetKey, action) {
            this[action](targetKey);
        },
        remove(targetKey) {
            this.tabList.splice(this.tabList.findIndex(item => {
                return item.url === targetKey;
            }), 1);
            if (this.tabList.length) {
                this.currentTabKey = this.tabList[this.tabList.length - 1].url;
                this.selectedMenuKeys[0] = this.tabList[this.tabList.length - 1].url;
            }else {
                this.currentTabKey = '';
            }
            if (this.selectedMenuKeys.length && this.selectedMenuKeys[0] === targetKey) {
                this.selectedMenuKeys.splice(0, 1);
            }

        },
        changeTab(activeKey) {
            this.currentTabKey = activeKey;
            this.selectedMenuKeys[0] = activeKey;
        },
        //处理修改密码窗口的关闭事件
        handleClose() {
            this.$refs['form'].clearValidate();
            this.form = {
                oldPassword: '',
                newPassword: '',
                comfirmPassword: ''
            }
        },
        //菜单权限检查
        menuIfDisabledCheck() {
            const auth = this.$store.getters.getUserInfo.auth;
            for (let item of menuList) {
                if (item.allowedAuth && item.allowedAuth.length) {
                    if (!item.allowedAuth.includes(auth)) {
                        item.disabled = true;
                    }
                }
            }
        },
        submitForm(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    let params = {
                        id: this.id,
                        oldPassword: this.form.oldPassword,
                        newPassword: this.form.newPassword
                    };

                    console.log()
                    this.$request({
                        url: '/admin/updatePwd',
                        method: 'POST',
                        data: params,
                        headers: {
                            token: this.$store.state.Authorization
                        }
                    }).then(res => {
                        if (res.data.status == '200') {
                            this.$message.success('操作成功');
                            this.visible = false;
                            this.handleClose();
                        }else {
                            this.$message.warning(res.data.desc);
                        }
                    })
                }
            })
        }
    }
}
</script>

<style>
.full-height {
    height: 100%;
}
.header {
    padding: 5px 10px;
    height: 50px;
}
.header .header-logo {
    float: left;
    min-width: 200px;
    height: 40px;
    display: flex;
    align-items: center;
    cursor: default;
}
.header .header-logo h3 {
    padding: 0 10px;
    color: #fff;
}
.header .header-logout {
    float: right;
    min-width: 150px;
    height: 40px;
    display: flex;
    align-items: center;
}
.header .header-logout h5 {
    padding: 0 10px;
    color: #fff;
    margin-bottom: 0;
}
.frame-tabs .ant-tabs-top-content, .ant-tabs-tabpane, .tab-frame {
    height: 100%;
    width: 100%;

}
.frame-tabs .tab-frame {
    width: calc(100% - 14px);
    margin: 7px;
    border-radius: 15px;
}
</style>