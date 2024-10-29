import React, { useEffect, useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import Cartlist from '../components/Cartlist';
import './Cart.css';

export default function Cart() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem('LoginUser');
    if (user) {
      setIsLoggedIn(true);
    } else {
      setShowModal(true);
    }
  }, []);

  const handleClose = () =>{
    setShowModal(false);
    window.location.href='/login';
  } 
  const handleLoginRedirect = () => {
    handleClose();
    window.location.href = '/login';
  };

  return (
    <div>
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Please Log In</Modal.Title>
        </Modal.Header>
        <Modal.Body>You need to log in to view your cart.</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleLoginRedirect}>
            Go to Login
          </Button>
        </Modal.Footer>
      </Modal>

      {isLoggedIn ? (
        <div>
          <div className='bg-breadcrumb text-center' id='bg-breadcrumb'>
            <div className="title-page">
              <h2 className="">Cart</h2>
            </div>
            <div className="bread-crumb">
              <a href="/" title="Back to the frontpage" className='text-decoration-none text-dark'>
                Home<i className="bi bi-chevron-right"></i>
              </a>
              <strong>Cart</strong>
            </div>
            <div className='container d-flex flex-row justify-content-center list_col'>
              {/* Additional content can go here */}
            </div>
          </div>
          <Cartlist />
        </div>
      ) : null} {/* Only render Cartlist if logged in */}
    </div>
  );
}
