import React, { useState } from 'react'
import Rating from './Rating'
import '../css/Comments.css'

function Comments(props) {
    const comments = props.comments
    return (
        <div className="user-commentfor-products-comments">
            <p className="user-commentfor-products-rating-col-3">({comments.length} đánh giá)</p>
            {
                comments.map((item, index) => (
                    <div className="user-commentfor-products-row" key={index}>
                        
                        <div className="user-commentfor-products-row-1">
                            <Rating value={item.star} val_width={15} />
                            <div className="user-commentfor-products-col-time">{(item.created_at).slice(0, 10)}</div>
                        </div>
                        <div className="user-commentfor-products-row-content">{item.content}</div>
                    </div>
                ))
            }
        </div>
    )

}

export default Comments
