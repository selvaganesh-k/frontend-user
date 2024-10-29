import React from 'react'
import { useEffect,useState } from 'react';
import { Table, Button, Modal } from 'react-bootstrap'
import apiClient from '../apiService/Apiservice';
import Carttotels from './Carttotels';
import './Cartlist.css';
export default function Cartlist() {
    const [carts, setCarts] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    useEffect(() => {
      fetchCarts();
    }, []);
  
    const fetchCarts = async () => {
      try {
        const response = await apiClient.get('/getAllCarts');
        const fetchedCarts = response.data.carts;
        setCarts(fetchedCarts);
        await handleAddProductDetails(fetchedCarts);
      } catch (error) {
        console.error('Error fetching carts:', error);
      }
    };
  
    const handleAddProductDetails = async (fetchedCarts) => {
      const updatedCarts = await Promise.all(
        fetchedCarts.map(async (cart) => {
          try {
            const productResponse = await apiClient.get(`/products/${cart.productid}`);
            const product = productResponse.data;
            const imageArray = product.imagePaths
              ? product.imagePaths.split(',').map(img => `http://localhost:5000/${img}`.trim())
              : [];
  
            return {
              ...cart,
              productName: product.productName,
              productImage: imageArray[0],
              productPrice: product.reducePrice,
            };
          } catch (error) {
            console.error(error.response.data.message);
            return cart;
          }
        })
      );

      const user = JSON.parse(localStorage.getItem('LoginUser'));
      const userCarts = updatedCarts.filter(cart => cart.email === user.email);
      setCarts(userCarts);
    };

    const deleteCart = async (id) => {
      try {
        const response = await apiClient.delete(`/carts/${id}`);
        console.log(response.data);
        fetchCarts(); 
      } catch (error) {
        console.error('Error deleting product:', error);
        
      }
      setTimeout(() => 3000);
    };

    const handleIncrement = (id) => {
        setCarts((prevCarts) =>
          prevCarts.map((cart) =>
            cart.id === id ? { ...cart, quantity: cart.quantity + 1, total: (cart.quantity+1) * cart.productPrice} : cart
          )
        );
      };
      const handleDecrement = (id) => {
        setCarts((prevCarts) =>
          prevCarts.map((cart) =>
            cart.id === id && cart.quantity > 1
              ? { ...cart, quantity: cart.quantity - 1, total: (cart.quantity-1) * cart.productPrice }
              : cart
          )
        );
      };
    
    const handleClose = () => setShowModal(false);
    return (
      <div className='container mt-4'>
        {!carts || carts.length ===0 ? (
          <a href='/shop' style={{textDecoration:'none', color:'#5ba616', fontSize:'25px'}}>No Carts Available. Go to Shop !</a>
        ) : (
          <>
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
        <Table >
          <thead>
            <tr>
              <th style={{textAlign:'le'}}>Product</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total</th>
              <th></th>
            </tr>
          </thead>
          <tbody style={{textAlign:'center'}} className="cart-body">
            {carts.map((cart) => (
                
              <tr key={cart.id} className="cart-item">
                <td className="cart-image-name" style={{display:'flex', justifyContent:'start', flexDirection:'row',alignItems:'center', gap:'30px'}}>
                  <img
                    src={cart.productImage}
                    alt={cart.productName}
                    style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                  />
                  {cart.productName}<br/>
                  1 kg
                </td>
                <td className="cart-price" style={{color:'#A8A8A8'}}><div style={{display:'flex',justifyContent:'center', alignItems:'center', height:'100px'}}>&#8377; {cart.productPrice}</div> </td>
                <td className="cart-quantity"><div className="quantity-control" style={{display:'flex',justifyContent:'center', alignItems:'center', height:'100px'}}>
                    <div className='quantity1'>
                                    <input
                                        type="text"
                                        name="quantity"
                                        value={cart.quantity}
                                        style={{
                                            width: '50px',
                                            outline: 'none',
                                            textAlign: 'center'
                                        }}
                                    />
                                    <div className="buttons">
                                        <button onClick={()=>handleIncrement(cart.id)}>+</button>
                                        <button onClick={()=>handleDecrement(cart.id)}>-</button>
                                    </div>
                                </div></div></td>
                <td className="cart-total" style={{color:'#A8A8A8'}}><div style={{display:'flex',justifyContent:'center', alignItems:'center', height:'100px'}}>&#8377; {cart.total}</div></td>
                <td className="cart-delete" style={{textAlign:'center'}}>
                    <div style={{display:'flex',justifyContent:'center', alignItems:'center', height:'100px'}}><span onClick={()=>deleteCart(cart.id)} style={{cursor:'pointer'}}><i class="bi bi-trash3-fill"></i></span>
                    </div>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <Carttotels carts={carts} setCarts={setCarts}/>
        </>
        )}
      </div>
    );
  };

