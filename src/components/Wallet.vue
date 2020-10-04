<template>
  <div>
    <p>Scrap: {{ scrap }}</p>
    <p>Gasoline: {{ gasoline }}</p>
    <p>Lightning: {{ lightning }}</p>
    <p>Plutonium: {{ plutonium }}</p>
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
