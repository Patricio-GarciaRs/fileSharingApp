import { useRef, useState, useEffect } from 'react';
import { uploadFile } from './services/api';
import './App.css';
import ButtonToCopy from './components/ButtonToCopy';
import ButtonToUpload from './components/ButtonToUpload';

function App() {
    
    const [ file, setFile ] = useState();
    
    const [ result, setResult ] = useState('');
    
    const fileInputRef = useRef();
    
    const [showLoader, setShowLoader] = useState(false)
    const [showLoaderOnUpdate, setShowLoaderOnUpdate] = useState(false)
    const [showCopiedText, setShowCopiedText] = useState(false); 

    useEffect(() => {
        const getImage = async () => {
            if (file) {
                setShowLoaderOnUpdate(true);
                const data = new FormData();
                data.append("name", file.name);
                data.append("file", file);

                let response = await uploadFile(data);
                setResult(response.path);
                setShowLoaderOnUpdate(false);
            }
        }
        getImage();
    }, [file])

    console.log(file);


    const onSubmit = () => {
        setShowLoader(true)
        setShowCopiedText(false);
        navigator.clipboard.writeText(result)
        setTimeout(() => {
            setShowLoader(false);
            setShowCopiedText(true);

            setTimeout(() => {
                setShowCopiedText(false);
            }, 3000);
        }, 500);
    }

    const onSubmitToUpload= () => {
        setResult('');
        setShowCopiedText(false);
        fileInputRef.current.click();
        setShowLoaderOnUpdate(true);
        setFile(null);

        setTimeout(() => {
            setShowLoaderOnUpdate(false);
        }, 10000);
    }

    return (
        <div className="bg-black h-dvh flex justify-center items-center">
            <div className="bg-white h-[25rem] w-[30rem] p-4 rounded-lg flex flex-col justify-center items-center gap-y-4 max-w-[80rem] overflow-hidden">
                <h1 className="text-5xl">File Sharing App</h1>
                <p className="">Sube y comparte el link de descarga</p>
                <ButtonToUpload
                    text="Subir"
                    onSubmitToUpload={onSubmitToUpload}
                    loading={showLoaderOnUpdate}
                    disabled={showLoaderOnUpdate}
                />
                <input 
                    type="file"
                    ref={fileInputRef}
                    hidden
                    onChange={(e) => {
                        setFile(e.target.files[0])
                    }
                    }
                />
                {result && (
                    <div className='grid grid-flow-col gap-x-2'>
                        <a 
                            href={result} 
                            onClick={async() => {
                                await navigator.clipboard.writeText(result)
                            }} 
                            className='border border-slate-800 bg-gray-200 p-2 h-10 w-80 overflow-hidden rounded-lg whitespace-nowrap'
                        >
                            {result}
                        </a>
                        <ButtonToCopy 
                            text="Copiar" 
                            onSubmit={onSubmit} 
                            loading={showLoader} 
                            disabled={showLoader}
                            showCopiedText={showCopiedText}
                        />
                    </div>
                )}
            </div>
        </div>
    );
}

export default App;
