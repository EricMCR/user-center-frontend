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
                    <template v-for="item in menuList">
                        <a-sub-menu v-if="item.type === 1" :key="item.url">
                            <span slot="title"><a-icon :type="item.icon" />{{item.title}}</span>
                            <a-menu-item v-for="subItem in item.subMenuList" :key="subItem.url">
                                <a-icon :type="subItem.icon" />
                                {{subItem.title}}
                            </a-menu-item>
                        </a-sub-menu>
                        <a-menu-item v-if="item.type === 2" :key="item.url">
                            <a-icon :type="item.icon" />
                            {{item.title}}
                        </a-menu-item>
                    </template>

                </a-menu>
            </a-layout-sider>
            <a-layout>
                <a-layout-content>
                    <a-tabs class="frame-tabs" type="editable-card"
                            style="height: 100%;" :tabBarStyle="{margin: 0}"
                            @edit="onEdit">
                        <a-tab-pane v-for="item in tabList" :key="item.key" :tab="item.title" :closable="true">
                            <iframe class="tab-frame" :src="item.url"></iframe>
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
            colorList: ['#f56a00', '#7265e6', '#ffbf00', '#00a2ae'],

            //type:1-文件夹, 2-链接
            menuList: [
                {
                    title: '客户管理',
                    url: '1',
                    type: 1,
                    icon: 'pie-chart',
                    subMenuList: [
                        {
                            title: '客户账号管理',
                            url: '4',
                            type: 1,
                            icon: 'rest'
                        }
                    ]
                },
                {
                    title: '权限管理',
                    url: '2',
                    type: 2,
                    icon: 'windows',
                    subMenuList: []
                },
                {
                    title: '配置管理',
                    url: '3',
                    type: 2,
                    icon: 'mail',
                    subMenuList: []
                }
            ],

            tabList: [
                {
                    title: '页面一',
                    key: 1,
                    url: '/#/testPage1'
                },
                {
                    title: '页面二',
                    key: 2,
                    url: '/#/testPage2'
                },
                {
                    title: '页面三',
                    key: 3,
                    url: '/#/testPage3'
                },
            ]
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
        },
        onEdit(targetKey, action) {
            this[action](targetKey);
        },
        remove(targetKey) {
            this.tabList.splice(this.tabList.findIndex(item => {
                return item.key === targetKey;
            }), 1);
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
</style>