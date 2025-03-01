import { useEffect, useState } from 'react'
import './styles/App.css'
import Header from './components/Header';
import { fetchRandomPosters} from './api';
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';

function App() {
  let initialCards = [];
  const [memoryCards, setMemoryCards] = useState([]) 
  const [score, setScore] = useState(0)
  const [best, setBest] = useState(null)
  const [over, setOver] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      try {
       const  results = await fetchRandomPosters()
       setMemoryCards(results)
       initialCards = results.map(result => ({...result}))
       setOver(false)
       setLoading(true)
      } catch(error) {
       console.error('Error loading data:', error);
      } finally {
        setTimeout(() =>{
           setLoading(false)
        }, 600)    
      }
    }
 
    load()
   }, [over])

  function handleClick(i) {
      const updatedCards = [...memoryCards];
      updatedCards[i].clicks += 1;
      let s = score + 1
      setScore(s)
      console.log( updatedCards[i].clicks)

      if(updatedCards[i].clicks === 2) {
          alert('You lost');
          
          if(best == null || s > best){
            setBest(s - 1)
          } 
          setScore(0)
          s = 0;
          setMemoryCards(initialCards);
          setOver(true)
  
          
      } else {
          const shuffled = [...updatedCards].sort(() => Math.random() - 0.5);
          setMemoryCards(shuffled)
      }

      if(score == memoryCards.length - 1) {      
        setMemoryCards(initialCards)
        setBest(s)
        setScore(0)
        s = 0;
        alert('You win') 
      }
  }

  if(loading == true) {
    return  <Spin size='large' fullscreen />
  }

  return (
      <div className='app'>
        
        <Header score={score} best={best} />
        <main>
          <div className='container'>
              {memoryCards.map((card, index) => (
                  <div className='card' key={index} onClick={() => handleClick(index)}>
                    <img src={card.image} alt="" style={{width: "100%"}} />
                    <div className="card-text"><p>{card.title}</p></div>  
                  </div>
              ))}
          </div>
          </main>
      </div>
  )
}

export default App
