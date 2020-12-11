<template>
  <!-- ts˝ -->
  <!-- <Compts></Compts> -->
  <!-- 相对地址 -->
  <!-- <img src="./assets/logo.png" alt=""> -->
  <!-- 绝对路径 -->
  <!-- <img src="/src/assets/logo.png" alt=""> -->
  <!-- 消息提示框 -->
  <!-- <message v-if="showMsg" @close="showMsg = false">
    <template v-slot:title> 恭喜 </template>
    <template v-slot:default> 新增课程成功！ </template>
  </message>

  <course-add v-model:course="course" @add="addCourse"></course-add>

  <course-list :courses="courses"></course-list> -->

  <!-- 计算属性：课程总数 -->
  <!-- <p>课程总数：{{ courseCount }}</p> -->
  <nav>
    <NavLink to="https://www.kaikeba.com/">kaikeba</NavLink>
    <NavLink to="/login">login</NavLink>
  </nav>

  <!-- 访问全局状态 -->
  <p @click="inc">{{ count.count }}</p>
  <p @click="incBy(2)">incBy: {{ count1 }}</p>
  <p @click="$store.commit('COUNT_INC')">COUNT_INC: {{ count2.count }}</p>
  <p @click="incAsync">action inc: {{ count3 }}</p>
  <p>doubleCount: {{ doubleCount }}</p>
  <p>nCount: {{ nCount(10) }}</p>

  <!-- 路由出口 -->
  <router-view v-slot="{ Component }">
    <keep-alive>
      <transition name="fade">
        <component :is="Component"></component>
      </transition>
    </keep-alive>
  </router-view>
</template>

<script>
import { reactive, onMounted, ref, toRefs, computed, watch } from "vue";
import NavLink from "/comps/NavLink.vue";
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";

export default {
  components: {
    NavLink,
  },
  data() {
    return {
      localCount: 10,
    };
  },
  setup() {
    const state = reactive({
      courses: JSON.parse(localStorage.getItem("courses")) || [],
      course: "",
      courseCount: computed(() => state.courses.length + "门"),
    });

    const showMsg = ref(false);

    function addCourse() {
      state.courses.push(state.course);
      state.course = "";

      showMsg.value = true;
    }

    onMounted(() => {
      setTimeout(() => {
        state.courses = ["web全栈架构师", "web高级工程师"];
      }, 1000);

      watch(
        () => state.courses,
        () => {
          localStorage.setItem("courses", JSON.stringify(state.courses));
        },
        {
          deep: true,
        }
      );
    });

    fetch("/api/users")
      .then(resp => resp.json())
      .then(data => {
        console.log(data);
      });

    console.log(import.meta.env.VITE_TOKEN);

    return { ...toRefs(state), showMsg, addCourse };
  },
  computed: {
    // count() {
    //   return this.$store.state.count;
    // },
    ...mapState(["count"]),
    ...mapState({
      count1: state => state.count.count,
      count2: "count",
      count3(state) {
        return state.count.count + this.localCount;
      },
    }),
    ...mapGetters("count", ["doubleCount"]),
  },
  methods: {
    nCount(n) {
      return this.$store.getters["count/nCount"](n);
    },
    ...mapMutations("count", ["inc", "incBy"]),
    ...mapActions("count", {
      incAsync: "inc",
    }),
  },
};
</script>
<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
