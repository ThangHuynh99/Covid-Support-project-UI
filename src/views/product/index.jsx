import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Header from '../header/index';
import './style.css';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import CivilianAPI from '../../api/CivilianAPI';
import UsersAPI from '../../api/UsersAPI';
import productAPI from '../../api/productAPI';
HomePage.propTypes = {};

function HomePage(props) {
    const [product, setProduct] = useState();
    const [show, setShow] = useState(false);
    const [change, setChange] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const getProducts = async (page) => {
        await productAPI.findAll()
            .then((result) => {
                result && setProduct(result.data);
                console.log(result.data)
            })
            .catch((err) => {
                console.log('Error fetch data ' + err);
            });
    };

    useEffect(async () => {
        await getProducts();
    }, []);
   
    return (
        <>
            <Header />
            <>
                {product ? (
                    product.map((data, index) => (
                        <div
                            key={index}
                        >
                            <div className="civilian">
                                <h3 className="civilian-title">
                                    Chủ hộ: <span className="civilian-name">{data.name && data.name}</span>
                                </h3>
                                <div className="civilian-body">
                                    <div className="civilian-info">
                                        <p>Số điện thoại: {data.phone && data.phone}</p>
                                        <p>Email: {data.email && data.email}</p>
                                        <p>Tổng số thành viên: {data.civilians ? data.civilians.length + 1 : 1}</p>
                                        <p>Địa chỉ: {data.address && data.address}</p>
                                    </div>

                                    <div className="civilian-detail">
                                        <button className="civilian-detail-btn">Thông tin thành viên</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div>Không có dữ liệu</div>
                )}
            </>
        </>
    );
}

export default HomePage;
