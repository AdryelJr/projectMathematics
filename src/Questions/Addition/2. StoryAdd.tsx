import { useNavigate } from 'react-router-dom';
import './style.scss'

const Story: React.FC<{ onAdvance: () => void }> = ({ onAdvance }) => {
    const navigate = useNavigate();

    function handleHome(){
        navigate('/')
    }

    return (
        <div className="container-story">
            <h1>O Bosque dos Números</h1>
            <p>
                Era uma vez, em um mundo encantado, um pequeno mago chamado Léo. <br />
                Ele vivia em um bosque mágico onde tudo era feito de números. <br />
                Um dia, Léo descobriu que as flores do bosque estavam perdendo suas cores!<br />
                Para devolver as cores vibrantes ao bosque, Léo precisa da sua ajuda para lançar feitiços de adição.<br />
                Cada vez que você resolve uma adição corretamente, uma flor ganha sua cor de volta.<br />
                Vamos ajudar o Léo a colorir o bosque novamente?
            </p>
            <div className='div-btn'>
                <button className='btn1' onClick={handleHome}>VOLTAR</button>
                <button className='btn2' onClick={onAdvance}>AVANÇAR</button>
            </div>
        </div>
    );
};

export default Story;
