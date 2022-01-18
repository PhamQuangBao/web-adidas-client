import React, { Component } from 'react'

function Colors(props) {
    const lis_color = props.colors

    return (
        <div className="colors">
            {
                lis_color.map((color, index) => (
                    <button key={index} style={{ background: color }}></button>
                ))
            }
        </div>
    )
}

export default Colors
