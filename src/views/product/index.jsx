import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import Header from '../header/index';
import './style.css';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import productAPI from '../../api/productAPI';

function Product(props) {
    const [product, setProduct] = useState();
    const [productDetail, setProductDetail] = useState();
    const [show, setShow] = useState(false);
    const [change, setChange] = useState(false);
    const [activeP, setActiveP] = useState(1);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const nameRef = useRef();
    const priceRef = useRef();
    const quantityRef = useRef();
    const unitRef = useRef();
    const descriptionRef = useRef();

    const getProducts = async (page) => {
        await productAPI
            .findAll()
            .then((result) => {
                result && setProduct(result.data);
            })
            .catch((err) => {
                console.log('Error fetch data ' + err);
            });
    };

    useEffect(async () => {
        await getProducts();
    }, [change]);

    const findAllByDisable = async () => {
        await productAPI
            .findAllByDiable()
            .then((result) => {
                result && setProduct(result.data);
            })
            .catch((err) => {
                console.log('Error fetch data ' + err);
            });
        setActiveP(2);
    };

    const disableProduct = async (id) => {
        await productAPI
            .disableProduct(id)
            .then((result) => {})
            .catch((err) => {
                console.log('Error fetch data ' + err);
            });
        change === false ? setChange(true) : setChange(false);
        setShow(false);
    };

    const enableProduct = async (id) => {
        await productAPI
            .enableProduct(id)
            .then((result) => {})
            .catch((err) => {
                console.log('Error fetch data ' + err);
            });
        findAllByDisable();
        setShow(false);
    };

    const addProduct = async () => {
        const productSave = {
            name: nameRef.current.value,
            quantity: quantityRef.current.value,
            price: priceRef.current.value,
            unit: unitRef.current.value,
            description: descriptionRef.current.value,
            district: JSON.parse(localStorage.getItem('userInfo')).district,
            wardName: JSON.parse(localStorage.getItem('userInfo')).wardName,
        };
        await productAPI
            .save(productSave)
            .then((result) => {
                change === false ? setChange(true) : setChange(false);
                setShow(false);
            })
            .catch((err) => {
                console.log('Error fetch data ' + err);
            });
    };

    const updateProduct = async (id) => {
        const productSave = {
            id: id,
            quantity: quantityRef.current.value,
            price: priceRef.current.value,
            unit: unitRef.current.value,
            description: descriptionRef.current.value,
        };
        await productAPI
            .update(productSave)
            .then((result) => {
                change === false ? setChange(true) : setChange(false);
                setShow(false);
            })
            .catch((err) => {
                console.log('Error fetch data ' + err);
            });
    };

    const statusConvert = (statusP) => {
        if (statusP === true) {
            return 'S???n ph???m ??ang ???????c b??n';
        } else {
            return 'S???n ph???m t???m ng??ng';
        }
    };

    return (
        <>
            <Header />
            <>
                <div style={{ margin: '10px 140px 0' }}>
                    <Button
                        style={{ margin: '0 10px' }}
                        className={activeP === 1 && 'active'}
                        variant="success btn-sm"
                        onClick={() => {
                            change === false ? setChange(true) : setChange(false);
                            setActiveP(1);
                        }}
                    >
                        T???t c??? s???n ph???m
                    </Button>
                    <Button style={{ margin: '0 10px' }} className={activeP === 2 && 'active'} variant="success btn-sm" onClick={findAllByDisable}>
                        S???n ph???m t???m ng??ng
                    </Button>
                    <Button
                        style={{ margin: '0 10px' }}
                        variant="success btn-sm"
                        onClick={() => {
                            setProductDetail({});
                            setShow(true);
                        }}
                    >
                        Th??m s???n ph???m
                    </Button>
                </div>

                {product ? (
                    product.map((data, index) => (
                        <article
                            className="order"
                            onClick={() => {
                                setProductDetail(data);
                                setShow(true);
                            }}
                            key={index}
                        >
                            <div className="civilian">
                                <h3 className="civilian-title">
                                    T??n s???n ph???m:{' '}
                                    <span style={{ color: 'rgb(236, 109, 86)' }} className="civilian-name">
                                        {data.name && data.name}
                                    </span>
                                </h3>
                                <div className="civilian-body">
                                    <div className="civilian-info">
                                        <p>Gi?? ti???n: {data.price && data.price} vn??</p>
                                        <p>S??? l?????ng h??m nay: {data.quantity && data.quantity}</p>
                                        <p>Tr???ng th??i: {statusConvert(data.status)}</p>
                                        <p>????n v??? t??nh: {data.unit && data.unit}</p>
                                        <p>M?? t???: {data.description && data.description}</p>
                                    </div>

                                    <div className="civilian-detail">
                                        <button className="civilian-detail-btn">Chi ti???t s???n ph???m</button>
                                    </div>
                                </div>
                            </div>
                        </article>
                    ))
                ) : (
                    <div></div>
                )}
            </>

            <Modal size="lg" show={show} onHide={handleClose} keyboard={false}>
                <Modal.Header>
                    <Modal.Title>
                        <h1>Chi ti???t s???n ph???m</h1>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {productDetail && (
                        <div>
                            <div class="input-group mb-3" style={{ marginBottom: '10px' }}>
                                <div class="input-group-prepend">
                                    <span style={{ fontSize: '18px', marginBottom: '5px' }} class="input-group-text" id="basic-addon1">
                                        T??n s???n ph???m:
                                    </span>
                                </div>
                                <input
                                    type="text"
                                    class="form-control"
                                    placeholder="T??n s???n ph???m"
                                    aria-describedby="basic-addon1"
                                    style={{ width: '500px', height: '25px', fontSize: '18px' }}
                                    value={productDetail.name && productDetail.name}
                                    ref={nameRef}
                                />
                            </div>

                            <div class="input-group mb-3" style={{ marginBottom: '10px' }}>
                                <div class="input-group-prepend">
                                    <span style={{ fontSize: '18px', marginBottom: '5px' }} class="input-group-text" id="basic-addon1">
                                        Gi?? ti???n:
                                    </span>
                                </div>
                                <input
                                    type="text"
                                    class="form-control"
                                    placeholder="Gi?? ti???n"
                                    aria-describedby="basic-addon1"
                                    style={{ width: '500px', height: '25px', fontSize: '18px' }}
                                    defaultValue={productDetail.price && productDetail.price}
                                    ref={priceRef}
                                />
                            </div>

                            <div class="input-group mb-3" style={{ marginBottom: '10px' }}>
                                <div class="input-group-prepend">
                                    <span style={{ fontSize: '18px', marginBottom: '5px' }} class="input-group-text" id="basic-addon1">
                                        S??? l?????ng h??m nay:
                                    </span>
                                </div>
                                <input
                                    type="text"
                                    class="form-control"
                                    placeholder="S??? l?????ng"
                                    aria-describedby="basic-addon1"
                                    style={{ width: '500px', height: '25px', fontSize: '18px' }}
                                    defaultValue={productDetail.quantity && productDetail.quantity}
                                    ref={quantityRef}
                                />
                            </div>

                            <div class="input-group mb-3" style={{ marginBottom: '10px' }}>
                                <div class="input-group-prepend">
                                    <span style={{ fontSize: '18px', marginBottom: '5px' }} class="input-group-text" id="basic-addon1">
                                        Tr???ng th??i:
                                    </span>
                                </div>
                                <input
                                    type="text"
                                    class="form-control"
                                    placeholder="tr???ng th??i"
                                    aria-describedby="basic-addon1"
                                    style={{ width: '500px', height: '25px', fontSize: '18px' }}
                                    value={productDetail.status ? statusConvert(productDetail.status) : ''}
                                />
                            </div>

                            <div class="input-group mb-3" style={{ marginBottom: '10px' }}>
                                <div class="input-group-prepend">
                                    <span style={{ fontSize: '18px', marginBottom: '5px' }} class="input-group-text" id="basic-addon1">
                                        ????n v??? t??nh:
                                    </span>
                                </div>
                                <input
                                    type="text"
                                    class="form-control"
                                    placeholder="????n v??? t??nh"
                                    aria-describedby="basic-addon1"
                                    style={{ width: '500px', height: '25px', fontSize: '18px' }}
                                    defaultValue={productDetail.unit && productDetail.unit}
                                    ref={unitRef}
                                />
                            </div>

                            <div class="input-group mb-3" style={{ marginBottom: '10px' }}>
                                <div class="input-group-prepend">
                                    <span style={{ fontSize: '18px', marginBottom: '5px' }} class="input-group-text" id="basic-addon1">
                                        M?? t???:
                                    </span>
                                </div>
                                <textarea
                                    type="text"
                                    class="form-control"
                                    placeholder="M?? t???"
                                    aria-describedby="basic-addon1"
                                    style={{ width: '500px', height: '80px', fontSize: '18px' }}
                                    defaultValue={productDetail.name && productDetail.name}
                                    ref={descriptionRef}
                                />
                            </div>
                        </div>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    {productDetail && productDetail.status === true && productDetail.id && (
                        <Button variant="warning btn-sm" onClick={() => disableProduct(productDetail.id)}>
                            T???m ng??ng
                        </Button>
                    )}
                    {productDetail && productDetail.status === true && productDetail.id && (
                        <Button variant="success btn-sm" onClick={() => updateProduct(productDetail.id)}>
                            C???p nh???t
                        </Button>
                    )}
                    {productDetail && productDetail.status === false && productDetail.id && (
                        <Button variant="warning btn-sm" onClick={() => enableProduct(productDetail.id)}>
                            M??? b??n
                        </Button>
                    )}
                    {productDetail && !productDetail.id && (
                        <Button variant="success btn-sm" onClick={addProduct}>
                            Th??m s???n ph???m
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

export default Product;
