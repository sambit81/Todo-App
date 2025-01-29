import { Dialog, DialogTitle, DialogActions, Button } from '@mui/material'
import React from 'react'

export default function DeleteAllTodos(props) {
  const [open, setOpen] = React.useState(false);
  
  function handleClickOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  function handleDeleteAll() {
    props.handleDeleteAll();
    setOpen(false);
  }
  
  return (
    <div>
        <Button id="delete-all" sx={{opacity: props.todosLength == 0 ? "0.5" : "1"}} variant="text" onClick={handleClickOpen} disabled={props.todosLength == 0 ? true : false}>Delete all</Button>
        <Dialog open={open} onClose={handleClose} fullWidth={true} maxWidth={'xs'}>
            <DialogTitle>Delete all todos?</DialogTitle>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleDeleteAll} autoFocus>Delete</Button>
            </DialogActions>
        </Dialog>
    </div>
  )
}
