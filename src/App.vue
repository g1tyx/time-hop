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
  </div>
</template>

<script>


import Scrap from "@/components/features/Scrap";
import TimeLine from "@/components/features/TimeLine";
import Gasoline from "@/components/features/Gasoline";
import Lightning from "@/components/features/Lightning";
import Credits from "@/components/Credits";
import Plutonium from "@/components/features/Plutonium";

export default {

  components: {Plutonium, Lightning, Gasoline, TimeLine, Scrap},

  methods: {}
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
