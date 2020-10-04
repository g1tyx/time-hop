<template>
  <button class="btn btn-primary" data-progress-style="fill-back" :disabled="action.isStarted">
    {{ action.description }}
    (+{{ this.action.gasolineReward() }})
    <div class="progress">
      <div class="progress-bar" role="progressbar" :aria-valuenow="action.percentage * 100"
           :style="{'width': action.percentage * 100 + '%'}" aria-valuemin="0" aria-valuemax="100"></div>
    </div>
  </button>


</template>

<script>
import {GasolineAction} from "@/game/features/gasoline/GasolineAction";

export default {
  name: "GasolineAction",
  props: {
    action: {
      type: GasolineAction,
      required: true
    }
  },

  methods: {},


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
