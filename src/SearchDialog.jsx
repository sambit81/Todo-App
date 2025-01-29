import React, { useState, useEffect, useRef } from 'react';
import {
  Dialog, DialogTitle, DialogContent, TextField, Divider,
  List, ListItem, ListItemText, IconButton,
  ListItemButton,
  ListItemIcon,
  Box
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';
import Typography from '@mui/material/Typography';

import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import { BsArrowReturnLeft } from "react-icons/bs";
import Chip from '@mui/material/Chip';
import NoData from './NoData';
import DisplayList from './DisplayList';

export default function SearchDialog(props) {
  const [open, setOpen] = useState(true);
  const [searchText, setSearchText] = useState('');
  const [leftArrow, setLeftArrow] = useState(null);
  const [recentSearches, setRecentSearches] = useState(() => {
    const saved = localStorage.getItem('recentSearches');
    return saved == null ? [] : JSON.parse(saved);
  });

  const inputRef = useRef(null);
  useEffect(() => {
    const timer = setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus(); // Focus explicitly
      }
    }, 100); // Small delay to ensure dialog rendering is complete

    return () => clearTimeout(timer); // Cleanup timeout
  }, [open]);
  /**
   *  Focus Trap Issue: Material-UI Dialog traps focus for accessibility purposes.
      Delayed Focus: By delaying focus slightly using setTimeout, we ensure the focus is applied after the dialog is rendered and the focus trap mechanism is initialized.
      inputRef: Explicitly targets the input element to apply focus.
   */
  const todos = JSON.parse(props.todos); // List of todos
  
  // Filter todos based on search
  const filteredTodos = todos.filter(todo =>
    searchText.length !== 0 && todo.name.toLowerCase().includes(searchText.toLowerCase())
  );

  function handleListItemClick(todo, id, name) {
    const saved = localStorage.getItem('recentSearches');

    let prevValues = [];
    if (saved !== null) {
      prevValues = JSON.parse(saved);
    }
    
    prevValues = prevValues.filter((value) => value.id !== todo.id);
    let values = saved == null ? [todo] : [todo, ...prevValues];
    values = values.slice(0, 5);  
    localStorage.setItem('recentSearches', JSON.stringify(values));
    setRecentSearches(values);
    handleClose();
    props.handleEditDialog(id, name);
  }

  function handleClose() {
    props.onClose();
    setOpen(false);
  }

  return (
    <Dialog open={open} onClose={handleClose} fullWidth PaperProps={{ sx: { borderRadius: "10px" } }} >
      <DialogTitle sx={{ padding: 0 }}>
        <TextField
          fullWidth
          inputRef={inputRef}
          placeholder="Search todos..."
          variant="outlined"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          sx={{
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                border: "none", // Removes the border completely
                borderRadius: '10px',
              },
            },
          }}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: "#000" }} />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <Chip
                    label="esc"
                    variant="outlined"
                    onClick={handleClose}
                    sx={{
                      all: 'unset',
                      fontSize: '0.75rem',
                      fontWeight: 'bold',
                      lineHeight: '19px',
                      marginLeft: '20px',
                      backgroundColor: 'rgb(255, 255, 255)',
                      borderWidth: '1px',
                      borderStyle: 'solid',
                      borderColor: 'rgb(223, 226, 231)',
                      borderImage: 'initial',
                      padding: '0px 4px',
                      borderRadius: '7px',
                      textTransform: 'none',
                      '.MuiChip-label': {
                        padding: '0px',
                      },
                      '&:hover': {
                        cursor: 'pointer',
                      },
                    }}
                  />
                </InputAdornment>
              ),
            },
          }}
        /></DialogTitle>
      <DialogContent sx={{ padding: '0' }}>
        {/* Divider */}
        <Divider style={{ margin: '0' }} />

        {/* Todo List */}
        {filteredTodos.length > 0 ? (<DisplayList todos={JSON.stringify(filteredTodos)} handleClick={handleListItemClick} />) : (searchText.length > 0 ? (<NoData imgSrc="./src/assets/undraw_searching_no1g.svg" text="No todos found!" />) : (recentSearches.length !== 0 ? (<div><p style={{ color: "#555", fontFamily: "Helvetica, Arial, sans-serif", fontSize: "18px", margin: "18px"}}>Recent Searches</p><DisplayList todos={JSON.stringify(recentSearches)} handleClick={handleListItemClick} /></div>) : (<NoData imgSrc="./src/assets/undraw_search_vimp.svg" text="No recent searches!" />)))}
      </DialogContent>
    </Dialog>
  );
}