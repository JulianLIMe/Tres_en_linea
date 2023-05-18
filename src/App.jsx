import { useState } from 'react'
import confetti from 'canvas-confetti'

const TURNS = { X: 'X', O: 'O' }

const winner_combos = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]
]

const Square = ({ children, isSelected, updateBoard, index }) => {

  const className = `square ${isSelected ? 'is-selected' : ''}`
  const handleClick = () => {
    updateBoard(index)
  }

  return (
    <div className={className} onClick={handleClick}>
      {children}
    </div>
  )
}

function App() {
  // LA OPERACION DE ACTUALIZAR UN ESTADO ES SINCRONA, 
  // SI EN ALGUNA FUNCION USTED ACTUALIZA UN ESTADO Y LO IMPRIME EN TERMINAL, VERA EL ESTADO ANTERIOR
  // PORQUE CAMBIAR EL ESTADO TARDA ALGUNOS MILISEGUNDOS, Y LA OPERACION DE IMPRIMIR EL VALOR DEL ESTADO
  // NO VA ESPERAR A QUE EL ESTADO SE ACTUALICE (DEBE TENERLO EN CUENTA, OBSEVELO EN LA LINEA 72)
  /* 
      SOLUCION A LO ANTERIOR: 
  setState((prevState) => {
    console.log(`estado anterio ${prevState} y nuevo estado ${newState}`)
    return newState
    }
  )
  */

  const [board, setBoard] = useState(Array(9).fill(null))
  const [turn, setTurn] = useState(TURNS.X)
  const [winner, setWinner] = useState(null)

  const checkWinner = (boardToCheck) => {
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

  const checkEndGame = (newBoard) => {
    return newBoard.every((square) => square != null) // Every verifica que ningun elemeto del array sea null
  }

  const updateBoard = (index) => {
    if (board[index] || winner) return

    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard)

    const newTurn = turn == TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)

    const newWinner = checkWinner(newBoard)
    if (newWinner) {
      confetti()
      setWinner(newWinner)
      console.log(winner)
    } else if (checkEndGame(newBoard)) {
      setWinner(false)
    }
  }

  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)
  }

  return (
    <main className='board'>
      <h1>Game</h1>
      <button onClick={resetGame}>Reset juego</button>
      <section className='game'>
        {
          board.map((e, index) => {
            return (
              <Square
                key={index}
                index={index}
                updateBoard={updateBoard}
              >
                {e} {/* Esta es la Prop children del componente Square */}
              </Square>
            )
          })
        }
      </section>

      <section className='turn'>
        <Square isSelected={turn == TURNS.X}>{TURNS.X}</Square>
        <Square isSelected={turn == TURNS.O}>{TURNS.O}</Square>
      </section>

      {
        winner != null && (
          <section className='winner'>
            <div className='text'>
              <h2>
                {
                  winner == false ? 'Empate' : 'Gana ' + winner
                }
              </h2>

              <header className='win'>
                {winner && <Square>{winner}</Square>}
              </header>

              <footer>
                <button onClick={resetGame}>Empezar de nuevo</button>
              </footer>
            </div>
          </section>
        )
      }

    </main>
  )
}

export default App
