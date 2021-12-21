import React, { useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Alert } from 'react-bootstrap';
import './style.css';
import authorizationAPI from '../../api/authorizationAPI';
import moment from 'moment';
import logo from '../../assets/media/logo.png';

Login.propTypes = {
    userName: PropTypes.string,
    passWord: PropTypes.string,
};

Login.defaultProps = {
    userName: '',
    passWord: '',
};

function Login(props) {
    const userNameRef = useRef();
    const passWordRef = useRef();

    const [error, setError] = useState('');
    const [userEmpty, setUserEmpty] = useState();
    const [passEmpty, setPassEmpty] = useState();

    const history = useHistory();

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
        try {
            await authorizationAPI
                .login(userNameRef.current.value, passWordRef.current.value)
                .then((response) => { localStorage.setItem('userInfo', JSON.stringify(response.data)); 
                localStorage.setItem("expire", moment().add(1, 'days').format('X')) });
            history.push('/civilian');
        } catch {
            setError('Tên đăng nhập hoặc mật khẩu không đúng!');
        }
    };

    return (
        <div className="container">
            <div className="login-container">
                <section className="login" id="login">
                    <header>
                        <img src={logo} alt="logo" className="login-logo"/>
                        <h3 className="header-login-title">Đăng nhập</h3>
                        {error && <Alert style={{textAlign: "center"}} className="text-chartjs p-0">{error}</Alert>}
                    </header>
                    <form className="login-form">
                        {userEmpty && <Alert className="text-chartjs p-0">{userEmpty}</Alert>}
                        <input type="text" className="login-input" placeholder="Tên đăng nhập" autofocus ref={userNameRef} />
                        {passEmpty && <Alert className="text-chartjs p-0">{passEmpty}</Alert>}
                        <input type="password" className="login-input" placeholder="Mật khẩu" ref={passWordRef} />
                        <div className="submit-container">
                            <button type="submit" className="login-button" onClick={handleSubmit}>
                                SIGN IN
                            </button>
                        </div>
                    </form>
                </section>
            </div>
        </div>
    );
}

export default Login;
