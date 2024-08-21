import  { useState } from 'react';
import { Questions } from './Quenstion';
import { QuestionLevelSelector } from './QuestionsLevelSelector';

export function PlayPage() {
    const [selectedLevel, setSelectedLevel] = useState<'easy' | 'hard' | null>(null);

    const handleLevelSelect = (level: 'easy' | 'hard') => {
        setSelectedLevel(level);
    };

    return (
        <div>
            {selectedLevel === null ? (
                <QuestionLevelSelector onLevelSelect={handleLevelSelect} />
            ) : (
                <Questions level={selectedLevel} />
            )}
        </div>
    );
}
