import { createPortal } from 'react-dom'


interface Photo {
    photoSrc: string;
    photoAlt: string;
    close: () => void;
    next: () => void;
    prev: () => void;
}

const BiggerPhoto = (image:Photo)=>{


    return createPortal(
        <div className="overlay" onClick={image.close}>
            <div className="bigger-photo">
                <div className="close">✕</div>
                <div className="prev" onClick={(e) => {e.stopPropagation(); image.prev()}}>←</div>
                <img src={image.photoSrc} alt={image.photoAlt} className="photo"/>
                <div className="next" onClick={(e) => {e.stopPropagation(); image.next()}}>→</div>
            </div>
        </div>,
        document.body
    )

}

export default BiggerPhoto;