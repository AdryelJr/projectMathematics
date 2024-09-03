import { useNavigate } from 'react-router-dom';

interface StoryProps {
    level: string;
    onAdvance: () => void;
}

const StoryDivi: React.FC<StoryProps> = ({ level, onAdvance }) => {
    const navigate = useNavigate();

    function handleHome() {
        navigate('/');
    }

    const { title, content } = level === 'easy' ? {
        title: 'A Vila dos Números Perdidos',
        content: (
            <p>
                O Labirinto dos Cálculos Após reunir alguns Numéricos na Vila,
                você descobre que muitos ainda estão perdidos em um misterioso labirinto.
                Este labirinto é cheio de encruzilhadas e caminhos errantes, mas os Numéricos
                deixaram pistas para encontrar o caminho certo. Essas pistas são equações matemáticas!
                Cada vez que você resolve uma equação corretamente, o caminho se revela e mais
                Numéricos conseguem encontrar o caminho de volta.
                Prepare-se para resolver problemas e enfrentar os desafios do Labirinto dos Cálculos!
            </p >
        ),
    } : {
        title: 'O Enigma da Torre dos Números',
        content: (
            <p>
                As Escadas Infinitas Após restaurar parte da energia mágica no piso térreo da torre,
                você descobre uma escada que parece nunca acabar.
                Cada degrau é protegido por um enigma matemático que testa suas
                habilidades em sequências e padrões. Conforme você resolve os enigmas,
                a escada se torna mais curta, permitindo que você suba cada vez mais alto.
                Mas cuidado, se errar, a escada pode se alongar novamente!
                Suba as escadas infinitas e continue a restaurar a energia da torre.
            </p>
        )
    };

    return (
        <div className="container-story">
            <h1>{title}</h1>
            {content}
            <div className='div-btn'>
                <button className='btn1' onClick={handleHome}>VOLTAR</button>
                <button className='btn2' onClick={onAdvance}>AVANÇAR</button>
            </div>
        </div>
    );
};

export default StoryDivi;
