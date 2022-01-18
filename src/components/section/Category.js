import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { DataContext } from '../Context'
import axios from 'axios';
import '../css/Category.css'
import IconCateCart from '../img/category-cart.png'
import ScrollToTop from '../ScrollToTop';
// import '../css/bootstrap.css'


export class Category extends Component {
    static contextType = DataContext;
    state = {
        products: [],
    }

    // componentDidMount() {
    //     //this.querydb();
    //     //this.getproduct()
    // }
    // getproduct = () => {
    //     if (this.props.match.params.id){
    //         this.context.resultProductCategory(this.props.match.params.id)

    //         // const temp = this.context.category_product;
    //         // this.setState({products: temp})

    //     }
    // }
    querydb = () => {
        //http://127.0.0.1:8000/api/category/10/product
        //http://127.0.0.1:8000/api/product
        const temp = []
        //this.context.addProductsforCate(temp)
        if (this.props.match.params.id) {
            axios.get('category/' + this.props.match.params.id + '/product')
                .then(res => {
                    // console.log("Data: ", res.length)
                    this.setState({
                        products: res.data.results
                    });
                    //this.context.addProductsforCate(res.data.results)
                    //console.log("Data: ", res.data.results)
                }).catch(err => {
                    console.log("Err: ", err)
                });
        }

    }

    render() {

        //this.setState({products: []})
        // const { products } = this.state
        const products = this.context.category_product;
        const cart = this.context.cart;
        return (
            <div className="category-container">
                <div className="category-products" >
                    {
                        products.map(product => (
                            <div className="category-products-cart" key={product.id} onClick={()=> {this.context.getDetailProduct(product.id)}}>
                                <Link to={`/product/${product.id}`}>
                                    <img className="category-products-cart-img" src={product.image} />
                                </Link>
                                <div className="category-products-content">
                                    <h3 className="category-products-content-name">
                                        <Link to={`/product/${product.id}`}>{product.name}</Link>
                                    </h3>
                                    <span className="category-products-content-price">{(product.price).toLocaleString('vi-VN')} VNĐ</span>
                                    {/* <p>{product.description}</p> */}
                                    {/* <button onClick={() => this.context.addCart(product._id)}>Thêm vào giỏ</button> */}

                                </div>
                            </div>
                        ))
                    }
                </div>
                <div className="category-yourcart">
                    <span className="category-yourcart-count">{cart.length}</span>
                    <img src={IconCateCart} alt="" width="40" />
                    <div className="category-yourcart-showproducts">

                    </div>
                </div>
                <ScrollToTop/>
            </div>
            // <div className="category-products d-flex container" >
            //     {
            //         products.map(product => (
            //             <div className="card-product col-3 p-4 " key={product.id}>
            //                 <Link to={`/product/${product.id}`}>
            //                     <img className="img-product" src={product.image} />
            //                 </Link>
            //                 <div className="content">
            //                     <Link to={`/product/${product.id}`}>{product.name}</Link>
            //                     <br></br>
            //                     <span>{(product.price).toLocaleString('vi-VN')} VNĐ</span>
            //                     {/* <p>{product.description}</p> */}
            //                     {/* <button onClick={() => this.context.addCart(product._id)}>Thêm vào giỏ</button> */}

            //                 </div>
            //             </div>
            //         ))
            //     }
            // </div>
        )
    }
}

export default Category
