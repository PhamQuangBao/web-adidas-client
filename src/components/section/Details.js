import React, { Component, useContext, useState } from 'react';
import { DataContext } from '../Context';
import { Link } from 'react-router-dom';
import Sizepick from './Sizepick'
import Colors from './Colors';
import Quantity from './Quantity';
import IconCateCart from '../img/category-cart.png'
import Image_SizeChart from '../img/size_adidas.jpg'
import Image_Slider from './Image_Slider';
import Related_products from './Related_products';
import StarRating from "./StarRating";
import Rating from './Rating';
import Comments from './Comments';
import axios from 'axios';
import ScrollToTop from '../ScrollToTop';
import '../css/Details.css'
// -------------------------------------
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


export class Details extends Component {
    static contextType = DataContext;
    //useContext(DataContext)
    state = {
        product: [],
        tem_product: [],
        category_products: [],
        specifications: [],
        category_id: 0,
        size: [],
        quantity: [],
        select_images: "",
        select_size: 0,
        select_quantity: 0,
        quantity_afchoo_size: 0,
        stars: 0,
        comments: [],
        showRating: false,
    }
    cutUrl(string) {
        var list_index = []
        var temp = string
        while (true) {
            var len = temp.length;
            var b = temp.search(";")
            if (b == -1) {
                list_index.push(temp.slice(b + 1, len))
                break;
            } else {
                list_index.push(temp.slice(0, b))
                temp = temp.slice(b + 1, len)
            }

        }
        return list_index
    }
    getProductDetailquerydb = () => {
        //console.log("iddd: ", this.props.match.params.id)
        axios.get('/product/' + this.props.match.params.id)
            .then(ress => {
                // console.log("Data product detail 1: ", ress.data.results)
                // setProducts(res.data.results)
                // this.setState({tem_product: res.data.results})

                const arr = []
                const obj_temp_quanti = {}
                var temp_size = 0
                for (const [key, val] of Object.entries(ress.data.results)) {
                    for (const [key1, val1] of Object.entries(val)) {
                        if (key1 == "detail_products") {
                            for (const [key2, val2] of Object.entries(val1)) {
                                //Vao trong tung item cua list detail_products
                                for (const [key3, val3] of Object.entries(val2)) {

                                    if (key3 == "size") {
                                        arr.push(val3)
                                        temp_size = val3
                                    }
                                    if (key3 == "quantity")
                                        obj_temp_quanti[temp_size] = val3
                                }
                            }
                        }
                        //Lay thong so ki thuat specifications
                        if (key1 == "specifications") {
                            const arr_specification = this.cutUrl(val1)
                            this.setState({ specifications: arr_specification })
                        }
                        //lay id category
                        if (key1 == "category_id") {
                            //this.setState({ category_id: val1 });
                            this.getProductCategory(val1)
                        }
                    }
                }
                this.setState({ product: ress.data.results, size: arr, quantity: obj_temp_quanti })


            }).catch(err => {
                console.log(err.data)
            });
    }
    getProductCategory = () => {
        const id = this.context.category_details;
        axios.get('category/' + id + '/product')
            .then(res => {
                //console.log("Data: ", res)
                // setProducts(res.data.results)
                this.setState({ category_products: res.data.results })
            }).catch(err => {
                console.log("Err: ", err)
            });
    }

    getQuantity = (size) => {
        const quantity = this.context.quantity_details;
        if (size != 0) {
            for (const [key, val] of Object.entries(quantity)) {//this.state.quantity
                if (key == size) {
                    //console.log("so luong sau khi chon size: ", val)
                    this.setState({ quantity_afchoo_size: val })

                    this.setState({ select_size: size })
                    //return val
                }
            }
        }
    }
    select_quantity = (quantity) => {
        if (quantity != 0) {
            this.setState({ select_quantity: quantity })
        }
    }
    getSelect_image = (url_image) => {
        this.setState({ select_images: url_image })
    }
    resetDetail = () => {
        this.setState({
            product: [],
            tem_product: [],
            category_products: [],
            specifications: [],
            category_id: 0,
            size: [],
            quantity: [],
            select_images: "",
            select_size: 0,
            select_quantity: 0,
            quantity_afchoo_size: 0
        })
    }
    // ---------------------------Rating for user-------------------------
    checkUser = () => {
        //localStorage.getItem('token')

        const user = this.context.user
        const comments = this.state.comments

        if (user.length != 0) {
            if (comments.length == 0) {
                this.openRatingStars()
            }
            else {
                // const check = comments.every(item => {
                //     return item.user_id = user.id
                // })
                // if (check) {
                //     alert("Bạn đã đánh giá sản phẩm này rồi.")
                //     // break;
                // } else {
                //     this.openRatingStars()
                // }
                for (let i = 0; i < comments.length; i++) {
                    if (user.id = comments[i].user_id) {
                        alert("Bạn đã đánh giá sản phẩm này rồi.")
                        // break;
                    }
                    else {
                        this.openRatingStars()
                    }

                }
            }
        }
        else {
            alert("Vui lòng đăng nhập để phản hồi sản phẩm")
        }
    }
    openRatingStars = () => {
        const show = this.state.showRating
        this.setState({ showRating: !show })
    }
    getCommentProduct = (id) => {

        axios.get('comment/' + id)
            .then(res => {
                if ((res.data.results).length != 0) {
                    const comment = res.data.results
                    //console.log("comment: ", comment)
                    var temp_stars = 0
                    for (let i = 0; i < comment.length; i++) {
                        temp_stars += parseInt(comment[i].star)

                    }
                    temp_stars = temp_stars / comment.length
                    this.setState({ stars: temp_stars, comments: comment })
                }
                else {
                    this.setState({ stars: 0 })
                }

            }).catch(err => {
                console.log("Err: ", err)

            });

    }

