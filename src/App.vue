<template>
  <div class="container">
    <wallet></wallet>
    <time-line></time-line>
    <scrap></scrap>
    <gasoline></gasoline>
    <lightning></lightning>
    <plutonium></plutonium>
    <credits></credits>
  </div>
</template>

<script>


import Wallet from "@/components/Wallet";
import Scrap from "@/components/features/Scrap";
import TimeLine from "@/components/features/TimeLine";
import Gasoline from "@/components/features/Gasoline";
import Lightning from "@/components/features/Lightning";
import Plutonium from "@/components/features/Plutonium";
import Credits from "@/components/Credits";
export default {

  components: {Credits, Plutonium, Lightning, Gasoline, TimeLine, Scrap, Wallet},

  methods: {}
}
</script>

<style>
</style>
