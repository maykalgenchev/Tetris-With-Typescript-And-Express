// import { randomTetromino } from '../tetrominos'
import { GetterTree, ActionTree, MutationTree } from 'vuex'
import { checkCollision, createStage, createMiniStage, deepCopyFunction, rotate } from '../gameHelpers'
import * as MoveService from '../../server/services/MoveService'
import * as TetroService from '../../server/services/TetroService'

 export const state = () => ({
    stage: createStage() as (string | number)[][][],
    miniStage: createMiniStage() as (string | number)[][][],
    nextTetro: [[]],
    player: {
      pos: { x: 4, y: 0 } as {x: number, y: number},
      tetromino: [[]] as (string | number)[][],
      collided: false as boolean
    },
    gameOver: false as boolean,
    playing: true as boolean,
    rowsCleared: 0 as number,
    x: 0 as number,
    y: 0 as number,
    showTetris: false as boolean
  })
  
  export type RootState = ReturnType<typeof state>

  export const getters: GetterTree<RootState, RootState> = {
    updateStage: (state: RootState) => {
        let newStage = state.stage.map(row =>
          row.map(cell => (cell[1] === 'clear' ? [cell[0], 'clear'] : cell))
        )

        state.player.tetromino.forEach((row, y) => {
          row.forEach((type, x) => {
            if (type !== 0) {
              newStage[y + state.player.pos.y][x + state.player.pos.x] = [
                type,
                `${state.player.collided ? 'merged' : 'clear'}`
              ]

            }
          })
        })

        return newStage
      },
      updateMiniStage: (state: RootState) => {
        const newStage = state.miniStage.map(row =>
          row.map(cell => (cell[1] === 'clear' ? [0, 'clear'] : cell))
        )
        state.nextTetro.forEach((row, y) => {
          row.forEach((type, x) => {
            if (type !== 0) {
              newStage[y + 1][x + 1] = [
                type,
                `${state.player.collided ? 'merged' : 'clear'}`
              ]
            }
          })
        })
        return newStage
      }
  }

  export const mutations: MutationTree<RootState> = {
    SHOW_TETRIS(state: RootState){
      state.showTetris = true
    },
    SET_PLAYER (state: RootState, newPlayer: RootState["player"]) {
      state.player = newPlayer
    },
    SET_TETRO (state: RootState, tetro) {
      state.player.tetromino = tetro
    },
    SET_NEXT_TETRO (state: RootState, tetro) {
      state.nextTetro = tetro
    },
    CLEAR_ROWS(state: RootState){
      state.rowsCleared = 0
    },
    REFRESH_STAGE(state: RootState){
      state.stage = createStage()
    },
    ROWS_INCREMENT (state: RootState){
      state.rowsCleared += 1
    },
    PLAYER_ROTATE(state: RootState, clonedPlayer: RootState["player"]){
      state.player = {...clonedPlayer}
    },
    SET_STAGE(state: RootState, newStage: RootState["stage"]){
      state.stage = newStage
    },
    GAME_OVER (state: RootState, bool: boolean){
      state.gameOver = bool
    },      
    IS_PLAYING (state: RootState, bool: boolean){
      state.playing = bool
    },
    // NEW_STAGE_SPLICE(state: RootState, {newStage, indexForSweep}){
    //   newStage.splice(indexForSweep, 1)
    //   return newStage
    // },
    // NEW_STAGE_UNSHIFT(state: RootState, newStage){
    //   newStage.unshift(new Array(newStage[0].length).fill([0, 'clear']))
    //   return newStage
    // }
  }

