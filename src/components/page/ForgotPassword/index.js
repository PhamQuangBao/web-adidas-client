import React, { useEffect, useState } from 'react'
import Verify from '../../Verify'
import axios from 'axios'
import { Toast } from '../../utils'
import '../ForgotPassword/index.css'

function index(props) {
    const showForgot = props.showForgot
    const email = props.email
    
    const [show_Verify, setShow_Verify] = useState(false)

    const [getIdUser_Verify, setIdUser_Verify] = useState(0)
    const [getEmail, setEmail] = useState("")
    const [getPassword, setPassword] = useState("")
    const [getConfirmPassword, setConfirmPassword] = useState("")

    //
    const [isActive_login, setIsActive_login] = useState(true);
    const [isActive_register, setIsActive_register] = useState(false);

    function submit_forgot(email, password, confirmPassword) {
        if (password != confirmPassword) {
            alert("Nhập đúng giúp 2 cái mật khẩu bạn nhé.")
        }
        else {
            const data = { email: email, password: confirmPassword }
            axios.post('forgetpassword', data)
                .then(res => {
                    console.log("..........", res.data)
                    if (res.data.status == "OK") {
                        setIdUser_Verify(res.data.results.id)
                        setShow_Verify(!show_Verify)
                        //setShowForgot(!showForgot)

                        //alert("Tạo thành công")
                    }
                })
                .catch(err => {
                    //alert("Đổi mật khẩu không thành công")
                    //console.log("Err: ", err)
                    Toast("Đổi mật khẩu không thành công", "#f74747", 4000)
                    //Toast("Thành công", "#3b741b", 5000)
                });
        }
    }
    useEffect(()=>{
        //document.getElementById("forgot-password-email").setAttributeNS('value', email)
    })

    return (
        <>
            {
                showForgot ?
                    <div className="forgot-password-container">
                        <div className="form-forgot-password">
                            <div className="forgot-password-email">
                                <p className="forgot-password-email-label">Quên mất tiêu cái mật khẩu :(</p>
                            </div>
                            <div className="forgot-password-form">
                                <p>Nhập địa chỉ Email*</p>
                                <input type="email" id="forgot-password-email" className="forgot-password-input"
                                    onChange={(e) => setEmail(e.target.value)} />
                            </div>
                            <div className="forgot-password-form-password">
                                <div className="forgot-password-form">
                                    <p>Nhập mật khẩu*</p>
                                    <input type="password" className="forgot-password-input" onChange={(e) => setPassword(e.target.value)} />
                                </div>
                                <div className="forgot-password-form">
                                    <p>Nhập lại mật khẩu*</p>
                                    <input type="password" className="forgot-password-input" onChange={(e) => setConfirmPassword(e.target.value)} />
                                </div>
                            </div>
                            <div className="forgot-password-btn">
                                <button className="forgot-password-btn-submit" onClick={() => submit_forgot(getEmail, getPassword, getConfirmPassword)}>Xác nhận</button>
                            </div>
                            {/* <p className="close-forgot" onClick={() => props.setShowForgot(!showForgot)}>X</p> */}
                        </div>
                        <Verify id={getIdUser_Verify} showVerify={show_Verify} setIdUser_Verify={setIdUser_Verify}
                            setShow_Verify={setShow_Verify} setIsActive_login={setIsActive_login} setIsActive_register={setIsActive_register} />
                    </div>
                    : null
            }
        </>
    )
}

export default index
