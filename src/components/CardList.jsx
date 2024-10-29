import React, { useEffect, useState } from "react";
import Card from "./Card";
import './CardList.css';
import apiClient from "../apiService/Apiservice";

export default function CardList() {
  const [products, setProducts] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiClient.get('/getAll');
        setProducts(response.data.products);
      } catch (error) {
        setErrorMessage(error.response?.data?.message || 'Something went wrong!');
      }
    };
    fetchData();
  }, []);
  return (
    <div className="row justify-content-between product-list">
      {
        products.map((product) => {
        const image = product.imagePaths.split(',')[0]
        console.log(image)
        return (
            <div key={product.id} className="col-lg-3 col-md-3 col-sm-6 col-6 product">
              <Card 
                image={'http://localhost:5000/'+image} 
                title={product.productName} 
                fullprice={product.fullPrice}
                reduceprice={product.reducePrice} 
                Id={product.id}
                availableKilograms={product.availableKilograms}

              />
            </div>
          );
})}
    </div>
  );
}
