import React, { useState, useEffect } from 'react';
import Header from '../header';
import cartAPI from '../../api/CartAPI';
import './style.css';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

function Order(props) {
    const [cart, setCart] = useState();
    const [ProductDetail, setProductDetail] = useState();
    const [show, setShow] = useState(false);
    const [statusCart, setStatusCart] = useState(0);

    useEffect(() => {
        findAll(statusCart);
    }, [statusCart]);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const findAll = async (status) => {
        await cartAPI
            .findAll(status)
            .then((result) => {
                result && setCart(result.data);
                console.log(result.data);
            })
            .catch((err) => {
                console.log('Error fetch data ' + err);
            });
    };

    const statusConvert = (convert) => {
        if (convert === 0) {
            return 'Đang chờ mua hàng';
        } else if (convert === 3) {
            return 'Đang giao';
        } else if (convert === 1) {
            return 'Giao thành công';
        } else if (convert === 2) {
            return 'Đơn hàng bị hủy';
        }
    };

    const updateCartStatus = async (id, status) => {
        await cartAPI
            .updateCartStatus(id, status)
            .then((result) => {})
            .catch((err) => {
                console.log('Error ' + err);
            });
    };

    const handlePicked = async (id, status) => {
        await updateCartStatus(id, status);
        setStatusCart(3);
        setShow(false);
    };

    const handleDone = async (id, status) => {
        await updateCartStatus(id, status);
        setStatusCart(1);
        setShow(false);
    };

    const handleCancel = async (id, status) => {
        await updateCartStatus(id, status);
        setStatusCart(2);
        setShow(false);
    };
    return (
        <>
            <Header />
            <>
                {cart ? (
                    cart.map((data, index) => (
                        <article
                            className="order"
                            onClick={() => {
                                setShow(true);
                                setProductDetail(data.listProduct);
                            }}
                            key={index}
                        >
                            <div className="civilian">
                                <div className="civilian-title title">
                                    Mã đơn: <span className="civilian-name">{data.cartCode && data.cartCode}</span>
                                </div>
                                <div className="civilian-body">
                                    <div className="civilian-info">
                                        <p>Người đặt: {data.ownerName && data.ownerName}</p>
                                        <p>Số điện thoại: {data.phoneNumber && data.phoneNumber}</p>
                                        <p>Địa chỉ: {data.address && data.address}</p>
                                        <p>tổng tiền: {data.totalPrice && data.totalPrice} vnđ</p>
                                        <p>Trạng thái: {statusConvert(data.status)} </p>
                                        <p className="cart-note">Ghi chút: {data.note && data.note}</p>
                                    </div>

                                    <div className="civilian-detail">
                                        <span className="label label-success label-inline flex-shrink-0">{statusConvert(data.status)}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="separator separator-dashed my-5" />
                        </article>
                    ))
                ) : (
                    <div></div>
                )}
            </>

            <Modal size="lg" show={show} onHide={handleClose} keyboard={false}>
                <Modal.Header>
                    <Modal.Title>
                        <h1>Chi tiết đơn hàng</h1>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {ProductDetail &&
                        ProductDetail.map((data, index) => (
                            <div key={index}>
                                <h2>Tên sản phẩm: {data.name && data.name}</h2>
                                <p>Giá: {data.price && data.price} vnđ</p>
                                <p>Số lượng: {data.quantity && data.quantity}</p>
                                <p>Tổng tiền: {data.totalPrice && data.totalPrice} vnđ</p>
                            </div>
                        ))}
                </Modal.Body>
                <Modal.Footer>
                    {(ProductDetail && ProductDetail.status === 0) ? (
                        <>
                            <Button variant="warning btn-sm" onClick={handlePicked}>
                                Đã lấy hàng
                            </Button>
                            <Button variant="danger btn-sm" onClick={handleCancel}>
                                Hủy Đơn
                            </Button>
                        </>
                    ) : <p></p>}

                    {(ProductDetail && ProductDetail.status === 3) ? (
                     
                            <Button variant="warning btn-sm" onClick={handleDone}>
                                Hoàn thành
                            </Button>
                    ) : <p></p>}
                    <Button variant="secondary btn-sm" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default Order;
