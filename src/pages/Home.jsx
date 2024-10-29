import React from 'react';
import Carousel from '../components/Carousel';
import DailyEssential from '../components/DaliyEssential';
import BestSeller from '../components/BestSeller';
import SpecialPrice from '../components/SpecialPrice';
import './Home.css';
export default function Home(){
    return(
        <div className='home'>
            <Carousel/>
            <DailyEssential/>
            <BestSeller/>
            <SpecialPrice/>
        </div>
    )
}