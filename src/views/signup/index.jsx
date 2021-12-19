import React, { useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Alert } from 'react-bootstrap';
import './style.css';
import authorizationAPI from '../../api/authorizationAPI';
import moment from 'moment';
import Header from '../header';
import logo from '../../assets/media/logo.png'

Account.propTypes = {
    userName: PropTypes.string,
    passWord: PropTypes.string,
};

Account.defaultProps = {
    userName: '',
    passWord: '',
};

function Account(props) {
    const userNameRef = useRef();
    const passWordRef = useRef();

    const [error, setError] = useState('');
    const [label, setLabel] = useState('');
    const [userEmpty, setUserEmpty] = useState();
    const [passEmpty, setPassEmpty] = useState();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (userNameRef.current.value === '' && passWordRef.current.value === '') {
            setPassEmpty('Bạn chưa nhập mật khẩu !');
            return setUserEmpty('Bạn chưa nhập tên đăng nhập !');
        }

        if (userNameRef.current.value === '') {
            setPassEmpty('');
            return setUserEmpty('Bạn chưa nhập tên đăng nhập !');
        }

        if (passWordRef.current.value === '') {
            setUserEmpty('');
            return setPassEmpty('Bạn chưa nhập mật khẩu !');
        }

        const body = {
            userName: userNameRef.current.value,
            passWord: passWordRef.current.value,
            groupNumber: JSON.parse(localStorage.getItem('userInfo')).groupNumber,
            wardName: JSON.parse(localStorage.getItem('userInfo')).wardName,
            district: JSON.parse(localStorage.getItem('userInfo')).district
        }

        try {
            await authorizationAPI
                .signup(body);
            setLabel('green')
            setError("Đăng ký tài khoản thành công!")
        } catch {
            setError('Đăng ký tài khoản không thành công!');
        }
    };

    return (
        <>
        <Header/>
        <div className="container">
            <div className="login-container">
                <section className="login" id="login">
                    <header>
                        <img src={logo} alt="logo" className="login-logo"/>
                        <h3 className="header-login-title">Đăng ký tài khoản cư dân</h3>
                        {error && <Alert style={{color: label ? label : 'red'}, {textAlign: "center"}} className="text-chartjs p-0">{error}</Alert>}
                    </header>
                    <form className="login-form">
                        {userEmpty && <Alert className="text-chartjs p-0">{userEmpty}</Alert>}
                        <input type="text" className="login-input" placeholder="Tên đăng nhập" autofocus ref={userNameRef} />
                        {passEmpty && <Alert className="text-chartjs p-0">{passEmpty}</Alert>}
                        <input type="password" className="login-input" placeholder="Mật khẩu" ref={passWordRef} />
                        <div className="submit-container">
                            <button type="submit" className="login-button" onClick={handleSubmit}>
                                Đăng Ký
                            </button>
                        </div>
                    </form>
                </section>
            </div>
        </div>
        </>
    );
}

export default Account;
