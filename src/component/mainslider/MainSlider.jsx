import React, { useContext } from 'react'
import Slider from "react-slick";
import img1 from "../../images/banner-4.jpeg"
import img2 from "../../images/grocery-banner.png"
import img3 from "../../images/grocery-banner-2.jpeg"
import img4 from "../../images/slider-2.jpeg"
import { context } from '../context/Context';
export default function MainSlider() {
    let loading = useContext(context)
    var settings = {
        dots: false,
        infinite: true,
        speed: 700,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        autoplay: true,
        autoplaySpeed: 2500,
        pauseOnFocus: false,
        pauseOnHover: false,
    };
    if (loading.Loading) {
        return "";
    } else {
        return (
            <Slider {...settings} className='mb-1 mt-5'>
                <img src={img1} alt="slider" className='w-100' height="400px" />
                <img src={img2} alt="slider" className='w-100' height="400px" />
                <img src={img3} alt="slider" className='w-100' height="400px" />
                <img src={img4} alt="slider" className='w-100' height="400px" />
            </Slider>
        );
    }
}
