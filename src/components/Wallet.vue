<template>
  <div>
    <p v-show="scrap > 0 || gasoline > 0 || lightning > 0 || plutonium > 0">Scrap: {{ scrap }}</p>
    <p v-show="gasoline > 0 || lightning > 0 || plutonium > 0">Gasoline: {{ gasoline }}</p>
    <p v-show="lightning > 0 || plutonium > 0">Lightning: {{ lightning }}</p>
    <p v-show="plutonium > 0">Plutonium: {{ plutonium }}</p>
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
