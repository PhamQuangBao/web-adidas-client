// import React, { Component } from 'react'
// import { DataContext } from '../Context';

// export class Sizepick extends Component {
//     static contextType = DataContext;

//     constructor(props) {
//         super(props);
//         this.state = {
//             isActive: false
//         };
//     }
//     render() {
//         const { size } = this.props;
//         return (
//             <div className="dropdown">
//                 <div className="dropdown-btn" onClick={() => this.setState({ isActive: !this.state.isActive })}>
//                     {this.state.choose_size}</div>

//                 {this.state.isActive && (
//                     <div className="dropdown-content">
//                         {   
//                             size.map((size) => (
//                                 <button className="button-item"
//                                     onClick={(e) => {
//                                         this.setState({ isActive: !this.state.isActive })
//                                         this.setState({ choose_size: size })
//                                         this.context.addSize(choose_size)

//                                     }} key={size}>{size}</button>

//                             ))

//                         }

//                     </div>

//                 )}

//             </div>

//         )

//     }
// }


// export default Sizepick


import React, { useContext, useState } from 'react';
//import { DataContext } from '../Context';

function Sizepick(props) {

    //const selectd_size = useContext(DataContext)
    //const context = useContext(DataContext)

    const list_size = props.size;
    const sizeCallback = props.sizeCallback;
    //const id_product = props.id;
    //console.log("typeof: ", typeof (sizeCallback))
    const [isActive, setIsActive] = useState(false);
    const [choose_size, setSize] = useState("");

    //const setcallback = sizeCallback()

    // const setcallback = useState({
    //     if(sizeCallback) {
    //         console.log("sizepick selected size 2: ", size)
    //         sizeCallback(choose_size)

    //     }
    // })

    return (
        <div className="size-dropdown">
            <div className="size-dropdown-btn" onClick={(e) => setIsActive(!isActive)}>
                {choose_size}</div>

            {isActive && (
                <div className="size-dropdown-content">
                    {
                        list_size.map((item) => (
                            <button className="size-button-item"
                                onClick={(e) => {
                                    setIsActive(false);
                                    setSize(item);
                                    props.sizeCallback(item)
                                }} key={item}>{item}</button>

                        ))

                    }

                </div>

            )}

        </div>

    )
}
export default Sizepick