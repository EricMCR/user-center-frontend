<template>
    <div class="charts-page">
        <a-row :gutter="[16, 16]" style="height: 35%;">
            <a-col :span="12">
                <div class="col-item">
                    <a-card>
                        <a-card-meta :title="userInfo.name">
                            <a-avatar
                                slot="avatar"
                                src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                            />
<!--                            <a-avatar-->
<!--                                slot="avatar"-->
<!--                                :style="{ backgroundColor: color, verticalAlign: 'middle' }">-->
<!--                                {{userInfo.name[0]}}-->
<!--                            </a-avatar>-->
                            <template slot="description">
                                <a-descriptions :column="1">
                                    <a-descriptions-item label="角色">
                                        {{userInfo.authName}}
                                    </a-descriptions-item>
                                    <a-descriptions-item label="性别">
                                        {{userInfo.sex}}
                                    </a-descriptions-item>
                                    <a-descriptions-item label="年龄">
                                        {{userInfo.age}}
                                    </a-descriptions-item>
                                    <a-descriptions-item label="手机号">
                                        {{userInfo.phone}}
                                    </a-descriptions-item>
                                </a-descriptions>

                            </template>
                        </a-card-meta>
                    </a-card>
                </div>
            </a-col>
            <a-col :span="12">
                <div class="col-item">
                    <a-card>
                        <a-statistic title="今日订单量" :value="112893"/>
                        <a-statistic title="今日完成总金额 (CNY)" :precision="2" :value="112893"/>
                        <a-statistic
                            title="今日新增客户数"
                            :value="112"
                            :value-style="{ color: '#3f8600' }"
                            style="margin-right: 50px"
                        >
                            <template #prefix>
                                <a-icon type="arrow-up"/>
                            </template>
                        </a-statistic>
                    </a-card>


                </div>
            </a-col>
        </a-row>
        <a-row :gutter="[16, 16]" style="height: 65%;">
            <a-col :span="12">
                <div id="chart1" class="col-item"></div>
            </a-col>
            <a-col :span="12">
                <div id="chart2" class="col-item"></div>
            </a-col>
        </a-row>

    </div>
</template>

<script>
export default {
    name: "chartsPage",
    data() {
        return {
            userInfo: {
                age: '',
                auth: '',
                authName: "",
                id: '',
                idCard: '',
                name: "",
                phone: "",
                sex: "",
            },
            chart1: '',
            chart2: '',

            color: '#f56a00',
            colorList: ['#f56a00', '#7265e6', '#ffbf00', '#00a2ae'],
        }
    },
    created() {
        this.initUserData();
        this.initData();
    },
    mounted() {
        this.chart1 = this.$echarts.init(document.getElementById('chart1'));
        this.chart2 = this.$echarts.init(document.getElementById('chart2'));
        this.chart2.setOption({
            title: {
                text: '代驾接单量TOP7'
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'line'
                }
            },
            xAxis: {
                data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
            },
            yAxis: {},
            series: [{
                name: '接单量',
                type: 'bar',
                data: [5, 20, 36, 10, 10, 20]
            }]
        });
        this.chart1.setOption({
            title: {
                text: '本周内订单量'
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'line'
                }
            },
            xAxis: {
                type: 'category',
                data: this.getOneWeekDate()
            },
            yAxis: {
                type: 'value'
            },
            series: [{
                data: [150, 230, 224, 218, 135, 147, 260],
                type: 'line'
            }]
        });
        this.chart1.resize();
        this.chart2.resize();
        window.onresize = () => {
            this.chart1.resize();
            this.chart2.resize();
        }
    },
    methods: {
        //加载用户信息数据
        initUserData() {
            this.userInfo = this.$store.getters.getUserInfo;
        },
        //加载图表数据
        initData() {

        },
        //获取一周内日期列表
        getOneWeekDate() {
            let dateList = [];
            const now = new Date();
            for (let i = 6; i >= 0; i--) {
                let day = new Date();
                day.setTime(now.getTime()-24*3600*1000*i);
                dateList.push('' + (day.getMonth()+1) + '-' + day.getDate());
            }
            return dateList;
        }
    }
}
</script>

<style scoped>
.charts-page {
    height: 100%;
    padding: 10px;
}

.charts-page .ant-row {
    /*height: 50%;*/
}

.charts-page .ant-row .ant-col {
    height: 100%;
}

.charts-page .ant-row .ant-col .col-item {
    height: 100%;
    /*background-color: antiquewhite;*/
}

#chart1, #chart2 {
    height: 100%;
}

.charts-page .ant-row .ant-col .col-item .ant-card {
    height: 100%;
}
</style>