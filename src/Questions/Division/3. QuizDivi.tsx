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

    const determineLevelCompleted = (): 'facil' | 'dificil' => {
        const normalizedLevel = level.trim().toLowerCase();
        return normalizedLevel === 'hard' ? 'dificil' : 'facil';
    };


    const handleQuizCompletion = async () => {
        if (user) {
            const levelCompleted = determineLevelCompleted();
            await updateUserProgress(user.id, operation, levelCompleted);
        }

        setIsQuizCompleted(true);
        setTotalQuestions(questions.length);
    };

    const updateUserProgress = async (userId: string, operation: string, levelCompleted: 'facil' | 'dificil') => {
        const userProgressRef = ref(database, `users/${userId}/progress/${operation}`);
        const snapshot = await get(userProgressRef);
        const progress = snapshot.val();
        console.log('Current Progress:', progress);

        await update(userProgressRef, {
            [levelCompleted]: true
        });

        const updatedSnapshot = await get(userProgressRef);
        const updatedProgress = updatedSnapshot.val();
        console.log('Updated Progress:', updatedProgress);

        const bothLevelsCompleted = updatedProgress.facil && updatedProgress.dificil;
        console.log('Both Levels Completed:', bothLevelsCompleted);

        if (bothLevelsCompleted) {
            await update(userProgressRef, {
                concluido: true
            });

            const nextOperation = getNextOperation(operation);
            console.log('Next Operation:', nextOperation);

            if (nextOperation) {
                await update(ref(database, `users/${userId}/progress/${nextOperation}`), {
                    facil: false,
                    dificil: false,
                    concluido: false
                });
                console.log('Next Operation Initialized:', nextOperation);
            }
        }
    };


    const getNextOperation = (currentOperation: string): string | null => {
        const operations = ['addition', 'subtraction', 'multiplication', 'division'];
        const currentIndex = operations.indexOf(currentOperation);
        return currentIndex < operations.length - 1 ? operations[currentIndex + 1] : null;
    };

    return (
        <div className='container-quiz'>
            {isQuizCompleted ? (
                <div className='completion-screen'>
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
