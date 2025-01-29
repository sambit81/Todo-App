import { useState, useEffect, forwardRef, useRef } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import noData from './assets/undraw_no-data_ig65.svg';
import Card from './Card'
import './App.css'
import Time from './time'
import Chip from './Chip'
import DatePicker from "react-datepicker";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import "react-datepicker/dist/react-datepicker.css";
import Checkbox from './Checkbox'
import { Dialog, Tooltip } from '@mui/material';
import SearchDialog from './SearchDialog';
import SearchBar from './SearchBar';
import DeleteCard from './DeleteCard';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import DeleteAllTodos from './DeleteAllTodos';

function App() {
  const [todoText, setTodoText] = useState("");
  const [todoList, setTodoList] = useState([]);
  const [originalTodoList, setOriginalTodoList] = useState(() => {
    const saved = localStorage.getItem('todos');
    const initialValue = saved == null ? [] : JSON.parse(saved);
    return initialValue;
  });
  const [id, setId] = useState(() => {
    const id = localStorage.getItem('lastId');
    return id == null ? 0 : Number(id);
  });
  const [gridColumn, setGridColumn] = useState({ gridColumn: "span 2" });
  const [filterEnabled, setFilterEnabled] = useState(false);
  const [isAnyFilters, setIsAnyFilters] = useState(false);
  const [filters, setFilters] = useState([]);
  const [displayDatePicker, setDisplayDatePicker] = useState(true);
  const [dateFilters, setDateFilters] = useState([]);
  const [startDate, setStartDate] = useState(new Date());
  const [emptyTodoList, setEmptyTodoList] = useState(false);
  const [editDialog, setEditDialog] = useState(false);
  const [editDialogString, setEditDialogString] = useState('');
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [cardOpen, setCardOpen] = useState(false);

  let editId = '';
  let editName = '';

  const datePickerRef = useRef(null);

  const buttonRef = useRef();

  const [isOpen, setIsOpen] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  const openDatePicker = () => setIsOpen(true);
  const closeDatePicker = () => setIsOpen(false);

  let filterByDate = false;

  useEffect(() => {
    function keyPressHandler(event) {
      if (event.ctrlKey && (event.key === 'k' || event.key === 'K')) {
        event.preventDefault();
        const popup = document.querySelector(".popup-todo");
        if (!calendarOpen && popup.classList.contains('hidden') && !cardOpen) {
          handleSearchBarClick();
        }
      }
    }

    // Add event listener on mount
    document.addEventListener('keydown', keyPressHandler);

    // Cleanup event listener on unmount
    return () => {
      document.removeEventListener('keydown', keyPressHandler);
    };
  }, [calendarOpen, cardOpen]);

  useEffect(() => {
    if (todoList.length === 0) {
      setEmptyTodoList(true);
    } else {
      setEmptyTodoList(false);
    }
  }, [todoList]);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(originalTodoList));
    if (filters.length === 0) {
      originalTodoList.length === 0 ? setEmptyTodoList(true) : setTodoList(originalTodoList);
    } else {
      if (dateFilters.length !== 0) {
        applyDateFilters();
      } else {
        handleCheckboxClick();
      }
    }
  }, [originalTodoList]); // Sync whenever `originalTodoList` changes

  useEffect(() => {
    applyDateFilters();
  }, [dateFilters])

  useEffect(() => {
    if (editDialogString !== '') {
      setEditDialog(!editDialog);
    }
  }, [editDialogString]);

  function handleEditDialog(id, name) {
    setEditDialogString(id + ' ' + name);
  }

  function handleChange(event) {
    if (!document.getElementById('button-div-inner-div').classList.contains('hidden')) {
      document.getElementById('button-div-inner-div').classList.add('hidden');
    }
    const newTodoText = event.target.value;
    setTodoText(newTodoText);
  }

  function addTodo() {
    if (todoText.length === 0) {
      document.getElementById('button-div-inner-div').classList.toggle('hidden');
      return;
    }
    const text = todoText;
    setOriginalTodoList((prevValue) => {
      const newItem = {
        id: id,
        name: text,
        date: `${Time.getWeekDayName()}, ${Time.getDay()} ${Time.getMonth()} ${Time.getYear()}`,
        time: `${Time.getTime('12')}`
      };
      setId(id + 1);
      localStorage.setItem('lastId', id + 1);
      return [newItem, ...prevValue];
    });
    setTodoText("");
    document.querySelector(".popup-todo").classList.toggle('hidden');
  }

  function deleteTodo(id) {
    const saved = localStorage.getItem('recentSearches');
    if (saved !== null) {
      let prevValues = JSON.parse(saved);
      prevValues = prevValues.filter((value) => value.id !== id);
      localStorage.setItem('recentSearches', JSON.stringify(prevValues));
    }
    setOriginalTodoList((prevValue) => {
      return prevValue.filter((todo) => todo.id !== id);
    });
  }

  function editTodo(id, value) {
    const newItem = {
      id: id,
      name: value,
      date: `${Time.getWeekDayName()}, ${Time.getDay()} ${Time.getMonth()} ${Time.getYear()}`,
      time: `${Time.getTime('12')}`
    };

    const saved = localStorage.getItem('recentSearches');
    if (saved !== null) {
      let savedTodos = JSON.parse(saved);
      let index = savedTodos.findIndex((todo) => todo.id === id);
      if (index !== -1) {
        savedTodos[index] = newItem;
        localStorage.setItem('recentSearches', JSON.stringify(savedTodos));
      }
    }

    setOriginalTodoList((prevValue) => {
      const list = prevValue.filter((todo) => todo.id !== id);
      return [newItem, ...list];
    });
  }

  function handleFilterClick() {
    if (filterEnabled === true) {
      setGridColumn({ gridColumn: "span 2" });
      document.querySelector("#sidebar").style.display = "none";
    } else {
      setGridColumn({ gridColumn: 2 });
      //setGridColumn({ gridTemplateColumns: sidebarOpen ? "250px auto" : "0px auto" });
      document.querySelector("#sidebar").style.display = "";
    }
    setFilterEnabled(!filterEnabled);
    document.querySelector("#filter").classList.toggle("filter-checked");
  }

  function handleDateFilterClick() {
    setDisplayDatePicker(!displayDatePicker);
  }

  function handleDateClick(selectedDate) {
    // Here we are setting its value to true and in handleClearAll it is also true. Once it rerenders the value again false;
    // That's why when Clear all is clicked it clears the filters.
    filterByDate = true;
    const dateArray = selectedDate.split("/");
    handleClearAll();

    const monthNameArr = {
      "01": "January", "1": "January",
      "02": "February", "2": "February",
      "03": "March", "3": "March",
      "04": "April", "4": "April",
      "05": "May", "5": "May",
      "06": "June", "6": "June",
      "07": "July", "7": "July",
      "08": "August", "8": "August",
      "09": "September", "9": "September",
      "10": "October",
      "11": "November",
      "12": "December"
    };

    const date = `${dateArray[0]} ${monthNameArr[dateArray[1]]} ${dateArray[2]}`;
    setDateFilters((prevValue) => {
      if (prevValue.includes(date)) {
        return prevValue;
      } else {
        return [date, ...prevValue];
      }
    })
  }

  function sidebarClose() {
    setGridColumn({ gridColumn: "span 2" });
    document.querySelector("#sidebar").style.display = "none";
    document.querySelector("#filter").classList.toggle("filter-checked");
    setFilterEnabled(!filterEnabled);
  }
  
  function handleCheckboxClick() {
    let maxDays = 0;
    let checkedSomething = false;
    let filters = [];

    setDateFilters([]);
    setIsAnyFilters(false);
    setFilters([]);

    const today = document.querySelector("#today");
    const last7 = document.querySelector("#last7");
    const last30 = document.querySelector("#last30");
    const last180 = document.querySelector("#last180");
    const last365 = document.querySelector("#last365");

    if (today.checked === true) {
      maxDays = 0;
      checkedSomething = true;
      filters.push('Today');
    }

    if (last7.checked === true) {
      maxDays = 7;
      checkedSomething = true;
      filters.push('Last 7 days');
    }

    if (last30.checked === true) {
      maxDays = 30;
      checkedSomething = true;
      filters.push('Last 30 days');
    }

    if (last180.checked === true) {
      maxDays = 180;
      checkedSomething = true;
      filters.push('Last 6 months');
    }

    if (last365.checked === true) {
      maxDays = 365;
      checkedSomething = true;
      filters.push('Last year');
    }

    if (!checkedSomething) {
      setTodoList(originalTodoList);
      return;
    }

    setFilters(filters);
    setIsAnyFilters(true);

    filterList(maxDays);
  }

  function handleClearAll() {
    if (filterByDate === false) {
      setFilters([]);
      setDateFilters([]);
      setIsAnyFilters(false);
      setTodoList(originalTodoList);
    }

    const today = document.querySelector("#today");
    const last7 = document.querySelector("#last7");
    const last30 = document.querySelector("#last30");
    const last180 = document.querySelector("#last180");
    const last365 = document.querySelector("#last365");

    today.checked = false;
    last7.checked = false;
    last30.checked = false;
    last180.checked = false;
    last365.checked = false;
  }

  function removeFilter(id) {
    if (dateFilters.length !== 0) {
      if (dateFilters.length === 1) {
        handleClearAll();
        return;
      }

      setDateFilters((prevValue) => {
        return prevValue.filter((filter, index) => {
          if (index !== id) {
            return true;
          } else {
            return false;
          }
        });
      })
      return;
    }
    if (filters.length === 1) {
      handleClearAll();
      return;
    }

    let maxDays = 0;

    const today = document.querySelector("#today");
    const last7 = document.querySelector("#last7");
    const last30 = document.querySelector("#last30");
    const last180 = document.querySelector("#last180");
    const last365 = document.querySelector("#last365");


    setFilters((prevValue) => {
      return prevValue.filter((filter, index) => {
        if (index !== id) {
          if (filter === 'Today') {
            maxDays = Math.max(0, maxDays);
          } else if (filter === 'Last 7 days') {
            maxDays = Math.max(7, maxDays);
          } else if (filter === 'Last 30 days') {
            maxDays = Math.max(30, maxDays);
          } else if (filter === 'Last 6 months') {
            maxDays = Math.max(180, maxDays);
          } else if (filter === 'Last year') {
            maxDays = Math.max(365, maxDays);
          }
          return true;
        } else {
          if (filter === 'Today') {
            today.checked = false;
          } else if (filter === 'Last 7 days') {
            last7.checked = false;
          } else if (filter === 'Last 30 days') {
            last30.checked = false;
          } else if (filter === 'Last 6 months') {
            last180.checked = false;
          } else if (filter === 'Last year') {
            last365.checked = false;
          }
          return false;
        }
      });
    });

    filterList(maxDays);
  }

  function filterList(maxDays) {
    const filteredList = originalTodoList.filter((todo) => {
      const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
      let todoDate = todo.date.split(' ');
      const monthNameArr = {
        "January": 0,
        "February": 1,
        "March": 2,
        "April": 3,
        "May": 4,
        "June": 5,
        "July": 6,
        "August": 7,
        "September": 8,
        "October": 9,
        "November": 10,
        "December": 11
      };
      const year = todoDate[3];
      const month = monthNameArr[todoDate[2]];
      const day = todoDate[1];

      const date = new Date();
      const firstDate = new Date(Number(year), Number(month), Number(day));
      const secondDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());

      const diffDays = Math.round(Math.abs((firstDate - secondDate) / oneDay));

      if (diffDays <= maxDays) {
        return true;
      } else {
        return false;
      }
    });
    setTodoList(filteredList);
  }

  function applyDateFilters() {
    if (dateFilters.length !== 0) { // So that it should not execute on first render
      setFilters(dateFilters);
      setIsAnyFilters(true);

      const filteredList = originalTodoList.filter((todo) => {
        const dateArray = todo.date.split(" ");
        const dateTodo = `${dateArray[1]} ${dateArray[2]} ${dateArray[3]}`;

        if (dateFilters.includes(dateTodo)) {
          return true;
        } else {
          return false;
        }
      });
      setTodoList(filteredList);
    }
  }

  function closeDeletePopup() {
    setEditDialogString('close');
  }

  function closePopupAfterDelete(id) {
    closeDeletePopup();
    deleteTodo(id);
  }

  const DatePickerCustomInput = forwardRef(
    ({ value, onClick, onKeyDown }, ref) => (
      <Tooltip title="Filter by date" arrow>
        <button id="filter-date" onClick={onClick} ref={ref} onKeyDown={onKeyDown}>
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "2px" }}>
            <span className="material-symbols-outlined" style={{ margin: 0, fontSize: "18px" }}>
              calendar_month
            </span>
            <p style={{ margin: 0 }}>{value || "Filter by date"}</p>
          </div>
        </button>
      </Tooltip>
    )
  );

  function handleSearchBarClick() {
    setOpenDialog(!openDialog);
    buttonRef.current?.blur();
  }

  function handleCardOpen() {
    setCardOpen(!cardOpen);
  }

  function handleDeleteAll() {
    setOriginalTodoList([]);
    setId(0);
    localStorage.setItem('lastId', 0);
    localStorage.setItem('recentSearches', JSON.stringify([]));
  }

  return (
    <div>
      <div className='popup-todo hidden' onClick={(event) => {
        const popupForm = document.querySelector(".popup-todo");
        if (event.target === popupForm) {
          popupForm.classList.toggle('hidden');
        }
      }}>
        <div className='popup-container'>
          <div id='heading-top'>
            <span id='close-button' class="material-symbols-outlined" onClick={() => {
              document.querySelector(".popup-todo").classList.toggle("hidden");
            }}>
              close
            </span>
          </div>
          <label for='todo-name' id='label-todo'>New Todo</label>
          <input type="text" id='todo-name' name='todo-name' placeholder='Enter text' required autoFocus spellCheck='false' value={todoText} onChange={handleChange} />
          <div id='button-div'>
            <div id='button-div-inner-div' className='hidden'>
              <span class="material-symbols-outlined">
                error
              </span>
              <p>
                Empty todo
              </p>
            </div>
            <button id='todo-submit' onClick={addTodo}>Add</button>
          </div>
        </div>
      </div>
      <div className='navbar'>
        <header>
          <h1 id='title'>Todo App</h1>
          <div className='header-right'>
            <SearchBar onClick={handleSearchBarClick} buttonRef={buttonRef} />
            <DeleteAllTodos todosLength={originalTodoList.length} handleDeleteAll={handleDeleteAll} />
          </div>
        </header>
      </div>

      <Tooltip title="Add new todo" arrow>
        <div style={{ margin: "0px", top: "auto", left: "auto", right: "20px", bottom: "20px", position: "fixed" }}>
          <Fab color="primary" aria-label="add" onClick={() => { document.querySelector(".popup-todo").classList.toggle('hidden'); }}>
            <AddIcon />
          </Fab>
        </div>
      </Tooltip>


      <div className='main-container'>
        <div id="sidebar" className="w3-sidebar w3-bar-block w3-card w3-animate-left" style={{ display: "none" }}>
          <div id='checkbox-close'>
            <span class="material-symbols-outlined" style={{ cursor: "pointer" }} onClick={sidebarClose}>
              close
            </span>
          </div>
          <div id='checkbox'>
            <Checkbox name="today" text="Today" click={handleCheckboxClick} />
            <Checkbox name="last7" text="Last 7 days" click={handleCheckboxClick} />
            <Checkbox name="last30" text="Last 30 days" click={handleCheckboxClick} />
            <Checkbox name="last180" text="Last 6 months" click={handleCheckboxClick} />
            <Checkbox name="last365" text="Last year" click={handleCheckboxClick} />
            <hr />

            <div className="customDatePickerWidth">
              <DatePicker selected={startDate}
                onCalendarOpen={() => setCalendarOpen(true)}
                onCalendarClose={() => setCalendarOpen(false)}
                onChange={(date) => {
                  const result = date.toString();
                  let dateNumber = date.getDate();
                  if (dateNumber < 10) {
                    dateNumber = '0' + dateNumber;
                  }
                  const finalResult = `${dateNumber}/${date.getMonth() + 1}/${date.getFullYear()}`;
                  handleDateClick(finalResult);
                  setStartDate(date)
                }} customInput={<DatePickerCustomInput />} dateFormat="dd/MM/yyyy" withPortal />
            </div>
          </div>
        </div>
        <div id="content" style={gridColumn}>
          <div id='button-div-filter'>
            <button id='filter' onClick={handleFilterClick}>
              <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "2px" }}>
                {filterEnabled ? <span className="material-symbols-outlined" style={{ margin: 0, fontSize: "18px" }}>
                  close
                </span> : <span className="material-symbols-outlined" style={{ margin: 0, fontSize: "18px" }}>
                  tune
                </span>}
                <p style={{ margin: 0 }}>Filters</p>
              </div>
            </button>
            <section className='filter-chips'>
              {filters.map((filter, index) => {
                return <Chip key={index} id={index} filterName={filter} removeFilter={removeFilter} />
              })}
              {isAnyFilters && <p id='filter-clear-all' onClick={handleClearAll}>Clear all</p>}
            </section>
          </div>
          {openDialog && <SearchDialog onClose={handleSearchBarClick} todos={JSON.stringify(originalTodoList)} handleEditDialog={handleEditDialog} />}
          {editDialogString !== 'close' && editDialog && <DeleteCard id={Number(editDialogString.substring(0, editDialogString.indexOf(' ')))} todoName={editDialogString.substring(editDialogString.indexOf(' ') + 1)} closePopup={closeDeletePopup} editTodo={editTodo} deleteTodo={closePopupAfterDelete} />}
          {emptyTodoList ? <div id='empty-todo-state'>
            <img src="./src/assets/undraw_no-data_ig65.svg" alt="" />
            <p>No todos to show. Add new tasks!</p>
          </div> : <div className='card-container'>
            {todoList.map((todo) => <Card key={todo.id} id={todo.id} todoName={todo.name} todoDate={todo.date} todoTime={todo.time} editTodo={editTodo} deleteTodo={deleteTodo} onCardClick={handleCardOpen} />)}
          </div>}
        </div>
      </div>
    </div>
  )
}

export default App
