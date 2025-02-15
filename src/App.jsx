import './app.css';
import './buttons.css';
import cowImage from './img/cow.png';
import sheepImage from './img/sheep.png';
import {useState} from 'react';
import { v4 as uuidv4 } from 'uuid';
import Sq from './components/Sq';
import Circle from './components/Circle';
import { useEffect } from 'react';


import rand from './Functions/rand';




export default function App() {


   const [animals, setanimals] = useState([]);

   const addAnimals = () => {

    setanimals([]);

    const countCows = rand(5, 20);
    const countSheeps = rand(5, 20);

    const Cows = Array.from({ length: countCows }, () => ({
        digit: `A${rand(1000000, 9999999)}`,
        id: uuidv4(),
        type: 'Cows',
        originalClassName: 'sq'
        
    }));

    const Sheeps = Array.from({ length: countSheeps }, () => ({
      digit: `K${rand(1000000, 9999999)}`,
      id: uuidv4(),
      type: 'Sheeps',
      originalClassName: 'circle'

  }));

    setanimals(s => [...s, ...Cows, ...Sheeps]);
};

const move = (id) => {
  setanimals(prevAnimals => {
    
    const animalToMove = prevAnimals.find(animal => animal.id === id);
    if (!animalToMove) return prevAnimals;

   
    const updatedAnimal = {
      ...animalToMove,
      type: animalToMove.type === 'Cows' ? 'Sheeps' : 'Cows'
    };

    
    const filteredAnimals = prevAnimals.filter(animal => animal.id !== id);
    return [...filteredAnimals, updatedAnimal];
  });
};

useEffect(() => {
  const savedAnimals = localStorage.getItem('animals');
  if (savedAnimals) {
    setanimals(JSON.parse(savedAnimals));
  }
}, []);

useEffect(() => {
  localStorage.setItem('animals', JSON.stringify(animals));
}, [animals]);


  return (
    <div className="App">
      <div className='top'>
        <img src={cowImage} alt="cow" />
        <button className="green" onClick={addAnimals}>Į ganyklą</button>
        <img src={sheepImage} alt="sheep" />
      </div>
      <div className="App-header">
        <div className="sq-bin">

          {
            animals.filter(a => a.type === 'Cows').map(s => <Sq key={s.id} sq={s} move={move} />)

          }

        </div>
        <div className="sq-bin2">
        {
            animals.filter(a => a.type === 'Sheeps').map(s => <Circle key={s.id} sq={s} move={move} />)
             
          }
        </div>
      </div>
    </div>
  );
}


