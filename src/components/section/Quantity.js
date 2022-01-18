import React, { useContext, useState } from 'react'
import { DataContext } from '../Context';

function Quantity(props) {
    //const context = useContext(DataContext)

    const count = Array.from({ length: props.quantity >= 12 ? 12 : props.quantity }, (_, i) => i + 1)

    const [isActive, setIsActive] = useState(false);
    const [choose_quantity, setQuantity] = useState("");

    return (
        <div className="quantity-dropdown">

            <div className="quantity-dropdown-btn" onClick={(e) => setIsActive(!isActive)}>
                {choose_quantity}</div>

            {isActive && (
                <div className="quantity-dropdown-content">
                    {
                        count.map((item) => (
                            <button className="quantity-button-item"
                                onClick={(e) => {
                                    setIsActive(false);
                                    setQuantity(item);
                                    props.quantityCallback(item)
                                    //context.addQuantity(item);
                                }} key={item}>{item}</button>
                        ))
                    }
                </div>

            )}

        </div>
    )

}

export default Quantity
