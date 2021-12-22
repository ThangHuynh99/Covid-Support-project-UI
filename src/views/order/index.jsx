import React, { useState, useEffect } from 'react';
import Header from '../header';
import cartAPI from '../../api/CartAPI';
import './style.css';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

function Order(props) {
    const [cart, setCart] = useState();
    const [cartDetail, setCartDetail] = useState();
    const [productDetail, setProductDetail] = useState();
    const [show, setShow] = useState(false);
    const [statusCart, setStatusCart] = useState(0);
    const [change, setChange] = useState(false);

    useEffect(() => {
        findAll(statusCart);
    }, [statusCart, change]);

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

    const handlePicked = async (id) => {
        await updateCartStatus(id, 3);
        change === false ? setChange(true) : setChange(false);
        setShow(false);
    };

    const handleDone = async (id) => {
        await updateCartStatus(id, 1);
        change === false ? setChange(true) : setChange(false);
        setShow(false);
    };

    const handleCancel = async (id) => {
        await updateCartStatus(id, 2);
        change === false ? setChange(true) : setChange(false);
        setShow(false);
    };
    return (
        <>
            <Header />
            <>
                <div style={{ margin: '10px 140px 0' }}>
                    <Button
                        style={{ margin: '0 10px' }}
                        variant="success btn-sm"
                        className={statusCart === 0 && 'active'}
                        onClick={() => setStatusCart(0)}
                    >
                        Đang chờ
                    </Button>
                    <Button
                        style={{ margin: '0 10px' }}
                        variant="success btn-sm"
                        className={statusCart === 3 && 'active'}
                        onClick={() => setStatusCart(3)}
                    >
                        Đã lấy hàng
                    </Button>
                    <Button
                        style={{ margin: '0 10px' }}
                        variant="success btn-sm"
                        className={statusCart === 1 && 'active'}
                        onClick={() => setStatusCart(1)}
                    >
                        Hoàn thành
                    </Button>
                    <Button
                        style={{ margin: '0 10px' }}
                        variant="success btn-sm"
                        className={statusCart === 2 && 'active'}
                        onClick={() => setStatusCart(2)}
                    >
                        Đã hủy
                    </Button>
                </div>
                {cart ? (
                    cart.map((data, index) => (
                        <article
                            className="order"
                            onClick={() => {
                                setCartDetail(data);
                                setProductDetail(data.listProduct);
                                setShow(true);
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
                    {productDetail &&
                        productDetail.map((data, index) => (
                            <div key={index}>
                                <h2>Tên sản phẩm: {data.name && data.name}</h2>
                                <p>Giá: {data.price && data.price} vnđ</p>
                                <p>Số lượng: {data.quantity && data.quantity}</p>
                                <p>Tổng tiền: {data.totalPrice && data.totalPrice} vnđ</p>
                            </div>
                        ))}
                </Modal.Body>
                <Modal.Footer>
                    {cartDetail && cartDetail.status === 0 && (
                        <>
                            <Button variant="warning btn-sm" onClick={() => handlePicked(cartDetail.id)}>
                                Đã lấy hàng
                            </Button>
                            <Button variant="danger btn-sm" onClick={() => handleCancel(cartDetail.id)}>
                                Hủy Đơn
                            </Button>
                        </>
                    )}

                    {cartDetail && cartDetail.status === 3 && (
                        <Button variant="warning btn-sm" onClick={() => handleDone(cartDetail.id)}>
                            Hoàn thành
                        </Button>
                    )}
                    <Button variant="secondary btn-sm" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default Order;
