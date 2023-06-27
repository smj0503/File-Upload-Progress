import { useState, useRef } from 'react';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';

import styles from '../styles/ImageCropper.module.css';

export default function Example() {
    const cropperRef = useRef(null);
    // 유저가 첨부한 이미지
    const [inputImage, setInputImage] = useState(null);
    // 유저가 선택한 영역만큼 크롭된 이미지
    const [croppedImage, setCroppedImage] = useState(null);

    const onCrop = () => {
        const imageElement = cropperRef?.current;
        const cropper = imageElement?.cropper;
        setCroppedImage(cropper.getCroppedCanvas().toDataURL());
    };

    console.log('원본 : ', inputImage);
    console.log('크롭 : ', croppedImage);

    return (
        <div className={ styles.container }>
            <div>
                <input type="file" accept="image/*" onChange={(e) => setInputImage(URL.createObjectURL(e.target.files[0]))} />
                <Cropper src={ inputImage } crop={ onCrop } ref={cropperRef} className={ styles.cropper }/>
                <img src={ croppedImage } />
            </div>
        </div>
    );
}
