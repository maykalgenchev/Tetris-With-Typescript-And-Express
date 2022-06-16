<template >
    <div>
      <div class="temp" v-for="(row, index) in updateStage" :key="index">
        <tetris-cell  v-for="(cell, x) in row" :key="x" :type="cell[0]"/>
      </div>
    <div class="miniStagePos">
      <div class="miniStage" v-for="(row, index) in miniStage" :key="index">
        <tetris-cell  v-for="(cell, x) in row" :key="x" :type="cell[0]"/>
      </div>
    </div>
    </div>
</template>

<script lang="ts">
import TetrisCell from './TetrisCell.vue'
import { mapState } from 'vuex'

export default {
  components: {
    TetrisCell
  },

  computed: {
    ...mapState(['stage', 'miniStage'])
  }
}
</script>

<style>
    .temp{
        display: flex;
        flex-wrap: wrap;
        width: 400px;
        max-height: 600px;
        background-color: black;
    }
        .miniStagePos{
        position:absolute;left:500px;top:0;width:200px;height:200px;
        width: 200px;
        max-height: 600px;
        background-color: black;
    }
    .miniStage{
        display: flex;
        flex-wrap: wrap;
    }
</style>
