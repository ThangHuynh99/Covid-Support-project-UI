import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/media/logo.png';
import logout from '../../function/logout';
import './style.css';

Header.propTypes = {};

function Header(props) {
    return (
        <>
            <div className="header">
                <div className="header_logo">
                    <img src={logo} alt="logo" className="header_logo-img" />
                    <h1 className="header_logo-title">Tổ covid cộng đồng</h1>
                </div>
                <div className="header_menu">
                    <Link className="header_menu-link" to="/civilian">
                        <div className="btn btn-custom">Quản lý cư dân</div>
                    </Link>
                    <Link className="header_menu-link" to="/product">
                        <div className="btn btn-custom">Quản lý sản phẩm</div>
                    </Link>
                    <Link className="header_menu-link" to="/news">
                        <div className="btn btn-custom">Quản lý tin tức</div>
                    </Link>
                    <Link className="header_menu-link" to="/order">
                        <div className="btn btn-custom">Quản lý Đơn hàng</div>
                    </Link>
                    <Link className="header_menu-link" to="/account">
                        <div className="btn btn-custom">Cấp tài khoản</div>
                    </Link>
                    <Link className="header_menu-link" onClick={logout}>
                        <div className="btn btn-chartjs">
                            <i className="fa fa-sign-out" aria-hidden="true"></i>
                        </div>
                    </Link>
                </div>
            </div>
        </>
    );
}

export default Header;
