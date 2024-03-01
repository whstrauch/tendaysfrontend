import React from 'react';
import { useContext } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import Board from '../components/Board';
import Card from '../components/Card';
import CenterStack from '../components/CenterStack';
import Hand from '../components/Hand';
import Video from '../components/Video';
import userContext from '../context/userContext';
import Game from '../model/game';
import '../styles/Play.css';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import { useLocation, useParams } from 'react-router-dom';
import { socket } from '../sockets/connection';

const Play = () => {
    const location = useLocation();
    const users = location.state.users.map(user => user.user);

    const [gameState, setGameState] = useState({
        game: new Game(location.state.user),
        currTurn: users[0],
        activePlayer: location.state.user
    });
    
    const { gameId } = useParams();

    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        console.log("id", gameId)
        setIsLoaded(true)

        socket.on("opponentMove", move => {
            console.log("OppMove", move)
            console.log(gameState)
            gameState.game.updateDeck(move.newDeck);
            gameState.game.updateStacks(move.newStacks)
            console.log(gameState)
            setGameState(prev => ({
                ...prev,
                game: gameState.game,
                currTurn: move.currTurn
            }))
          }
        )
    }, []);

    const updateTurn = (p) => {
        let newIndex;
        const index = users.indexOf(p);
        console.log("Update", users, p, index)
        if (index + 1 === users.length) {
            newIndex = 0;
        } else {
            newIndex = index + 1;
        }
        return users[newIndex];
    }


    const moveCard = (cardId, newPos) => {

        const update = gameState.game.moveCard(cardId, newPos, gameState.activePlayer);
        if (update === "done") {
            // Have move send updated deck and faceup stacks to opponents.
            const newDeck = gameState.game.getDeck();
            const newStacks = gameState.game.getStacks()
            const newTurn = updateTurn(gameState.activePlayer)
            const move = {
                id: gameId,
                justWent: gameState.activePlayer,
                currTurn: newTurn,
                newDeck: newDeck,
                newStacks: newStacks
            }
            console.log("MOVE", move)
            socket.emit("newMove", move)
        } else if (update === "replace") {
            setGameState(prev => ({
                ...prev,
                game: gameState.game
            }))
        }
    }

    const drawCard = () => {
        console.log("GAMESTATE", gameState)
        if (gameState.currTurn === gameState.activePlayer) {
            const update = gameState.game.drawCard();
            if (update) {
                setGameState(prev => ({
                    ...prev,
                    game: gameState.game
                }))
            }
        }
    }


    return (
        <DndProvider backend={HTML5Backend} debugMode={true}>
            {isLoaded && 
            <div className='play-container'>
            
                <div className='top-half-section'>
                    <div className='map-section'>
                        <Board />
                    </div>
                    <div className='center-stack-section'>
                        <CenterStack gameState={gameState} drawCard={drawCard} move={moveCard}/>
                    </div>
                    <div className='video-section'>
                        <Video gameState={gameState}/>
                    </div>
                </div>
                <div className='hand-section'>
                    <Hand gameState={gameState} move={moveCard}/>
                </div> 
            </div>}
        </DndProvider>
    );
};

export default Play;