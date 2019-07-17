<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
  </div>
</template>

<script>
export default {
  name: 'Hello',
  props: {
    msg: String,
  },
  data() {
    return {
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
@import "~less/variables";
h1,
h2 {
  font-weight: normal;
  color: @red;
}
</style>
