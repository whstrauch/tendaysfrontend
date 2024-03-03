import React from 'react';
import Card from './Card';
import { ItemTypes } from '../context/Constants';
import { useDrop } from 'react-dnd';

const Dropzone = ({item, location, move}) => {

    const className = item === undefined ? "card-slot" : "";


    const [{ isOver }, drop] = useDrop(() => ({
        accept: ItemTypes.HANDCARD,
        drop: (item, monitor) => {
          console.log("Hand", item, location, monitor.getItem());
          move(item.id, location);
        },
        collect: monitor => ({
          isOver: !!monitor.isOver(),
        }),
      }))


    return (
        <div className={className} ref={drop}>
            {item ? <Card item={item}></Card> : <div className='card-slot'></div>}
        </div>
    );
};

const StackDropzone = ({stack, location, move, disabled}) => {

  const className = stack.length === 0 ? "card-slot" : ""

  const [{ isOver }, drop] = useDrop(() => ({
      accept: ItemTypes.HANDCARD,
      drop: (item, monitor) => {
        console.log("STack", item);
        move(item.id, location);
      },
      collect: monitor => ({
        isOver: !!monitor.isOver(),
      }),
    }))


  return (
      <div className={className} ref={drop}>
          {stack.length === 0 ? null : <Card item={stack[stack.length - 1]} disabled={disabled}></Card>}
      </div>
  );
};

export {Dropzone, StackDropzone};