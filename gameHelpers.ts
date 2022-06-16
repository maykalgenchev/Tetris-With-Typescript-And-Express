import { RootState, state } from './store'

export const STAGE_WIDTH = 10
export const STAGE_HEIGHT = 15

export const createStage = () => Array.from(Array(STAGE_HEIGHT), () =>
  Array.from(Array(STAGE_WIDTH), () => ([0, 'clear']))
)

export const createMiniStage = () => Array.from(Array(5), () =>
  Array.from(Array(5), () => ([0, 'clear']))
)

export const checkCollision = (player: RootState["player"], stage: RootState["stage"], moveX: number, moveY: number) => {
  for (let y = 0; y < player.tetromino.length; y += 1) {
    for (let x = 0; x < player.tetromino[y].length; x += 1) {
      if (player.tetromino[y][x] !== 0) {
        if (!stage[y + player.pos.y + moveY] ||
          !stage[y + player.pos.y + moveY][x + player.pos.x + moveX] ||
          stage[y + player.pos.y + moveY][x + player.pos.x + moveX][1] !== 'clear') {
          return true
        }
      }
    }
  }
}

export const deepCopyFunction = (inObject: any) => {
  let outObject:  any
  let value: any
  let key: string

  if (typeof inObject !== 'object' || inObject === null) {
    return inObject // Return the value if inObject is not an object
  }

  // Create an array or object to hold the values
  outObject = Array.isArray(inObject) ? [] : {}

  for (key in inObject) {
    value = inObject[key]

    // Recursively (deep) copy for nested objects, including arrays
    outObject[key] = deepCopyFunction(value)
  }

  return outObject
}

export const rotate = (matrix: (string | number)[][], dir: number) => {
  const rotatedTetro = matrix.map((x, index) =>
    matrix.map(col => col[index])
  )

  if (dir > 0) {
    return rotatedTetro.map(row => row.reverse())
  } else {
    return rotatedTetro.reverse()
  }
}