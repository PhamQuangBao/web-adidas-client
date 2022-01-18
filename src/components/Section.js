import React, { Component } from 'react';
//import Products from './section/Products';
import Main from './section/Main';
import Details from './section/Details';
import Login from './section/Login';
import Cart from './section/Cart';
import Payment from './section/Payment';
import Category from './section/Category';
import Check_order from './section/Check_order';
import {Route} from "react-router-dom"



export class Section extends Component {
    render() {
        return(
            <section>
                {/* <Route path="/product" component={Products} exact/> */}
                <Route path="/home" component={Main} exact/>
                <Route path="/category/:id" component={Category} />
                <Route path="/product/:id" component={Details}/>
                <Route path="/cart" component={Cart}/>
                <Route path="/payment" component={Payment}/>
                <Route path="/checkorder" component={Check_order}/>
                <Route path="/login" component={Login}/>
                
            </section>
        )
    }
}

export default Section