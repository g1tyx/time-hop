<template>
  <div>I am a timeline</div>
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

  computed: {

  }
}
</script>

<style scoped>

</style>
