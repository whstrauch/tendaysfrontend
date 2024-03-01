import React, {useState} from 'react';
import { useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import LoadingDots from '../components/LoadingDots';
import { motion } from 'framer-motion';
import { socket } from '../sockets/connection';
import "../styles/JoinRoom.css"

const JoinRoom = () => {
    const location = useLocation();
    const isCreator = location.state.isCreator;
    const {gameId} = useParams();
    const navigate = useNavigate()
    const [friends, setFriends] = useState([]);
    const [copyStatus, setCopyStatus] = useState("Copy");

    useEffect(() => {
        socket.on("playerJoined", (data) => {
            let temp = [];
            for (const user of data) {
                temp.push(user.user);
            }
            console.log(socket.id, temp)
            setFriends(temp);
        })

        socket.on("startedGame", (data) => {
            console.log("Host started game.")
            navigate("../play/" + gameId, {state: {users: data, isCreator: isCreator, user: location.state.user}})
        })
    }, [])

    const copy = () => {
        navigator.clipboard.writeText(String(gameId)).then(() => {
            setCopyStatus("Copied!");
        })

        setTimeout(() => setCopyStatus("Copy"), 500);

    }

    const start = () => {
        if (isCreator) {
            socket.emit("startGame", gameId);
        }
    }

    const cVar = {
        start: {
            opacity: 0,
            y: 0,
            transition: { type: "spring", bounce: 1 }},
        end: { opacity: 1, y: 100 }
    }



    return (
        <motion.div className='container' variants={cVar} initial="start" animate="end" style={{gap: "10px", justifyContent: 'flex-start', marginTop: "50px"}}>
            <motion.h1 >Welcome {location.state.user} </motion.h1>
            <motion.h3 >Send this game id to your friends to join.</motion.h3>
            <motion.div  className='flex-row' style={{position: "relative"}}>
                <input value={gameId} disabled={true} size={43} ></input>
                <button className='copy-button' onClick={copy}>{copyStatus}</button>
            </motion.div>
            
            <motion.h3 >Players that have joined the lobby:</motion.h3>
            <motion.h2 >{friends.join(", ")}</motion.h2>
            
            {isCreator ? <motion.button className='login-button' onClick={start}>Start Game</motion.button> :
                    <motion.div className='flex-row' style={{alignItems: "baseline"}} >
                        <motion.h3>Wait for the host to start the game</motion.h3>
                        <LoadingDots/>
                    </motion.div>
            }
        </motion.div>
    );
};

export default JoinRoom;