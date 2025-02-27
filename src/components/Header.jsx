import '../styles/Header.css'

export default function Header({score, best}) {
    return (
        <header>
            <div className="header-con">
      <div className="tr">
        <h1>Memory Card</h1>
        <p><span className='important'>*</span> You must not click on the same image twice</p>
        </div> 
         <div className="score">
        <p className='now-score'>Score: {score}</p>
        <p className='best-score'>Best Score: {best}</p>
      </div>
      </div>
      </header>
    )
}
