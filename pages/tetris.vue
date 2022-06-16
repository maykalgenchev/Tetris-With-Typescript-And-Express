<template>
  <TetrisGame />
</template>

<script lang="ts">
import Vue from 'vue'
import TetrisGame from '../components/TetrisGame.vue'

export default Vue.extend({
    name: "TetroPage",
    components: { TetrisGame }
})
</script>
