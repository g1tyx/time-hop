<template>
  <div>
    <p>Scrap: {{ scrap }}</p>
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
