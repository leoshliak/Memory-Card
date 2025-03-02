import { useEffect, useState, useRef, } from 'react'
import './styles/App.css'
import Header from './components/Header';
import { fetchRandomMovies} from './api';
import { LoadingOutlined } from '@ant-design/icons';
import { Button, Modal, InputNumber} from 'antd';

function App() {
  const initialCards = useRef([]);
  const [memoryCards, setMemoryCards] = useState([]) 
  const [score, setScore] = useState(0)
  const [best, setBest] = useState(null)
  const [over, setOver] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [flipping, setFlipping] = useState(false);
  const [amount, setAmount] = useState(12)

  useEffect(() => {
    async function load() {
      try {
        const results = await fetchRandomMovies(amount);
        const initializedCards = results.map(result => ({
          ...result,
          clicks: 0,  
        }));
  
        setMemoryCards(initializedCards);
        initialCards.current = initializedCards;  
        setOver(false);
      } catch (error) {
        console.error('Error loading data:', error);
      }
    }
  
    load();
  }, [over]);

  function handleClick(i) {
    setFlipping(true); 
  
    setTimeout(() => {
      setMemoryCards(prevCards => {
        const updatedCards = prevCards.map((card, index) =>
          index === i ? { ...card, clicks: card.clicks + 1 } : card
        );
  
        const clickedCard = updatedCards[i];
        const newScore = score + 1;
  
        if (clickedCard.clicks === 2) {
          if (best === null || newScore - 1 > best) {
            setBest(newScore - 1);
          }
          setScore(0);
          setOver(true);
          return initialCards.current;
        }
  
        if (newScore === updatedCards.length) {
          setBest(newScore);
          setScore(0);
          setOver(true);
          setIsModalOpen(true);
          return initialCards.current;
        }
  
        setScore(newScore);
        return updatedCards.sort(() => Math.random() - 0.5);
      });
  
      setFlipping(false);
    }, 600); 
  }
  
  function handleApply() {
    setFlipping(true); 
  
    setTimeout(() => {
      setOver(true); 
      setScore(0);
      setFlipping(false); 
    }, 600); 
  }
  
  

  return (
      <div className='app'>
        <Modal open={isModalOpen} title={<div></div>} onCancel={() =>  setIsModalOpen(false)} footer={
          <div>
          <InputNumber min={4} max={20} onChange={(value) => setAmount(value)} value={amount} className='card-amount'  />
          <Button type='primary' style={{marginLeft: '20px'}} onClick={() => {handleApply()}}>Apply</Button>
          </div>
        }>
         <h2 className='modal-win'>You won!</h2>
         <p className='some-text'>Congratulations, you've got a good memory. You can change the number of cards if you want.</p>
        </Modal>
        <Header score={score} best={best} Amount={[amount, setAmount]} handleApply={handleApply} />
        <main>
          <div className='card-container'>
              {memoryCards.map((card, index) => (
                  <div className={`card ${flipping ? "flipping" : ""}`} key={index} onClick={() => handleClick(index)}>
                  <div className="card-inner">
                    <div className="card-front">
                      <img src={card.image} alt="" style={{ width: "100%" }} />
                      <div className="card-text"><p>{card.title}</p></div>
                    </div>
                    <div className="card-back">
                    <img src="/oscar.png" alt="Back of the card" />
                    </div>
                  </div>
                </div>
                
              ))}
          </div>
          </main>
      </div>
  )
}

export default App
