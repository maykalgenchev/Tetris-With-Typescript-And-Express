<template>
  <div class="display">
      {{text}}
  </div>
</template>

<script lang="ts">

export default {
  name: 'tetrisCell',
  props: ['text']
}
</script>

<style>
    .display{
       box-sizing: border-box;
       display: flex;
       align-items: center;
       margin: 0 0 20px 0;
       padding: 20px;
       border: 4px solid #333;
       min-height: 30px;
       width: 20%;
       border-radius: 20px;
    }
</style>
