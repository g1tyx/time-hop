<template>
  <div v-show="canAccess">
    Lightning:
    <div class="upgrade-list">
      <upgrade v-for="upgrade in upgrades" :key="upgrade.identifier" :upgrade="upgrade"></upgrade>
    </div>
  </div>
</template>

<script>
import {App} from "@/App.ts";
import Upgrade from "@/components/Upgrade";

export default {

  name: "Lightning",
  components: {Upgrade},
  data() {
    return {
      lightning: App.game.lightning
    }
  },
  methods: {},

  computed: {
    canAccess() {
      return this.lightning.canAccess();
    },

    upgrades() {
      return this.lightning.upgrades.list;
    }
  }
}
</script>

<style scoped>

</style>
