import React from 'react'

export default function (props) {
  return (
    <div>
        <input type="checkbox" id={props.name} name={props.name} value={props.name} onClick={props.click} />
        <label for={props.name}> {props.text}</label><br />
    </div>
  )
}
