import { useNavigate } from 'react-router-dom';

const StoryMulti: React.FC<{ onAdvance: () => void }> = ({ onAdvance }) => {
    const navigate = useNavigate();

    function handleHome(){
        navigate('/')
    }

    return (
        <div className="container-story">
            <h1>title </h1>
            <p>
                Histori 
            </p>
            <div className='div-btn'>
                <button className='btn1' onClick={handleHome}>VOLTAR</button>
                <button className='btn2' onClick={onAdvance}>AVANÇAR</button>
            </div>
        </div>
    );
};

export default StoryMulti;
