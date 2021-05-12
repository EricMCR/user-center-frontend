<template>
    <div class="charts-page">
        <a-row :gutter="[16, 16]">
            <a-col :span="12">
                <div id="chart1" style=""></div>
            </a-col>
            <a-col :span="12">
                <div id="chart2"></div>
            </a-col>
        </a-row>
        <a-row :gutter="[16, 16]">
            <a-col :span="12">
                <div></div>
            </a-col>
            <a-col :span="12">
                <div></div>
            </a-col>
        </a-row>

    </div>
</template>

<script>
export default {
    name: "chartsPage",
    data() {
        return {
            chart1: '',
            chart2: ''
        }
    },
    mounted() {
        this.chart1 = this.$echarts.init(document.getElementById('chart1'));
        this.chart1.setOption({
            title: {
                text: 'ECharts 入门示例'
            },
            tooltip: {},
            xAxis: {
                data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
            },
            yAxis: {},
            series: [{
                name: '销量',
                type: 'bar',
                data: [5, 20, 36, 10, 10, 20]
            }]
        });
        this.chart2 = this.$echarts.init(document.getElementById('chart2'));
        this.chart2.setOption({
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
                data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
            },
            yAxis: {
                type: 'value'
            },
            series: [{
                data: [150, 230, 224, 218, 135, 147, 260],
                type: 'line'
            }]
        });
        window.onresize = () => {
            this.chart1.resize();
            this.chart2.resize();
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
    height: 50%;
}

.charts-page .ant-row .ant-col {
    height: 100%;
}

.charts-page .ant-row .ant-col div {
    height: 100%;
    background-color: antiquewhite;
}
</style>