import React, { useEffect, useState } from 'react';
import { useWindowScroll } from 'react-use';
import Icon_Up from '../img/up-arrow.png'
import '../ScrollToTop/index.css'

const ScrollToTop = () => {
    const { y: pageYOffset } = useWindowScroll();
    const [visible, setVisiblity] = useState(false);

    useEffect(() => {
        if (pageYOffset > 140) {
            setVisiblity(true)
        } else {
            setVisiblity(false)
        }
    }, [pageYOffset])

    const scrollToTop = () => {
        window.scrollTo({top: 0, behavior: "smooth"})
    }

    if (!visible) {
        return false;
    }

    return (
        <div className="btn-gotop" onClick={scrollToTop}>
            <img src={Icon_Up} width={40} alt=""/>
        </div>
    )
}

export default ScrollToTop