import { ReactComponent as Loader } from '../assets/loader.svg'

const ButtonToCopy = ({ onSubmit, text, loading = false, disabled, showCopiedText }) => {
    return (
        <button 
            className="submit-btn border border-slate-500 rounded-lg font-bold w-[7rem] h-10 flex justify-center items-center" 
            onClick={onSubmit} 
            disabled={disabled}
        >
            {loading ? (
                <Loader className="spinner" />
            ) : showCopiedText ? (
                'Copiado ✅'
            ) : (
                text
            )}
        </button>
    )
}

export default ButtonToCopy