import React, { useState } from 'react'
import "./Card.css";
import DeleteCard from './DeleteCard';

export default function Card(props) {
  const [showDeleteCard, setShowDeleteCard] = useState(false);
  function deleteTodo(id) {
    props.onCardClick();
    props.deleteTodo(id);
  }

  function editTodo(id, value) {
    props.onCardClick();
    props.editTodo(id, value);
  }

  function handleClick() {
    props.onCardClick();
    setShowDeleteCard(true);
  }

  function closeDeletePopup() {
    props.onCardClick();
    setShowDeleteCard(false);
  }
  
  return (
    <div>
      <div className='card' onClick={handleClick}>
        <p id='card-todo-name'>{props.todoName}</p>
        <p id='card-todo-date'>{props.todoDate}</p>
        <p id='card-todo-time'>{props.todoTime}</p>
      </div>
      {showDeleteCard && <DeleteCard id={props.id} todoName={props.todoName} closePopup={closeDeletePopup} editTodo={editTodo} deleteTodo={deleteTodo} />}
    </div>
  )
}
