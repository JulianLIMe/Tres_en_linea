import { winner_combos } from "../constants.js"

export const checkWinner = (boardToCheck) => {
  for (let combo of winner_combos) {
    const [a, b, c] = combo
    if (
      boardToCheck[a] &&
      boardToCheck[a] == boardToCheck[b] &&
      boardToCheck[b] == boardToCheck[c]
    ) return boardToCheck[a]
  }
  return null
}
