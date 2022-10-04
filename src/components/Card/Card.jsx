import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import "./Card.css";

const Card = ({name, desc, index}) => {
  return (
    <Draggable draggableId={`draggable-${index}`} index={index}>
      {(provided) => {
        return (
          <div
            ref={provided.innerRef}
            className='task'
            {...provided.dragHandleProps}
            {...provided.draggableProps}>
            <h2>{name}</h2>
            <p>{desc}</p>
            {provided.placeholder}
          </div>
        )
      }}
    </Draggable>
  )
}

export default Card;