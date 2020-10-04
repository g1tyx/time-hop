<template>
  <div>I am a timeline
    <button @click="timeTravel" :disabled="!canTimeTravel">
      Time travel
    </button>
  </div>
</template>

<script>
import {App} from "@/App.ts";

export default {

  name: "TimeLine",
  data() {
    return {
      timeLine: App.game.timeLine
    }
  },

  methods: {
    timeTravel() {
      this.timeLine.timeTravel();
    }
  },
  computed: {
    canTimeTravel() {
      return this.timeLine.canTimeTravel();
    }
  }
}
</script>

<style scoped>

</style>
