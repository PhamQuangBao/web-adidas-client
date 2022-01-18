import React, { Component } from "react";
import Iconuser from './svg/user-regular.svg'
// import Yourcart from './img/shopping-cart (1).png'
import Logo from './img/bieu-tuong-adidas.jpg'
import { Link } from "react-router-dom";
import { DataContext } from './Context'
import List_products from "./section/List_products";
import Sider_Notify from '../components/page/Slider_Notify'
import './css/Header.css'
import axios from 'axios';

export class Header extends Component {
    static contextType = DataContext;

    state = {
        toggle: false,
        search: [],
        name_search: "",
        categorys: [],
        category_adi: [],
        category_adi_neo: [],
        category_adi_football: [],
        category_adi_basketball: [],
    }
    cutUrl(string, val) {
        //const value = this.state.value_search;

        //const temp_name = ""
        var temp = string
        var len = temp.length;
        var b = temp.search(val)

        //list_index.push(temp.slice(0, b))
        temp = temp.slice(b, len)

        return temp
    }
    setSearch = (search) => {

        const products = this.context.products
        // console.log("Here: ", products)
        let matches = []
        try {
            matches = products.filter(state => {
                const regex = new RegExp(`${search}`, "gi")//gi: khong phan biet chu hoa va thuong
                return state.name.match(regex);//|| state.description.match(regex) || state.specifications.match(regex)
            });
        }
        catch (er){
            
        }
        //console.log("Here: ", matches)

        this.setState({ search: matches })
        try {
            if (search != "") {
                const temp_seracht = this.cutUrl(matches[0].name, search)
                this.setState({ name_search: temp_seracht })
            }
            else {
                this.setState({ name_search: "" })
            }
        }
        catch (error) {
            this.setState({ name_search: "" })
        }
        if (search.length === 0) {
            this.setState({ search: [] })
        }
    }
    reset_search = () => {
        this.setState({ search: [] })
        this.setState({ name_search: "" })
    }
    componentDidMount() {
        //http://127.0.0.1:8000/api/category/10/product
        //https://shop-adidas.herokuapp.com/api/
        //http://127.0.0.1:8000/api/category
        axios.get('category')
            .then(res => {
                //console.log("Data: ", res.length)
                //category = res.data.results
                this.setState({
                    categorys: res.data.results
                });
                for (const [key, value] of Object.entries(res.data.results)) {
                    for (const [key1, value1] of Object.entries(value)) {
                        if (key1 == "subs") {
                            for (const [key2, value2] of Object.entries(value1)) {
                        
                                switch(value2.type){
                                    case 1:
                                        this.setState(i => ({
                                            category_adi: [...i.category_adi, value2]
                                        }))
                                        break;
                                    case 2:
                                        this.setState(i => ({
                                            category_adi_neo: [...i.category_adi_neo, value2]
                                        }))
                                        break;
                                    case 3:
                                        this.setState(i => ({
                                            category_adi_football: [...i.category_adi_football, value2]
                                        }))
                                        break;
                                    case 4:
                                        this.setState(i => ({
                                            category_adi_basketball: [...i.category_adi_basketball, value2]
                                        }))
                                        break;
                                }
                            }

                        }
                    }
                }

            }).catch(err => {
                console.log("Err: ", err)
            });


    };

    render() {
        const { toggle, categorys, category_adi, category_adi_neo, category_adi_football, category_adi_basketball } = this.state;
        const { cart, resultProductCategory } = this.context;
        const user = this.context.user;

        return (
            <header>
                <div className="header-container">
                    <div className="header-menu">
                        <nav>
                            <ul className="menu">
                                <li><Link to="/checkorder">Tra cứu đơn hàng</Link></li>
                                <li>
                                    <div className="icon-cart">

                                        <Link to="/cart">Giỏ hàng</Link>
                                        <span>{cart.length}</span>
                                    </div>
                                </li>
                                <li>
                                    <img src={Iconuser} alt="" width="12" />
                                    <Link to="/login">{user.length === 0 ? "ĐĂNG NHẬP" : user.name}</Link>
                                </li>
                            </ul>
                        </nav>
                    </div>
                    <div className="navbar-center" onClick={() => this.reset_search()} >
                        <div className="navbar-header-logo">
                            <Link to="/home" className="navbar-header-logo-link">
                                <img src={Logo} alt="" width="100" />
                            </Link>

                        </div>
                        {/* -------------------------------------------- */}
                        <div className="collapse-navbar-collapse" >
                            <ul className="nav-navbar">
                                <li key="1" className="product-category">
                                    {/* <Link to={`/category/${1}`}>Adidas</Link> */}
                                    <a>Adidas</a>
                                    <div className="subs-cate-adidas">
                                        {/* <Categoryadidas category_adi={category_adi}></Categoryadidas> */}
                                        <ul className="row-category-adidas">
                                            {
                                                category_adi.map(subs => (
                                                    <li key={subs.id} className="chil-row-adidas" onClick={() => resultProductCategory(subs.id)}>
                                                        <Link to={`/category/${subs.id}`}>{subs.name}</Link>
                                                    </li>
                                                ))

                                            }
                                        </ul>
                                    </div>
                                </li>
                                <li key="2" className="product-category">
                                    {/* <Link to={`/category/${2}`}>Adidas neo</Link> */}
                                    <a>Adidas neo</a>
                                    <div className="subs-cate-adidas">
                                        <ul className="row-category-adidas">
                                            {
                                                category_adi_neo.map(subs => (

                                                    <li key={subs.id} className="chil-row-adidas" onClick={() => resultProductCategory(subs.id)}>
                                                        <Link to={"/category/" + subs.id}>{subs.name}</Link>
                                                    </li>
                                                ))
                                            }
                                        </ul>
                                    </div>
                                </li>
                                <li key="3" className="product-category">
                                    {/* <Link to={`/category/${3}`}>Adidas bóng đá</Link> */}
                                    <a>Adidas bóng đá</a>
                                    <div className="subs-cate-adidas">
                                        <ul className="row-category-adidas">
                                            {
                                                category_adi_football.map(subs => (

                                                    <li key={subs.id} className="chil-row-adidas" onClick={() => resultProductCategory(subs.id)}>
                                                        <Link to={"/category/" + subs.id}>{subs.name}</Link>
                                                    </li>
                                                ))

                                            }
                                        </ul>
                                    </div>
                                </li>
                                <li key="4" className="product-category">
                                    {/* <Link to={`/category/${4}`}>Adidas bóng rổ</Link> */}
                                    <a>Adidas bóng rổ</a>
                                    <div className="subs-cate-adidas">
                                        <ul className="row-category-adidas">
                                            {
                                                category_adi_basketball.map(subs => (

                                                    <li key={subs.id} className="chil-row-adidas" onClick={() => resultProductCategory(subs.id)}>
                                                        <Link to={"/category/" + subs.id}>{subs.name}</Link>
                                                    </li>
                                                ))

                                            }
                                        </ul>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <div className="button-search">
                            <div className="button-search-container">
                                <div className="search-autocomplete">{this.state.name_search}</div>
                                <input type="text" id="btn-header-search" className="btn-search" placeholder="Tìm kiếm"
                                    onChange={(e) => this.setSearch(e.target.value)}
                                />
                            </div>
                            {this.state.search && <List_products search_autocomplete={this.state.search} />}
                        </div>
                    </div>
                    <div className="title-new-context">
                        <div className="title-new-context-container">
                            {/* <Sider_Notify /> */}
                        </div>
                    </div>
                </div>
            </header>
        )
    }
}


export default Header