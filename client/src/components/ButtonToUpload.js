import { ReactComponent as Loader } from '../assets/loader.svg'

const ButtonToUpload = ({ onSubmitToUpload, text, loading = false, disabled }) => {
    return (
        <button 
            className="submit-btn border border-slate-500 rounded-lg font-bold w-[7rem] h-10 flex justify-center items-center" 
            onClick={onSubmitToUpload} 
            disabled={disabled}
        >
            {loading ? (
                <Loader className="spinner" />
            ) : (
                text
            )}
        </button>
    )
}

export default ButtonToUpload