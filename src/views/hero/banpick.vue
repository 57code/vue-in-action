<template>
  <div class="app-container">
    <el-table
      v-loading="listLoading"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%"
    >
      <el-table-column
        align="center"
        label="排名"
        prop="hero.id"
      ></el-table-column>

      <el-table-column
        align="center"
        label="英雄"
        prop="hero.name"
      ></el-table-column>

      <el-table-column align="center" label="登场率">
        <template v-slot="{ row }">
          <span>{{ row.pick }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="禁用率">
        <template v-slot="{ row }">
          <span>{{ row.ban }}</span>
        </template>
      </el-table-column>

      <!-- 操作 -->
      <el-table-column align="center" label="操作">
        <template v-slot="scope">
          <el-button type="primary" @click="showDetail(scope)"
            >查看详情</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total > 0"
      :total="total"
      v-model:page="listQuery.page"
      v-model:limit="listQuery.limit"
      @pagination="getList"
    />
  </div>
</template>

<script lang="ts">
import { getBanpick } from "../../api/heros";
import { BanPick } from "../../api/types";
import Pagination from "../../components/Pagination/index.vue";
import { defineComponent, reactive, ref, toRefs } from "vue";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "BanPick",
  components: {
    Pagination,
  },
  setup() {
    const state = reactive({
      total: 0,
      list: ref<BanPick[]>([]),
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20,
      },
    });
    const getList = async () => {
      state.listLoading = true;
      const { data } = await getBanpick(state.listQuery);
      state.list = data.banpick;
      state.total = data.total;
      state.listLoading = false;
    };
    getList();

    const router = useRouter();
    const showDetail = (scope: any) => {
      router.push("/heros/banpick/" + scope.row.hero.id);
    };

    return { ...toRefs(state), getList, showDetail };
  },
});
</script>
