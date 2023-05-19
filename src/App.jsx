import { useState } from 'react'
import confetti from 'canvas-confetti'
import { TURNS } from './constants.js'
import { Square } from './components/Square.jsx'
import { Winner } from './components/Winner.jsx'
import { checkWinner } from './logic/checkWinner.js'

function App() {
  /*
  LA OPERACION DE ACTUALIZAR UN ESTADO ES SINCRONA, 
  SI EN ALGUNA FUNCION USTED ACTUALIZA UN ESTADO Y LO IMPRIME EN TERMINAL, VERA EL ESTADO ANTERIOR
  PORQUE CAMBIAR EL ESTADO TARDA ALGUNOS MILISEGUNDOS, Y LA OPERACION DE IMPRIMIR EL VALOR DEL ESTADO
  NO VA ESPERAR A QUE EL ESTADO SE ACTUALICE (DEBE TENERLO EN CUENTA, OBSEVELO EL cons.log DE LA LINEA 55)
   
  ##### SOLUCION A LO ANTERIOR ##### 
  setState((prevState) => {
    console.log(`estado anterio ${prevState} y nuevo estado ${newState}`)
    return newState
    }
  )
  */

  const [board, setBoard] = useState(() => {
    const boardFromStorage = window.sessionStorage.getItem('board')
    return boardFromStorage ? JSON.parse(boardFromStorage) : Array(9).fill(null)
  })
  const [turn, setTurn] = useState(() => {
    const turnFromStorage = window.sessionStorage.getItem('turn')
    return turnFromStorage ? turnFromStorage : TURNS.X
  })
  const [winner, setWinner] = useState(null)

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

    // Persistencia de datos
    window.sessionStorage.setItem('board', JSON.stringify(newBoard))
    window.sessionStorage.setItem('turn', newTurn)

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

    window.sessionStorage.removeItem('board')
    window.sessionStorage.removeItem('turn')
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

      <Winner winner={winner} resetGame={resetGame}></Winner>

    </main>
  )
}

export default App
