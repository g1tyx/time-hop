<template>
  <div>
    <p v-show="timeLine.canAccessScrap">Scrap: {{ scrap }}</p>
    <p v-show="timeLine.canAccessGasoline">Gasoline: {{ gasoline }}</p>
    <p v-show="timeLine.canAccessLightning">Lightning: {{ lightning }}</p>
    <p v-show="timeLine.canAccessPlutonium">Plutonium: {{ plutonium }}</p>
  </div>
</template>

<script>

import {App} from "@/App.ts";
import {CurrencyType} from "@/engine/features/wallet/CurrencyType";

export default {
  name: "Wallet",

  data: function () {
    return {
      wallet: App.game.wallet,
      timeLine: App.game.timeLine,
    }
  },

  computed: {
    scrap() {
      return this.wallet.currencies[CurrencyType[CurrencyType.Scrap]];
    },
    gasoline() {
      return this.wallet.currencies[CurrencyType[CurrencyType.Gasoline]];
    },
    lightning() {
      return this.wallet.currencies[CurrencyType[CurrencyType.Lightning]];
    },
    plutonium() {
      return this.wallet.currencies[CurrencyType[CurrencyType.Plutonium]];
    }
  }

}
</script>

<style scoped lang="scss">
@import '../index';

div {
  background-color: white;
  color: $primary-color
}
</style>
