import React from "react";
import Die from "./components/Die";
import {nanoid} from "nanoid";
import Confetti from 'react-confetti'

function App() {

  const [theEnd, setTheEnd] = React.useState(false)

 

  function allNewDice(){
    const newDice = []
    for(let i=0; i<10;i++){
      newDice.push({
        id: nanoid(), 
        value: Math.floor(Math.random()*6)+1, 
        isHeld: false
      })
    }
    return (newDice)
  }

  function holdDice(id){
    setDiceArray(olddice => {
      return(
      olddice.map(dice =>{
        return( dice.id === id ? {...dice, isHeld: !dice.isHeld} : dice)
      })
      )
    })
  }

  const [diceArray, setDiceArray] = React.useState(allNewDice())
  const arrayelem = diceArray.map(dice =>{
    
    return(
      <Die key={dice.id} value={dice.value} isHeld={dice.isHeld} holdDice={()=> holdDice(dice.id)} />
    )
  })

  React.useEffect(()=>{
    const allDiceHeld = diceArray.every(die => die.isHeld) 
    //will return true if all the dice are held
    const firstValue = diceArray[0].value
    const allTheSameValue = diceArray.every(die => die.value === firstValue)
    if(allDiceHeld && allTheSameValue){
      setTheEnd(true)

    }
  },[diceArray])

  function rollDice(){
    if(!theEnd){
      setDiceArray(prevDiceArray => {
        return(
          prevDiceArray.map(die => {
            return(
              die.isHeld ? die : {...die, value: Math.floor(Math.random()*6)+1}
            )
          })
        )
      })
    }else{
      setDiceArray(allNewDice())
      setTheEnd(false)
    }
  }

  return (
    <main>
      {theEnd && <Confetti width={"1000px"} height={"400px"} />}
      <h1>Tenzies</h1>
      <p>Roll untill all dice are the same. Click aech die to freeze it at its current value between rolls</p>
       <section className="dice-container">
            {arrayelem}
       </section>
       <button className="roll-btn" onClick={rollDice}>{theEnd ? "New Game" : "Roll"}</button>
    </main>
  );
}

export default App;
