import React, { Component } from 'react'
import { DataContext } from '../Context'
import { Link } from 'react-router-dom'
import Sizepick from './Sizepick'
//import '../css/Details.css'
import '../css/Cart.css'

export class Cart extends Component {
    static contextType = DataContext;

    componentDidMount() {
        this.context.getTotal();
    }

    render() {
        const { cart, removeProductinCart, total } = this.context;
        // console.log("cart: ", cart)
        if (cart.length === 0) {
            return <h2 style={{ textAlign: "center" }}>Giỏ hàng</h2>
        }
        else {
            return (
                <div className="cart-product">
                    <div className="cart-product-col">
                        <div className="cart-listcartproduct">
                            <div className="col-product">
                                {
                                    cart.map(product => (
                                        <div className="card-detail-product" key={product.id}>
                                            <div>
                                                <img className="card-detail-product-img" src={product.image} alt="" />
                                            </div>

                                            <div className="card-detail-product-box">
                                                <div className="row">
                                                    <h3>{product.name}</h3>
                                                    <h3 className="card-row-price">{(product.price).toLocaleString('vi-VN')}VNĐ</h3>
                                                </div>
                                                <p>{product.Description}</p>
                                                {/* <p>{product.Content}</p> */}
                                                <div className="row-1">
                                                    <p>SIZE: {product.size}</p>
                                                    <p>SỐ LƯỢNG: {product.quantity}</p>
                                                </div>
                                            </div>
                                            <div className="card-detail-product-delete" onClick={() => removeProductinCart(product.id)}>X</div>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                        <div className="cart-product-col-total">
                            <div className="cart-total-row-1">ĐƠN HÀNG</div>
                            <div className="cart-total-row-2">
                                <h3>NHẬP MÃ KHUYẾN MÃI</h3>
                                <input type="text" className="cart-product-discount"/>
                            </div>
                            <div className="cart-total-row-3">
                                <div className="cart-total-chil-row-3">
                                    <h3>Đơn hàng</h3>
                                    <h3>{total.toLocaleString('vi-VN')} VNĐ</h3>
                                </div>
                                <div className="cart-total-chil-row-3">
                                    <h3>Giảm</h3>
                                    <h3>0 VNĐ</h3>
                                </div>
                            </div>
                            <div className="cart-total-row-4">
                                <h3>TẠM TÍNH:</h3>
                                <h3>{total.toLocaleString('vi-VN')} VNĐ</h3>
                            </div>
                            <Link to="/payment" className="btn-primary">Thanh toán</Link>
                        </div>
                    </div>
                </div>
            )
        }

    }
}

export default Cart

