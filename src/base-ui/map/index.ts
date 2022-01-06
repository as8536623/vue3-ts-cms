import * as echarts from 'echarts'
export default function mapOption(Element: HTMLElement) {
  const echartsInstance = echarts.init(Element)
  const setOptions = (option: any) => {
    echartsInstance.setOption(option)
  }
  window.addEventListener('resize', () => {
    setTimeout(() => {
      echartsInstance.resize()
    }, 200)
  })
  return {
    setOptions
  }
}
