<template>
  <div class="container">
    <wallet></wallet>
    <time-line></time-line>
    <scrap></scrap>
  </div>
</template>

<script>


import Wallet from "@/components/Wallet";
import Scrap from "@/components/features/Scrap";
import TimeLine from "@/components/features/TimeLine";
export default {

  components: {TimeLine, Scrap, Wallet},

  methods: {}
}
</script>

<style>
</style>
