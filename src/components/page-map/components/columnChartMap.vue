<template>
  <div class="columon" ref="divRef"></div>
</template>

<script>
import { defineComponent, ref, onMounted, computed, watchEffect } from 'vue'
import * as echarts from 'echarts'
export default defineComponent({
  name: 'dashboard',
  props: {
    colunmList: {
      type: Object
    },
    goodsCount: {
      type: Object
    }
  },
  setup(props) {
    const divRef = ref()
    onMounted(() => {
      const myChart = echarts.init(divRef.value)
      const options = computed(() => {
        return {
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            }
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: [
            {
              type: 'category',
              data: props.colunmList,
              axisTick: {
                alignWithLabel: true
              }
            }
          ],
          yAxis: [
            {
              type: 'value'
            }
          ],
          series: [
            {
              name: 'Direct',
              type: 'bar',
              barWidth: '60%',
              data: props.goodsCount
            }
          ]
        }
      })
      watchEffect(() => myChart.setOption(options.value))
    })
    return {
      divRef
    }
  }
})
</script>

<style scoped lang="less">
.columon {
  width: 400px;
  height: 300px;
}
</style>
