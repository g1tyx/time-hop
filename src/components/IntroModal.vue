<template>
  <modal name="intro" class="test">
    <div class="text">
      <br>
      <br>
      <h3>Uh Oh. Your time machine has broken down.</h3>
      <br>
      <h4>To properly fix it, you need to travel all the way back to the past.</h4>
      <h4>I doubt it will be strong enough once we repair it with some Scrap metal.</h4>
      <h4>Maybe you can go far enough to gain more materials?</h4>
    </div>
  </modal>
</template>

<script>
export default {
  name: 'IntroModal',
  mounted() {
    this.$modal.show('intro')
  }
}
</script>
<style scoped lang="scss">
@import "./src/index.scss";

.text {
  text-align: center;
}

.test {
  color: $primary-color;

}


h1, h2, h3, h4, h5, h6 {
  color: black
}
</style>
