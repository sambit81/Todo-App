import React, {useState} from 'react'
import { List, ListItemButton, ListItemIcon, ListItemText, ListItem, Typography } from '@mui/material';
import TagIcon from '@mui/icons-material/Tag';
import { BsArrowReturnLeft } from "react-icons/bs";

export default function DisplayList(props) {

    const [leftArrow, setLeftArrow] = useState(null);
    const filteredTodos = JSON.parse(props.todos); // List of todos
    return (
        <List>
            {filteredTodos.map((todo, index) => (
                <ListItemButton key={index} onClick={() => props.handleClick(todo, todo.id, todo.name)}
                    onMouseOver={() => setLeftArrow(index)}
                    onMouseOut={() => setLeftArrow(null)}
                    sx={{
                        '&:hover': {
                            borderColor: 'rgb(102 179 255)',
                            backgroundColor: 'rgb(235 245 255)',
                            color: '#006BD6'
                        },
                        backgroundColor: 'rgba(246, 247, 248, 0.4)',
                        borderRadius: '8px',
                        marginLeft: '15px',
                        marginRight: '15px',
                        marginBottom: '10px',
                        padding: '0px',
                        border: '1px solid rgba(232, 234, 238, 0.5)',
                        transition: 'all 0.3s ease',
                        '&:hover .MuiListItemIcon-root': { // Hover style for ListItemIcon
                            color: '#006BD6', // Change icon color
                        },
                        '&:hover .secondary-text': {
                            color: '#006BD6', // Change secondary text color
                        },
                    }}
                >
                    <ListItem key={index} secondaryAction={
                        leftArrow === index && <BsArrowReturnLeft className='left-arrow-curved' />
                    }>
                        <ListItemIcon>
                            <TagIcon />
                        </ListItemIcon>
                        <ListItemText primary={todo.name} secondary={
                            <React.Fragment>
                                <Typography
                                    component="span"
                                    variant='body2'
                                    className='secondary-text'>
                                    {todo.date}
                                </Typography>
                            </React.Fragment>
                        } />
                    </ListItem>
                </ListItemButton>
            ))}
        </List>
    )
}
