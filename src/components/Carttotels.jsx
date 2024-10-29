import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
import './Carttotels.css';
import apiClient from '../apiService/Apiservice';

export default function Carttotels({carts = [], setCarts }) {
  const [updatedCarts, setUpdatedCarts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showModal1, setShowModal1] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [total, setTotal] = useState();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phoneNo: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    totalamount: ''

  });
  const states = [
    'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
    'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand',
    'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur',
    'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab',
    'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura',
    'Uttar Pradesh', 'Uttarakhand', 'West Bengal', 'Andaman and Nicobar Islands',
    'Chandigarh', 'Dadra and Nagar Haveli', 'Daman and Diu', 'Lakshadweep',
    'Delhi', 'Puducherry'
  ];
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value});
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    const orderdProducts = updatedCarts.map(cart => `${cart.productid}:${cart.quantity}`).join(',');
    const orderData = {
      ...formData,
      totalamount:total,
      orderdProducts 
    };
    try{
      const response = await apiClient.post('/order',orderData);
      console.log('Order submitted:', response.data.message);

      setModalMessage('Order Placed...!');
      setShowModal(true);
      handleClose1();
      setTimeout(() => {
      setCarts([]);
      setFormData({
        name: '',
        email: '',
        phoneNo: '',
        address: '',
        city: '',
        state: '',
        pincode: ''
      })
    },3000);
  }
    catch(error){
      console.log(orderData);
      alert(error.response.data.message);
    }
  };
  useEffect(() => {
    if (Array.isArray(carts)) {
      setUpdatedCarts(carts);
      const totalAmount = carts.reduce((acc, cart) => acc + cart.total, 0);
      setTotal(totalAmount);
    } else {
      console.error('Carts is not an array:', carts);
    }
  }, [carts]);

  const handleUpdateCart = () => {
    if (Array.isArray(updatedCarts)) {
      updatedCarts.forEach(async(cart) => {
        try{
            const response = await apiClient.put('/updateCart',{email:cart.email, productid:cart.productid, quantity:cart.quantity});
            console.log('Cart add successfully....!');
            setModalMessage(response.data.message);
            setShowModal(true);
        }
        catch(error){
            alert(error.response.data.message);
        }
      });
      
    } else {
      console.error('Updated carts is not an array:', updatedCarts);
    }
  };

  const handleClose = () => {
    setShowModal(false);
    setModalMessage('');
  };
  const handleClose1 = () => {
    setShowModal1(false);
  };
  return (
    <div className="container p-0 my-3">
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
      <div className="cart-update">
        <div className="update-btn">
          <button className="update" onClick={handleUpdateCart}>
            Update Cart
          </button>
        </div>
        <div className="shopping-btn">
            <button className='c-shopping' onClick={()=>window.location.href='/shop'}>Continue Shopping</button>
        </div>
      </div>
      <div className="cart-checkout">
        <h2 className="cart-title">CART TOTALS</h2>
        <table className="total-checkout">
          <tbody>
            <tr>
              <th className="cart-label"><span>Total</span></th>
              <td className="cart-amount">
                <span><strong><span>&#8377; {total}</span></strong></span>
              </td>
            </tr>
          </tbody>
        </table>
        <div className="chech-out">
          <a className='p-t-checkout' style={{cursor:'pointer'}} onClick={()=>setShowModal1(true)}>PROCEED TO CHECKOUT</a>
        </div>
      </div>
      <Modal size="lg" show={showModal1} onHide={handleClose1} className='customModal'>
      <Modal.Header closeButton>
        <Modal.Title>Checkout</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h5>Order Details</h5>
        <ul style={{width:'100%'}}>
          {updatedCarts.map(cart => (
            <li key={cart.id} style={{listStyle:'none', marginBottom:'10px', display:'flex', textAlign:'center'}}>
              <div style={{position:'relative'}}><img src={cart.productImage} alt={cart.productName} style={{width:'50px', height:'50px', marginRight:'10px'}} />
              <span className='cart-q-checkout'>{cart.quantity}</span>
              </div>
              <div style={{display:'flex',justifyContent:'center', alignItems:'center'}}>{cart.productName} (Price: {cart.productPrice}) - Total: &#8377; {cart.total}</div>
            </li>
          ))}
        </ul>
        <h6>Total Amount: &#8377; {total}</h6>
        
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col md={6}>
          <Form.Group controlId="formName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="formEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="formPhoneNo">
            <Form.Label>Phone Number</Form.Label>
            <Form.Control
              type="tel"
              name="phoneNo"
              value={formData.phoneNo}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="formAddress">
            <Form.Label>Address</Form.Label>
            <Form.Control
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
            />
          </Form.Group>
          </Col>
          <Col md={6}>
          <Form.Group controlId="formCity">
            <Form.Label>City</Form.Label>
            <Form.Control
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="formState">
            <Form.Label>State</Form.Label>
            <Form.Control
              as="select"
              name="state"
              value={formData.state}
              onChange={handleChange}
              required
            >
              <option value="">Select State</option>
              {states.map(state => (
                <option key={state} value={state}>{state}</option>
              ))}
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="formPincode">
            <Form.Label>Pincode</Form.Label>
            <Form.Control
              type="text"
              name="pincode"
              value={formData.pincode}
              onChange={handleChange}
              required
            />
          </Form.Group>
          </Col>
          </Row>
          <Button variant="primary" type="submit" className='mt-2' style={{backgroundColor:'#5ba616', borderRadius:'0px', border:'none'}}>
            Place Order
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
    </div>
  );
}
