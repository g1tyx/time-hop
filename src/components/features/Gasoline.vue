<template>
  <div v-show="canAccess">
    Gasoline:
    <boolean-setting :setting="autoConvertOilSetting"></boolean-setting>
    <button class="btn btn-primary" @click="gasoline.convertOil()">Convert {{ conversionCost }} Oil to {{conversionGasolineGain}} Gasoline</button>
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
import BooleanSetting from "@/components/BooleanSetting";

export default {

  name: "Gasoline",
  components: {BooleanSetting, GasolineAction, Upgrade},
  data() {
    return {
      gasoline: App.game.gasoline,
      autoConvertOilSetting: App.game.settings.getSetting("auto-convert-oil"),
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
    },
    conversionCost() {
      return this.gasoline.conversionCost();
    },
    conversionGasolineGain() {
      return this.gasoline.conversionGasolineGain();
    }
  }
}
</script>

<style scoped>

</style>
