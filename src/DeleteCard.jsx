import React, { useState } from 'react'

export default function DeleteCard(props) {
    const [edit, setEdit] = useState(false);
    const [todoName, setTodoName] = useState(props.todoName);
    const [originalTodoName, setOriginalTodoName] = useState(props.todoName);

    function deleteTodo() {
        props.deleteTodo(props.id);
        //props.closePopup();
    }

    function editTodo() {
        setEdit(true);
    }

    function cancel() {
        setEdit(false);
        setTodoName(originalTodoName);
    }

    function saveTodo() {
        if( todoName.length !== 0 ) {
            //props.deleteTodo(props.id);
            props.editTodo(props.id, todoName);
            props.closePopup();
        }
    }

    function updateTodoName(event) {
        const newValue = event.target.value;
        setTodoName(newValue);
    }

    return (
        <div className='popup-todo' onClick={(event) => { event.stopPropagation(); }}>
            <div className='popup-container'>
                <div id='heading-top'>
                    <span id='close-button' class="material-symbols-outlined" onClick={(event) => {
                        event.stopPropagation();
                        props.closePopup();
                    }}>
                        close
                    </span>
                </div>
                { !edit && <label for='todo-name' id='label-todo'>{props.todoName}</label> }
                { edit && <input type="text" id='todo-name' name='todo-name' placeholder='Enter text' required autoFocus spellCheck='false' onChange={updateTodoName} value={todoName} style={{ marginTop: "10px" }}/> }
                {!edit && <div id='button-div-delete' style={{ justifyContent: "end" }}>
                    <button id='todo-submit' onClick={editTodo}>Edit</button>
                    <button id='todo-submit' onClick={deleteTodo} style={{ marginLeft: "0px" }}>Delete</button>
                </div>}
                {edit && <div id='button-div-edit' style={{ justifyContent: "end" }}>
                    <button id='todo-submit' onClick={cancel}>Cancel</button>
                    <button id='todo-submit' onClick={saveTodo} style={{ marginLeft: "0px" }}>Save</button>
                </div>}
            </div>
        </div>
    )
}
