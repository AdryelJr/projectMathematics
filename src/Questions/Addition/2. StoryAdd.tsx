import { useNavigate } from 'react-router-dom';
import './style.scss';

interface StoryProps {
    level: string;
    onAdvance: () => void;
}

const Story: React.FC<StoryProps> = ({ level, onAdvance }) => {
    const navigate = useNavigate();

    function handleHome() {
        navigate('/');
    }

    const { title, content } = level === 'easy' ? {
        title: 'A Vila dos Números Perdidos',
        content: (
            <p>
                Em um vilarejo distante, viviam criaturas chamadas Numéricos,
                cada uma representando um número.Um dia, uma forte tempestade
                fez com que muitos números da vila se perdessem no ar!
                Para ajudar os Numéricos a voltarem para casa, você precisa usar a
                magia da matemática.
                Cada vez que você resolve uma conta corretamente,
                um Numérico encontra o caminho de volta.
                Vamos ajudar a reunir todos os números novamente na Vila dos Números?
            </p >
        ),
    } : {
        title: 'O Enigma da Torre dos Números',
        content: (
            <p>
                Em um reino misterioso, uma antiga torre guarda
                segredos matemáticos protegidos por enigmas.
                A fonte mágica que mantém o equilíbrio dos números está
                enfraquecendo, e cabe a você restaurá-la. Ao resolver
                desafios de somas, subtrações, multiplicações e divisões,
                você recupera a energia mágica e impede que o reino caia no caos.
                Prepare-se para explorar a Torre dos Números e trazer a ordem de volta!
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

export default Story;
