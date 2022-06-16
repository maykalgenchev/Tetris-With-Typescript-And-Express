<template>
  <div>
  <tetris-game v-if="showTetris" />
  <login-form  v-else/>
  </div>
</template>

<script lang="ts">
import {  mapState } from 'vuex'
import Vue from 'vue'
import LoginForm from '~/components/LoginForm.vue'
import TetrisGame from '~/components/TetrisGame.vue'

export default Vue.extend({
  components: { LoginForm, TetrisGame },
  computed: {
    ...mapState([
      'showTetris'
    ])
  },
  name: 'IndexPage'
})
</script>
