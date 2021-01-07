<template>
  <player-detail :is-edit="true"></player-detail>
</template>

<script>
import PlayerDetail from "./components/player-detail.vue";

export default {
  components: {
    PlayerDetail,
  },
};
</script>
