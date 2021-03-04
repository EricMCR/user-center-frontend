<template>
    <div id="app">
        <router-view></router-view>
    </div>
</template>

<script>

export default {
    name: 'App',
    components: {

    },
    created() {

    }
}
</script>

<style>
html{
    padding: 0;
    margin: 0;
    height: 100%;
    overflow-y: hidden!important;
}
body{
    height: 100%;
    padding: 0;
    margin: 0;
}
#app{
    height: 100%;
    position: relative;
    /*超出内容被修剪隐藏，只显示报表部分，el-table有滚动条，其余的滚动条不需要*/
    overflow: hidden;
}
</style>
