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
            {...provided.droppableProps}>
            {
              section.map((card, index) => {
                return (
                  <Card index={index} key={index} {...card} />
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