export const actions: ActionTree<RootState, RootState> = {
  resetGame({commit}: {commit: any, state: any}){
    commit('GAME_OVER', false)
    commit('CLEAR_ROWS')
    commit('REFRESH_STAGE')
  },
  sweepRows ({commit, state}: {commit: any, state: any, getters: any}) {
    // const newStage: RootState["stage"] = [...state.stage]
    // newStage.reduce((ack: (string | number)[][], row: (string|number)[][], indexForSweep): any => {  
    //   // if (row.findIndex(cell => cell[0] === 0) === -1) {
    //   if(row.every(cell => cell[0] !== 0)) {
    //     // const indexForSweep = newStage.indexOf(row)
    //     newStage.splice(indexForSweep, 1)
    //     newStage.unshift(new Array(newStage[0].length).fill([0, 'clear']))
    //     // commit('NEW_STAGE_SPLICE', {newStage, indexForSweep})
    //     commit('ROWS_INCREMENT')
    //     // commit('NEW_STAGE_UNSHIFT', newStage)
    //   }
    // })
    const newStage: RootState["stage"] = state.stage.reduce((ack: (string | number)[][][], row: (string|number)[][]): (string | number)[][][] => {  
      row.some(cell => cell[0] === 0) ? ack.push(row) : commit('ROWS_INCREMENT')
      // if(row.some(cell => cell[0] === 0)) 
      //   ack.push(row)
      // else 
      //   commit('ROWS_INCREMENT')

      return ack
    }, [] as RootState["stage"])
    while(newStage.length < 15)
      newStage.unshift(new Array(newStage[0].length).fill([0, 'clear']))

    commit('SET_STAGE', newStage)
  },
  playerRotate ({commit, state}: {commit: any, state: RootState}, {dir}: { dir: number} ) {
    const clonedPlayer: RootState["player"] = deepCopyFunction(state.player)
    clonedPlayer.tetromino = rotate(clonedPlayer.tetromino, dir)

    const pos: number = clonedPlayer.pos.x
    let offset = 1
    while (checkCollision(clonedPlayer, state.stage, 0, 0)) {
      clonedPlayer.pos.x += offset
      offset = -(offset + (offset > 0 ? 1 : -dir))
      if (offset > clonedPlayer.tetromino[0].length) {
        rotate(clonedPlayer.tetromino, -1)
        clonedPlayer.pos.x = pos
        return
      }
    }
    MoveService.moveService({direction: 'rotated'})
    commit('PLAYER_ROTATE', clonedPlayer)
  },
  setStageWhenMerged({commit, getters, state, dispatch}: {commit: any, getters: any, state: RootState, dispatch: any}){
    if (state.player.collided) {
      if (state.gameOver !== true) {
        TetroService.getTetro()
          .then(result => commit('SET_NEXT_TETRO', result))// "Some User token"
        commit('SET_STAGE', getters.updateStage)
        dispatch('sweepRows')
        commit('SET_PLAYER',  {
          pos: { x: 4, y: 0 },
          tetromino: state.nextTetro,
          collided: false
        })
        MoveService.moveService({direction: 'merged'})
      }
    }
  },
  updatePositionHorizontal ({commit, state}: {commit: any, state: RootState}, dir) {
  if (state.playing) {
    if (!checkCollision(state.player, state.stage, dir, 0)) {
      commit('SET_PLAYER', {
        pos: { x: state.player.pos.x + dir, y: state.player.pos.y },
        tetromino: state.player.tetromino,
        collided: false
      })
      let x: string = dir === 1 ? 'right' : 'left'
      MoveService.moveService({direction: x})
    }
  }
 },
 updatePositionVertical ({commit, state, dispatch}: {commit: any, state: RootState, dispatch: any}) {
  if (state.playing) {
    if (!checkCollision(state.player, state.stage, 0, 1 )) {
      commit('SET_PLAYER', {
        pos: { x: state.player.pos.x, y: state.player.pos.y + 1 },
        tetromino: state.player.tetromino,
        collided: false
      })
      MoveService.moveService({direction: 'down'})
    } else {
      if (state.player.pos.y < 1) {
        commit('GAME_OVER', true)
        commit('IS_PLAYING', false)
      } else{
        commit('SET_PLAYER', {
          pos: { x: state.player.pos.x, y: state.player.pos.y },
          tetromino: state.player.tetromino,
          collided: true
        } )
        dispatch('setStageWhenMerged')
        }
      }
    }
 }
}
