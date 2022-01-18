import React, { Component } from 'react'
import { DataContext } from '../Context'
import '../css/Payment.css'
import Adress from './Adress';
import axios from 'axios';
import { Route, Redirect } from 'react-router-dom';

import { Toast, getFormatVnPaySource, getFormatVnPay_DateSource } from '../utils'


export class Payment extends Component {
    static contextType = DataContext;

    state = {
        user_name: "",
        user_email: "",
        user_address: "",
        user_phone: "",
        payment: "",
        shipping: "Giao hàng nhanh",
        //
        province: "",
        districts: "",
        wards: "",
        check_vnpay: false,
        url_vnpay: "",
        //check_vali_input: {},

    }
    componentDidMount() {


    }
    setName = (name) => {
        this.setState({ user_name: name })
    }
    setPhone = (phone) => {
        this.setState({ user_phone: phone })
    }
    setEmail = (email) => {
        this.setState({ user_email: email })
    }
    setAddress = (address) => {
        this.setState({ user_address: address })
    }
    setPayment = (payment) => {
        this.setState({ payment: payment })
    }
    setShipping = (shipping) => {
        this.setState({ shipping: shipping })
    }
    setProvince = (province) => {
        this.setState({ province: province })
    }
    setDistricts = (districts) => {
        this.setState({ districts: districts })
    }
    setWards = (wards) => {
        this.setState({ wards: wards })
    }
    add_Transaction() {
        const cart = this.context.cart
        const user = this.context.user

        var user_name = this.state.user_name
        var user_email = this.state.user_email
        if (user.length == 0) {

            var user_address = this.state.user_address + ", " + this.state.wards + ", " + this.state.districts + ", " + this.state.province + "."
        } else {
            var user_address = this.state.user_address
        }
        var user_phone = this.state.user_phone
        var amount = this.context.total
        var payment = this.state.payment
        var shipping = this.state.shipping
        var products = []
        for (const [key, val] of Object.entries(cart)) {
            const temp = {}

            for (const [key1, val1] of Object.entries(val)) {
                if (key1 == "product_id") {
                    temp.id = val1
                }
                if (key1 == "name" || key1 == "image" || key1 == "quantity" || key1 == "size" || key1 == "price") {
                    temp[key1] = val1
                }
            }
            products.push(temp)
        }

        const data = { user_name, user_email, user_address, user_phone, amount, payment, shipping, products }
        return data
    }
    post_transaction = () => {
        const data = this.add_Transaction()
        const user = this.context.user
        const cart = this.context.cart
        console.log("data transaction: ", data)

        if (cart.length != 0) {
            if (user.length == 0) {
                axios.post('/transaction', data)
                    .then(res => {
                        if (res.data.status == "OK") {
                            this.context.resetCart(res.data.status)
                            const url_vnpay = res.data.results.vnp
                            if (url_vnpay != null) {
                                //console.log("url : ", res.data.results.vnp)
                                this.setState({ check_vnpay: !this.state.check_vnpay, url_vnpay: url_vnpay })
                            } else {
                                this.clear_input()
                                Toast("Thanh toán thành công", "#3b741b", 4000)
                            }
                        }
                    })
                    .catch(err => {
                        //Toast("Thanh toán thất bại", "#f74747", 4000)

                        if (err.response.data.status == "NG") {
                            //Toast("Thanh toán thất bại", "#f74747", 4000)
                            //console.log("post_transaction", err.response.data.errors)
                            const check_vali_arr = {}
                            const errors = err.response.data.errors

                            for (const [key, val] of Object.entries(errors)) {
                                if (key == "payment") {
                                    Toast("Lựa chọn phương thức thanh toán", "#f74747", 4000)//#f57a7ado nhat
                                }
                                else if (key == "user_email") {
                                    if (val == "The user email must be a valid email address.") {
                                        //check_vali_arr[key] = "valid email address"
                                        Toast("Email là một địa chỉ email hợp lệ", "#f74747", 4000)
                                    }
                                    else {
                                        var element = document.getElementById("id-email-payment")
                                        element.setAttribute("style", "border: 2px solid #e70f0f;")
                                        //check_vali_arr[key] = ""
                                        //Toast("Vui lòng nhập địa Email", "#f74747", 4000)//#f57a7ado nhat
                                    }
                                }
                                else if (key == "user_name") {
                                    var element = document.getElementById("id-name-payment")
                                    element.setAttribute("style", "border: 2px solid #e70f0f;")
                                    //check_vali_arr[key] = ""
                                    //Toast("Nhập tên khách hàng", "#f74747", 4000)//#f57a7ado nhat
                                }
                                else if (key == "user_phone") {
                                    //The user phone must be 10 digits.
                                    if (val == "The user phone must be 10 digits.") {
                                        var element = document.getElementById("id-phone-payment")
                                        element.setAttribute("style", "border: 2px solid #e70f0f;")
                                        Toast("Số điện thoại phải có 10 chữ số", "#f74747", 4000)//#f57a7ado nhat
                                    }
                                    else {
                                        var element = document.getElementById("id-phone-payment")
                                        element.setAttribute("style", "border: 2px solid #e70f0f;")
                                    }
                                }
                            }
                        }

                        //Toast("Thành công", "#3b741b", 4000)
                    });
            }
            else {
                //Bearer như là cấp quyền truy cập cho người mang mã thông báo này
                if (data['payment'] == 'Thanh toán trực tuyến') {
                    const authAxios = axios.create({
                        baseURL: axios.baseURL,//"https://shop-adidas.herokuapp.com/api/",
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('token')}`
                        },

                    });
                    authAxios.post('/transaction', data)
                        .then(res => {
                            console.log("post_transaction THANH CONG", res.data)
                            if (res.data.status == "OK") {
                                for (const [key, val] of Object.entries(cart)) {
                                    this.context.delete_cartuser(val.id)
                                }
                                this.context.resetCart(res.data.status)

                                //alert("Thanh toán thành công")
                                const url_vnpay = res.data.results.vnp
                                console.log("url : ", res.data.results.vnp)
                                this.setState({ check_vnpay: !this.state.check_vnpay, url_vnpay: url_vnpay })
                                if (url_vnpay != null) {
                                    //console.log("url : ", res.data.results.vnp)
                                    this.setState({ check_vnpay: !this.state.check_vnpay, url_vnpay: url_vnpay })
                                } else {
                                    this.clear_input()
                                    Toast("Thanh toán thành công", "#3b741b", 4000)
                                }
                            }
                        })
                        .catch(err => {
                            Toast("Thanh toán thất bại", "#f74747", 4000)
                        });
                } else { //Thanh toán khi nhận hàng
                    const authAxios = axios.create({
                        baseURL: axios.baseURL,//"https://shop-adidas.herokuapp.com/api/",
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('token')}`
                        },

                    });
                    authAxios.post('/transaction', data)
                        .then(res => {
                            console.log("post_transaction THANH CONG", res.data)
                            if (res.data.status == "OK") {
                                for (const [key, val] of Object.entries(cart)) {
                                    this.context.delete_cartuser(val.id)
                                }
                                this.context.resetCart(res.data.status)
                                Toast("Thanh toán thành công", "#3b741b", 4000)
                            }
                        })
                        .catch(err => {
                            Toast("Thanh toán thất bại", "#f74747", 4000)
                        });
                }
            }

        } else {
            Toast("Vui lòng lựa chọn sản phẩm", "#f74747", 4400)
        }
    }
    check_order_online = () => {
        fetch(window.location.href)
            .then(response => {
                const urll = response.url
                if (getFormatVnPaySource(urll) == 1) {
                    const time = getFormatVnPay_DateSource(urll)
                    //vnp_ResponseCode=00
                    //console.log("Đã thanh toán thanh công đơn hàng online")
                    Toast(`Bạn đã thanh toán thanh công đơn hàng online. ${time}`, "#3b741b", 6000)
                }
                else if (getFormatVnPaySource(urll) == 0) {
                    console.log("clear...")
                }
                else {
                    Toast("Thanh toán không thành công nên đơn hàng của bạn đã bị HỦY.", "#f74747", 6000)
                    const data = { vnp_TxnRef: getFormatVnPaySource(urll) }

                    axios.get('/transaction/payment-return', { params: data })
                        .then(res => {
                            // console.log("Lỗi khi huy thanh toán online : ", res)
                            if (res.data.status == "OK") {
                                this.context.resetCart(res.data.status)
                                //Toast("Thanh toán thành công", "#3b741b", 4000)


                            }
                        })
                        .catch(err => {
                            //Toast("Thanh toán thất bại", "#f74747", 4000)
                        });
                }
            });
    }
    clear_input = () => {
        this.setState({
            user_name: "",
            user_email: "",
            user_address: "",
            user_phone: "",
            payment: "",
            shipping: "Giao hàng nhanh",
            //
            province: "",
            districts: "",
            wards: "",
            check_vnpay: false,
            url_vnpay: ""
        })
    }
    login_inPayment = (email, password) => {
        const data = { email, password }
        axios.post('login', data)
            .then(res => {
                if (res.data.status == "OK") {
                    console.log("Data login in payment", res.data.results.info)
                    //console.log("Thanh congggggggggg")
                    this.context.addUser(res.data.results.info)

                    //console.log("Token", res.data.results.token)
                    localStorage.setItem('token', res.data.results.token)
                    localStorage.setItem('user_local', JSON.stringify({ email: email, password: password }))
                }
            })
            .catch((err) => {
                console.log("Err login in payment", err)
            });

    }
    check_login = (email, pass, token) => {
        if (token != "" && email != "" && pass != "") {
            this.login_inPayment(email, pass)
        }
    }
    componentDidMount() {
        this.check_order_online()
        const token_user = localStorage.getItem('token')
        if (token_user != "") {
            const user_local = JSON.parse(localStorage.getItem('user_local'))
            if (user_local.email != "" && user_local.password != "") {
                this.check_login(user_local.email, user_local.password, token_user)
            }
        }

    }

    render() {
        const { cart, total, user } = this.context;
        // console.log(".....", this.state.province)

        //const total = this.context.total;
        //console.log("Check vali array....", this.state.check_vali_input)
        if (user.length === 0) {
            return (
                <div className="payment">
                    <form className="orderForm">
                        <h2>THÔNG TIN GIAO HÀNG</h2>
                        <div className="">
                            <input id="id-name-payment" type="text" className="form-control" placeholder="HỌ TÊN *"
                                style={this.state.user_name != "" ? { border: '1px solid rgb(44, 42, 42)' } : null}
                                onChange={(e) => this.setName(e.target.value)} />
                            <input id="id-phone-payment" type="text" className="form-control" placeholder="Số điện thoại *"
                                style={this.state.user_phone != "" ? { border: '1px solid rgb(44, 42, 42)' } : null}
                                onChange={(e) => this.setPhone(e.target.value)} />
                            <input id="id-email-payment" type="text" className="form-control" placeholder="Email *"
                                style={this.state.user_email != "" ? { border: '1px solid rgb(44, 42, 42)' } : null}
                                onChange={(e) => this.setEmail(e.target.value)} />
                            <input id="id-address-payment" type="text" className="form-control" placeholder="Địa chỉ *"
                                style={this.state.user_address != "" ? { border: '1px solid rgb(44, 42, 42)' } : null}
                                onChange={(e) => this.setAddress(e.target.value)} />
                            <Adress address={this.state.user_address} callBacksetProvince={this.setProvince}
                                callBacksetDistricts={this.setDistricts} callBacksetWards={this.setWards} />
                        </div>
                        <h2>PHƯƠNG THỨC GIAO HÀNG</h2>
                        <div>
                            <input type="radio" id="shipping-payment" value="Giao hàng nhanh" checked="checked"
                                onChange={(e) => this.setShipping(e.target.value)}
                            /> Giao hàng nhanh
                        </div>
                        <h2>PHƯƠNG THỨC THANH TOÁN</h2>
                        <div className="row-radio-tt">
                            <input type="radio" name="gender" id="payment-direct" value="Thanh toán trực tiếp khi giao hàng"
                                style={{ color: 'red' }}
                                onChange={(e) => this.setPayment(e.target.value)}
                            /> Thanh toán trực tiếp khi giao hàng
                        </div>
                        <div className="row-radio-tt">
                            <input type="radio" name="gender" className="dbt" value="Thanh toán trực tuyến"
                                onChange={(e) => this.setPayment(e.target.value)}
                            /> Thanh toán trực tuyến
                        </div>
                        {/* <div className="row-radio-tt">
                            <input type="radio" name="gender" className="dbt" value="Thanh toán bằng ví MoMo"
                                onChange={(e) => this.setPayment(e.target.value)}
                            /> Thanh toán bằng ví MoMo
                        </div> */}
                    </form>
                    <div className="your-order">
                        <h2>ĐƠN HÀNG</h2>
                        {
                            cart.map((item, index) => (
                                <div key={index} className="row">
                                    <div className="row-1">
                                        <p>{item.name}</p>
                                        <p>{(item.price).toLocaleString('vi-VN')} VNĐ</p>
                                    </div>
                                    <div className="row-2">
                                        <p>{item.size}</p>
                                        <p>x {item.quantity}</p>
                                    </div>
                                </div>
                            ))
                        }
                        <div className="row-3">
                            <p>Đơn hàng</p>
                            <p>{total.toLocaleString('vi-VN')} VNĐ</p>
                        </div>
                        <div className="row-4">
                            <p>Giảm </p>
                            <p>- 0 VNĐ</p>
                        </div>
                        <div className="row-5">
                            <p>TỔNG CỘNG</p>
                            <p>{total.toLocaleString('vi-VN')} VNĐ</p>
                        </div>
                        <div>
                            <button className="btn-btn-primary"
                                // this.post_transaction() == true ? restCart : alert("Thanh toán không thành công")
                                onClick={() => { this.post_transaction() }}
                            >HOÀN TẤT ĐẶT HÀNG</button>
                        </div>
                    </div>
                    {
                        this.state.check_vnpay ?
                            // <Route component={() => {
                            //     window.location.href = this.state.url_vnpay
                            // }}
                            <Redirect to={{
                                //pathname: "/payment",

                                //search: window.location.href=this.state.url_vnpay,}}
                                search: window.location.assign(this.state.url_vnpay)
                            }}
                            //state: { referrer: currentLocation }
                            /> : null
                    }

                </div>
            )
        } else {
            return (
                <div className="payment">
                    <form className="orderForm">
                        <h2>THÔNG TIN GIAO HÀNG</h2>
                        <div className="">
                            <input type="text" className="form-control" placeholder="HỌ TÊN" value={user.name}
                                onChange={(e) => this.setName(e.target.value)}
                                onClick={(e) => this.setName(e.target.value)} />
                            <input type="text" className="form-control" placeholder="Số điện thoại" value={user.phone}
                                onChange={(e) => this.setPhone(e.target.value)}
                                onClick={(e) => this.setPhone(e.target.value)} />
                            <input type="text" className="form-control" placeholder="Email" value={user.email}
                                onChange={(e) => this.setEmail(e.target.value)}
                                onClick={(e) => this.setEmail(e.target.value)} />
                            <input type="text" className="form-control" placeholder="Địa chỉ" value={user.address}
                                onChange={(e) => this.setAddress(e.target.value)}
                                onClick={(e) => this.setAddress(e.target.value)} />
                        </div>
                        <h2>PHƯƠNG THỨC GIAO HÀNG</h2>
                        <div>
                            <input type="radio" className="dbt" value="Giao hàng nhanh" checked="checked"
                                onChange={(e) => this.setShipping(e.target.value)}
                            /> Giao hàng nhanh
                        </div>
                        <h2>PHƯƠNG THỨC THANH TOÁN</h2>
                        <div className="row-radio-tt">
                            <input type="radio" name="gender" className="dbt" value="Thanh toán trực tiếp khi giao hàng"
                                onChange={(e) => this.setPayment(e.target.value)}
                            /> Thanh toán trực tiếp khi giao hàng
                        </div>
                        <div className="row-radio-tt">
                            <input type="radio" name="gender" className="dbt" value="Thanh toán trực tuyến"
                                onChange={(e) => this.setPayment(e.target.value)}
                            /> Thanh toán trực tuyến
                        </div>
                        {/* <div className="row-radio-tt">
                            <input type="radio" name="gender" className="dbt" value="Thanh toán bằng ví MoMo"
                                onChange={(e) => this.setPayment(e.target.value)}
                            /> Thanh toán bằng ví MoMo
                        </div> */}
                    </form>
                    <div className="your-order">
                        <h2>ĐƠN HÀNG</h2>
                        {
                            cart.map((item, index) => (
                                <div key={index} className="row">
                                    <div className="row-1">
                                        <p>{item.name}</p>
                                        <p>{(item.price).toLocaleString('vi-VN')} VNĐ</p>
                                    </div>
                                    <div className="row-2">
                                        <p>{item.size}</p>
                                        <p>x {item.quantity}</p>
                                    </div>
                                </div>
                            ))
                        }
                        <div className="row-3">
                            <p>Đơn hàng</p>
                            <p>{total.toLocaleString('vi-VN')} VNĐ</p>
                        </div>
                        <div className="row-4">
                            <p>Giảm </p>
                            <p>- 0 VNĐ</p>
                        </div>
                        <div className="row-5">
                            <p>TỔNG CỘNG</p>
                            <p>{total.toLocaleString('vi-VN')} VNĐ</p>
                        </div>
                        <div>
                            <button className="btn-btn-primary"
                                // == true ? this.context.restCart : alert("Thanh toán không thành công")
                                onClick={() => { this.post_transaction() }}
                            >HOÀN TẤT ĐẶT HÀNG</button>
                        </div>
                    </div>
                    {
                        this.state.check_vnpay ?
                            // <Route component={() => {
                            //     window.location.href = this.state.url_vnpay
                            // }}
                            <Redirect to={{
                                //pathname: "/payment",

                                //search: window.location.href=this.state.url_vnpay,}}
                                search: window.location.assign(this.state.url_vnpay)
                            }}
                            //state: { referrer: currentLocation }
                            /> : null
                    }

                </div>
            )
        }
    }
}

export default Payment
