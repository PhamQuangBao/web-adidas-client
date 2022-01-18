import React, { Component } from 'react'
import '../css/Main.css'
import { Link } from 'react-router-dom'
import { DataContext } from '../Context';
//import {Video} from '../video/video-ultraboost.mp4'


export class Main extends Component {
    static contextType = DataContext;
    render() {

        const link = "https://brand.assets.adidas.com/video/upload/q_auto,vc_auto/video/upload/global%20brand%20publishing/Running/UB21%20ICONS%20fw21/running-fw21-ub21-icons-launch-hp-mh-large-animated-d.mp4"
        const { resultProductCategory } = this.context;
        return (
            <div className="main-container">
                <video autoPlay loop muted className="main-container-video">
                    <source src={link} type="video/mp4" className=''/>
                </video>
                <div className="main-container-row" >
                    <h2 >ULTRABOOST</h2>
                    <li className="" onClick={() => resultProductCategory(10)}>
                        <Link to={"/category/" + 10} className="main-container-row-btn" >XEM NGAY</Link>
                    </li>
                </div>
            </div>
        )
    }
}

export default Main
