import '../styles/Header.css'
import { Button, InputNumber } from 'antd'

export default function Header({score, best, Amount, handleApply}) {
    return (
        <header>
            <div className="header-con">
      <div className="tr">
        <h1>Memory Card</h1>
        <p><span className='important'>*</span> You must not click on the same image twice</p>
        </div> 
        <div className="rest">
         <div className="score">
        <p className='now-score'>Score: {score}</p>
        <p className='best-score'>Best Score: {best}</p>
        </div>
        <div className="amount">
          <InputNumber min={4} max={20} onChange={(value) => Amount[1](value)} value={Amount[0]} className='card-amount'  />
          <Button type='primary' onClick={()=>{handleApply()}}>Apply</Button>
          </div>
      </div>
      </div>
      </header>
    )
}
