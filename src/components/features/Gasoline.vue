<template>
  <div v-show="canAccess">
    Gasoline:
    <boolean-setting :setting="autoConvertOilSetting"></boolean-setting>
    <button class="btn btn-primary" @click="gasoline.convertOil()">Convert {{ conversionCost }} Oil to
      {{ conversionGasolineGain }} Gasoline
    </button>

    <div class="speedup-list">
      <oil-speedup v-for="(speedup, index) in oilSpeedups" :key="speedup.label" :oil-speedup="speedup" :index="index">
      </oil-speedup>
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
import OilSpeedup from "@/components/OilSpeedup";

export default {

  name: "Gasoline",
  components: {OilSpeedup, BooleanSetting, GasolineAction},
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
    oilSpeedups() {
      return this.gasoline.oilSpeedups;
    },
    selectedOilSpeedupIndex() {
      return this.gasoline.selectedOilSpeedup;
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
