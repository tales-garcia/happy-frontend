import React, { useState } from 'react';
import './slider.css';

interface SliderProps {
    images: {
        id: number,
        url: string
    }[]
}

const Slider : React.FC<SliderProps> = ({ images }) => {
    const [activeImageIndex, setActiveImageIndex] = useState<number>(0);

    return (
        <div className="slider">
            <img src={images[activeImageIndex].url} alt="Imagem do orfanato" />
    
            <div className="images">
                {images.map((image, index) => {
                    return (
                        <button onClick={() => setActiveImageIndex(index)} className={index === activeImageIndex ? 'active' : ''} key={image.id} type="button">
                            <img src={image.url} alt="Lar das meninas" />
                        </button>
                    );
                })}
            </div>
        </div>
    );
}

export default Slider;