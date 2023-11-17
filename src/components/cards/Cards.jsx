import { useDispatch } from 'react-redux';
import Card from '../card/Card.jsx';
import { useEffect } from 'react';
import { getGames } from '../../redux/actions.js';
import PropTypes from "prop-types";
import style from './Cards.module.css';


function Cards({games}) {
  const dispatch = useDispatch();

  useEffect(()=> {
   dispatch(getGames())
  },[dispatch])
  return (
    <div className={style.cards}>
      {games?.map((gm)=> {
        return (
          <Card
          key={gm.id}
          game={gm}
          />
        )
      })}
    </div>
  )
}
Cards.propTypes= {
  games: PropTypes.array.isRequired
}

export default Cards