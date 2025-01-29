import React from 'react'

export default function Chip(props) {
    return (
        <div id='chip'>
            <p>{props.filterName}</p>
            <span className="material-symbols-outlined" onClick={() => props.removeFilter(props.id)}>
                close
            </span>
        </div>
    )
}
