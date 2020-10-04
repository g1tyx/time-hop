<template>

  <div v-show="canAccess">
    Plutonium:
    <div class="upgrade-list">
      <upgrade v-for="upgrade in upgrades" :key="upgrade.identifier" :upgrade="upgrade"></upgrade>
    </div>
  </div>
</template>

<script>
import {App} from "@/App.ts";
import Upgrade from "@/components/Upgrade";

export default {

  name: "Plutonium",
  components: {Upgrade},
  data() {
    return {
      plutonium: App.game.plutonium
    }
  },
  methods: {

  },

  computed: {
    canAccess() {
      return this.plutonium.canAccess();
    },

    upgrades() {
      return this.plutonium.upgrades.list;
    }
  }
}
</script>

<style scoped>

</style>
