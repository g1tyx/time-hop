<template>
  <button @click="buy" class="btn btn-primary" data-progress-style="fill-back" :disabled="!canBuy">
    <p>{{ action.description }} ({{ this.action.oilReward() }} oil/s)</p>
    <div class="progress">
      <div class="progress-bar" role="progressbar" :aria-valuenow="action.percentage * 100"
           :style="{'width': action.percentage * 100 + '%'}" aria-valuemin="0" aria-valuemax="100"></div>
    </div>



      <div v-if="upgrade.isMaxLevel()">MAX</div>
      <div v-else>
        <div v-if="upgrade.maxLevel !== 1">
          <currency :currency="upgrade.getCost()"></currency>
          Level {{ upgrade.getBonus(upgrade.level)}}
        </div>
      </div>
  </button>


</template>

<script>
import {GasolineAction} from "@/game/features/gasoline/GasolineAction";
import {App} from "@/App.ts";
import Currency from "@/components/Currency";

export default {
  name: "GasolineAction",
  components: {Currency},
  props: {
    action: {
      type: GasolineAction,
      required: true
    },
  },
  computed: {
    upgrade() {
      return App.game.gasoline.gasolineUpgrades.getUpgrade(this.action.valueUpgrade)
    },
    cost() {
      return this.upgrade.getCost();
    },

    canBuy() {
      return this.upgrade.canBuy();
    }
  },

  methods: {
    buy() {
      this.upgrade.buy();
    }
  },


}
</script>

<style scoped>
.progress-bar {
  transition: none;
}

.progress {
  margin-bottom: 0;
}
</style>
