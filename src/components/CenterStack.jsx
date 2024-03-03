import React from 'react';
import Card from './Card';
import './CenterStack.css';
import { StackDropzone } from './Dropzone';

// Have three stacks from model in array representing
// the three face up piles
// Also have face down card that represents deck



const CenterStack = ({gameState, drawCard, move}) => {

    // Dropzone component, shows top card of stack and has drop functionality


    return (
        <div className='center-container'>
            <p>Current turn: {gameState.currTurn}</p>
            <div  className="face-up">
                {gameState.game.deck.length > 0 ?
                    <div onClick={drawCard}>
                        <Card item={{country: "10 DAYS"}} disabled={true}/> 
                    </div>    
                    : 
                    <div className='empty-deck'>Empty Deck </div>      
                
                }
                {gameState.game.draw &&
                    <Card item={gameState.game.draw} />
                }
                {gameState.game.toReplace &&
                    <Card item={gameState.game.toReplace} />
                }
            </div>
            <div className='face-up'>
                {gameState.game.faceUp.map((stack, i) =>
                    
                        <StackDropzone stack={stack} key={i} location={i} move={move} disabled={gameState.currTurn !== gameState.activePlayer}></StackDropzone>
                    )
                }
            </div>
            
        </div>
    );
};

export default CenterStack;