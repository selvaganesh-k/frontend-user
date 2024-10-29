import React from 'react';
import './Products.css';
import ProductsHome from '../components/ProductsHome';
import CardList from '../components/CardList';
export default function Home(){
    return(
        <div className='shop'>
            <ProductsHome/>
            <CardList/>
        </div>
    )
}