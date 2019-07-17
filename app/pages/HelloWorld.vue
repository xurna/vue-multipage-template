<template>
  <div class="hello">
    <router-link to="/user">
      <img src="~img/logo.png">
    </router-link>
    <HelloWord :msg="msg"></HelloWord>
    <h2>Essential Links</h2>
    <ul>
      <li>
        <a href="https://vuejs.org" target="_blank">Core Docs</a>
      </li>
      <li>
        <a href="https://forum.vuejs.org" target="_blank">Forum</a>
      </li>
      <li>
        <a href="https://chat.vuejs.org" target="_blank">Community Chat</a>
      </li>
      <li>
        <a href="https://twitter.com/vuejs" target="_blank">Twitter</a>
      </li>
      <br>
      <li>
        <a href="http://vuejs-templates.github.io/webpack/" target="_blank">Docs for This Template</a>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios'
import HelloWord from 'cmp/Hello'
export default {
  name: 'HelloWorld',
  data() {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  components: {
    HelloWord,
  },
  created() {
  },
  methods: {
    setMsg() {
      this.msg = 'hello world'
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
@import "~less/variables";
.hello {
  margin-top: 20px;
}
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
  a {
    color: #42b983;
  }
}
</style>
