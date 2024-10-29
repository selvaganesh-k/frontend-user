import React, { useEffect, useState } from "react";
import { json, useNavigate } from "react-router-dom";
import './Card.css';
import apiClient from "../apiService/Apiservice";
import '../pages/ProductDetail.css';
import { Row, Col, Modal, Button } from "react-bootstrap";
export default function Card({ image, title, fullprice, reduceprice, Id, availableKilograms}){
    const [isHovered, setisHovered] = useState(false);
    const handleMouseOver =()=>{setisHovered(true)};
    const handleMouseLeave=()=>{setisHovered(false)};
    const [isVisible, setinVisible] = useState(false);
    const navigate = useNavigate();
    const [product, setProduct] = useState({});
    const [images, setImages] = useState([]);
    const [diplayImage, setdisplayImage] = useState();
    const [fade, setfade] = useState();
    const [activeIndex, setActiveIndex] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const [showModal, setShowModal] = useState(false);
    const [showModal1, setShowModal1] = useState(false);
    const [modelMessage, setModalMessage] = useState(false);
 
    useEffect(()=>{
        const handleVisible=()=>{
            setinVisible(window.innerWidth > 768)
        }
        handleVisible();
        window.addEventListener('resize', handleVisible);
        return () => {
            window.removeEventListener('resize', handleVisible);
        }
    },[])
    useEffect(() => {
        const fetchProduct = async () => {
          try {
            const response = await apiClient.get(`/products/${Id}`);
            setProduct(response.data);
            const imageArray = response.data.imagePaths
                    ? response.data.imagePaths.split(',').map(img => `http://localhost:5000/${img}`.trim())
                    : []; 
                setImages(imageArray);
                setdisplayImage(imageArray[0]);
          } catch (error) {
            console.error('Fetching Data Failed', error);
          }
        };
        fetchProduct();
      }, [Id]);

    const handleChangeImage = (src, index) => {
        setfade(true);
        setTimeout(() => {
            setdisplayImage(src);
            setActiveIndex(index)
            setfade(false);
        }, 500);
    }
    const handleImageClick=()=>{
        navigate(`/product-detail/${Id}`)
    }
    const handleIncrement = () => setQuantity(prev => prev + 1);
  const handleDecrement = () => {
    if (quantity > 1) setQuantity(prev => prev - 1);
  };

  const handleAddToCart = async (email, productid, quantity) => {
    const cart = {
        email,
        productid,
        quantity,
    };
    try {
        const response = await apiClient.post('/addtocart', cart);
        setModalMessage(response.data.message);
        setShowModal1(true);
    } catch (error) {
        setModalMessage(error.response.data.message);
        setShowModal1(false);
    }
};
  const handleClose1 =()=>setShowModal1(false);
  const handleClose =()=>setShowModal(false);
  const user = JSON.parse(localStorage.getItem('LoginUser'));

  const handleOutofStack =()=>{
    setShowModal1(true);
    setModalMessage('Sorry its not Available for Sale !');
  }
    return (
        <div className="card product-card"
            onMouseOver={handleMouseOver}
            onMouseLeave={handleMouseLeave}
        >
            <img src={image} className="card-img-top" onClick={handleImageClick} alt={title} />
            <div className="card-body">
                <h5 className="card-title">{title}</h5>
                <div className="card-price"><p className="card-text" id="fullprice">&#8377; {fullprice}</p>
                <p className="card-text">&#8377; {reduceprice}</p></div>
            </div>
            <div className={`card-buttons ${isHovered && isVisible ? 'd-block' : 'd-none'}`}>
                <ul className="icon-list">
                    {
                      availableKilograms > 0 ? (
                        <li><span className="icon-btn" onClick={()=>{
                          const user =JSON.parse(localStorage.getItem('LoginUser'));
                          if (user) {
                            handleAddToCart(user.email,Id,1)
                          } else {
                            alert('Please Login to Add to your Cart..!')
                            window.location.href='/login';
                          }
                        }}><i class="bi bi-cart-check"></i></span></li>
                      ) : (
                        <li><span className="icon-btn-1" onClick={handleOutofStack}><i class="bi bi-cart-x-fill"></i></span></li>
                      )
                    }
                    <li><span className="icon-btn" onClick={() => setShowModal(true)}><i class="bi bi-search"></i></span></li>
                    <li><span className="icon-btn"><i class="bi bi-heart"></i></span></li>
                </ul>
            </div>
            <Modal show={showModal1} onHide={handleClose1}>
                    <Modal.Header closeButton>
                        <Modal.Title>Cart Update</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>{modelMessage}</Modal.Body>
                    <Modal.Footer>
                        <Button variant="danger" onClick={handleClose1}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
        <Modal show={showModal} onHide={handleClose} size="lg" className="custom-modal" centered>
        <Modal.Header closeButton>
          <Modal.Title>{product.productName}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col xs={12} lg={6} md={7} sm={12}>
              <div className="gallery-control">
                <div className={`main-img ${fade ? 'fade-out' : 'fade-in'}`}>
                  <img
                    src={diplayImage}
                    alt={product.productName}
                    className="w-100 img-fluid"
                    style={{ transition: 'opacity 0.3s ease-in-out' }}
                  />
                </div>
                <div className="list-img d-flex my-2">
                  {images.map((image, index) => (
                    <div
                      key={index}
                      style={{
                        width: '100px',
                        height: '100px',
                        marginRight: '20px',
                        border: activeIndex === index ? '2px solid #5ba616' : 'none',
                        borderRadius: '5px',
                        overflow: 'hidden',
                      }}
                      onClick={() => handleChangeImage(image, index)}
                    >
                      <img
                        src={image}
                        alt={product.productName + (index + 1)}
                        className="w-100 img-fluid"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </Col>
            <Col xs={12} lg={6} md={5} sm={12}>
              <div className="detail-info">
                <h2 style={{ fontSize: '24px', marginBottom: '8px' }}>{product.productName}</h2>
                <p style={{ fontSize: '20px', color: '#5ba616' }}>&#8377; {product.reducePrice}</p>
                <p>{product.productDes}</p>
                <ul className="ul-list" style={{ color: '#008000' }}>
                  <li style={product.availableKilograms > 0 ? { color: '#008000' } : { color: 'red' }}>
                    {product.availableKilograms > 0 ? 'In Stock' : 'Out of Stock'}
                  </li>
                  <li>{product.deliveryCharge}*</li>
                </ul>
                <div className="add-to-cart">
                <div className="quantity d-flex">
                  <input
                    type="text"
                    name="quantity"
                    value={`${quantity}`+'kg'}
                    readOnly
                    style={{
                      width: '50px',
                      textAlign: 'center',
                      outline: 'none',
                    }}
                  />
                  <div className="buttons">
                  <button onClick={handleIncrement}>+</button>
                  <button onClick={handleDecrement}>-</button>
                  </div>
                </div>
                <button className='ATC-btn' onClick={()=>{
                  const user =JSON.parse(localStorage.getItem('LoginUser'));
                  if (user) {
                    handleAddToCart(user.email,product.id,quantity)
                  } else {
                    alert('Please Login to Add to your Cart..!')
                    window.location.href='/login';
                  }
                }}>ADD TO CART</button>
                </div>
                
              </div>
            </Col>
          </Row>
        </Modal.Body>
      </Modal>
      </div>
    );
};