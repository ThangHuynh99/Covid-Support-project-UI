import React, { useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Alert } from 'react-bootstrap';
import './style.css';
import authorizationAPI from '../../api/authorizationAPI';

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
            authorizationAPI
                .login(userNameRef.current.value, passWordRef.current.value)
                .then((response) => localStorage.setItem('userInfo', JSON.stringify(response.data)));
            history.push('/home');
        } catch {
            setError('Tên đăng nhập hoặc mật khẩu không đúng!');
        }
    };

    return (
        <div className="container">
            <div className="login-container">
                <section className="login" id="login">
                    <header>
                        <h2 className="header-login">Covid Support Community</h2>
                        <h3 className="header-login-title">Admin Login</h3>
                        {error && <Alert className="text-chartjs p-0">{error}</Alert>}
                    </header>
                    <form className="login-form">
                        {userEmpty && <Alert className="text-chartjs p-0">{userEmpty}</Alert>}
                        <input type="text" className="login-input" placeholder="UserName" autofocus ref={userNameRef} />
                        {passEmpty && <Alert className="text-chartjs p-0">{passEmpty}</Alert>}
                        <input type="password" className="login-input" placeholder="Password" ref={passWordRef} />
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
