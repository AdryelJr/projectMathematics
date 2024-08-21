import { usePlayButton } from '../../../contexts/playButtonContext';
import '../style.scss';

type Props = {
    onLevelSelect: (level: 'easy' | 'hard') => void;
};

export function QuestionLevelSelector({ onLevelSelect }: Props) {
    const { playButton } = usePlayButton();
    
    return (
        <div>
            {playButton ? (
                <div className='div-btn-choice'>
                    <h2>Escolha o nível de dificuldade</h2>
                    <button className='btn-escolha' onClick={() => onLevelSelect('easy')}>Fácil</button>
                    <button className='btn-escolha' onClick={() => onLevelSelect('hard')}>Difícil</button>
                </div>
            ) : null}
        </div>
    );
}
