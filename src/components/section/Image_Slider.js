import React from 'react'
import Slider from 'react-slick';
import { cutUrlinImage_list } from '../utils'

function Image_Slider(props) {
    const string_image = props.list_image
    const image_list = cutUrlinImage_list(string_image)
    const imageCallback = props.imageCallback
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        color: "black",
    };

    return (
        <div className="image-slider-container">
            <Slider {...settings}>
                {
                    image_list.map((item, index) => (
                        <div className="image-slider-container-colums" key={index} onClick={(e) => { imageCallback(item) }}>
                            <img  className="image-slider-container-img" src={item} />
                        </div>
                    ))
                }
            </Slider>
        </div>
    )
}

export default Image_Slider