    componentDidMount() {
        this.getProductCategory
        this.getCommentProduct(this.props.match.params.id)
        //this.getProductDetailquerydb()
        // //this.getProduct()
        // //this.getProductCategory(this.state.category_id) this.props.match.params.id
    }

    render() {
        //const { product } = this.state;
        const select_images = this.state.select_images
        const comments = this.state.comments
        //const specification = this.state.specifications
        const cart = this.context.cart;

        //-------------------------------------
        const product = this.context.product_details;
        // console.log("comments: ", this.state.comments)
        const size = this.context.size_details;
        const specification = this.context.specifications_details;
        return (
            <>
                {
                    product.map(product => (
                        <div className="details" key={product.id}>
                            <div className="details-images-products">
                                <img className="image-details" src={select_images.length === 0 ? product.image : select_images} alt="" />
                                {/* <img className="image-details" src={product.image} alt="" /> */}
                                <Image_Slider list_image={product.image_list} imageCallback={this.getSelect_image} />
                            </div>
                            <div className="box">
                                <div className="row">
                                    <h2 className="details-box-name">{product.name}</h2>
                                    <span className="details-box-price">{(product.price).toLocaleString('vi-VN')} VNĐ</span>
                                </div>
                                <p>- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -</p>
                                <p className="details-box-label">Mô tả</p>
                                <p>{product.description}</p>
                                <p>- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  - -</p>
                                <p className="details-box-label">Thông số</p>
                                <ul className="details-box-specification-ul">
                                    {
                                        specification.map((item, index) => (
                                            <li key={index} className="details-box-specification-li">{item}</li>
                                        ))
                                    }
                                </ul>
                                <p>- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -</p>
                                <div className="row-pick">
                                    <p>SIZE:{this.context.selected_size}</p>
                                    <Sizepick size={size} sizeCallback={this.getQuantity} >{/*this.state.size*/}
                                    </Sizepick>
                                    <p>SỐ LƯỢNG</p>
                                    <Quantity quantity={this.state.quantity_afchoo_size} quantityCallback={this.select_quantity} />{/*this.state.quantity_afchoo_size*/}
                                </div>

                                <div className="btn_addcart">
                                    <button onClick={() => { this.context.addCart(product.id, this.state.select_size, this.state.select_quantity) }}>Thêm vào giỏ</button>
                                </div>
                                <div className="detail-size-chart">
                                    <div className="detail-size-chart-label">Cách chọn size giày</div>
                                    <img className="detail-size-chart-img" src={Image_SizeChart} alt="" />
                                </div>
                                {/* <Link onClick={() => this.context.addCart(product._id)} to="/cart" className="cart">
                                    Thêm vào giỏ
                                </Link> */}
                            </div>
                            <div className="detail-user-commentfor-products">
                                <div className="detail-user-commentfor-products-row">
                                    <p className="detail-user-commentfor-products-label">ĐÁNH GIÁ</p>

                                    {/* <p className="detail-user-commentfor-products-user-ratingstars"
                                        onClick={() => this.checkUser()}>phản hồi...</p>
                                    <StarRating showRating={this.state.showRating} setShowRating={this.openRatingStars} /> */}
                                </div>
                                <div className="detail-user-commentfor-products-rating">
                                    <p className="detail-user-commentfor-products-rating-col-1">{(this.state.stars).toFixed(1) == 0.0 ? 0 : (this.state.stars).toFixed(1)} trên 5</p>
                                    <div className="detail-user-commentfor-products-rating-col-2">
                                        <Rating value={this.state.stars} val_width={30} />
                                    </div>

                                </div>

                                <Comments comments={comments} />

                            </div>
                        </div>

                    ))
                }
                {/* {<div className="detail-related-products">
                    <h2 className="detail-related-products-lable">Sản phẩm liên quan</h2>
                    <Related_products category_product={this.state.category_products} />
                </div>} */}

                <div className="category-yourcart">
                    <span className="category-yourcart-count">{cart.length}</span>
                    <img src={IconCateCart} alt="" width="40" />
                    <div className="category-yourcart-showproducts">

                    </div>
                </div>
                <ScrollToTop />
            </>
        )
    }
}

export default Details