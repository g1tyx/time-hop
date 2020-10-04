<template>
  <button @click="start" class="btn btn-primary" data-progress-style="fill-back" :disabled="action.isStarted">
    {{ action.description }}
    (+{{ this.action.scrapReward() }})
    <div class="progress">
      <div class="progress-bar" role="progressbar" :aria-valuenow="action.percentage * 100"
           :style="{'width': action.percentage * 100 + '%'}" aria-valuemin="0" aria-valuemax="100"></div>
    </div>
  </button>


</template>

<script>
import {ScrapAction} from "@/game/features/scrap/ScrapAction";

export default {
  name: "ScrapAction",
  props: {
    action: {
      type: ScrapAction,
      required: true
    }
  },

  methods: {
    start() {
      this.action.start();
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
