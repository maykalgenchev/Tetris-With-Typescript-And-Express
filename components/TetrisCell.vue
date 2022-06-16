<template>
  <div class="cell" :class="type"></div>
</template>

<script lang="ts">
export default {
  name: 'tetrisCell',
  props: ['type', 'test']
}
</script>

<style scoped>
  .cell {
    flex-wrap: wrap;
    position: relative;
    width: 40px;
    height: 40px;
    box-sizing: border-box;
    border-style: outset;
    border-width: 3px;
    border-top-color: rgba(255, 255, 255, 0.3);
    border-left-color: rgba(255, 255, 255, 0.3);
  }
  .cell.I {
    background-color: cyan;
    border-right-color: cyan;
    border-bottom-color: cyan;
  }
  .cell.O {
    background-color: yellow;
    border-right-color: yellow;
    border-bottom-color: yellow;
  }
  .cell.T {
    background-color: magenta;
    border-right-color: magenta;
    border-bottom-color: magenta;
  }
  .cell.S {
    background-color: lime;
    border-right-color: lime;
    border-bottom-color: lime;
  }
  .cell.Z {
    background-color: red;
    border-right-color: red;
    border-bottom-color: red;
  }
  .cell.J {
    background-color: blue;
    border-right-color: blue;
    border-bottom-color: blue;
  }
  .cell.L {
    background-color: orange;
    border-right-color: orange;
    border-bottom-color: orange;
  }
</style>
