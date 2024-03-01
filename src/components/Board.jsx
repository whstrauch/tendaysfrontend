import React from 'react';
import { useState } from 'react';


const Board = () => {
    const [transform, setTransform] = useState({
        scale: 1,
        translate: "0px"
    })

    const press = () => {
        if (transform.scale === 1) {
            setTransform({
                scale: 1.4,
                translate: "100px, 60px"
            })
        } else {
            setTransform({
                scale: 1,
                translate: "0px"
            })
        }
    }
    
    return (
            <div className='image-fit' style={{transform: `scale(${transform.scale}) translate(${transform.translate})` }} onClick={() => press()}>
                <img src='/board.png' width={"100%"}/>
            </div>
    );
};

export default Board;