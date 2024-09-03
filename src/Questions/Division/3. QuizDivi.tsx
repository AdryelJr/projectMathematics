import { useEffect, useState } from 'react';
import { ref, update, get } from 'firebase/database';
import { database } from '../../services/firebase';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

interface Question {
    id: string;
    text: string;
    options: string[];
    correctAnswer: string;
}

export const QuizDivi: React.FC<{ level: string; operation: string }> = ({ level, operation }) => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const [questions, setQuestions] = useState<Question[]>([]);
    const [currentQuestion, setCurrentQuestion] = useState<number>(0);
    const [feedback, setFeedback] = useState<string | null>(null);
    const [feedbackClass, setFeedbackClass] = useState<string>('');
    const [buttonStates, setButtonStates] = useState<{ [key: string]: string }>({});
    const [isAnswered, setIsAnswered] = useState<boolean>(false);
    const [correctAnswers, setCorrectAnswers] = useState<number>(0);
    const [isQuizCompleted, setIsQuizCompleted] = useState<boolean>(false);
    const [totalQuestions, setTotalQuestions] = useState<number>(0);

    useEffect(() => {
        const fetchQuestions = async () => {
            const questionsRef = ref(database, `questions/${operation}/${level}`);
            const snapshot = await get(questionsRef);
            if (snapshot.exists()) {
                const data = snapshot.val();
                const questionsArray = Object.keys(data).map(key => data[key]);
                setQuestions(questionsArray);
                setTotalQuestions(questionsArray.length);
            }
        };
        fetchQuestions();
    }, [level, operation]);

    const handleAnswerClick = async (answer: string) => {
        if (isAnswered) return;

        const correctAnswer = questions[currentQuestion].correctAnswer;
        const isCorrect = answer === correctAnswer;

        const newButtonStates: { [key: string]: string } = {};
        questions[currentQuestion].options.forEach((option: string) => {
            if (option === correctAnswer) {
                newButtonStates[option] = 'correct';
            } else if (option === answer) {
                newButtonStates[option] = 'incorrect';
            } else {
                newButtonStates[option] = '';
            }
        });

        setButtonStates(newButtonStates);
        setFeedback(isCorrect ? 'Correto!' : 'Errado!');
        setFeedbackClass(isCorrect ? 'feedback-correct' : 'feedback-incorrect');
        setIsAnswered(true);

        if (isCorrect) {
            setCorrectAnswers(prev => prev + 1);
        }

        if (user) {
            const userRef = ref(database, `users/${user.id}/answers/${operation}/${level}`);
            await update(userRef, {
                [questions[currentQuestion].id]: {
                    question: questions[currentQuestion].text,
                    selectedAnswer: answer,
                    correctAnswer: correctAnswer,
                    isCorrect: isCorrect
                }
            });
        }

        setTimeout(() => {
            setFeedback(null);
            setFeedbackClass('');
            setButtonStates({});
            setIsAnswered(false);

            if (currentQuestion < questions.length - 1) {
                setCurrentQuestion(prev => prev + 1);
            } else {
                handleQuizCompletion();
            }
        }, 3000);
    };

    const updateProgress = async (phaseCompleted: 'facil' | 'dificil') => {
        if (!user) return;

        const userRef = ref(database, `users/${user.id}/progress/${operation}`);
        const snapshot = await get(userRef);
        const progress = snapshot.val() || {};

        if (phaseCompleted === 'facil') {
            await update(userRef, {
                facil: true,
                concluido: progress.dificil || false
            });
        } else if (phaseCompleted === 'dificil') {
            await update(userRef, {
                facil: true,
                dificil: true,
            });
        }
    };

    const handleQuizCompletion = async () => {
        setIsQuizCompleted(true);

        const phaseCompleted = determineLevelCompleted();
        await updateProgress(phaseCompleted);
    };

    const determineLevelCompleted = (): 'facil' | 'dificil' => {
        const normalizedLevel = level.trim().toLowerCase();
        return normalizedLevel === 'hard' ? 'dificil' : 'facil';
    };

    const storyEnding = level === 'easy' ? (
        <>
            <h2>Desfecho</h2>
            <p>
                Com todos os Numéricos reunidos, a Vila dos Números Perdidos renasce em alegria.
                Os habitantes, em agradecimento, organizam um belo festival, onde os números brilham no céu
                como constelações, celebrando a união e o poder do conhecimento.<br /><br />
                Você é recebido com gratidão, sabendo que sua coragem e inteligência trouxeram
                a vila de volta à vida. Com a luz dos números iluminando o céu, a paz e a harmonia
                retornam à vila, e todos comemoram o fim dessa jornada mágica. Fim.
            </p>
        </>
    ) : (
        <p>
            Com todos os desafios superados e a energia mágica restaurada, a Torre dos Números
            brilha com uma luz intensa, iluminando todo o reino. O caos é evitado,
            e o equilíbrio numérico retorna, trazendo paz e estabilidade. O reino celebra sua bravura
            e inteligência, e a torre, agora cheia de vida, se torna um farol de conhecimento e sabedoria.<br /><br />
            Você, o herói que restaurou a ordem, é lembrado para sempre como o Guardião da Torre,
            e o reino dos números floresce, seguro na certeza de que, sempre que precisar,
            você estará lá para proteger o equilíbrio. Fim.
        </p>
    );

    return (
        <div className='container-quiz'>
            {isQuizCompleted ? (
                <div className='completion-screen'>
                    <div className='div-history'>
                        {storyEnding}
                    </div>
                    <h1>Parabéns!</h1>
                    <p>{`Operação de nível ${level === 'easy' ? 'Fácil' : 'Difícil'} concluído`}</p>
                    <p>{`${correctAnswers} acertos de ${totalQuestions} perguntas`}</p>
                    <button onClick={() => navigate('/')}>VOLTAR À TELA INICIAL</button>
                </div>
            ) : (
                questions.length > 0 && (
                    <div className='content-quiz'>
                        <h1>{`Nível ${currentQuestion + 1}`}</h1>
                        <p>{questions[currentQuestion].text}</p>
                        {questions[currentQuestion].options.map((option: string) => (
                            <div key={option}>
                                <button
                                    className={buttonStates[option]}
                                    onClick={() => handleAnswerClick(option)}
                                    disabled={isAnswered}
                                >
                                    {option}
                                </button>
                            </div>
                        ))}
                        {feedback && <p className={`div-feedback ${feedbackClass}`}>{feedback}</p>}
                    </div>
                )
            )}

            {!isQuizCompleted && <div className='div-sair-do-game' onClick={() => navigate('/')}>VOLTAR AO INÍCIO</div>}
        </div>
    );
};
