import { useState } from 'react'
import './styles/App.css'
import cards from './data';
import Header from './components/Header';

function App() {
  const initialCards = cards.map(card => ({ ...card }));
  const [memoryCards, setMemoryCards] = useState(cards.map(card => ({ ...card }))) 
  const [score, setScore] = useState(0)
  const [best, setBest] = useState(null)

  function handleClick(i) {
      const updatedCards = [...memoryCards];
      updatedCards[i].clicks += 1;
      let s = score + 1
      setScore(s)
      console.log( updatedCards[i].clicks)

      if(updatedCards[i].clicks === 2) {
          alert('You lost');
          setMemoryCards(initialCards);
          if(best == null || s > best){
            setBest(s - 1)
          } 
          setScore(0)
          s = 0;
          
      } else {
          const shuffled = [...updatedCards].sort(() => Math.random() - 0.5);
          setMemoryCards(shuffled)
      }
  }

  return (
      <>
        <Header score={score} best={best} />
          <div className='container'>
              {memoryCards.map((card, index) => (
                  <div key={index} onClick={() => handleClick(index)} style={{cursor: 'pointer', border: '1px solid #000'}}>
                      <p>{card.title}</p>
                  </div>
              ))}
          </div>
      </>
  )
}

export default App
