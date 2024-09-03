import { useNavigate } from 'react-router-dom';

interface StoryProps {
    level: string;
    onAdvance: () => void;
}

const StoryMulti: React.FC<StoryProps> = ({ level, onAdvance }) => {
    const navigate = useNavigate();

    function handleHome() {
        navigate('/');
    }

    const { title, content } = level === 'easy' ? {
        title: 'A Vila dos Números Perdidos',
        content: (
            <p>
                A Montanha dos Desafios Com a maioria dos Numéricos resgatados,
                resta apenas um último grupo, mas eles estão presos no topo da Montanha dos Desafios.
                Esta montanha é imensa e está coberta de problemas matemáticos complexos.
                Para escalar a montanha e resgatar os Numéricos, você deve resolver uma série de desafios
                matemáticos que aumentam em dificuldade conforme você sobe.
                Cada desafio superado traz você mais perto do topo, onde os últimos
                Numéricos esperam por sua ajuda.
                Prepare-se para a escalada final e traga todos os Numéricos de volta para casa!
            </p >
        ),
    } : {
        title: 'O Enigma da Torre dos Números',
        content: (
            <p>
                A Sala do Tempo No topo da torre, você chega à Sala do Tempo,
                onde o próprio tempo é influenciado por equações complexas.
                Aqui, as horas e minutos se movem conforme você resolve problemas envolvendo frações e proporções.
                O desafio final é restaurar o fluxo do tempo para impedir que o reino
                entre em colapso. Cada equação resolvida faz o tempo correr novamente,
                até que a energia mágica seja completamente restaurada.
                Encare o desafio e traga de volta a harmonia ao reino!
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

export default StoryMulti;
