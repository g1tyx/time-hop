<template>
  <div v-if="canAccess">

    <h3>{{ oilAmount }} Oil, {{ gasolineAmount }} Gasoline</h3>

    <h3>Machines</h3>
    <div class="action-list">
      <gasoline-action v-for="action in availableActions" :key="action.description" :action="action">
      </gasoline-action>
    </div>

    <div v-if="canConvert">
      <h3>Convert</h3>
      <button class="btn btn-primary" @click="gasoline.convertOil()">Convert {{ conversionCost }} Oil to
        {{ conversionGasolineGain }} Gasoline
        <boolean-setting :setting="autoConvertOilSetting" :show-description="true"></boolean-setting>

      </button>
    </div>
    <h3>Upgrades</h3>
    <div class="oil-upgrades-list">
      <upgrade v-for="upgrade in oilUpgrades" :key="upgrade.identifier" :upgrade="upgrade">

      </upgrade>
    </div>


    <div v-if="oilSpeedupCount > 1">
      <h3>Grease those machines!</h3>
      <div class="speedup-list">
        <oil-speedup v-for="(_, index) in oilSpeedupCount" :key="oilSpeedups[index].label"
                     :oil-speedup="oilSpeedups[index]" :index="index">
        </oil-speedup>
      </div>
    </div>


  </div>
</template>

<script>
import {App} from "@/App.ts";
import Upgrade from "@/components/Upgrade";
import GasolineAction from "@/components/GasolineAction";
import BooleanSetting from "@/components/BooleanSetting";
import OilSpeedup from "@/components/OilSpeedup";
import {SingleLevelUpgrade} from "@/engine/upgrades/SingleLevelUpgrade";
import {CurrencyType} from "@/engine/features/wallet/CurrencyType";

export default {

  name: "Gasoline",
  components: {Upgrade, OilSpeedup, BooleanSetting, GasolineAction},
  data() {
    return {
      gasoline: App.game.gasoline,
      autoConvertOilSetting: App.game.settings.getSetting("auto-convert-oil"),
      wallet: App.game.wallet,
    }
  },
  methods: {},

  computed: {
    canAccess() {
      return this.gasoline.canAccess();
    },

    oilUpgrades() {
      return this.gasoline.oilUpgrades.list;
    },
    availableActions() {
      return this.gasoline.actions.filter(action => action.requirements.isCompleted());
    },
    oilSpeedupCount() {
      return 1 + this.gasoline.oilUpgrades.getUpgrade("gasoline-unlock-oil-speedup").level;
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
    canConvert() {
      return this.gasoline.oilUpgrades.getUpgrade("gasoline-conversion-value").level > 0;
    },
    conversionGasolineGain() {
      return this.gasoline.conversionGasolineGain();
    },
    oilAmount() {
      return this.wallet.currencies[CurrencyType[CurrencyType.Oil]];
    },
    gasolineAmount() {
      return this.wallet.currencies[CurrencyType[CurrencyType.Gasoline]];
    }
  }
}
</script>

<style scoped>

</style>
