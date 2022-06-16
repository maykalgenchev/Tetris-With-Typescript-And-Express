<template>
  <div>
    <div>
      <p>Username</p>
      <input class="input" type="text" v-model="username" placeholder="Insert Username" />
    </div>

    <div>
      <p>Password</p>
      <input class="input" type="password" v-model="password" placeholder="Insert Password" />
    </div>

    <button :disabled="username.length < 1 || password.length < 1" @click="clickHandler">Login</button>
  </div>
</template>

<script lang="ts">
import { mapState, mapMutations } from 'vuex'
import Vue from 'vue'
export default Vue.extend({
    computed: {
    ...mapState([
      'showTetris',
      'player'
    ])},
  name: 'LoginForm',
  data () {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
      ...mapMutations([
      'SHOW_TETRIS'
    ]),
    clickHandler() {
      console.log(this.username)
      this.SHOW_TETRIS()
    }
  }
})
</script>
