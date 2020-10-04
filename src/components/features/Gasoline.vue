<template>
  <div v-show="canAccess">
    Gasoline:
    <div class="upgrade-list">
      <upgrade v-for="upgrade in upgrades" :key="upgrade.identifier" :upgrade="upgrade"></upgrade>
    </div>


    <div class="action-list">
      <gasoline-action v-for="action in availableActions" :key="action.description" :action="action">
      </gasoline-action>
    </div>
  </div>
</template>

<script>
import {App} from "@/App.ts";
import Upgrade from "@/components/Upgrade";
import GasolineAction from "@/components/GasolineAction";

export default {

  name: "Gasoline",
  components: {GasolineAction, Upgrade},
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
    },
    availableActions() {
      return this.gasoline.actions.filter(action => action.requirements.isCompleted());
    }
  }
}
</script>

<style scoped>

</style>
