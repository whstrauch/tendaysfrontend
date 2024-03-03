import React, {useState, useEffect} from 'react';
import './Hand.css';
import {Dropzone} from './Dropzone';

// const hand = [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined]

const Hand = ({gameState, move}) => {

    const [player, setPlayer] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false)

    useEffect(() => {
        setIsLoaded(false)
        setPlayer(gameState.game.getPlayer())
        setIsLoaded(true)
    }, [gameState.game])

    return (
        <div className='hand'>
            {isLoaded && player.getDays().map((item, i) => 
                {
                return (
                    <div className='flex-col center' key={i}>
                        {<Dropzone item={item} location={i + 3} move={move}></Dropzone>}
                        <div className='day-slot' style={{backgroundPositionX: 10 + (i * 100), backgroundPositionY: i * 100}}>
                            DAY {i + 1}
                        </div>
                    </div>
                
            )})}
        </div>
    );
};

export default Hand;