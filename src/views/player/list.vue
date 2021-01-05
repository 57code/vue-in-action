<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input
        v-model="listQuery.accountname"
        placeholder="请输入用户账户名进行过滤"
        style="width: 200px"
        @keyup.enter="handleFilter"
      ></el-input>
      <el-button type="primary" @click="handleFilter" icon="el-icon-search"
        >过滤</el-button
      >
    </div>

    <el-table
      v-loading="listLoading"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%"
    >
      <el-table-column align="center" label="ID" prop="id"> </el-table-column>
      <el-table-column align="center" label="账户名" prop="accountname">
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <pagination
      v-show="total > 0"
      :total="total"
      v-model:page="listQuery.page"
      v-model:limit="listQuery.limit"
      @pagination="getList"
    ></pagination>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, toRefs } from "vue";
import { getPlayers } from "../../api/players";
import { Player } from "../../api/types";
import Pagination from "/comps/Pagination/index.vue";

export default defineComponent({
  name: "PlayerList",
  components: {
    Pagination,
  },
  setup() {
    // 玩家列表数据
    const state = reactive({
      listLoading: true, // 加载状态
      list: ref<Player[]>([]), // 列表数据
      total: 0,
      listQuery: {
        page: 1,
        limit: 10,
        accountname: undefined,
      },
    });

    // 获取列表
    async function getList() {
      state.listLoading = true;
      const { data } = await getPlayers(state.listQuery);
      // 设置列表数据
      state.list = data.players;
      state.listLoading = false;
      state.total = data.total;
    }

    // 首次获取数据
    getList();

    // 过滤
    function handleFilter() {
      state.listQuery.page = 1;
      getList();
    }

    return {
      ...toRefs(state),
      getList,
      handleFilter,
    };
  },
});
</script>

<style scoped></style>
