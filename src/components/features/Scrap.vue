<template>
  <div v-if="canAccess">
    <h3>{{ scrapAmount }} Scrap</h3>
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
      scrapAmount: App.game.wallet.currencies[CurrencyType[CurrencyType.Scrap]],
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
    }
  }
}
</script>

<style scoped>

</style>
