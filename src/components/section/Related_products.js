import React, { useState } from 'react'
import Slider from 'react-slick'


function Related_products(props) {
    const category_products = props.category_product
    //const [products, setProducts] = useState([])
    
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        color: "black",
    };
    return (
        
        <div className="related-product-container">
            <Slider {...settings}>
                {
                    category_products.map((item, index) => (
                        <div className="related-product-container-colums" key={index}>
                            <img  className="related-product-container-img" src={item.image}/>
                        </div>
                    ))
                }
            </Slider>
        </div>
    )
}

export default Related_products
