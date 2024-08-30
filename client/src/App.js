import { useRef, useState, useEffect } from 'react';
import { uploadFile } from './services/api';
import './App.css';

function App() {

    const [ file, setFile ] = useState();

    const [ result, setResult ] = useState('');

    const fileInputRef = useRef();

    const onUploadClick = () => {
        fileInputRef.current.click();
    }

    useEffect(() => {
        const getImage = async () => {
            if (file) {
                const data = new FormData();
                data.append("name", file.name);
                data.append("file", file);

                let response = await uploadFile(data);
                setResult(response.path);
            }
        }
        getImage();
    }, [file])

    console.log(file);

    return (
        <div className="bg-black h-dvh flex justify-center items-center">
            <div className="bg-white h-80 w-fit p-4 rounded-lg flex flex-col justify-center items-center gap-y-4">
                <h1 className="text-5xl">File Sharing App</h1>
                <p className="">Sube y comparte el link de descarga</p>
                <button 
                    onClick={() => onUploadClick()} 
                    className='w-20 h-10 border border-slate-500 rounded-lg font-bold'
                >
                    Subir
                </button>
                <input 
                    type="file"
                    ref={fileInputRef}
                    hidden
                    onChange={(e) => setFile(e.target.files[0])}
                />

                <a href={result}>{result}</a>
            </div>
        </div>
    );
}

export default App;
