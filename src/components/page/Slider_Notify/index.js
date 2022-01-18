import React from 'react'
import Slider from 'react-slick'

function index() {
    const list_notify = ["Hii 1", "Hiii 2", "Hiiii 3", "Hiiiii 4"]
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        color: "black",
    };
    return (
        <div className="slider-notify">
            <Slider {...settings}>
                {
                    list_notify.map((item, index) => (
                        <div className="slider-notify-item" key={index}>
                            {item}
                        </div>
                    ))
                }
            </Slider>
        </div>
    )

}

export default index
