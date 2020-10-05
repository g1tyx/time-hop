<template>
  <div class="container" v-if="canAccess">
    <h3>{{ scrapAmount | twoDigits }} Scrap</h3>
    <div class="upgrade-list">
      <upgrade v-for="upgrade in upgrades" :key="upgrade.identifier" :upgrade="upgrade"></upgrade>
    </div>
    <div class="action-list">
      <scrap-action v-for="action in availableActions" :key="action.description" :action="action">
      </scrap-action>
    </div>
  </div>
</template>

<script>
import {App} from "@/App.ts";
import Upgrade from "@/components/Upgrade";
import ScrapAction from "@/components/ScrapAction";
import {CurrencyType} from "@/engine/features/wallet/CurrencyType";

export default {

  name: "Scrap",
  components: {ScrapAction, Upgrade},
  data() {
    return {
      statistic: App.game.statistics,
      scrap: App.game.scrap,
      wallet: App.game.wallet,
    }
  },
  methods: {},

  computed: {
    canAccess() {
      return this.scrap.canAccess();
    },

    upgrades() {
      return this.scrap.upgrades.list;
    },
    availableActions() {
      return this.scrap.actions.filter(action => action.requirements.isCompleted());
    },
    scrapAmount() {
      return this.wallet.currencies[CurrencyType[CurrencyType.Scrap]];
    }
  }
}
</script>

<style scoped>
.container {
  border: 1px solid black;
  padding: 20px;
}

</style>
