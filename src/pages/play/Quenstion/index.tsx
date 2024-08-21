// Questions.tsx
import { useEffect, useState } from 'react';
import { getDatabase, ref, get } from 'firebase/database';

interface Question {
    id: string;
    text: string;
    options: string[];
    correctAnswer: string;
}

export function Questions({ level }: { level: 'easy' | 'hard' }) {
    const [questions, setQuestions] = useState<Question[]>([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [userAnswer, setUserAnswer] = useState<string | null>(null);
    const [feedback, setFeedback] = useState<string | null>(null);
    const [isCompleted, setIsCompleted] = useState(false);
    const [isFeedbackVisible, setIsFeedbackVisible] = useState(false);

    useEffect(() => {
        const fetchQuestions = async () => {
            const db = getDatabase();
            const questionsRef = ref(db, `questions/${level}`);

            try {
                const snapshot = await get(questionsRef);
                if (snapshot.exists()) {
                    const data = snapshot.val();
                    const formattedQuestions = Object.values(data).map((question: any) => ({
                        id: question.id,
                        text: question.text,
                        options: question.options,
                        correctAnswer: question.correctAnswer
                    }));
                    setQuestions(formattedQuestions);
                } else {
                    setFeedback("Nenhuma pergunta encontrada.");
                }
            } catch (err) {
                setFeedback("Erro ao buscar perguntas.");
            }
        };

        fetchQuestions();
    }, [level]);

    useEffect(() => {
        if (isFeedbackVisible) {
            const timer = setTimeout(() => {
                if (currentQuestionIndex < questions.length - 1) {
                    setCurrentQuestionIndex(currentQuestionIndex + 1);
                    setUserAnswer(null);
                    setFeedback(null);
                    setIsFeedbackVisible(false);
                } else {
                    setIsCompleted(true);
                }
            }, 4000); // Espera 4 segundos antes de avançar para a próxima pergunta

            return () => clearTimeout(timer);
        }
    }, [isFeedbackVisible, currentQuestionIndex, questions.length]);

    const handleAnswer = (answer: string) => {
        const currentQuestion = questions[currentQuestionIndex];
        if (answer === currentQuestion.correctAnswer) {
            setFeedback("Parabéns! Resposta correta.");
        } else {
            setFeedback(`Resposta errada. A resposta correta é: ${currentQuestion.correctAnswer}`);
        }
        setUserAnswer(answer);
        setIsFeedbackVisible(true);
    };

    if (isCompleted) {
        return <p>Exercícios concluídos! Parabéns por completar o quiz.</p>;
    }

    if (!questions.length) {
        return <p>{feedback || "Carregando perguntas..."}</p>;
    }

    const currentQuestion = questions[currentQuestionIndex];

    return (
        <div>
            <h2>Pergunta {currentQuestionIndex + 1}</h2>
            <p>{currentQuestion.text}</p>
            <div>
                {currentQuestion.options.map(option => (
                    <button
                        className='btn-escolha'
                        key={option}
                        onClick={() => handleAnswer(option)}
                        disabled={isFeedbackVisible}
                    >
                        {option}
                    </button>
                ))}
            </div>
            {feedback && <p>{feedback}</p>}
        </div>
    );
}
