import React, { useState } from 'react'
import axios from 'axios'
import { Toast } from '../utils'
import '../Verify/index.css'

function index(props) {
    const showVerify = props.showVerify
    const id_user = props.id

    const [title, setTitle] = useState('')

    function submit(id, codeuser) {
        axios.post('/verify', { "ids" : [id], "code": codeuser })
            .then(res => {
                console.log("data verify", res)
                if (res.data.status == "OK") {
                    props.setShow_Verify(false)
                    props.setIsActive_login(true)
                    props.setIsActive_register(false)
                    //props.setShowForgot(false)
                    Toast("Thành công", "#3b741b", 5000)
                }
            })
            .catch(err => {
                // alert("Mã xác thực sai")
                Toast("Mã xác thực sai", "#f74747", 5000)
            });
    }

    return (
        <>
            {
                showVerify ?
                    <div className="verify-container">
                        <div className="verify-container-form">
                            <div className="verify-container-form-label">
                                <p className="verify-container-form-label-label">Chuyển qua gmail của bạn và điền mã xác nhận vào đây</p>
                            </div>
                            <div className="verify-container-form-input">
                                <input className="verify-container-form-input-input" placeholder="Nhập mã"
                                    onChange={e => setTitle(e.target.value)} />
                            </div>
                            <div className="verify-button-submit">
                                <button className="verify-button-submit-submit"
                                    onClick={() => submit(id_user, title)}>Xác nhận</button>
                            </div>
                            <p className="close-verify" onClick={() => props.setShow_Verify(false)}>X</p>
                        </div>
                    </div>
                    : null
            }
        </>
    )
}

export default index
