<template>
  <div v-show="canAccess">
    <h3>{{ lightningAmount | twoDigits }} Lightning, {{ boltAmount | twoDigits }} Bolts</h3>

    <div class="upgrade-list">
      <upgrade v-for="upgrade in upgrades" :key="upgrade.identifier" :upgrade="upgrade"></upgrade>
    </div>

    <h3>Convert</h3>
    <button class="btn btn-primary" @click="lightning.convertLightning()">Convert {{ conversionCost }} Lightning to
      {{ conversionBoltGain }} Bolts
      <boolean-setting :setting="autoConvertBoltsSetting" :show-description="true"></boolean-setting>

    </button>

    <div class="grid">
      <div class="row" v-for="(row, y) in grid" :key="'row-' + y">
        <div
            :class="{'tile-ready': tile.isReady}"
            @click="strike(x, y)" class="tile" v-for="(tile, x) in row" :key="'tile-'+x+'-'+y">
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import {App} from "@/App.ts";
import Upgrade from "@/components/Upgrade";
import {CurrencyType} from "@/engine/features/wallet/CurrencyType";
import BooleanSetting from "@/components/BooleanSetting";

export default {

  name: "Lightning",
  components: {BooleanSetting, Upgrade},
  data() {
    return {
      lightning: App.game.lightning,
      wallet: App.game.wallet,
      autoConvertBoltsSetting: App.game.settings.getSetting("auto-convert-bolts"),

    }
  },
  methods: {
    strike(x, y) {
      this.lightning.strike(x, y);
    }
  },

  computed: {
    canAccess() {
      return this.lightning.canAccess();
    },

    upgrades() {
      return this.lightning.upgrades.list;
    },
    grid() {
      return this.lightning.grid.grid;
    },
    lightningAmount() {
      return this.wallet.currencies[CurrencyType[CurrencyType.Lightning]];
    },
    boltAmount() {
      return this.lightning.bolts;
    },
    conversionBoltGain() {
      return this.lightning.conversionBoltGain();
    },
    conversionCost() {
      return this.lightning.conversionCost();
    }
  }
}
</script>

<style scoped>
.grid {
  display: flex;
  flex-direction: column;
}

.row {
  display: flex;
  flex-direction: row;
}

.tile {
  width: 25px;
  height: 25px;
  border: 1px solid black;
  cursor: pointer;
}

.tile-ready {
  background-color: saddlebrown;
}
</style>
