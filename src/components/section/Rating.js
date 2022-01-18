import React from 'react'

function Rating(props) {
    const value = props.value
    const val_width = props.val_width

    function getStars(value) {
        const stars = []
        const [whole, part] = (parseFloat(value).toFixed(1)).toString().split(".");
        for (let i = 0; i < whole; i++) stars.push(100)
        if (part != 0) stars.push(part * 10)
        for (let i = whole; i < (part != 0 ? 4 : 5); i++) stars.push(0)
        return stars
    }

    return (
        <div>
            {
                getStars(value).map((value, index) => (
                    //process.env.PUBLIC_URL +
                    //window.location.origin +
                    <img key={index} src={process.env.PUBLIC_URL + `/img/star_png/star_${value}.png`} width={val_width} />
                ))
            }
        </div>
    )

}

export default Rating
