import React from 'react';
import { useState } from 'react';
import Card from './Card';
import './CenterStack.css';
import { StackDropzone } from './Dropzone';
import cardmap from '../assets/cardmap';

// Have three stacks from model in array representing
// the three face up piles
// Also have face down card that represents deck

const faceUp = [
    [{
        country: "Uganda",
        capital: "Kampala",
        img: "",
        pop: "15,234,564",
        player: "Another dude"
    },
    {
        country: "Somalia",
        capital: "Smot",
        img: "",
        pop: "11,421,076",
        player: "John Cena"
    }],
    [{
        country: "Libya",
        capital: "Anda",
        img: "",
        pop: "30,234,564",
        player: "Another dude"
    }],
    [{
        country: "Mozambique",
        capital: "Mambo",
        img: "",
        pop: "40,234,564",
        player: "Another dude"
    },
    {
        country: "Zambia",
        capital: "Lusaka",
        img: "",
        pop: "11,421,076",
        player: "John Cena"
    },
    {
        country: "Angola",
        capital: "Luanda",
        img: "",
        pop: "40,234,564",
        player: "Another dude"
    },
    {
        country: "Zambia",
        capital: "Lusaka",
        img: "",
        pop: "11,421,076",
        player: "John Cena"
    }]
]

const deck = [
    {
        country: "Rwanda",
        capital: "Boom",
        img: "",
        pop: "10,234,943",
        player: "Another dude"
    },
    {
        country: "Madagascar",
        capital: "Antarivo",
        img: "",
        pop: "12,421,076",
        player: "John Cena"
    }
]



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
                    
                        <StackDropzone stack={stack} key={i} location={i} move={move}></StackDropzone>
                    )
                }
            </div>
            
        </div>
    );
};

export default CenterStack;