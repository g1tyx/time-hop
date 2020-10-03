<template>
  <div v-show="canAccess">
    Can access scraps
  </div>
</template>

<script>
import {App} from "@/App.ts";

export default {

  name: "Scrap",
  data() {
    return {
      scrap: App.game.scrap
    }
  },

  computed: {
    canAccess() {
      return this.scrap.canAccess();
    }
  }
}
</script>

<style scoped>

</style>
