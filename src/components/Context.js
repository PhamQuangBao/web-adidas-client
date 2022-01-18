import React, { Component } from 'react';
import axios from 'axios';
import { Toast, cutUrlinSpecification, getFormatImageSource, getImageListByString} from './utils'

export const DataContext = React.createContext();

export class DataProvider extends Component {

    constructor(props) {
        super(props);
        this.state = {
            products: [],
            cart: [],
            total: 0,
            category_product: [],
            user: [],
            //-------
            product_details: [],
            size_details: [],
            quantity_details: [],
            category_details: 0,
            specifications_details: [],

        }
    }
    componentDidMount() {
        this.getAllproducts()

    };
    getAllproducts = () => {
        //http://127.0.0.1:8000/api/category/10/product
        //http://127.0.0.1:8000/api/product
        axios.get('product')
            .then(res => {
                const products = res.data.results
                //console.log("Data: ", res.data.results)
                for (const [key, val] of Object.entries(products)) {
                    for (const [key1, val1] of Object.entries(val)) {
                        if (key1 == "image") {
                            const val_img = getFormatImageSource(val1)
                            val[key1] = val_img
                        }
                        if (key1 == "image_list") {
                            const val_img = getImageListByString(val1)
                            val[key1] = val_img
                        }
                    }
                }

                this.setState({
                    products: products
                });
                //console.log("data: ", res.data.results)
            }).catch(err => {
                console.log("Err: ", err)
            });
    }
    resultProductCategory = (id) => {
        const { products } = this.state;
        const temp = []
        for (const [key, value] of Object.entries(products)) {
            for (const [key1, value1] of Object.entries(value)) {
                if (key1 == "category_id" && value1 == id) {
                    temp.push(value)
                }
            }
        }
        //console.log("data: ", temp)
        this.setState({ category_product: temp })
    }
    querydb = (id) => {
        //http://127.0.0.1:8000/api/category/10/product
        //http://127.0.0.1:8000/api/product
        axios.get('http://127.0.0.1:8000/api/category/' + id + '/product')
            .then(res => {
                // console.log("Data: ", res.length)
                this.setState({
                    products: res.data.results
                });

            }).catch(err => {
                console.log("Err: ", err)
            });
    }
    addProductsforCate = (product) => {
        this.setState({ products: product })
    }
    // cutUrl(string) {
    //     var list_index = []
    //     var temp = string
    //     while (true) {
    //         var len = temp.length;
    //         var b = temp.search(";")
    //         if (b == -1) {
    //             list_index.push(temp.slice(b + 1, len))
    //             break;
    //         } else {
    //             list_index.push(temp.slice(0, b))
    //             temp = temp.slice(b + 1, len)
    //         }

