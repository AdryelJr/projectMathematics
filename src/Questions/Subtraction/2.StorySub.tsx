import { useNavigate } from 'react-router-dom';

interface StoryProps {
    level: string;
    onAdvance: () => void;
}

const StorySub: React.FC<StoryProps> = ({ level, onAdvance }) => {
    const navigate = useNavigate();

    function handleHome() {
        navigate('/');
    }

    const { title, content } = level === 'easy' ? {
        title: 'A Vila dos Números Perdidos',
        content: (
            <p>
                O Deserto das Sequências Com mais Numéricos resgatados,
                agora você é levado para um vasto deserto, onde as areias estão sempre em movimento.
                Aqui, os Numéricos foram dispersos e estão escondidos em padrões de sequências numéricas.
                Para encontrar os Numéricos no deserto, você deve identificar as sequências e completá-las
                corretamente. Cada sequência resolvida revela a localização de mais Numéricos,
                trazendo-os de volta para a segurança da vila.
                Mantenha o foco e ajude a recuperar cada Numérico perdido nas dunas do Deserto das Sequências!
            </p >
        ),
    } : {
        title: 'O Enigma da Torre dos Números',
        content: (
            <p>
                O Salão dos Espelhos Mais acima, você encontra o Salão dos Espelhos,
                onde números e operações se refletem em todas as direções, criando ilusões e confusão.
                Para avançar, você deve distinguir entre reflexos falsos e reais, resolvendo desafios de
                múltiplos e divisores que confundem até os mais sábios. Cada problema resolvido quebra
                um espelho, liberando mais energia mágica e revelando o caminho verdadeiro.
                Concentre-se e derrote as ilusões para seguir em frente.
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

export default StorySub;
