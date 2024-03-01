import React, {useState} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { socket } from '../sockets/connection';

const JoinGame = () => {
    const [id, setId] = useState("");
    const navigate = useNavigate();
    const location = useLocation();

    const joinGame = () => {
        // Should check if valid game room first.
        const data = {
            id: id,
            user: location.state.user
        }
        socket.emit("join", data)
        navigate("/gameroom/" + id, {state: { user: location.state.user, isCreator: false}})
    }

    return (
        <div className='container'>
            <div className='flex-col'>
                <label>Enter Game Id Here:</label>
                <input type="text" value={id} onChange={(e) => setId(e.target.value)} size={37}>
                </input>
                <button className='login-button' style={{marginTop: '25px'}} onClick={joinGame}>Enter</button>
            </div>

        </div>
        
    );
};

export default JoinGame;