    //     }
    //     return list_index
    // }
    getDetailProduct = (id) => {
        const res = this.state.products;
        //const res = this.state.tem_product;
        const arr = []
        const obj_temp_quanti = {}
        const category_id = 0
        var temp_size = 0
        const data = res.filter(item => {
            return item.id == id
        })

        for (const [key, val] of Object.entries(data)) {
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
                if (key1 == "specifications") {
                    // const arr_specification = this.cutUrl(val1)
                    const arr_specification = cutUrlinSpecification(val1)
                    this.setState({ specifications_details: arr_specification })
                }
                //lay id category
                if (key1 == "category_id") {
                    this.setState({ category_details: val1 });
                }
            }
        }
        this.setState({ product_details: data, size_details: arr, quantity_details: obj_temp_quanti })

    };


    // -------------------------------Cart----------------------------------------
    getCartuser = () => {
        const products = this.state.products
        //if(user != 0){
        const authAxios = axios.create({
            baseURL: axios.baseURL, //"https://shop-adidas.herokuapp.com/api/",//http://127.0.0.1:8000/api
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            },
        });
        authAxios.get('/cart')
            .then(res => {
                //console.log("detail cart: ", res.data.results)
                const cart_user = res.data.results
                //Tìm trong list products có id == với prduct_id của cartuser rồi lấy các key tương ứng qua bỏ vào giỏ hàng
                for (const [key, value] of Object.entries(cart_user)) {
                    for (const [key1, value1] of Object.entries(value)) {
                        if (key1 == "product_id") {
                            //console.log("key1:  ", key1, "  value1:  ", value1)
                            const data = products.filter(product => {
                                return product.id == value1
                            })

                            for (const [key_product, val_product] of Object.entries(data)) {
                                for (const [key_product1, val_product1] of Object.entries(val_product)) {
                                    if (key_product1 == "name" || key_product1 == "category_id" ||
                                        key_product1 == "price" || key_product1 == "description" ||
                                        key_product1 == "image" || key_product1 == "image_list") {

                                        //console.log("key_prod:  ", key_produc1t, "  val:  ", val_product1)
                                        value[key_product1] = val_product1

                                    }
                                }
                            }
                        }
                    }
                    //console.log("cartuser: ", value)
                    this.setState(i => ({
                        cart: [...i.cart, value]
                    }))
                }


            })
            .catch(err => {
                console.log("detail cart THAT BAI")
                console.log("Err", err)
            });
        //}
    }

    addCartforUser = (data) => {
        const authAxios = axios.create({
            baseURL: axios.baseURL, //"https://shop-adidas.herokuapp.com/api/",//http://127.0.0.1:8000/api/
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            },
        });
        //console.log("cart data: ", data)
        authAxios.post('/cart', data)
            .then(res => {
                if (res.data.status == "OK") {

                    console.log("post_cart THANH CONG")
                    Toast("Thêm vào giỏ thành công", "#3b741b", 4000)
                }
                //console.log("login:", res.data.results.info)
            })
            //{"status":"NG","errors":{"jwt_mdlw_error":"Unauthenticated."}}
            .catch(err => {
                if(err.response.data.status == "NG"){
                    Toast("Thêm vào giỏ không thành công", "#f74747", 4000)
                }
                //console.log("post_cart THAT BAI")
            });
    }
    addCart = (id, size, quantity) => {
        const { products, cart } = this.state;
        const user = this.state.user;
        if (size != 0 && quantity != 0) {
            const data1 = products.filter(products => {
                return products.id == id
            })
            //const temp = Object.assign(data1)
            const obj_yourcart = {}
            for (const [key, value] of Object.entries(data1)) {
                //var temp_obj = {}
                obj_yourcart.product_id = value.id
                for (const [key1, value1] of Object.entries(value)) {
                    //console.log("key: ", key1, " value: ", value1)
                    if (key1 == "detail_products") {
                        obj_yourcart.size = size
                        obj_yourcart.quantity = quantity
                        // if (key1 == "size") {
                        //     //console.log("key size ",key1)
                        //     obj_yourcart[key1] = size
                        //     //console.log("thay doi size: temp_obj",[key1] , "value", value1)
                        // }
                        // else {
                        //     obj_yourcart[key1] = quantity
                        //     //console.log("thay doi count: temp_obj",[key1] , "value", value1)
                        // }
                    }
                    else {
                        obj_yourcart[key1] = value1
                    }
                }

            }
            this.setState(i => ({
                cart: [...i.cart, obj_yourcart]
            }))
            // -----------------------user---------------------------
            if (user.length != 0) {
                //console.log("user: ", user)
                const user_id = user.id
                const product_id = id
                const data = { user_id, product_id, quantity, size }

                this.addCartforUser(data)
                this.resetCart("OK")
                this.getCartuser()
            }

        } else {
            //alert("Vui lòng chọn đầy đủ Size và Số lượng!")
            Toast("Vui lòng chọn đầy đủ Size và Số lượng!", "#f74747", 4000)
        }

    };
    resetCart = (string) => {
        if (string == "OK") {
            //console.log("resetCart file context Okee")
            this.setState({ cart: [] })
            this.setState({ total: 0 })
            //console.log("clear cart: ", this.state.cart)
            this.getAllproducts()
        }
    };
    delete_cartuser = (data) => {

        const authAxios = axios.create({
            baseURL: axios.baseURL, //"https://shop-adidas.herokuapp.com/api/", //http://127.0.0.1:8000/api/",
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            },
        });
        //console.log('cart/' + data)
        authAxios.delete('cart/' + data)
            .then(res => {
                if (res.data.status == "OK") {

                    console.log("delete cart THANH CONG")
                }
                //console.log("login:", res.data.results.info)
            })
            .catch(err => {

                console.log("delete cart THAT BAI")
            });
    };
    removeProductinCart = (id) => {
        //console.log("removeProductinCart: ", id)
        const user = this.state.user
        if (window.confirm("Bạn có chắc là xóa sản phẩm này ra khỏi giỏ hàng không.")) {
            if (user.length == 0) {
                const { cart } = this.state;
                cart.forEach((item, index) => {
                    if (item.id == id) {
                        cart.splice(index, 1)
                    }
                })
                this.setState({ cart: cart })
                this.getTotal()
            }
            else {
                this.delete_cartuser(id)
                const { cart } = this.state;
                cart.forEach((item, index) => {
                    if (item.id == id) {
                        cart.splice(index, 1)
                    }
                })
                this.setState({ cart: cart })
                this.getTotal()
            }
        }
    };
    // -------------------------End Cart--------------------------------------

    addSize = (size) => {
        //cho bien selectd_size trong state
        //const sizee = this.state.selectd_size;
        this.setState({ selectd_size: size })

    };
    addQuantity = (quantity) => {

        this.setState({ selectd_quantity: quantity })

    };

    getTotal = () => {
        const { cart } = this.state;
        const res = cart.reduce((prev, item) => {
            return prev + (item.price * item.quantity)
        }, 0)

        this.setState({ total: res })
    };
    addUser = (user) => {
        this.setState({ user: user });

    };
    resetUser = (logout) => {
        if (logout == "OK") {
            this.setState({ user: [] });
        }
    }




    render() {
        const { products, cart, total, category_product, user,
            product_details, size_details, quantity_details, category_details, specifications_details, address } = this.state;
        const { getAllproducts, addProductsforCate, addCart, resetCart, addSize, addQuantity,
            removeProductinCart, getTotal, resultProductCategory, addUser, resetUser, getCartuser,
            addCartforUser, delete_cartuser, getDetailProduct } = this;
        // const {check_selectsize} = this;
        //console.log("Context Cart: ", cart)
        // console.log("Context total: ", total)
        // add_detail_product();

        //console.log("catego ", category_product)
        return (
            //</DataContext.Provider><DataContext.Provider value={{ state: this.state }}>
            <DataContext.Provider value={{
                products, cart, total, category_product, user,
                product_details, size_details, quantity_details, category_details, specifications_details, address,
                getAllproducts, addProductsforCate, addCart, addSize, resetCart, addQuantity,
                removeProductinCart, getTotal, resultProductCategory, addUser, resetUser, getCartuser,
                addCartforUser, delete_cartuser, getDetailProduct
            }}>
                {this.props.children}
            </DataContext.Provider>
        )
    }
}

