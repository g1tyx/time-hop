<template>
  <div v-show="canAccess">
    Gasoline:
    <div class="upgrade-list">
      <upgrade v-for="upgrade in upgrades" :key="upgrade.identifier" :upgrade="upgrade"></upgrade>
    </div>
  </div>
</template>

<script>
import {App} from "@/App.ts";
import Upgrade from "@/components/Upgrade";

export default {

  name: "Gasoline",
  components: {Upgrade},
  data() {
    return {
      gasoline: App.game.gasoline
    }
  },
  methods: {},

  computed: {
    canAccess() {
      return this.gasoline.canAccess();
    },

    upgrades() {
      return this.gasoline.upgrades.list;
    }
  }
}
</script>

<style scoped>

</style>
