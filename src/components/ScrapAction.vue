<template>
  <button @click="start" class="btn btn-primary">
   {{action.description}} {{action.percentage}}
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

</style>
