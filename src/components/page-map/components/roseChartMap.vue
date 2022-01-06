<template>
  <div class="columon" ref="divRef"></div>
</template>
<script>
import { defineComponent, ref, onMounted, computed, watchEffect } from 'vue'
import mapOption from '@/base-ui/map'
export default defineComponent({
  name: 'dashboard',
  props: {
    roseList: {
      type: Object
    }
  },
  setup(props) {
    const divRef = ref()
    onMounted(() => {
      const { setOptions } = mapOption(divRef.value)
      const option = computed(() => {
        return {
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)'
          },
          series: [
            {
              name: '玫瑰图',
              type: 'pie',
              radius: [20, 140],
              center: ['50%', '50%'],
              roseType: 'area',
              itemStyle: {
                borderRadius: 5
              },
              data: props.roseList
            }
          ]
        }
      })
      watchEffect(() => {
        setOptions(option.value)
      })
    })
    return {
      divRef
    }
  }
})
</script>

<style scoped lang="less">
.columon {
  width: 480px;
  height: 300px;
}
</style>
