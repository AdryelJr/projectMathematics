import './style.scss'
const ChooseLevel: React.FC<{ onLevelSelect: (level: string) => void }> = ({ onLevelSelect }) => {
    return (
        <div className='container-chooseLevel'>
            <h2>ESCOLHA O NÍVEL DE DIFICULDADE</h2>
            <button onClick={() => onLevelSelect('easy')}>FÁCIL</button>
            <button onClick={() => onLevelSelect('hard')}>DIFÍCIL</button>
        </div>
    );
};

export default ChooseLevel;
