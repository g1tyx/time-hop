<template>
  <div v-show="canAccess">
    <div>
    <div style="display: flex; justify-content: center;">
      <credits></credits>

    </div>
    </div>
  </div>
</template>

<script>
import {App} from "@/App.ts";
import Upgrade from "@/components/Upgrade";
import Credits from "@/components/Credits";

export default {

  name: "Plutonium",
  components: {Credits},
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
