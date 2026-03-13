// import React from 'react';
// import './Galeria.scss';
//
// const Galeria = () => {
//     const images = Array.from({ length: 32 }, (_, i) => i + 1);
//
//     return (
//         <div className="galeria-page">
//             <h2>Galeria</h2>
//             <div className="galeria-grid">
//                 {images.map((imgNum) => (
//                     <div className="img-container" key={imgNum}>
//                         <img
//                             src={`/images/${imgNum}.jpg`}
//                             alt={`Zdjęcie ${imgNum}`}
//                         />
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// };
//
// export default Galeria;

import React from 'react';
import useFetch from '../Functionality/useFetch';
import './Galeria.scss';
import { useState } from 'react';
import BiggerPhoto from "./BiggerPhoto";

interface PicsumImage {
    id: string;
    author: string;
    width: number;
    height: number;
    url: string;
    download_url: string;
}

const Galeria = () => {
    const { data: images, isLoading, error } = useFetch<PicsumImage[]>('https://picsum.photos/v2/list?limit=16');

    const [photoOpen, setPhotoOpen] = useState(false);
    const [currentIdx, setCurrentIdx] = useState <number|null>(null);

    const handlePhotoClick = (index: number)=>{
        setPhotoOpen(true);
        setCurrentIdx(index);
    }

    const handleClose = () => {
        setPhotoOpen(false);
    }

    const handleNext = () => {
        if(images && currentIdx!==null)setCurrentIdx((currentIdx + 1)%images.length);
    }
    const handlePrev = () => {
        if(images && currentIdx!==null)setCurrentIdx((currentIdx - 1 +images.length)%images.length);
    }

    return (
        <div className="gallery">
            <div className="galeria-page">
                <h1>Galeria</h1>

                {error && <div className="error">{error}</div>}
                {isLoading && <div className="loading">Pobieranie zdjęć z serwera...</div>}

                <div className="galeria-grid">
                    {images && images.map((imgNum, index) => (
                        <div className="img-container" key={imgNum.id}>
                            <img
                                src={imgNum.download_url}
                                alt={`Zdjęcie ${imgNum}`}
                                onClick={() => handlePhotoClick(index)}
                            />
                        </div>
                    ))}
                </div>
            </div>

            {photoOpen && currentIdx!==null && images && <BiggerPhoto
                photoSrc={images[currentIdx]?.download_url||""}
                photoAlt={images[currentIdx]?.id||""}
                close={handleClose}
                next={handleNext}
                prev={handlePrev}
            />}
        </div>
    );
};

export default Galeria;