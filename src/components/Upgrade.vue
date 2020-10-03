<template>
  <button @click="buy" class="btn btn-primary" :class="{'disabled': !canBuy}">
    <p> {{ upgrade.displayName }} ({{ upgrade.getBonus(upgrade.level) }})</p>
    <div v-if="upgrade.isMaxLevel()">MAX</div>
    <div v-else>
      <currency :currency="cost"></currency>
      {{ upgrade.increasing ? '+' : '-' }}{{ Math.abs(upgrade.getUpgradeBonus()) | twoDigits }}
    </div>
  </button>
</template>

<script>
import {Upgrade} from "@/engine/upgrades/Upgrade.ts";
import Currency from "@/components/Currency.vue";

export default {
  name: "Upgrade",
  components: {
    'currency': Currency
  },
  props: {
    upgrade: {
      type: Upgrade,
      required: true
    }
  },

  methods: {
    buy() {
      this.upgrade.buy();
    }
  },

  computed: {
    cost() {
      return this.upgrade.getCost();
    },

    canBuy() {
      return this.upgrade.canBuy();
    }
  }

}
</script>

<style scoped>

</style>
