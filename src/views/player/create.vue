<template>
  <player-detail :is-edit="false"></player-detail>
</template>

<script>
import PlayerDetail from "./components/player-detail.vue";

export default {
  components: {
    PlayerDetail,
  },
};
</script>
