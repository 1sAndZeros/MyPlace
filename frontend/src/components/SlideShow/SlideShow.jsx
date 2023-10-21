import { useEffect, useState, useRef } from 'react';
import firstImg from '../../assets/slideshow/zero-take-Mpa3_xioTRQ-unsplash.jpg';
import secImg from '../../assets/slideshow/neom-p4q-Ra__g8M-unsplash.jpg';
import thirdImg from '../../assets/slideshow/neom-z-8M8NQgMdA-unsplash.jpg';
import fourthImg from '../../assets/slideshow/redd-f-Dl_Ya8eNRpk-unsplash.jpg';
import fifthdImg from '../../assets/slideshow/toms-rits-ryfptJi3fAM-unsplash.jpg';

const images = [firstImg, secImg, thirdImg, fourthImg, fifthdImg];
const delay = 2500;

function SlideShow() {
    const [index, setIndex] = useState(0);
    const timeoutRef = useRef(null);

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
            <div
                className="slideshowSlider"
                style={{ transform: `translate3d(${-index * 100}%, 0, 0)` }}>
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