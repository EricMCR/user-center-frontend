<template>
    <a-layout class="full-height">
        <a-layout-header class="header">
            <div class="logo" />
            <a-menu
                theme="dark"
                mode="horizontal"
                :default-selected-keys="['2']"
                :style="{ lineHeight: '64px' }"
            >
                <a-menu-item key="1">
                    nav 1
                </a-menu-item>
                <a-menu-item key="2">
                    nav 2
                </a-menu-item>
                <a-menu-item key="3">
                    nav 3
                </a-menu-item>
            </a-menu>
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
export default {
name: "homePage"
}
</script>

<style scoped>
.full-height {
    height: 100%;
}
.tab-container {
    width: 100%;
    height: 100%;
    background-color: aquamarine;
}
</style>