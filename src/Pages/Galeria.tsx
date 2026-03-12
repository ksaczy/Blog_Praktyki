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
    const [photoUrl, setPhotoUrl] = useState <string|null>(null);

    const handlePhotoClick = (imgUrl:string)=>{
        setPhotoOpen(true);
        setPhotoUrl(imgUrl);
    }

    const handleClose = () => {
        setPhotoOpen(false);
    }

    return (
        <div className="gallery">
            <div className="galeria-page">
                <h1>Galeria</h1>

                {error && <div className="error">{error}</div>}
                {isLoading && <div className="loading">Pobieranie zdjęć z serwera...</div>}

                <div className="galeria-grid">
                    {images && images.map((imgNum) => (
                        <div className="img-container" key={imgNum.id}>
                            <img
                                src={imgNum.download_url}
                                alt={`Zdjęcie ${imgNum}`}
                                onClick={() => handlePhotoClick(imgNum.download_url)}
                            />
                        </div>
                    ))}
                </div>
            </div>

            {photoOpen && photoUrl && <BiggerPhoto photoSrc={photoUrl} close={handleClose} />}
        </div>
    );
};

export default Galeria;