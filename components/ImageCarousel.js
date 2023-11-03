// components/ImageCarousel.js

import { useEffect, useState } from "react";

const ImageCarousel = ({ images }) => {
    const [currentImage, setCurrentImage] = useState(0);

    const prevImage = () => {
        setCurrentImage((currentImage - 1 + images.length) % images.length);
    };

    const nextImage = () => {
        setCurrentImage((currentImage + 1) % images.length);
    };

    useEffect(() => {
        const slideInterval = setInterval(nextImage, 3000);

        return () => {
            clearInterval(slideInterval);
        };
    }, [currentImage]);

    return (
        <div className="image-carousel">
            <button onClick={prevImage}>&#8249;</button>
            <img src={images[currentImage]} />
            <button onClick={nextImage}>&#8250;</button>
        </div>
    );
};

export default ImageCarousel;
