<template>
  <div role="button" class="parentDiv" tabindex="0" @keydown="move">
    <gameover-window v-show="gameOver || !playing" />
    <!-- <tetris-stage :stage="updateStage"/> -->
       <div class="temp" v-for="(row, index) in updateStage" :key="index">
        <tetris-cell  v-for="(cell, x) in row" :key="x" :type="cell[0]" :test="cell[1]"/>
      </div>
      <div>
        <h3 class="title">Score</h3>
        <tetris-display :text="Number(rowsCleared) * 100" />
        <tetris-buttons />
      </div>
      <div class="miniStagePos">
        <div class="miniStage" v-for="(row, index) in updateMiniStage" :key="index">
          <tetris-cell  v-for="(cell, x) in row" :key="x" :type="cell[0]"/>
        </div>
      </div>
  </div>
</template>

<script lang="ts">
import * as TetroService from '../../server/services/TetroService'
import TetrisStage from './TetrisStage.vue'
import TetrisDisplay from './TetrisDisplay.vue'
import TetrisButtons from './TetrisButtons.vue'
import TetrisCell from './TetrisCell.vue'
import GameoverWindow from './GameoverWindow.vue'
import { mapActions, mapState, mapGetters, mapMutations } from 'vuex'
import Vue from 'vue'



export default Vue.extend({
  name: 'TetrisGame',
  computed: {
    ...mapState([
      'player',
      'stage',
      'gameOver',
      'rowsCleared',
      'playing',
      'miniStage'
    ]),
    ...mapGetters([
        'updateStage',
        'updateMiniStage'
    ]),
  },

  methods: {
    ...mapMutations([
      'UPDATE_POS',
      'GAME_OVER',
      'IS_PLAYING',
      'SET_TETRO',
      'SET_NEXT_TETRO'
    ]),
    ...mapActions([
      'playerRotate',
      'setStageWhenMerged',
      'updatePositionVertical',
      'updatePositionHorizontal'
    ]),
    move ({ keyCode }: {keyCode: number}) {
      if (!this.gameOver) {
        if (keyCode === 37) {
          this.updatePositionHorizontal(-1)
        } else if (keyCode === 39) {
          this.updatePositionHorizontal(1)
        } else if (keyCode === 40) {
          this.updatePositionVertical()
        } else if (keyCode === 38 && this.playing) {
          this.playerRotate({ dir: 1})
        }
      }
    }
    
  },
  mounted: function() {
    TetroService.getTetro()
      .then(result => this.SET_TETRO(result))
    TetroService.getTetro()
      .then(result => this.SET_NEXT_TETRO(result))
  },
  components: {
    TetrisStage,
    TetrisDisplay,
    TetrisButtons,
    TetrisCell,
    GameoverWindow
  }
})
</script>

<style>
    .temp{
        display: flex;
        flex-wrap: wrap;
        width: 400px;
        max-height: 600px;
        background-color: black;
    }
    .parentDiv{
      position: relative;

    }
    .title{
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
