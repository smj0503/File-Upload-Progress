import { useState, useRef } from "react";
import axios from "axios";

import styles from "../styles/FileUploadProgress.module.css";

export default function ()
{
    const [imageUrl, setImageUrl] = useState("");   // 화면에 렌더링 될 이미지의 url state
    const [progress, setProgress] = useState(0);  // 화면에 렌더링 될 progress rate state
    const [opacity, setOpacity] = useState(0);

    const imgRef = useRef(null);

    /* 선택한 이미지 리셋 */
    const imgReset = () =>
    {
        if (imgRef.current)
        {
            imgRef.current.value = "";
        }
        setImageUrl("");
        setProgress(0);
        setOpacity(0);
    };

    /* 파일 업로드 */
    const handleUpload = async (e) =>
    {
        const options = { headers: {} };
        options.headers['Content-Type'] = 'multipart/form-data';
        options.onUploadProgress = (e) =>
        {
            console.log('e : ', e);
            setProgress(Math.round((e.loaded / e.total) * 100));
            setOpacity(e.loaded / e.total);
        };

        const file = e.target.files[0];
        const formData = new FormData();
        formData.append('file', file);

        const res = await axios.post('/api/image', formData, options);
        if(res.data)
        {
            setImageUrl(URL.createObjectURL(file)); // file 의 local URI 제공
        }
    };

    return (
        <div className={ styles.container }>
            <h1>File Upload Progress</h1>
            <input type="file" name="image" ref={ imgRef } onChange={ handleUpload }/>
            <span className={ styles.progress } style={{ opacity: opacity }}>
                { `Progress rate : ${ progress } %` }
            </span>
            <button type="button" onClick={ imgReset }>Reset</button>
            {
                imageUrl ? <img src={ imageUrl } alt='테스트 이미지' className={ styles.image }/> : <span>Select Image!</span>
            }
        </div>
    )
}
