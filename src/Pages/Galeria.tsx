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

interface PicsumImage {
    id: string;
    author: string;
    width: number;
    height: number;
    url: string;
    download_url: string;
}

const Galeria = () => {
    const { data: images, isLoading, error } = useFetch<PicsumImage[]>('https://picsum.photos/v2/list?limit=32');

    return (
        <div className="galeria-page">
            <h2>Galeria</h2>

            {error && <div className="error">{error}</div>}
            {isLoading && <div className="loading">Pobieranie zdjęć z serwera...</div>}

            <div className="galeria-grid">
                {images && images.map((imgNum) => (
                    <div className="img-container" key={imgNum.id}>
                        <img
                            src={imgNum.download_url}
                            alt={`Zdjęcie ${imgNum}`}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Galeria;