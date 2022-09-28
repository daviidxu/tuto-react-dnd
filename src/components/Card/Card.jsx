import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import "./Card.css";

const Card = ({title, description, index}) => {
  return (
    <Draggable draggableId={`draggable-${title+index}`} index={index}>
      {(provided) => {
        return (
          <div
            ref={provided.innerRef}
            className='task'
            {...provided.dragHandleProps}
            {...provided.draggableProps}>
            <h2>{title}</h2>
            <p>{description}</p>
            {provided.placeholder}
          </div>
        )
      }}
    </Draggable>
  )
}

export default Card;