<template>
  <div v-show="canAccess">
    <button @click="dig">Get Scraps (+{{scrapGainManual}})</button>

    <div class="upgrade-list">
      <upgrade v-for="upgrade in upgrades" :key="upgrade.identifier" :upgrade="upgrade"></upgrade>
    </div>
  </div>
</template>

<script>
import {App} from "@/App.ts";
import Upgrade from "@/components/Upgrade";

export default {

  name: "Scrap",
  components: {Upgrade},
  data() {
    return {
      scrap: App.game.scrap
    }
  },
  methods: {
    dig() {
      this.scrap.digForScraps();
    }
  },

  computed: {
    canAccess() {
      return this.scrap.canAccess();
    },
    scrapGainManual() {
      return this.scrap.scrapGainManual();
    },

    upgrades() {
      return this.scrap.upgrades.list;
    }
  }
}
</script>

<style scoped>

</style>
