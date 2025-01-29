import * as React from 'react';
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';
import Chip from '@mui/material/Chip';

export default function (props) {
  function handleClick() {}
  return (
    <Button
      component="label"
      role={undefined}
      variant="contained"
      tabIndex={-1}
      startIcon={<SearchIcon />}
      disableRipple
      onClick={props.onClick}
      ref={props.buttonRef}
      sx={{
        '&:hover': {
          boxShadow: 'none',
          backgroundColor: '#F0F0F0',
        },
        backgroundColor: 'rgba(246, 247, 248, 0.6)',
        color: 'rgb(48, 55, 65)',
        boxShadow:
          'rgb(255, 255, 255) 0px 1px 0px inset, rgba(232, 234, 238, 0.4) 0px -1px 0px inset, rgba(223, 226, 231, 0.5) 0px 1px 2px 0px;',
        border: '1px solid rgb(223, 226, 231)',
        borderRadius: '12px',
        textTransform: 'none',
        fontFamily: 'Helvetica, Arial, sans-serif',
        fontSize: '14px',
      }}
    >
      Search...
      <Chip
        label="ctrl+K"
        variant="outlined"
        onClick={handleClick}
        clickable={false}
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
          }
        }}
      />
    </Button>
  );
}
