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
        <credits></credits>
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

export default {

  components: {Credits, Lightning, Gasoline, TimeLine, Scrap},

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
