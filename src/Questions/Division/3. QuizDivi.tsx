import React, { useState, useEffect } from 'react';
import { ref, onValue } from "firebase/database";
import { database } from '../../services/firebase';
import { useNavigate } from 'react-router-dom';

interface Question {
    id: string;
    text: string;
    options: string[];
    correctAnswer: string;
}

const QuizDivi: React.FC<{ level: string }> = ({ level }) => {
    const navigate = useNavigate();
    const [questions, setQuestions] = useState<Question[]>([]);
    const [currentQuestion, setCurrentQuestion] = useState<number>(0);
    const [feedback, setFeedback] = useState<string | null>(null);
    const [feedbackClass, setFeedbackClass] = useState<string>('');
    const [buttonStates, setButtonStates] = useState<{ [key: string]: string }>({});
    const [isAnswered, setIsAnswered] = useState<boolean>(false);
    useEffect(() => {
        const fetchQuestions = () => {
            const questionsRef = ref(database, `questions/division/${level}`);
            onValue(questionsRef, (snapshot) => {
                const data = snapshot.val();
                if (data) {
                    const questionsArray = Object.keys(data).map(key => data[key]);
                    setQuestions(questionsArray);
                }
            });
        };

        fetchQuestions();
    }, [level]);

    const handleAnswerClick = (answer: string) => {
        if (isAnswered) return;

        const correctAnswer = questions[currentQuestion].correctAnswer;

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
        setFeedback(answer === correctAnswer ? 'Correto!' : 'Errado!');
        setFeedbackClass(answer === correctAnswer ? 'feedback-correct' : 'feedback-incorrect');
        setIsAnswered(true);

        setTimeout(() => {
            setFeedback(null);
            setFeedbackClass('');
            setButtonStates({});
            setIsAnswered(false);
            if (currentQuestion < questions.length - 1) {
                setCurrentQuestion(currentQuestion + 1);
            } else {
                setCurrentQuestion(0);
            }
        }, 3000);
    };

    function handleHome() {
        navigate('/')
    }

    return (
        <div className='container-quiz'>
            {questions.length > 0 && (
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
            )}

            <div className='div-sair-do-game' onClick={handleHome}>VOLTAR AO INÍCIO</div>
        </div>
    );
};

export default QuizDivi;
