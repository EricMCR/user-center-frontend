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
                        <a-menu-item @click="logout">退出登录</a-menu-item>
                    </a-menu>
                </a-dropdown>
            </div>
        </a-layout-header>
        <a-layout>
            <a-layout-sider width="200" style="background: #fff">
                <a-menu
                    mode="inline"
                    @select="handleMenuSelect"
                    :style="{ height: '100%', borderRight: 0 }"
                    :selectedKeys="selectedMenuKeys"
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

                    <charts-page></charts-page>
                </a-layout-content>

            </a-layout>
        </a-layout>
    </a-layout>
</template>

<script>
import { mapMutations } from 'vuex'
import {menuList} from './menuConfig'

export default {
    name: "homePage",
    data() {
        return {
            username: '',
            color: '#f56a00',
            colorList: ['#f56a00', '#7265e6', '#ffbf00', '#00a2ae'],

            //侧边菜单列表
            menuList: menuList,
            selectedMenuKeys: [''],

            //当前标签页列表
            tabList: [],
            currentTabKey: '',

            curHeight: document.body.clientHeight
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