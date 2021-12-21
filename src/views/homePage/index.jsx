import React, { useState, useEffect } from 'react';
import Header from '../header/index';
import './style.css';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import UsersAPI from '../../api/UsersAPI';
HomePage.propTypes = {};

function HomePage(props) {
    const [users, setUsers] = useState();
    const [civilian, setCivilian] = useState();
    const [show, setShow] = useState(false);
    const [page, setPage] = useState(1);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const getUsers = async (page) => {
        await UsersAPI.getUsers(page)
            .then((result) => {
                result && setUsers(result.data);
            })
            .catch((err) => {
                console.log('Error fetch data ' + err);
            });
    };

    useEffect(async () => {
        await getUsers(page);
    }, []);
    console.log(users);

    const vaccineStatusConvert = (vaccine) => {
        if (vaccine === 'ONE_SHOT') return 'Đã tiêm 1 mũi vaccine';
        else if (vaccine === 'TWO_SHOT') return 'Đã tiêm 2 mũi vaccine';
        else if (vaccine === 'NONE') return 'chưa tiêm vaccine';
    };
    return (
        <>
            <Header />
            <>
                {users ? (
                    users.map((data, index) => (
                        <article
                            className="order"
                            onClick={() => {
                                setShow(true);
                                setCivilian(data.civilians);
                            }}
                            key={index}
                        >
                            <div className="civilian">
                                <div className="civilian-title title">
                                    Chủ hộ: <span className="civilian-name">{data.name && data.name}</span>
                                </div>
                                <div className="civilian-body">
                                    <div className="civilian-info">
                                        <p>Số điện thoại: {data.phone && data.phone}</p>
                                        <p>Email: {data.email && data.email}</p>
                                        <p>Tổng số thành viên: {data.civilians ? data.civilians.length + 1 : 1}</p>
                                        <p>Địa chỉ: {data.address && data.address}</p>
                                    </div>

                                    <div className="civilian-detail">
                                        <span className="label label-success label-inline flex-shrink-0">Thông tin thành viên</span>
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
                        <h1>Thông tin thành viên gia đình</h1>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {civilian &&
                        civilian.map((data, index) => (
                            <div key={index}>
                                <h2>Thông tin người thân {index + 1}</h2>
                                <p className="mt-2">Họ Tên: {data.name && data.name}</p>
                                <p>Ngày sinh: {data.birthDay && data.birthDay}</p>
                                <p>Căn cước công dân: {data.cccd && data.cccd}</p>
                                <p>Email: {data.email && data.email}</p>
                                <p>giới tính: {data.gender && data.gender}</p>
                                <p>Số điện thoại: {data.phone && data.phone}</p>
                                <p>Số mũi tiêm: {data.vaccineStatus && vaccineStatusConvert(data.vaccineStatus)}</p>
                                {data.vaccineList &&
                                    data.vaccineList.map((data1, index1) => (
                                        <div key={index1}>
                                            <p>Thông tin mũi {index1 + 1}:</p>
                                            <p>Ngày tiêm: {data1.date && data1.date}</p>
                                            <p>Tên vaccine: {data1.vaccineName && data1.vaccineName}</p>
                                        </div>
                                    ))}
                            </div>
                        ))}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary btn-sm" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default HomePage;
