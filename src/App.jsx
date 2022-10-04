import React, { useState } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import CardList from './components/CardList/CardList';

import './App.css';

const App = () => {

  const [finalList, setFinalList] = useState(JSON.parse(localStorage.getItem('list')) || []);

  const [title, setTitle] = useState('');
  const [card, setCard] = useState({name: '', desc: ''});

  const handleDragEnd = (result) => {
    if (!result.destination) return;
    const tmpList = Array.from(finalList);
    const elementToInsert = tmpList[result.source.droppableId].tasks.splice(result.source.index, 1);
    tmpList[result.destination.droppableId].tasks.splice(result.destination.index, 0, ...elementToInsert);
    setFinalList(tmpList);
    localStorage.setItem('list', JSON.stringify(tmpList))
  }

  const handleChange = (e) => {
    setTitle(e.target.value)
  }

  const handleCard = (e) => {
    setCard({...card, [e.target.name]: e.target.value})
  }

  const handleSubmitCard = (e, index) => {
    e.preventDefault()
    if (card) {
      finalList[index].tasks.push({name: card.name, desc: card.desc})
      localStorage.setItem('list', JSON.stringify(finalList))
      setCard({name: '', desc: ''})
    } else {
      alert("Impossible")
    }
  }

  const handleAddColumn = (e) => {
    e.preventDefault()
    if (title) {
      finalList.push({title: title, tasks: []})
      localStorage.setItem('list', JSON.stringify(finalList))
      setTitle('');
    } else {
      alert("Name required")
    }
  }

  return (
    <div className="App">
      <h1>My Todo</h1>
      <form onSubmit={handleAddColumn}>
        <input type="text" name="add-column" id="" placeholder='Enter a name' value={title} onChange={handleChange}/>
        <input type="submit" value="Add" />
      </form>
      <DragDropContext onDragEnd={(result) => handleDragEnd(result)}>
        <div className='board'>
        {
          finalList.map((section, index) => {
            return (
              <div key={index}>
                <h2>{section.title}</h2>
                <form onSubmit={(e) => handleSubmitCard(e, index)}>
                  <input type="text" name="name" id="" value={card.name} placeholder='Enter a title' onChange={handleCard} />
                  <br />
                  <textarea name="desc" id="" value={card.desc} placeholder='Enter a description' onChange={handleCard} cols="35" rows="5"></textarea>
                  <input type="submit" value="Add" />
                </form>
                <CardList section={section.tasks} index={index} />
              </div>
            )
          })
        }
        </div>
      </DragDropContext>
    </div>
  );
}

export default App;
