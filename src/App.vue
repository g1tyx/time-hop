<template>
  <div class="container">
    <time-line></time-line>
    <div class="column">
      <div class="row">
        <lightning></lightning>
      </div>
      <div class="row">
        <gasoline></gasoline>
      </div>
      <div class="row">
        <scrap></scrap>
      </div>
      <div class="row">
        <plutonium></plutonium>
      </div>
    </div>

    <intro-modal></intro-modal>

  </div>
</template>

<script>


import Scrap from "@/components/features/Scrap";
import TimeLine from "@/components/features/TimeLine";
import Gasoline from "@/components/features/Gasoline";
import Lightning from "@/components/features/Lightning";
import Plutonium from "@/components/features/Plutonium";
import IntroModal from "@/components/IntroModal";

export default {

  components: {IntroModal, Plutonium, Lightning, Gasoline, TimeLine, Scrap},

  methods: {},

  mounted() {
    this.$modal.show('example')

  }
}
</script>

<style>
.column {
  display: flex;
  flex-direction: column;
}

.row {
  display: flex;
  flex-direction: row;
}
</style>
