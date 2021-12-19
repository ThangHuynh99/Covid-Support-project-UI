import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import logo from '../../assets/media/logo.png';
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
                    <Link className="header_menu-link" to="/civilian"><button>Quản lý cư dân</button></Link>
                    <Link className="header_menu-link" to="/product"><button>Quản lý sản phẩm</button></Link>
                    <Link className="header_menu-link" to="/news"><button>Quản lý tin tức</button></Link>
                    <Link className="header_menu-link" to="/order"><button>Quản lý Đơn hàng</button></Link>
                    <Link className="header_menu-link" to="/account"><button>Cấp tài khoản</button></Link>
                </div>
            </div>
        </>
    );
}

export default Header;
