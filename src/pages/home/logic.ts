export const numRookCaptures = (boards: string[][]) => {
  let result = 0

  const ry = boards.findIndex(sb => sb.includes('♖'))
  const rx = boards[ry]?.findIndex(cell => cell === '♖')

  let RX = ''
  let RY = ''

  for (let y = 0; y < boards.length; y++) {
    for (let x = 0; x < boards.length; x++) {
      const cell = boards[y][x]

      if (ry === y && cell !== '') RY += cell
      if (rx === x && cell !== '') RX += cell
    }
  }

  for (let i = 0; i < RX.length - 1; i++) {
    const sub = RX[i] + RX[i + 1]

    if (sub === '♟♖' || sub === '♖♟') result++
  }
  for (let i = 0; i < RY.length - 1; i++) {
    const sub = RY[i] + RY[i +  1]

    if (sub === '♟♖' || sub === '♖♟') result++
  }

  return result
}
