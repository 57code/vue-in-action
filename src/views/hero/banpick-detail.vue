<template>
  <div class="chart-container">
    <!-- 时间区间 -->
    <div class="range">
      <el-radio-group v-model="range">
        <el-radio-button label="week">周</el-radio-button>
        <el-radio-button label="month">月</el-radio-button>
        <el-radio-button label="quarter">季度</el-radio-button>
        <el-radio-button label="year">年</el-radio-button>
      </el-radio-group>
    </div>

    <line-chart
      v-if="detail"
      :chart-data="chartData"
      width="100%"
      height="100%"
    ></line-chart>
    <p v-else>没有任何数据...</p>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, reactive, ref, toRefs } from "vue";
import { getBanpickDetail } from "../../api/heros";
import {
  BanPickDetailAndHero,
  RangeType,
  LineChartData,
} from "../../api/types";
import { useRoute } from "vue-router";
import LineChart from "./components/LineChart.vue";

const rangeData = {
  week: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
  month: new Array(31).fill(1).map((v, i) => i + 1 + ""),
  quarter: ["一季度", "二季度", "三季度", "四季度"],
  year: new Array(12).fill(1).map((v, i) => i + 1 + "月"),
};

export default defineComponent({
  components: {
    LineChart,
  },
  setup() {
    // 数据
    const data = reactive({
      detail: ref<BanPickDetailAndHero | null>(null),
      range: ref<RangeType>("week"),
    });

    // 获取统计详情
    const route = useRoute();
    const getDetail = async () => {
      const res = await getBanpickDetail(route.params.id + "");
      data.detail = res.data.detail;
    };

    // 首次调用
    getDetail();

    // 计算折线图需要数据
    const chartData = computed<LineChartData>(() => {
      if (!data.detail) {
        return {
          heroName: "",
          xAxisData: [],
          banData: [],
          pickData: [],
        };
      }

      const { ban, pick } = data.detail[data.range];
      return {
        heroName: data.detail.hero.name,
        xAxisData: rangeData[data.range],
        banData: ban,
        pickData: pick,
      };
    });

    return { ...toRefs(data), chartData };
  },
});
</script>

<style scoped>
.chart-container {
  position: relative;
  width: 100%;
  height: calc(100vh - 84px);
}

.range {
  padding: 20px;
  position: absolute;
  z-index: 10;
  left: -138px;
  width: 275px;
  margin: 0 50%;
}
</style>
