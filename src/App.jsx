import React, { useEffect, useState } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import CardList from './components/CardList/CardList';

import './App.css';

const App = () => {

  // const initialList = [
  //   [
  //     {
  //       id: '1',
  //       title: 'Task number 1',
  //       description: 'Description for task number 1'
  //     },
  //     {
  //       id: '2',
  //       title: 'Task number 2',
  //       description: 'Description for task number 2'
  //     },
  //     {
  //       id: '3',
  //       title: 'Task number 3',
  //       description: 'Description for task number 3'
  //     },
  //     {
  //       id: '4',
  //       title: 'Task number 4',
  //       description: 'Description for task number 4'
  //     }
  //   ],
  //   [
  //     {
  //       id: '5',
  //       title: 'Task number 5',
  //       description: 'Description for task number 5'
  //     },
  //     {
  //       id: '6',
  //       title: 'Task number 6',
  //       description: 'Description for task number 6'
  //     },
  //     {
  //       id: '7',
  //       title: 'Task number 7',
  //       description: 'Description for task number 7'
  //     },
  //     {
  //       id: '8',
  //       title: 'Task number 8',
  //       description: 'Description for task number 8'
  //     }
  //   ],
  //   [
  //     {
  //       id: '9',
  //       title: 'Task number 9',
  //       description: 'Description for task number 9'
  //     },
  //     {
  //       id: '10',
  //       title: 'Task number 10',
  //       description: 'Description for task number 10'
  //     },
  //     {
  //       id: '11',
  //       title: 'Task number 11',
  //       description: 'Description for task number 11'
  //     },
  //     {
  //       id: '12',
  //       title: 'Task number 12',
  //       description: 'Description for task number 12'
  //     }
  //   ]
  // ]

  const initialList = [];

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const [todoList, updateTodoList] = useState([[]]);

  const handleDragEnd = (result) => {
    if (!result.destination) return;
    const tmpList = Array.from(todoList);
    const elementToInsert = tmpList[result.source.droppableId].splice(result.source.index, 1);
    tmpList[result.destination.droppableId].splice(result.destination.index, 0, ...elementToInsert);
    updateTodoList(tmpList)
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.length === 0 || description.length === 0) {
      alert("Missing element, please fill all the fields")
    } else {
      const tmp = {title: title, description: description}
      todoList[0].splice(1, 0, tmp);
      setTitle("")
      setDescription("")
    }
  }

  return (
    <div className="App">
      <div>
        <form onSubmit={handleSubmit}>
          <label>Title: <input type="text" value={title} onChange={(e) => setTitle(e.target.value)}/></label><br/>
          <label>Description: <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Enter a description ..."></textarea></label>
          <input type="submit" value="OK" />
        </form>
      </div>

      <DragDropContext onDragEnd={(result) => handleDragEnd(result)}>
        <div className='board'>
        {
          todoList.map((section, index) => {
            return (
              <CardList section={section} index={index} key={index} />
            )
          })
        }
        </div>
      </DragDropContext>
    </div>
  );
}

export default App;
