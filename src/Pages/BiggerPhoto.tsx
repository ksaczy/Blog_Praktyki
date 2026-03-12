
interface Photo {
    photoSrc: string;
    close: () => void;
    next: () => void;
    prev: () => void;
}

const BiggerPhoto = (image:Photo)=>{


    return(
        <div className="overlay" onClick={image.close}>
            <div className="bigger-photo" onClick={(e)=>e.stopPropagation()}>
                <div className="close" onClick={image.close}>X</div>
                <img src={image.photoSrc} alt={"placeholder"} className="photo"/>
            </div>
        </div>
    )

}

export default BiggerPhoto;