import React, {useState, useEffect} from 'react';
import Card from './Card';
import './Hand.css';
import {Dropzone} from './Dropzone';
import cardmap from '../assets/cardmap';
import { useLocation } from 'react-router-dom';
const hand1 = [
    {
        country: "Ghana",
        capital: "Accra",
        img: "",
        pop: "14,235,213",
        player: "Mohammad Kudus"
    },
    {
        country: "D.R.C.",
        capital: "Kinshasa",
        img: "",
        pop: "56,345,324",
        player: "Arthur Masuaku"
    },
    {
        country: "Egypt",
        capital: "Cairo",
        img: "",
        pop: "34,546,234",
        player: "Mohammad Salah"
    },
    {
        country: "South Africa",
        capital: "Johanesburg",
        img: "",
        pop: "23,234,234",
        player: "Oscar Pistorius"
    },
    {
        country: "Morocco",
        capital: "Rabat",
        img: "",
        pop: "12,314,743",
        player: "Nayef Aguerd"
    },
    {
        country: "Kenya",
        capital: "Nairobi",
        img: "",
        pop: "8,234,123",
        player: "Eliud Kipchoge"
    },
    {
        country: "Cameroon",
        capital: "Yaounde",
        img: "",
        pop: "18,092,352",
        player: "Some guy"
    },
    {
        country: "Senegal",
        capital: "Dakar",
        img: "",
        pop: "6,342,365",
        player: "Sadio Mane"
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
    }

]

// const hand = [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined]

const Hand = ({gameState, move}) => {

    const [player, setPlayer] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false)

    useEffect(() => {
        setIsLoaded(false)
        setPlayer(gameState.game.getPlayer())
        setIsLoaded(true)
    }, [])

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