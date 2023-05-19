import { Square } from "./Square.jsx"

export const Winner = ({ winner, resetGame }) => {
  if (winner == null) return null

  const textWinner = winner == false ? 'Empate' : 'Gana ' + winner

  return (
    <section className='winner'>
      <div className='text'>
        <h2>
          {textWinner}
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
