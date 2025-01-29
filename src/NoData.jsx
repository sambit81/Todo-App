import React from 'react'
import { Box } from '@mui/material'

export default function (props) {
  return (
    <div>
        <Box sx={{ backgroundColor: 'rgba(246, 247, 248, 0.4)' }}>
          <div id='empty-todo-state' style={{ marginTop: '100px' }}>
            <img src={props.imgSrc} alt="" />
            <p>{props.text}</p>
          </div>
        </Box>
    </div>
  )
}
