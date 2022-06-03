import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import React from 'react';
import Slider from "react-slick";
import './index.scss';

const CustomPreveArrow = (props:any) => {
    const { className, onClick } = props;
    return (
        <img className={className} onClick={onClick} src="/svg/prev-arrow.svg" />
    );
}

const CustomNextArrow = (props:any) => {
    const { className, onClick } = props;
    return (
        <img className={className} onClick={onClick} src="/svg/next-arrow.svg" />
    );
}

const SlideShow = ({ children, speed=800, autoplay=false, className = '', slideToShow, infinite=true, dots=true, arrows=false}:any) => {
    const [settings ] = React.useState(() => {
        const initSettings = {
            infinite: infinite,
            speed: speed,
            slidesToShow: slideToShow,
            slidesToScroll: 1,
            autoplay: autoplay,
            adaptiveHeight:true,
            className: className,
            dots: dots,
            arrows:arrows,
            prevArrow: <CustomPreveArrow />,
            nextArrow: <CustomNextArrow />,
            responsive: [
                {
                  breakpoint: 1024,
                  settings: {
                    slidesToShow: className.includes('background-image') ? 1 : slideToShow,
                    arrows:className.includes('background-image') ? false : true
                  }
                },
                {
                  breakpoint: 600,
                  settings: {
                    slidesToShow: className.includes('background-image') ? 1 : 3,
                    slidesToScroll: className.includes('background-image') ? 1 : 3,
                    arrows:false
                  }
                },
                {
                  breakpoint: 480,
                  settings: {
                    slidesToShow: className.includes('background-image') ? 1 : 3,
                    slidesToScroll: className.includes('background-image') ? 1 : 3,
                    arrows:false,
                    dots:false
                  }
                }
            ]
        };
        
        return initSettings;
    });
    return (
        <Slider {...settings}>
            {children}
        </Slider>
    )
}

export default SlideShow;