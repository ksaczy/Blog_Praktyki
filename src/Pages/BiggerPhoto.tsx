
interface Photo {
    photoSrc: string;
    close: () => void;
}

const BiggerPhoto = (krzysztof:Photo)=>{


    return(
        <div className="overlay" onClick={krzysztof.close}>
            <div className="bigger-photo" onClick={(e)=>e.stopPropagation()}>
                <div className="close" onClick={krzysztof.close}>X</div>
                <img src={krzysztof.photoSrc} alt={"placeholder"} className="photo"/>
            </div>
        </div>
    )

}

export default BiggerPhoto;