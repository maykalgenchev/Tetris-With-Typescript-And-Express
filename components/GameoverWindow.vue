<template>
    <transition name="modal">
        <div class="modal-mask">
          <div class="modal-wrapper">
            <div class="modal-container">
              <div class="modal-body">
                <div v-if="gameOver">
                <slot name="body">
                  <p>Game Over</p>
                  <p>Your score: {{Number(rowsCleared) * 100}}</p>
                </slot>
                <button class="modal-btn" @click="resetPlay">
                    Try again
                </button>
                </div>
                <div v-else-if="!playing">
                <slot name="body">
                  <p>Game is paused</p>
                </slot>
                <button class="modal-btn" @click="showStage">
                    Resume
                </button>
                </div>
              </div>
            </div>
          </div>
        </div>
    </transition>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex'
export default {
  name: 'PopupWindow',
  computed: {
    ...mapState([
      'stage',
      'gameOver',
      'rowsCleared',
      'playing'
    ])
  },
  methods: {
    ...mapMutations([
      'RESET_GAME',
      'GAME_OVER',,
      'IS_PLAYING',
    ]),
        ...mapActions([
      'resetGame',
    ]),
    showStage () {
      this.GAME_OVER(false)
      this.IS_PLAYING(true)
    },
    resetPlay () {
      this.resetGame()
      this.IS_PLAYING(true)
    }
  }
}
</script>

<style>
  .btn{
    margin: 20px;
    padding: 10px;
  }
  .modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 300px;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-body {
  margin: 20px 0;
}

.modal-default-button {
  float: right;
}

  .modal-btn{
       display: flex;
       margin: 0 0 20px 0;
       padding: 20px;
       min-height: 30px;
       width: 70%;
       border-radius: 20px;
       border: none;
       color: white;
       background: #333;
       font-size: 1rem;
       text-align: center;
  }

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}

</style>
