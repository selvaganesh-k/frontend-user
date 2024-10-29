import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import apiClient from '../apiService/Apiservice';
import { Row, Col, Button, Modal } from 'react-bootstrap';
import './ProductDetail.css';

export default function ProductDetail() {
    const { id } = useParams();
    const [product, setProduct] = useState({});
    const [images, setImages] = useState([]);
    const [diplayImage, setdisplayImage] = useState();
    const [fade, setfade] = useState();
    const [activeIndex, setActiveIndex] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const [showModal, setShowModal] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await apiClient.get(`/products/${id}`);
                setProduct(response.data);
                const imageArray = response.data.imagePaths
                    ? response.data.imagePaths.split(',').map(img => `http://localhost:5000/${img}`.trim())
                    : [];
                setImages(imageArray);
                setdisplayImage(imageArray[0]);
            }
            catch (error) {
                console.error('Fetching Data Failed' + error);
            }
        }
        fetchProduct();
    }, [])
    const handleChangeImage = (src, index) => {
        setfade(true);
        setTimeout(() => {
            setdisplayImage(src);
            setActiveIndex(index)
            setfade(false);
        }, 500);
    }
    const handleIncerment = () => setQuantity(prev => prev + 1);
    const handleDecrement = () => {
        if (quantity > 1) setQuantity(prev => prev - 1);
    }
    const user = JSON.parse(localStorage.getItem('LoginUser'));
    const handleAddToCart = async (email, productid, quantity) => {
        const cart = {
            email,
            productid,
            quantity,
        };
        try {
            const response = await apiClient.post('/addtocart', cart);
            setModalMessage(response.data.message);
            setShowModal(true);
        } catch (error) {
            setModalMessage(error.response.data.message);
            setShowModal(false);
        }
    };
    const handleClose = () => setShowModal(false);

    return (
        <div className='container-fluid content-page' style={{ marginTop: '100px' }}>
            <div className='container-fluid content-head p-0 mb-3'>
                <div><a href="/" style={{ textDecoration: 'none', color: 'black' }}>Home</a><span><i class="bi bi-chevron-right"></i></span><strong>{product.productName}</strong></div>
            </div>
            <Row>
                <Col xs={12} lg={5} md={7} sm={12}>
                    {
                        (
                            <div className="gallery-control">
                                <div className={`main-img ${fade ? 'fade-out' : 'fade-in'}`}>
                                    <img src={diplayImage} alt={product.productName} className='w-100 img-fulid' style={{ transition: 'opacity 0.3s ease-in-out' }} />
                                </div>
                                <div className="list-img d-flex my-2">
                                    {
                                        images.map((image, index) => (
                                            <div key={index} style={{ width: '100px', height: '100px', marginRight: '20px', border: activeIndex === index ? '2px solid #5ba616' : 'none', borderRadius: '5px', overflow: 'hidden' }} onClick={() => handleChangeImage(image, index)}>
                                                <img src={image} alt={product.productName + (index + 1)} className='w-100 img-fulid' />
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                        )
                    }
                </Col>
                <Col xs={12} lg={4} md={5} sm={12}>
                    <div className="detail-info">
                        <div className="relative">
                            <h2 style={{ fontSize: '24px', marginBottom: '8px' }}>{product.productName}</h2>
                            <div className="price" style={{ paddingBottom: '16px' }}>
                                <p style={{ fontSize: '20px', color: '#5ba616' }}>&#8377; {product.reducePrice}</p>
                            </div>
                            <div style={{ padding: '0 0 24px', borderBottom: '1px solid #E7E7E7' }}></div>
                            <div className="pd-summary" style={{ padding: '22px 0 0', color: '#A8A8A8', fontSize: '14px', lineHeight: '25px' }}>
                                <p>{product.productDes}</p>
                            </div>
                            <div className="offer-list">
                                <h4 style={{ color: '#008000', fontSize: '18px', padding: '0 14px' }}>Special Offer</h4>
                                <ul style={{ color: '#008000' }} className='ul-list'>
                                    <li style={product.availableKilograms > 0 ? { color: '#008000' } : { color: 'red' }}>{product.availableKilograms > 0 ? 'In Stock' : 'Out of Stock'}</li>
                                    <li>{product.deliveryCharge}*</li>
                                </ul>
                            </div>
                            { product.availableKilograms > 0 ?  (
                            <div className="add-to-cart mb-3">
                                <div className='quantity'>
                                    <input
                                        type="text"
                                        name="quantity"
                                        value={quantity}
                                        style={{
                                            width: '50px',
                                            outline: 'none',
                                            textAlign: 'center'
                                        }}
                                    />
                                    <div className="buttons">
                                        <button onClick={handleIncerment}>+</button>
                                        <button onClick={handleDecrement}>-</button>
                                    </div>
                                </div>
                                <button className='ATC-btn' onClick={() =>{
                                    const user =JSON.parse(localStorage.getItem('LoginUser'));
                                    if (user) {
                                      handleAddToCart(user.email,product.id,quantity);
                                    } else {
                                      alert('Please Login to Add to your Cart..!')
                                      window.location.href='/login';
                                    }
                                }}>ADD TO CART</button>
                            </div>) : (<div className="out-of-stock"></div>
                            )
                        }
                        </div>
                    </div>
                </Col>
                <Modal show={showModal} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Cart Update</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>{modalMessage}</Modal.Body>
                    <Modal.Footer>
                        <Button variant="danger" onClick={handleClose}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
                <Col xs={12} lg={3} md={12} sm={12}>
                    <Row>
                        <Col lg={12} md={4}>
                            <div className="content_box" style={{ margin: '0 0 30px', padding: '25px 15px', fontWeight: '400' }}>
                                <div className="content_text" style={{ textAlign: 'center' }}>
                                    <h3 className="title" style={{ fontSize: '18px', margin: '0 0 22px', padding: '0 0 18px' }}>
                                        Why Choose Us ?
                                    </h3>
                                    <div className="text" style={{ color: '#979797', fontSize: '14px' }}>
                                        Official Herschel stockist Australian warranty assistance & support Australian shipping & returns.Customer first experience environmentally focused
                                    </div>
                                </div>
                            </div>
                        </Col>
                        <Col lg={12} md={4}>
                            <div className="content_box" style={{ margin: '0 0 30px', padding: '25px 15px', fontWeight: '400' }}>
                                <div className="content_text" style={{ textAlign: 'center' }}>
                                    <h3 className="title" style={{ fontSize: '18px', margin: '0 0 22px', padding: '0 0 18px' }}>
                                        Returns
                                    </h3>
                                    <div className="text" style={{ color: '#979797', fontSize: '14px' }}>
                                        Return this product within 100 days if you change your mind. Get a refund/replacement & free return shipping if it arrives damaged or not as described                                    </div>
                                </div>
                            </div>
                        </Col>
                        <Col lg={12} md={4}>
                            <div className="content_box" style={{ margin: '0 0 30px', padding: '25px 15px', fontWeight: '400' }}>
                                <div className="content_text" style={{ textAlign: 'center' }}>
                                    <h3 className="title" style={{ fontSize: '18px', margin: '0 0 22px', padding: '0 0 18px' }}>
                                        Shipping
                                    </h3>
                                    <div className="text" style={{ color: '#979797', fontSize: '14px' }}>
                                        Free if stated near price. $9.95 Australia wide (up to 10 items). $18.95 for Express Post (generally 1 business day).                                    </div>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </div>
    )
}


