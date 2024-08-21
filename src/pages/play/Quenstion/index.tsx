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
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

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
                    setError("Nenhuma pergunta encontrada.");
                }
            } catch (err) {
                setError("Erro ao buscar perguntas.");
            } finally {
                setLoading(false);
            }
        };

        fetchQuestions();
    }, [level]);

    if (loading) {
        return <p>Carregando perguntas...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div>
            <h2>Perguntas de nível {level}</h2>
            {questions.map(question => (
                <div key={question.id}>
                    <p>{question.text}</p>
                    <div>
                        {question.options.map(option => (
                            <button className='btn-escolha' key={option}>{option}</button>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}
