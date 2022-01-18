import React, { Component, useState } from 'react'
import { FaStar } from 'react-icons/fa'
import axios from 'axios'
import '../utils'
import '../css/StarRating.css'
import { Toast } from '../utils'


function StarRating(props) {

    const product_id = props.id_product
    const order_id = props.order_id

    const stars = Array(5).fill(0);
    const showRating = props.showRating

    const [currentValue, setCurrentValue] = useState(0);
    const [hoverValue, setHoverValue] = useState(undefined);
    const [getindexStar, setIndexStar] = useState();

    const [getValContent, setValContent] = useState("")

    const handleClick = (value) => {
        setCurrentValue(value)
    }

    const handleMouseOver = (value) => {
        setHoverValue(value)
    }

    const handleMouseLeave = () => {
        setHoverValue(undefined)
    }

    const colors = {
        orange: "#FFBA5A",
        grey: "#a9a9a9",
    }

    const submit_comment = (order_id, product_id, star, content, img) => {
        const data = { order_id: order_id, product_id: product_id, star: star, content: content, image: img }

        const authAxios = axios.create({
            baseURL: axios.baseURL,//"https://shop-adidas.herokuapp.com/api/",
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            },
        });
        authAxios.post('/comment', data)
            .then(res => {
                console.log("login:", res.data)
                if (res.data.status == "OK") {
                    const results = res.data.results
                    //console.log("aaaa:", results)
                    for (const [key, val] of Object.entries(results)) {
                        if (key == "error") {
                            //Toast("Vui lòng không nói tục, chửi thề", "#f74747", 4000)
                            props.setShowRating()
                            props.callback_getTransactions()
                            Toast("Vui lòng không nói tục, chửi thề", "#f74747", 5000)
                            break;
                        }
                        else {
                            props.setShowRating()
                            props.callback_getTransactions()
                            //alert("Phản hồi thành công")
                            Toast("Phản hồi thành công", "#3b741b", 4000)
                            break;
                        }
                    }
                    // props.setShowRating()
                    // props.callback_getTransactions()
                    // //alert("Phản hồi thành công")
                    // Toast("Phản hồi thành công", "#3b741b", 4000)
                }

                //console.log("login:", res.data.results.info)
            })
            .catch(err => {
                // alert("Phản hồi thất bại")
                Toast("Phản hồi thất bại", "#f74747", 4000)

                //console.log("post_transaction THAT BAI", err)
            });
    }
    return (
        <>
            {showRating ?
                <div className="star-rating-container">
                    <div className="star-rating">
                        <p className="star-rating-label">Bình luận</p>
                        <div className="star-rating-selected">
                            {stars.map((_, index) => {
                                return (
                                    <FaStar key={index} size={25}
                                        // style={{
                                        //     marginRight: 3,
                                        //     cursor: "pointer"
                                        // }}
                                        //onClick={() => submit_comment(order_id, product_id, currentValue)}
                                        color={(hoverValue || currentValue) > index ? colors.orange : colors.grey}
                                        onClick={() => handleClick(index + 1)}
                                        onMouseOver={() => handleMouseOver(index + 1)}
                                        onMouseLeave={handleMouseLeave}>
                                    </FaStar>
                                )
                            })}
                        </div>
                        <textarea className="star-rating-comment-user" placeholder="Đánh giá sản phẩm"
                            onChange={(e) => setValContent(e.target.value)}>
                        </textarea>
                        <button className="star-rating-button-submit"
                            onClick={() => submit_comment(order_id, product_id, currentValue, getValContent, [])}>Xác nhận</button>
                        <p className="close-star-rating" onClick={() => props.setShowRating()}>X</p>
                    </div>

                </div>
                : null}

        </>
    )

}

export default StarRating

