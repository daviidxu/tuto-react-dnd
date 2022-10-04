import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import Card from '../Card/Card';

import "./CardList.css"

const CardList = ({section, index}) => {
  return (
    <Droppable droppableId={`${index}`}>
      {(provided) => {
        return (
          <div
            ref={provided.innerRef}
            className='section'
            // style={{ backgroundColor: snapshot.isDraggingOver ? 'blue' : 'black' }}
            {...provided.droppableProps}>
            {
              section.map((card, index) => {
                return (
                  <Card {...card} index={index} key={index}/>
                )
              })
            }
            {provided.placeholder}
          </div>)
      }}
    </Droppable>
  )
}

export default CardList;