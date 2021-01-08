<template>
  <div :id="id" :class="className" :style="{ height: height, width: width }" />
</template>

<script lang="ts">
import echarts from "echarts";
import {
  defineComponent,
  onMounted,
  onUnmounted,
  // PropType,
  ref,
  unref,
  watch,
} from "vue";
// import { LineChartData } from "../../../api/types";

export default defineComponent({
  props: {
    className: {
      type: String,
      default: "chart",
    },
    id: {
      type: String,
      default: "chart",
    },
    width: {
      type: String,
      default: "200px",
    },
    height: {
      type: String,
      default: "200px",
    },
    chartData: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const chart = ref<any>(null);

    onMounted(() => {
      chart.value = echarts.init(document.getElementById(props.id));
      setOption();
    });

    const setOption = () => {
      unref(chart).setOption({
        title: {
          top: 20,
          // 动态标题
          text: props.chartData.heroName + "近期办选走势",
          textStyle: {
            fontWeight: "normal",
            fontSize: 16,
            color: "#303133",
          },
          left: "1%",
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
          },
        },
        legend: {
          top: 20,
          icon: "rect",
          itemWidth: 14,
          itemHeight: 5,
          itemGap: 13,
          data: ["禁用率", "登场率"],
          right: "4%",
          textStyle: {
            fontSize: 12,
            color: "#303133",
          },
        },
        grid: {
          top: 100,
          left: "2%",
          right: "2%",
          bottom: "2%",
          containLabel: true,
        },
        xAxis: [
          {
            type: "category",
            boundaryGap: false,
            axisLine: {
              lineStyle: {
                color: "#57617B",
              },
            },
            data: props.chartData.xAxisData,
          },
        ],
        yAxis: [
          {
            type: "value",
            name: "(%)",
            axisTick: {
              show: false,
            },
            axisLine: {
              lineStyle: {
                color: "#57617B",
              },
            },
            axisLabel: {
              margin: 10,
              textStyle: {
                fontSize: 14,
              },
            },
            splitLine: {
              lineStyle: {
                color: "#57617B",
              },
            },
          },
        ],
        series: [
          {
            name: "登场率",
            type: "line",
            smooth: true,
            symbol: "circle",
            symbolSize: 5,
            showSymbol: false,
            lineStyle: {
              normal: {
                width: 1,
              },
            },
            areaStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(
                  0,
                  0,
                  0,
                  1,
                  [
                    {
                      offset: 0,
                      color: "rgba(137, 189, 27, 0.3)",
                    },
                    {
                      offset: 0.8,
                      color: "rgba(137, 189, 27, 0)",
                    },
                  ],
                  false
                ),
                shadowColor: "rgba(0, 0, 0, 0.1)",
                shadowBlur: 10,
              },
            },
            itemStyle: {
              normal: {
                color: "rgb(137,189,27)",
                borderColor: "rgba(137,189,2,0.27)",
                borderWidth: 12,
              },
            },
            data: props.chartData.pickData,
          },
          {
            name: "禁用率",
            type: "line",
            smooth: true,
            symbol: "circle",
            symbolSize: 5,
            showSymbol: false,
            lineStyle: {
              normal: {
                width: 1,
              },
            },
            areaStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(
                  0,
                  0,
                  0,
                  1,
                  [
                    {
                      offset: 0,
                      color: "rgba(0, 136, 212, 0.3)",
                    },
                    {
                      offset: 0.8,
                      color: "rgba(0, 136, 212, 0)",
                    },
                  ],
                  false
                ),
                shadowColor: "rgba(0, 0, 0, 0.1)",
                shadowBlur: 10,
              },
            },
            itemStyle: {
              normal: {
                color: "rgb(0,136,212)",
                borderColor: "rgba(0,136,212,0.2)",
                borderWidth: 12,
              },
            },
            data: props.chartData.banData,
          },
        ],
      });
    };

    watch(() => props.chartData, setOption);

    onUnmounted(() => {
      if (!unref(chart)) {
        return;
      }
      chart.value.dispose();
      chart.value = null;
    });

    return { chart };
  },
});
</script>
