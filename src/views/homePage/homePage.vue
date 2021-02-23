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
                            {{ username }}
                        </a-avatar>
                        <a-icon style="color: #fff; font-size: 14px; margin-top: 5px;" type="caret-down" />
                    </div>

                    <a-menu slot="overlay">
                        <a-menu-item @click="logout">退出登录</a-menu-item>
                    </a-menu>
                </a-dropdown>
            </div>
        </a-layout-header>
        <a-layout>
            <a-layout-sider width="200" style="background: #fff">
                <a-menu
                    mode="inline"
                    :default-selected-keys="['1']"
                    :default-open-keys="['sub1']"
                    :style="{ height: '100%', borderRight: 0 }"
                >
                    <a-sub-menu key="sub1">
                        <span slot="title"><a-icon type="user" />subnav 1</span>
                        <a-menu-item key="1">
                            option1
                        </a-menu-item>
                        <a-menu-item key="2">
                            option2
                        </a-menu-item>
                        <a-menu-item key="3">
                            option3
                        </a-menu-item>
                        <a-menu-item key="4">
                            option4
                        </a-menu-item>
                    </a-sub-menu>
                    <a-sub-menu key="sub2">
                        <span slot="title"><a-icon type="laptop" />subnav 2</span>
                        <a-menu-item key="5">
                            option5
                        </a-menu-item>
                        <a-menu-item key="6">
                            option6
                        </a-menu-item>
                        <a-menu-item key="7">
                            option7
                        </a-menu-item>
                        <a-menu-item key="8">
                            option8
                        </a-menu-item>
                    </a-sub-menu>
                    <a-sub-menu key="sub3">
                        <span slot="title"><a-icon type="notification" />subnav 3</span>
                        <a-menu-item key="9">
                            option9
                        </a-menu-item>
                        <a-menu-item key="10">
                            option10
                        </a-menu-item>
                        <a-menu-item key="11">
                            option11
                        </a-menu-item>
                        <a-menu-item key="12">
                            option12
                        </a-menu-item>
                    </a-sub-menu>
                </a-menu>
            </a-layout-sider>
            <a-layout style="padding: 0 24px 24px">
                <a-layout-content>
                    <a-tabs type="card" style="height: 100%;">
                        <a-tab-pane key="1" tab="Tab 1">
                            Content of Tab Pane 1
                        </a-tab-pane>
                        <a-tab-pane key="2" tab="Tab 2">
                            Content of Tab Pane 2
                        </a-tab-pane>
                        <a-tab-pane key="3" tab="Tab 3">
                            Content of Tab Pane 3
                        </a-tab-pane>
                    </a-tabs>
                </a-layout-content>

            </a-layout>
        </a-layout>
    </a-layout>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
    name: "homePage",
    data() {
        return {
            username: '',
            color: '#f56a00',
            colorList: ['#f56a00', '#7265e6', '#ffbf00', '#00a2ae']
        }
    },
    created() {
        this.initLogoutBox();
    },
    methods: {
        ...mapMutations(['removeLogin']),
        initLogoutBox() {
            this.username = this.$store.state.username;
            const index = Math.round(Math.random() * 3);
            this.color = this.colorList[index];
        },
        logout() {
            this.removeLogin();
            this.$router.push('/login');
        }
    }
}
</script>

<style scoped>
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
.tab-container {
    width: 100%;
    height: 100%;
    background-color: aquamarine;
}
</style>