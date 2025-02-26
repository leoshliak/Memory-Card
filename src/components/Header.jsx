export default function Header({score, best}) {
    return (
        <header>
        <h1>Memory Card</h1>
         <div className="score">
        <p className='now-score'>score: {score}</p>
        <p className='best-score'>best: {best}</p>
      </div>
      </header>
    )
}
