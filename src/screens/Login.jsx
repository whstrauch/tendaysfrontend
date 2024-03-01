import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import "../styles/Login.css"
import { socket } from '../sockets/connection';
import { v4 as uuid4 } from "uuid";


const Login = () => {
    const [name, setName] = useState("")
    const navigate = useNavigate();


    const createGame = () => {
        // Generate unique id
        if (name !== "") {
            const gameId = uuid4()
            // navigate('/play/' + gameId)
            console.log(socket.id);
            const data = {
                id: gameId,
                user: name
            }
            socket.emit("createGame", data);
            navigate("/gameroom/" + gameId, { state: { user: name , isCreator: true} });
            // Goes to create game screen with
            // code to send to friends to join.
        }
        
    }

    const joinGame = () => {
        // Goes to join game screen
        // Where input to join game exists
        navigate('/join', { state: { user: name }})
    }

    return (
        <div className='container'>
            <div className='flex-col'>
                <label>Name</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)}></input>
            </div>
            <div>
                <button onClick={createGame} className="login-button">Create game</button>
                <button onClick={joinGame} className="login-button">Join game</button>
            </div>
        </div>
    );
};

export default Login;