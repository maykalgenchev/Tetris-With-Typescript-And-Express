// // import * as TetroService from '../server/services/TetroService.ts'

// export const TETROMINOS: {[char: string]: (string | number)[][]} = {
//     I: [
//         [0, 'I', 0, 0],
//         [0, 'I', 0, 0],
//         [0, 'I', 0, 0],
//         [0, 'I', 0, 0]
//       ],
//     J: [
//         [0, 'J', 0],
//         [0, 'J', 0],
//         ['J', 'J', 0]
  
//       ],
//     L: [
//         [0, 'L', 0],
//         [0, 'L', 0],
//         [0, 'L', 'L']
//       ],
//     O: [
//         ['O', 'O'],
//         ['O', 'O']
//       ],
//     S: [
//         [0, 'S', 'S'],
//         ['S', 'S', 0],
//         [0, 0, 0]
//       ],
//     T: [
//         ['T', 'T', 'T'],
//         [0, 'T', 0],
//         [0, 0, 0]
//       ],
//     Z: [
//         ['Z', 'Z', 0],
//         [0, 'Z', 'Z'],
//         [0, 0, 0]
//       ]
//   }
  
  // export function randomTetromino () {
  //   const tetrominos: string = 'IJLOSTZ'
  //   const randomTetro: string = tetrominos[Math.floor(Math.random() * tetrominos.length)]
  //   const result: (string | number)[][] = TETROMINOS[randomTetro]
  //   return result

  // }