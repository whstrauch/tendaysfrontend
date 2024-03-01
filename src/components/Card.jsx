import React, { memo } from 'react';
import { useState, useRef } from 'react';
import './Card.css';
import cardmap from '../assets/cardmap';
import { useDrag } from 'react-dnd';
import { ItemTypes } from '../context/Constants';
import { useMemo } from 'react';

// country, capital, img, pop, player, onClick, disabled


const Card = ({item, onClick}) => {
    let img;
    if (item.img !== "") {
        img = item.img;
    } else {
        img = cardmap[item.country?.toLowerCase()];
    }

    

    const [{isDragging}, drag, dragPreview] = useDrag(() => ({
        type: ItemTypes.HANDCARD,
        options: {
            dropEffect: 'copy'
        },
        item: item,
        collect: monitor => ({
          isDragging: !!monitor.isDragging(),
        }),
    }), [])
    // Draggable event handler 
    //

    if (isDragging) {
        console.log("DRAGGING", item)
        return <div ref={dragPreview} className='card-slot' />
    }
    

    return (
            <div className='card-container' ref={drag} onClick={onClick}>
                <h3>{item.country?.toUpperCase()}</h3>
                <h6>{item.capital}</h6>
                <div>
                    <img src={img} draggable={false}/>
                </div>
                <h5>{item.pop}</h5>
                <h5>{item.player}</h5>
            </div>
    );
};

export default Card;