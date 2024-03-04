import React from 'react';
import './Card.css';
import cardmap from '../assets/cardmap';
import { useDrag } from 'react-dnd';
import { ItemTypes } from '../context/Constants';

// country, capital, img, pop, player, onClick, disabled


const Card = ({item, onClick, disabled}) => {
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
        canDrag: !disabled,
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
                    {img && <img src={img} draggable={false} alt="Country or Transportation Tile"/>}
                </div>
                <h5>{item.pop}</h5>
                <h5>{item.player}</h5>
            </div>
    );
};

export default Card;