import React, { useEffect } from 'react';
import firstImg from '../../assets/alex-azabache-V83v-MYB_Z8-unsplash.jpg';
import secImg from '../../assets/ian-dooley-hpTH5b6mo2s-unsplash.jpg';
import thirdImg from '../../assets/tom-barrett-M0AWNxnLaMw-unsplash.jpg';

const images = [firstImg, secImg, thirdImg];
const delay = 2500;

function SlideShow() {
    const [index, setIndex] = React.useState(0);
    const timeoutRef = React.useRef(null);

    function resetTimeout() {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
    }


    useEffect(() => {
        resetTimeout();
        timeoutRef.current = setTimeout(() =>
            setIndex((prevIndex) =>
                prevIndex === images.length - 1 ? 0 : prevIndex + 1
            ), delay);

        return () => {
            resetTimeout();
        };
    }, [index]);

    return (
        <div className="slideshow">
            <div className="slideshowSlider" style={{ transform: `translate3d(${-index * 100}%, 0, 0)` }}>
                {images.map((img, index) => (
                    <img className="slide" key={index} src={img} />
                ))}
            </div>
            <div className="slideshowDots">
                {images.map((_, idx) => (
                    <div
                        key={idx}
                        className={`slideshowDot${index === idx ? " active" : ""}`}
                        onClick={() => {
                            setIndex(idx);
                        }}
                    ></div>
                ))}
            </div>
        </div>
    );
}

export default SlideShow;