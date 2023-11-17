import { useEffect, useState } from "react";
import { useSelector } from "react-redux";


const usePage = ()=> {
  const allGames = useSelector((state)=> state.games);
 
  const cardNumber = 9

  const [prev, setPrev]= useState(0);  
  const [next, setNext] = useState(cardNumber); 
  const [count, setCount]= useState(1);  
  let paginate =allGames?.slice(prev,next); 
  const totPagine = Math.ceil(allGames.length/cardNumber);

  useEffect(()=> {
    setPrev(0);
    setNext(cardNumber);
    setCount(1);
  },[allGames.length]); 
  
  const changePrev = ()=> {
    if(count > 1){
      if(prev-cardNumber < 0){
        setPrev(0);
        setNext(cardNumber);
      } else if(prev-cardNumber >= 0){
        setPrev(prev-cardNumber);
        setNext(next-cardNumber);
      }
      setCount(count-1)
    }
  };
  const changeNext = ()=> {
    if(count < totPagine){
      setPrev(prev + cardNumber);
      setNext(next + cardNumber);
      setCount(count + 1);
    }
  }
  return {changeNext, changePrev, paginate, count, totPagine};

}

export default usePage;