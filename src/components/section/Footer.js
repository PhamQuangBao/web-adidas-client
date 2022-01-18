import React, { Component } from 'react'
import '../css/Footer.css'

export class Footer extends Component {
    render() {
        return (
            <div className="footer-container">
                <div className="footer-container-row1">
                    <div className="footer-container-row1-col1">
                        <h4 className="footer-container-col1-label">Sản phẩm</h4>
                        <ul className="footer-container-col1-list">
                            <li>Giày nam</li>
                            <li>Giày nữ</li>
                            <li>Adidas thể thao</li>
                        </ul>
                    </div>
                    <div className="footer-container-row1-col1">
                        <h4 className="footer-container-col1-label">Công ty</h4>
                        <ul className="footer-container-col1-list">
                            <li>Phân phối chi nhánh</li>
                            <li>Tuyển dụng</li>
                        </ul>
                    </div>
                    <div className="footer-container-row1-col1">
                        <h4 className="footer-container-col1-label">Hỗ trợ</h4>
                        <ul className="footer-container-col1-list">
                            <li>Tra cứu đơn hàng</li>
                            <li>Bảo mật thông tin</li>
                            <li>Đăng kí nhận thông tin ưu đãi</li>
                        </ul>
                    </div>
                    <div className="footer-container-row1-col1">
                        <h4 className="footer-container-col1-label">Liên hệ</h4>
                        <ul className="footer-container-col1-list">
                            <li>Email góp ý</li>
                            <li>Hotline</li>
                            <li>0899884203</li>
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}

export default Footer
